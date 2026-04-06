import axios, { AxiosInstance } from 'axios';
import { execFile } from 'child_process';
import fs from 'fs';
import http from 'http';
import os from 'os';
import path from 'path';
import { Op } from 'sequelize';
import { RAGEngine } from './rag.engine';
import { AIDataService } from './ai.data.service';
import { AIPromptBuilder } from './ai-prompt-builder';
import { DocumentTextExtractor } from './document-text-extractor';
import { UserRole } from '../users/user.roles';
import { Response } from 'express';
import * as mammoth from 'mammoth';
import { createWorker } from 'tesseract.js';
import { Incident } from '../incidents/incident.model';
import { appLogger } from '../../utils/app-logger';

const OLLAMA_CHAT_URL = process.env.OLLAMA_CHAT_URL || 'http://localhost:11434/api/chat';
const MODEL_NAME = process.env.OLLAMA_MODEL || 'llama3';

/**
 * Optimized axios instance for Ollama to handle concurrency properly.
 * We disable keepAlive to avoid connection saturation and use a specific agent.
 */
const ollamaAxios: AxiosInstance = axios.create({
    httpAgent: new http.Agent({
        keepAlive: false,
        maxSockets: 10
    })
});

let activeRequests = 0;

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface UserSession {
    messages: ChatMessage[];
    lastAccess: number;
}

export class AIService {
    private static sessions = new Map<string, UserSession>();
    private static TTL = 30 * 60 * 1000; // 30 minutes

    private static parseJsonArrayResponse(content: string): any[] {
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
            return parsed;
        }

        if (Array.isArray(parsed?.evaluations)) {
            return parsed.evaluations;
        }

        if (Array.isArray(parsed?.results)) {
            return parsed.results;
        }

        if (Array.isArray(parsed?.items)) {
            return parsed.items;
        }

        return [parsed];
    }

    private static toPositiveInteger(value: unknown): number | null {
        const parsed = Number.parseInt(String(value), 10);
        return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
    }

    private static normalizeRiskEvaluations(evaluation: any[], risks: any[]): any[] {
        const requestedRiskIds = risks
            .map((risk) => this.toPositiveInteger(risk?.id))
            .filter((riskId): riskId is number => riskId !== null);
        const requestedRiskIdSet = new Set(requestedRiskIds);
        const normalizedResults = new Map<number, any>();

        evaluation.forEach((item, index) => {
            const explicitRiskId = this.toPositiveInteger(item?.riskId);
            const fallbackRiskId = evaluation.length === risks.length
                ? requestedRiskIds[index] ?? null
                : null;
            const riskId = explicitRiskId && requestedRiskIdSet.has(explicitRiskId)
                ? explicitRiskId
                : fallbackRiskId;

            if (!riskId) {
                return;
            }

            normalizedResults.set(riskId, {
                ...item,
                riskId,
                priorite: item?.priorite ? parseInt(item.priorite.toString(), 10) : 0,
            });
        });

        return Array.from(normalizedResults.values());
    }

    private static maskSessionId(sessionId: string): string {
        if (!sessionId) {
            return 'n/a';
        }

        if (sessionId.length <= 8) {
            return sessionId;
        }

        return `${sessionId.slice(0, 4)}...${sessionId.slice(-4)}`;
    }

    static {
        // Cleanup old sessions every 10 minutes
        setInterval(() => {
            const now = Date.now();
            for (const [id, session] of this.sessions.entries()) {
                if (now - session.lastAccess > this.TTL) {
                    this.sessions.delete(id);
                }
            }
        }, 10 * 60 * 1000);
    }

    private static getAssistantProfileContextName(role: UserRole): string {
        if (role === UserRole.RISK_MANAGER || role === UserRole.RISK_AGENT) {
            return 'assistant_role_risk';
        }

        if (role === UserRole.AUDIT_SENIOR || role === UserRole.AUDITEUR) {
            return 'assistant_role_audit';
        }

        if (role === UserRole.TOP_MANAGEMENT) {
            return 'assistant_role_management';
        }

        if (role === UserRole.SUPER_ADMIN) {
            return 'assistant_role_super_admin';
        }

        return 'assistant_role_admin_si';
    }

    private static async buildAssistantSessionPrompt(role: UserRole): Promise<string> {
        const metadata = await AIDataService.fetchSystemMetadata();
        const assistantRolePrompt = await AIPromptBuilder.buildPrompt({
            name: this.getAssistantProfileContextName(role),
        });

        return AIPromptBuilder.buildPrompt({
            name: 'assistant_chat',
            businessPayload: {
                metadata,
                assistantRolePrompt,
            },
        });
    }

    private static formatStandardsContext(contextChunks: string[]): string {
        if (!contextChunks.length) {
            return '';
        }

        return `CONTEXTE ISSU DES NORMES INDEXEES :\n${contextChunks.join('\n\n')}`;
    }

    private static buildIncidentHistoryContext(incidents: Incident[]): string {
        if (!incidents.length) {
            return '';
        }

        return incidents
            .map((incident) => [
                `[Incident - ${incident.dateSurvenance.toLocaleDateString()}]`,
                `Titre: ${incident.titre}`,
                `Description: ${incident.description}`,
            ].join('\n'))
            .join('\n\n');
    }

    private static buildCurrentIncidentContext(incident: Incident, pieceJointeTexte: string): string {
        const sections = [
            `Titre: ${incident.titre}`,
            `Description: ${incident.description}`,
        ];

        if (pieceJointeTexte) {
            sections.push(`Extraits de la piece jointe: ${this.limitText(pieceJointeTexte, 2000)}`);
        }

        return sections.join('\n');
    }

    private static async buildRiskAnalysisPrompt(options: {
        userInput: string;
        metadata: string;
        standardsContext?: string;
        historicalIncidents?: string;
        currentIncident?: string;
    }): Promise<string> {
        return AIPromptBuilder.buildPrompt({
            name: 'risk_analysis',
            businessPayload: {
                metadata: options.metadata,
                standardsContext: options.standardsContext,
                historicalIncidents: options.historicalIncidents,
                currentIncident: options.currentIncident,
            },
            userInput: options.userInput,
        });
    }

    private static async buildIncidentAnalysisPrompt(text: string, metadata: string): Promise<string> {
        return AIPromptBuilder.buildPrompt({
            name: 'incident_analysis',
            businessPayload: { metadata },
            userInput: text,
        });
    }

    private static async buildRiskEvaluationPrompt(risksText: string, standardsContext: string): Promise<string> {
        return AIPromptBuilder.buildPrompt({
            name: 'risk_evaluation',
            businessPayload: {
                standardsContext,
            },
            userInput: risksText,
        });
    }

    private static async buildAuditPlanPrompt(riskMapping: string, standardsContext: string): Promise<string> {
        return AIPromptBuilder.buildPrompt({
            name: 'audit_plan_generation',
            businessPayload: {
                standardsContext,
            },
            userInput: riskMapping,
        });
    }

    private static async getSession(userId: number, sessionId: string, role: UserRole): Promise<UserSession> {
        return this.getOrCreateDynamicSession(userId, sessionId, role);
    }

    private static async getOrCreateDynamicSession(userId: number, sessionId: string, role: UserRole): Promise<UserSession> {
        const sessionKey = `${userId}-${sessionId}`;
        if (!this.sessions.has(sessionKey)) {
            const sessionPrompt = await this.buildAssistantSessionPrompt(role);

            this.sessions.set(sessionKey, {
                messages: [
                    {
                        role: 'system',
                        content: sessionPrompt
                    }
                ],
                lastAccess: Date.now()
            });
        }

        const session = this.sessions.get(sessionKey)!;
        session.lastAccess = Date.now();
        return session;
    }

    static async generateResponse(prompt: string, role: UserRole, sessionId: string, userId: number, res?: Response): Promise<string | void> {
        activeRequests++;
        const requestId = Math.floor(Math.random() * 10000);
        appLogger.info('AI', 'Request started', {
            requestId,
            activeRequests,
            sessionId: this.maskSessionId(sessionId),
            userId,
            stream: !!res,
        });

        try {
            const session = await this.getSession(userId, sessionId, role);

            // 1. Context from Standards (RAG)
            const isIndexed = await RAGEngine.checkIndexStatus();
            let standardsContext = '';
            if (isIndexed) {
                const contextChunks = await RAGEngine.searchContext(prompt, role);
                if (contextChunks.length > 0) {
                    standardsContext = `CONTEXTE EXTRAIT DES NORMES :\n${contextChunks.join('\n\n')}\n\n`;
                }
            }

            // 2. Context from Database (Live Data)
            const dbContext = await AIDataService.fetchContextualData(prompt, userId, role);

            // Prepare history for chat
            const fullPrompt = `${standardsContext}${dbContext}QUESTION : ${prompt}`;
            session.messages.push({ role: 'user', content: fullPrompt });

            const isStreaming = !!res;

            appLogger.debug('AI', 'Sending request to Ollama', {
                requestId,
                stream: isStreaming,
            });

            const response = await ollamaAxios.post(OLLAMA_CHAT_URL, {
                model: MODEL_NAME,
                messages: session.messages,
                stream: isStreaming,
                options: {
                    num_ctx: 2048,
                    num_predict: 500,
                    temperature: 0.7
                }
            }, {
                responseType: isStreaming ? 'stream' : 'json',
                timeout: 0
            });

            if (isStreaming) {
                res!.setHeader('Content-Type', 'text/event-stream');
                res!.setHeader('Cache-Control', 'no-cache');
                res!.setHeader('Connection', 'keep-alive');
                res!.setHeader('X-Accel-Buffering', 'no');
                res!.flushHeaders();

                appLogger.debug('AI', 'Streaming response opened', { requestId });

                let fullContent = '';
                response.data.on('data', (chunk: Buffer) => {
                    const lines = chunk.toString().split('\n');
                    for (const line of lines) {
                        if (!line.trim()) continue;
                        try {
                            const parsed = JSON.parse(line);
                            if (parsed.message?.content) {
                                const content = parsed.message.content;
                                fullContent += content;
                                res!.write(`data: ${JSON.stringify({ content })}\n\n`);
                            }
                            if (parsed.done) {
                                session.messages.push({ role: 'assistant', content: fullContent });
                                res!.write('data: [DONE]\n\n');
                                res!.end();
                                activeRequests--;
                                appLogger.info('AI', 'Streaming request completed', {
                                    requestId,
                                    activeRequests,
                                });
                            }
                        } catch (e) {
                            // Incomplete JSON chunk
                        }
                    }
                });

                response.data.on('error', (err: Error) => {
                    activeRequests--;
                    appLogger.error('AI', 'Streaming request failed', {
                        requestId,
                        activeRequests,
                        error: err.message,
                    });
                    if (!res!.writableEnded) res!.end();
                });

                res!.on('close', () => {
                    if (!response.data.destroyed) response.data.destroy();
                });

                return;
            } else {
                const aiMsg = response.data.message.content;
                session.messages.push({ role: 'assistant', content: aiMsg });
                activeRequests--;
                appLogger.info('AI', 'Request completed', {
                    requestId,
                    activeRequests,
                    responseLength: aiMsg.length,
                });
                return aiMsg;
            }
        } catch (error: any) {
            activeRequests--;
            appLogger.error('AI', 'Request failed', {
                requestId,
                activeRequests,
                error: error.message || error,
            });
            throw new Error(error.message || 'Could not get response from AI');
        }
    }

    static async generateRisksFromSituation(situation: string, role: UserRole): Promise<any[]> {
        return this.generateRisksFromSituationDynamic(situation, role);
    }

    static async generateIncidentDraftFromText(text: string, _role: UserRole): Promise<any> {
        return this.generateIncidentDraftFromTextDynamic(text);
    }

    /**
     * GÃ‰NÃ‰RATION DE RISQUES INTELLIGENTE DEPUIS UN INCIDENT (AVEC HISTORIQUE)
     */
    static async generateRisksFromIncident(incident: Incident, pieceJointeTexte: string, role: UserRole): Promise<any[]> {
        return this.generateRisksFromIncidentDynamic(incident, pieceJointeTexte, role);
    }

    /**
     * Ã‰VALUATION DES RISQUES PAR IA
     * Analyse la prioritÃ©, l'impact et les tendances pour une liste de risques.
     */
    static async generateRisksFromSituationDynamic(situation: string, role: UserRole): Promise<any[]> {
        try {
            const isIndexed = await RAGEngine.checkIndexStatus();
            let standardsContext = '';

            if (isIndexed) {
                const contextChunks = await RAGEngine.searchContext(situation, role, 5);
                appLogger.debug('AI-RAG', 'Context fragments loaded', {
                    role,
                    count: contextChunks.length,
                });
                if (contextChunks.length > 0) {
                    standardsContext = this.formatStandardsContext(contextChunks);
                }
            }

            appLogger.info('AI', 'Generating risks from situation', {
                role,
                preview: this.limitText(this.cleanText(situation), 80),
            });
            const metadata = await AIDataService.fetchSystemMetadata();
            const finalPrompt = await this.buildRiskAnalysisPrompt({
                userInput: situation,
                metadata,
                standardsContext,
            });

            const response = await ollamaAxios.post(OLLAMA_CHAT_URL, {
                model: MODEL_NAME,
                messages: [
                    { role: 'user', content: finalPrompt }
                ],
                stream: false,
                format: 'json',
                options: {
                    temperature: 0.4,
                    num_predict: 1000,
                    num_ctx: 4096
                }
            });

            const content = response.data.message.content;
            appLogger.debug('AI', 'Risk generation raw response received', {
                responseLength: content.length,
            });
            const risks = this.parseJsonArrayResponse(content);

            return risks.map(risk => ({
                ...risk,
                delaiSuggestion: risk.delaiSuggestion ? parseInt(risk.delaiSuggestion.toString(), 10) : 30
            }));
        } catch (error: any) {
            appLogger.error('AI', 'Risk generation failed', error.message || error);
            return [];
        }
    }

    static async generateIncidentDraftFromTextDynamic(text: string): Promise<any> {
        const normalizedText = this.limitText(this.cleanText(text), 4000);
        if (!normalizedText || normalizedText.length < 10) {
            return {};
        }

        try {
            const metadata = await AIDataService.fetchSystemMetadata();
            const finalPrompt = await this.buildIncidentAnalysisPrompt(normalizedText, metadata);

            const response = await ollamaAxios.post(OLLAMA_CHAT_URL, {
                model: MODEL_NAME,
                messages: [
                    { role: 'user', content: finalPrompt }
                ],
                stream: false,
                format: 'json',
                options: {
                    temperature: 0.2,
                    num_predict: 600,
                    num_ctx: 4096
                }
            });

            const content = response.data.message.content;
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
            return parsed && typeof parsed === 'object' ? parsed : {};
        } catch (error: any) {
            appLogger.error('AI', 'Incident draft generation failed', error.message || error);
            return this.buildIncidentDraftFallback(normalizedText);
        }
    }

    static async generateRisksFromIncidentDynamic(incident: Incident, pieceJointeTexte: string, role: UserRole): Promise<any[]> {
        try {
            appLogger.info('AI', 'Generating risks from incident', {
                incidentId: incident.id,
                role,
            });

            const recentIncidents = await Incident.findAll({
                where: incident.id ? { id: { [Op.ne]: incident.id } } : undefined,
                order: [['dateSurvenance', 'DESC']],
                limit: 5
            });

            const metadata = await AIDataService.fetchSystemMetadata();
            const finalPrompt = await this.buildRiskAnalysisPrompt({
                userInput: 'Genere des risques potentiels pertinents a partir de l incident actuel et de l historique fourni.',
                metadata,
                historicalIncidents: this.buildIncidentHistoryContext(recentIncidents),
                currentIncident: this.buildCurrentIncidentContext(incident, pieceJointeTexte),
            });

            const response = await ollamaAxios.post(OLLAMA_CHAT_URL, {
                model: MODEL_NAME,
                messages: [
                    { role: 'user', content: finalPrompt }
                ],
                stream: false,
                format: 'json',
                options: {
                    temperature: 0.4,
                    num_predict: 1500,
                    num_ctx: 4096
                }
            });

            const content = response.data.message.content;
            appLogger.debug('AI', 'Incident risk raw response received', {
                incidentId: incident.id,
                responseLength: content.length,
            });
            const risks = this.parseJsonArrayResponse(content);

            return risks.map(risk => ({
                ...risk,
                delaiSuggestion: risk.delaiSuggestion ? parseInt(risk.delaiSuggestion.toString(), 10) : 30
            }));
        } catch (error: any) {
            appLogger.error('AI', 'Incident risk generation failed', {
                incidentId: incident.id,
                error: error.message || error,
            });
            return [];
        }
    }

    static async evaluateRisks(risks: any[], role: UserRole = UserRole.AUDIT_SENIOR): Promise<any[]> {
        if (!risks || risks.length === 0) {
            appLogger.warn('AI', 'Strategic AI evaluation skipped because no risks were provided', { role });
            return [];
        }

        try {
            appLogger.info('AI', 'Strategic AI evaluation started', {
                role,
                riskCount: risks.length,
            });

            const risksText = risks.map(r => `- [${r.id}] ${r.titre} (Niveau: ${r.niveauRisque}, Domaine: ${r.domaine})`).join('\n');
            const isIndexed = await RAGEngine.checkIndexStatus();
            let standardsContext = '';

            if (isIndexed) {
                const query = risks.map(r => r.titre).join(' ');
                const contextChunks = await RAGEngine.searchContext(query, role, 5);
                if (contextChunks.length > 0) {
                    standardsContext = this.formatStandardsContext(contextChunks);
                }
            }

            const evaluationPrompt = await this.buildRiskEvaluationPrompt(risksText, standardsContext);

            const response = await ollamaAxios.post(OLLAMA_CHAT_URL, {
                model: MODEL_NAME,
                messages: [
                    { role: 'user', content: evaluationPrompt }
                ],
                stream: false,
                format: 'json',
                options: {
                    num_ctx: 4096,
                    num_predict: 1000,
                    temperature: 0.3
                }
            });

            const content = response.data.message.content;
            const evaluation = this.parseJsonArrayResponse(content);
            const normalizedEvaluation = this.normalizeRiskEvaluations(evaluation, risks);

            if (normalizedEvaluation.length !== risks.length) {
                appLogger.warn('AI', 'Strategic AI evaluation returned partial or unmatched results', {
                    role,
                    riskCount: risks.length,
                    rawResultCount: evaluation.length,
                    normalizedResultCount: normalizedEvaluation.length,
                });
            }

            appLogger.info('AI', 'Strategic AI evaluation completed', {
                role,
                riskCount: risks.length,
                resultCount: normalizedEvaluation.length,
                ragUsed: isIndexed,
            });

            return normalizedEvaluation;
        } catch (error: any) {
            appLogger.error('AI', 'Strategic AI evaluation failed', {
                role,
                riskCount: risks.length,
                error: error.message || error,
            });
            // Retourne une liste vide au lieu de crasher le process parent
            return [];
        }
    }

    /**
     * GÃ‰NÃ‰RATION DU PLAN D'AUDIT ANNUEL PAR IA
     * SuggÃ¨re des missions d'audit basÃ©es sur les risques identifiÃ©s.
     */
    static async generateAuditPlan(risks: any[], role: UserRole = UserRole.AUDIT_SENIOR): Promise<any[]> {
        if (!risks || risks.length === 0) return [];

        try {
            const isIndexed = await RAGEngine.checkIndexStatus();
            let standardsContext = '';

            if (isIndexed) {
                const query = `ProcÃ©dures d'audit pour : ${risks.map(r => r.domaine).join(', ')}`;
                const contextChunks = await RAGEngine.searchContext(query, role, 5);
                if (contextChunks.length > 0) {
                    standardsContext = this.formatStandardsContext(contextChunks);
                }
            }

            const riskMapping = risks.map(r => `${r.id}: ${r.titre}`).join('\n');
            const auditPlanPrompt = await this.buildAuditPlanPrompt(riskMapping, standardsContext);

            const response = await ollamaAxios.post(OLLAMA_CHAT_URL, {
                model: MODEL_NAME,
                messages: [
                    { role: 'user', content: auditPlanPrompt }
                ],
                stream: false,
                format: 'json',
                options: {
                    num_ctx: 4096,
                    num_predict: 1000,
                    temperature: 0.4
                }
            });

            const content = response.data.message.content;
            const plan = this.parseJsonArrayResponse(content);

            return plan.map(item => ({
                ...item,
                delaiSuggestion: item.delaiSuggestion ? parseInt(item.delaiSuggestion.toString()) : 30,
                riskId: item.riskId ? parseInt(item.riskId.toString()) : 0
            }));
        } catch (error: any) {
            appLogger.error('AI', 'Audit plan generation failed', error.message || error);
            return [];
        }
    }
    /**
     * Nettoie le texte en supprimant les espaces multiples, les sauts de ligne excessifs
     * et les caractÃ¨res non imprimables.
     */
    static cleanText(text: string): string {
        return text
            .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '') // Supprime les caractÃ¨res non imprimables
            .replace(/\s+/g, ' ') // Remplace les espaces multiples/tabulations/sauts de ligne par un seul espace
            .trim();
    }

    /**
     * Limite la taille du texte pour ne pas dÃ©passer le contexte de l'IA.
     */
    static limitText(text: string, maxChars: number = 4000): string {
        if (text.length <= maxChars) return text;
        return text.substring(0, maxChars) + '... [Texte tronquÃ©]';
    }

    private static hasEnoughExtractedText(text: string): boolean {
        const normalized = this.cleanText(text);
        if (normalized.length >= 80) return true;

        const words = normalized.split(/\s+/).filter(word => word.length > 1);
        return normalized.length >= 40 && words.length >= 6;
    }

    private static buildIncidentDraftFallback(text: string): any {
        const normalizedText = this.cleanText(text);
        const firstSentence = normalizedText
            .split(/[.!?]/)
            .find(sentence => sentence.trim().length > 15)?.trim();

        return {
            titre: this.limitText(firstSentence || normalizedText, 120),
            description: this.limitText(normalizedText, 1500),
            domaine: null,
            departement: null,
            dateSurvenance: null,
            macroProcessus: null,
            processus: null,
            planActionTraitement: null,
            niveauRisque: null
        };
    }

    private static getImageDimensions(buffer: Buffer): { width: number; height: number } | null {
        if (buffer.length < 24) return null;

        // PNG
        if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
            return {
                width: buffer.readUInt32BE(16),
                height: buffer.readUInt32BE(20)
            };
        }

        // JPEG
        if (buffer[0] === 0xff && buffer[1] === 0xd8) {
            let offset = 2;
            while (offset < buffer.length) {
                if (buffer[offset] !== 0xff) {
                    offset++;
                    continue;
                }

                const marker = buffer[offset + 1];
                const blockLength = buffer.readUInt16BE(offset + 2);
                const isStartOfFrame = [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker);

                if (isStartOfFrame) {
                    return {
                        height: buffer.readUInt16BE(offset + 5),
                        width: buffer.readUInt16BE(offset + 7)
                    };
                }

                offset += 2 + blockLength;
            }
        }

        return null;
    }

    private static async recognizeRectangle(
        worker: any,
        image: Buffer,
        rectangle: { left: number; top: number; width: number; height: number },
        extraParams?: Record<string, string>
    ): Promise<string> {
        await worker.setParameters({
            preserve_interword_spaces: '1',
            tessedit_pageseg_mode: '11',
            ...extraParams
        } as any);

        const result = await worker.recognize(image, { rectangle });
        return (result.data.text || '').trim();
    }

    private static async extractIncidentFormRegions(worker: any, image: Buffer): Promise<string[]> {
        const dimensions = this.getImageDimensions(image);
        if (!dimensions) return [];

        const { width, height } = dimensions;
        const rect = (left: number, top: number, rectWidth: number, rectHeight: number) => ({
            left: Math.max(0, Math.round(width * left)),
            top: Math.max(0, Math.round(height * top)),
            width: Math.max(1, Math.round(width * rectWidth)),
            height: Math.max(1, Math.round(height * rectHeight))
        });

        const regions = [
            rect(0.34, 0.235, 0.12, 0.05), // direction
            rect(0.60, 0.235, 0.14, 0.05), // statut
            rect(0.28, 0.275, 0.22, 0.05), // departement
            rect(0.29, 0.315, 0.14, 0.05), // service
            rect(0.62, 0.315, 0.10, 0.04), // cree le
            rect(0.76, 0.315, 0.10, 0.04), // valide le
            rect(0.90, 0.315, 0.08, 0.04), // clos le
            rect(0.43, 0.365, 0.18, 0.045), // libelle
            rect(0.43, 0.398, 0.18, 0.05), // description
            rect(0.43, 0.438, 0.18, 0.05), // survenu le
            rect(0.66, 0.47, 0.12, 0.16) // block a definir / right side values
        ];

        const results = await Promise.all([
            this.recognizeRectangle(worker, image, regions[0]),
            this.recognizeRectangle(worker, image, regions[1]),
            this.recognizeRectangle(worker, image, regions[2]),
            this.recognizeRectangle(worker, image, regions[3]),
            this.recognizeRectangle(worker, image, regions[4], { tessedit_char_whitelist: '0123456789/.- ' }),
            this.recognizeRectangle(worker, image, regions[5], { tessedit_char_whitelist: '0123456789/.- ' }),
            this.recognizeRectangle(worker, image, regions[6], { tessedit_char_whitelist: '0123456789/.- ' }),
            this.recognizeRectangle(worker, image, regions[7]),
            this.recognizeRectangle(worker, image, regions[8]),
            this.recognizeRectangle(worker, image, regions[9], { tessedit_char_whitelist: '0123456789/.- ' }),
            this.recognizeRectangle(worker, image, regions[10]),
        ]);

        return results
            .flatMap(text => text.split(/\r?\n/))
            .map(line => line.replace(/\s+/g, ' ').trim())
            .filter(Boolean);
    }

    private static async extractTextFromImageBuffer(imageBuffer: Buffer, includeStructuredRegions: boolean): Promise<string> {
        const worker = await createWorker('fra');
        const ocrChunks: string[] = [];

        try {
            const collectOcrPass = async (params: Record<string, string>) => {
                await worker.setParameters({
                    preserve_interword_spaces: '1',
                    ...params
                } as any);
                const result = await worker.recognize(imageBuffer);
                const text = (result.data.text || '').trim();
                if (text) {
                    ocrChunks.push(text);
                }
            };

            await collectOcrPass({ tessedit_pageseg_mode: '6' });
            await collectOcrPass({ tessedit_pageseg_mode: '11' });
            await collectOcrPass({ tessedit_pageseg_mode: '4' });
            await collectOcrPass({
                tessedit_pageseg_mode: '11',
                tessedit_char_whitelist: '0123456789/.- '
            });
            await collectOcrPass({
                tessedit_pageseg_mode: '11',
                tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZAAAAEEEEIIOOUUUaaaaeeeeiioouuu -/'
            });

            if (includeStructuredRegions) {
                const regionTexts = await this.extractIncidentFormRegions(worker, imageBuffer);
                ocrChunks.push(...regionTexts);
            }
        } finally {
            await worker.terminate();
        }

        return ocrChunks
            .flatMap(chunk => chunk.split(/\r?\n/))
            .map(line => line.replace(/\s+/g, ' ').trim())
            .filter(Boolean)
            .filter((line, index, all) => all.findIndex(item => item.toLowerCase() === line.toLowerCase()) === index)
            .join('\n');
    }

    private static execFileAsync(command: string, args: string[]): Promise<{ stdout: string; stderr: string }> {
        return new Promise((resolve, reject) => {
            execFile(command, args, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }, (error, stdout = '', stderr = '') => {
                if (error) {
                    return reject(error);
                }
                resolve({ stdout, stderr });
            });
        });
    }

    private static async commandExists(command: string): Promise<boolean> {
        const whereCommand = process.platform === 'win32' ? 'where' : 'which';

        return new Promise((resolve) => {
            execFile(whereCommand, [command], (error) => {
                resolve(!error);
            });
        });
    }

    private static async findExecutableRecursive(rootDir: string, executableName: string, maxDepth: number): Promise<string | null> {
        if (!rootDir || maxDepth < 0 || !fs.existsSync(rootDir)) {
            return null;
        }

        const entries = await fs.promises.readdir(rootDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(rootDir, entry.name);

            if (entry.isFile() && entry.name.toLowerCase() === executableName.toLowerCase()) {
                return fullPath;
            }

            if (entry.isDirectory() && maxDepth > 0) {
                const found = await this.findExecutableRecursive(fullPath, executableName, maxDepth - 1);
                if (found) {
                    return found;
                }
            }
        }

        return null;
    }

    private static async resolvePopplerExecutable(executableBaseName: 'pdftoppm' | 'pdftotext'): Promise<string> {
        const executableName = process.platform === 'win32' ? `${executableBaseName}.exe` : executableBaseName;
        const envPath = process.env.PDFTOPPM_PATH;
        if (envPath && fs.existsSync(envPath)) {
            const envStat = await fs.promises.stat(envPath);
            if (envStat.isDirectory()) {
                const candidateFromDir = path.join(envPath, executableName);
                if (fs.existsSync(candidateFromDir)) {
                    return candidateFromDir;
                }
            } else {
                const envDir = path.dirname(envPath);
                const siblingExecutable = path.join(envDir, executableName);
                if (fs.existsSync(siblingExecutable)) {
                    return siblingExecutable;
                }

                if (path.basename(envPath).toLowerCase() === executableName.toLowerCase()) {
                    return envPath;
                }
            }
        }

        if (await this.commandExists(executableBaseName)) {
            return executableBaseName;
        }

        const candidatePaths = [
            `C:\\ProgramData\\chocolatey\\bin\\${executableName}`,
            `C:\\ProgramData\\chocolatey\\lib\\popplerutils\\tools\\bin\\${executableName}`,
            `C:\\ProgramData\\chocolatey\\lib\\poppler-utils\\tools\\bin\\${executableName}`,
            `C:\\ProgramData\\chocolatey\\lib\\poppler\\tools\\bin\\${executableName}`,
            `C:\\Program Files\\poppler\\Library\\bin\\${executableName}`,
            `C:\\Program Files\\poppler\\bin\\${executableName}`,
            `C:\\poppler-25.12.0\\Library\\bin\\${executableName}`
        ];

        for (const candidatePath of candidatePaths) {
            if (fs.existsSync(candidatePath)) {
                return candidatePath;
            }
        }

        const chocolateyLibDir = 'C:\\ProgramData\\chocolatey\\lib';
        const discoveredPath = await this.findExecutableRecursive(chocolateyLibDir, executableName, 5);
        if (discoveredPath) {
            return discoveredPath;
        }

        throw new Error(`OCR PDF indisponible sur ce serveur: ${executableBaseName} est introuvable. Configure PDFTOPPM_PATH ou installe un binaire Poppler contenant ${executableName}.`);
    }

    private static async extractTextFromPdfBuffer(buffer: Buffer): Promise<string> {
        const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'sgrc-pdf-text-'));
        const inputPdfPath = path.join(tempDir, 'input.pdf');

        try {
            await fs.promises.writeFile(inputPdfPath, buffer);
            const pdftotextPath = await this.resolvePopplerExecutable('pdftotext');
            const { stdout } = await this.execFileAsync(pdftotextPath, ['-layout', inputPdfPath, '-']);
            return stdout || '';
        } finally {
            await fs.promises.rm(tempDir, { recursive: true, force: true });
        }
    }

    private static async extractTextFromPdfWithOcr(buffer: Buffer): Promise<string> {
        const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'sgrc-pdf-ocr-'));
        const inputPdfPath = path.join(tempDir, 'input.pdf');
        const outputPrefix = path.join(tempDir, 'page');

        try {
            await fs.promises.writeFile(inputPdfPath, buffer);
            const pdftoppmPath = await this.resolvePopplerExecutable('pdftoppm');

            await this.execFileAsync(pdftoppmPath, [
                '-png',
                '-r',
                '200',
                '-f',
                '1',
                '-l',
                '3',
                inputPdfPath,
                outputPrefix
            ]);

            const generatedFiles = (await fs.promises.readdir(tempDir))
                .filter(fileName => /^page-\d+\.png$/i.test(fileName))
                .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

            if (generatedFiles.length === 0) {
                throw new Error('Aucune image OCR n a ete generee pour ce PDF.');
            }

            const ocrTexts: string[] = [];
            for (const generatedFile of generatedFiles) {
                const pageBuffer = await fs.promises.readFile(path.join(tempDir, generatedFile));
                const pageText = await this.extractTextFromImageBuffer(pageBuffer, false);
                if (pageText) {
                    ocrTexts.push(pageText);
                }
            }

            return ocrTexts.join('\n');
        } catch (error: any) {
            if (error?.code === 'ENOENT') {
                const toolMissingError = new Error('OCR PDF indisponible sur ce serveur: l outil pdftoppm est requis pour convertir les pages scannees en images.');
                (toolMissingError as any).statusCode = 400;
                (toolMissingError as any).cause = error;
                throw toolMissingError;
            }

            if (error?.message?.includes('pdftoppm est introuvable') || error?.message?.includes('pdftotext est introuvable')) {
                (error as any).statusCode = 400;
            }

            throw error;
        } finally {
            await fs.promises.rm(tempDir, { recursive: true, force: true });
        }
    }

    /**
     * Extrait le texte d'un fichier (PDF, Word, Image)
     */
    static async extractTextFromFile(file: Express.Multer.File): Promise<string> {
        return DocumentTextExtractor.extractTextFromFile(file, {
            useOcrForPdf: true,
            includeStructuredRegionsForImages: true,
            requireUsableText: true,
            limitChars: 4000,
        });
    }
}

