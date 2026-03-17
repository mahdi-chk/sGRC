import axios, { AxiosInstance } from 'axios';
import http from 'http';
import { RAGEngine } from './rag.engine';
import { AIDataService } from './ai.data.service';
import { UserRole } from '../users/user.roles';
import { Response } from 'express';
import * as mammoth from 'mammoth';
import { createWorker } from 'tesseract.js';
import { PdfReader } from 'pdfreader';
import { Incident } from '../incidents/incident.model';

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

const PLATFORM_CONTEXT = `
CONTEXTE DE LA PLATEFORME sGRC :
La plateforme sGRC est organisée en plusieurs modules clés :
1. GOUVERNANCE : Gestion documentaire (ISO), workflows d'approbation et indicateurs de maturité (COBIT/ISO).
2. GESTION DES RISQUES : Registre des risques, évaluation paramétrable, cartographie dynamique et plans de traitement (ISO 27005).
3. CONTRÔLES INTERNES : Référentiel des contrôles, planification automatisée, collecte de preuves et suivi des non-conformités.
4. CONFORMITÉ : Mapping des exigences réglementaires (ISO 27001, 27002), auto-évaluations et suivi des écarts.
5. AUDIT : Planification pluriannuelle, gestion des missions, check-lists et rapports (ISO 19011).
6. INCIDENTS : Enregistrement structuré, workflow de traitement et reporting consolidé.
7. PLANS D'ACTIONS : Gestion centralisée des actions correctives et préventives.
8. REPORTING & DASHBOARDS : KPI personnalisables et vision multi-entités.
`;

export class AIService {
    private static sessions = new Map<string, UserSession>();
    private static TTL = 30 * 60 * 1000; // 30 minutes

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

    private static async getSession(userId: number, sessionId: string, role: UserRole): Promise<UserSession> {
        const sessionKey = `${userId}-${sessionId}`;
        if (!this.sessions.has(sessionKey)) {
            let roleContext = '';
            const metadata = await AIDataService.fetchSystemMetadata();

            if (role === UserRole.RISK_MANAGER || role === UserRole.RISK_AGENT) {
                roleContext = `
TU AGIS POUR : Profil 'GESTION DES RISQUES'.
MODULES AUTORISÉS : Registre des Risques, Évaluation, Cartographie, Traitement et Contrôles Internes.
RECOURS AUX NORMES : Principalement ISO 27005 (Gestion des Risques).
RESTRICTIONS STRICTES : Tu ne dois PAS répondre aux questions sur l'Audit Interne, les Missions d'Audit ou les spécificités de l'ISO 27001/27002 qui relèvent de l'Audit. Refuse poliment ces questions en expliquant qu'elles sortent de ton périmètre opérationnel.
`;
            } else if (role === UserRole.AUDIT_SENIOR || role === UserRole.AUDITEUR) {
                roleContext = `
TU AGIS POUR : Profil 'AUDIT & CONFORMITÉ'.
MODULES AUTORISÉS : Audit, Conformité, Incidents, Plans d'Actions.
RECOURS AUX NORMES : ISO 27001 (SMSI), ISO 27002 (Mesures de sécurité), COBIT.
RESTRICTIONS STRICTES : Tu ne dois PAS répondre aux questions sur la gestion opérationnelle quotidienne des risques (ISO 27005) ou la maintenance de la cartographie des risques qui relèvent de la Gestion des Risques. Refuse poliment ces questions.
`;
            } else if (role === UserRole.TOP_MANAGEMENT) {
                roleContext = "TU AGIS POUR : Profil 'DIRECTION'. Tu as une vue d'ensemble sur la Gouvernance, le Reporting et la Supervision sGRC.";
            } else if (role === UserRole.SUPER_ADMIN) {
                roleContext = "TU AGIS POUR : Profil 'SUPER ADMINISTRATEUR'. Tu es le maître absolu du système sGRC avec un accès illimité à tous les modules, données, et configurations du système.";
            } else {
                roleContext = "TU AGIS POUR : Profil 'ADMINISTRATEUR SI'. Tu as accès à la gestion des utilisateurs et à la configuration technique du système.";
            }

            this.sessions.set(sessionKey, {
                messages: [
                    {
                        role: 'system',
                        content: `Tu es l'Assistant Expert de la plateforme sGRC. Réponds en français. 
                        
                        ${PLATFORM_CONTEXT}
                        
                        ${metadata}
                        
                        ${roleContext}
                        
                        CONSIGNE GÉNÉRALE : Si l'utilisateur pose une question hors de ses modules autorisés, explique-lui son périmètre et redirige-le vers les bonnes pratiques de son propre rôle.`
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
        console.log(`[AI] Request #${requestId} START (active: ${activeRequests}) sessionId=${sessionId} userId=${userId}`);

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

            console.log(`[AI] Request #${requestId} sending to Ollama (stream=${isStreaming})...`);

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

                console.log(`[AI] Request #${requestId} Ollama responded, streaming data...`);

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
                                console.log(`[AI] Request #${requestId} DONE (active: ${activeRequests})`);
                            }
                        } catch (e) {
                            // Incomplete JSON chunk
                        }
                    }
                });

                response.data.on('error', (err: Error) => {
                    activeRequests--;
                    console.error(`[AI] Request #${requestId} STREAM ERROR:`, err.message);
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
                console.log(`[AI] Request #${requestId} DONE (active: ${activeRequests})`);
                return aiMsg;
            }
        } catch (error: any) {
            activeRequests--;
            console.error(`[AI] Request #${requestId} ERROR:`, error.message || error);
            throw new Error(error.message || 'Could not get response from AI');
        }
    }

    static async generateRisksFromSituation(situation: string, role: UserRole): Promise<any[]> {
        try {
            const isIndexed = await RAGEngine.checkIndexStatus();
            let contextText = '';

            if (isIndexed) {
                const contextChunks = await RAGEngine.searchContext(situation, role, 5);
                console.log(`[AI-RAG] Found ${contextChunks.length} fragments for role ${role}`);
                if (contextChunks.length > 0) {
                    contextText = `\nCONTEXTE ISSU DES NORMES INDEXÉES :\n${contextChunks.join('\n\n')}\n\n`;
                }
            }

            console.log(`[AI] Generating risks for situation: "${situation.substring(0, 50)}..." (Role: ${role})`);
            const metadata = await AIDataService.fetchSystemMetadata();

            const systemPrompt = `Tu es un expert en gestion des risques GRC. 
            À partir de la situation fournie par l'utilisateur${contextText ? ' et du contexte des normes ci-après' : ''}, génère une liste de 3 à 5 risques potentiels.${contextText ? contextText : ''}
            
            IMPORTANT : Tout le contenu doit être en FRANÇAIS.
            
            ${metadata}
            
            CONSIGNE : Pour chaque risque, choisis OBLIGATOIREMENT un département parmi ceux listés ci-dessus.
            Génère les champs suivants selon la nomenclature stricte :
            - probabilite: Choisir parmi ["Rare", "Possible", "Probable", "Permanent"]
            - impact: Choisir parmi ["Limité", "Moyen", "Significatif", "Critique"]
            - niveauMaitrise: Choisir parmi ["Faible", "Limité", "Moyen", "Elevé"]
            - frequenceTraitement: Choisir parmi ["Quotidien", "Hebdomadaire", "Bimensuel", "Mensuel", "Trimestriel", "Semestriel", "Annuel", "Aucun"]
            - planActionTraitement: Donne les étapes nécessaires pour traiter et atténuer ce risque.

            Pour chaque risque, fournis EXACTEMENT ces champs : titre, explication, domaine, macroProcessus, processus, probabilite, impact, niveauMaitrise, dmrExistant, planActionTraitement, departement, responsableSuggestion, delaiSuggestion (nombre), frequenceTraitement.
            Réponds UNIQUEMENT avec un tableau JSON valide.`;

            const response = await ollamaAxios.post(OLLAMA_CHAT_URL, {
                model: MODEL_NAME,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: situation }
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
            console.log(`[AI] Received response length: ${content.length} chars`);
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            let risks: any[] = [];

            if (jsonMatch) {
                risks = JSON.parse(jsonMatch[0]);
            } else {
                const parsed = JSON.parse(content);
                risks = Array.isArray(parsed) ? parsed : [parsed];
            }

            return risks.map(r => ({
                ...r,
                delaiSuggestion: r.delaiSuggestion ? parseInt(r.delaiSuggestion.toString()) : 30
            }));
        } catch (error: any) {
            console.error('AI Risk Generation Error:', error.message || error);
            return [];
        }
    }

    /**
     * GÉNÉRATION DE RISQUES INTELLIGENTE DEPUIS UN INCIDENT (AVEC HISTORIQUE)
     */
    static async generateRisksFromIncident(incident: Incident, pieceJointeTexte: string, role: UserRole): Promise<any[]> {
        try {
            console.log(`[AI] Generating risks for incident #${incident.id} (Role: ${role})`);
            
            // 1. Récupération des 5 incidents les plus récents (hors celui en cours)
            const recentIncidents = await Incident.findAll({
                where: incident.id ? { id: { [require('sequelize').Op.ne]: incident.id } } : undefined,
                order: [['dateSurvenance', 'DESC']],
                limit: 5
            });

            // Structuration du contexte historique
            let historiqueContext = '';
            if (recentIncidents.length > 0) {
                historiqueContext = `\n--- CONTEXTE HISTORIQUE DES INCIDENTS (5 derniers incidents pour identifier des schémas récurrents) ---\n`;
                recentIncidents.forEach((inc, index) => {
                    historiqueContext += `[Incident - ${inc.dateSurvenance.toLocaleDateString()}] Titre: ${inc.titre}\nDescription: ${inc.description}\n\n`;
                });
            }

            // Récupérations des métadonnées (Départements, etc.)
            const metadata = await AIDataService.fetchSystemMetadata();

            // Structuration de l'incident actuel
            let incidentActuelContext = `\n--- INCIDENT ACTUEL ---\nTitre: ${incident.titre}\nDescription: ${incident.description}\n`;
            if (pieceJointeTexte) {
                incidentActuelContext += `Extraits de la pièce jointe: ${this.limitText(pieceJointeTexte, 2000)}\n`;
            }

            const systemPrompt = `Tu es un expert en gestion des risques GRC. 
            À partir des informations de l'incident actuel et du contexte historique des incidents passés, génère une liste de 3 à 5 risques potentiels pertinents.
            
            IMPORTANT : Tout le contenu doit être en FRANÇAIS.
            
            RÈGLES STRICTES :
            - Identifie les risques potentiels directement liés ou induits par l'incident actuel.
            - Base-toi sur les incidents similaires du contexte historique pour affiner tes propositions.
            - Évite les duplications avec l'historique (ne propose pas exactement les mêmes risques si le contexte est différent).
            
            ${metadata}
            
            CONSIGNE : Pour chaque risque, choisis OBLIGATOIREMENT un département parmi ceux listés ci-dessus.
            Génère les champs suivants selon la nomenclature stricte :
            - probabilite: Choisir parmi ["Rare", "Possible", "Probable", "Permanent"]
            - impact: Choisir parmi ["Limité", "Moyen", "Significatif", "Critique"]
            - niveauMaitrise: Choisir parmi ["Faible", "Limité", "Moyen", "Elevé"]
            - frequenceTraitement: Choisir parmi ["Quotidien", "Hebdomadaire", "Bimensuel", "Mensuel", "Trimestriel", "Semestriel", "Annuel", "Aucun"]
            - planActionTraitement: Donne les étapes nécessaires pour traiter et atténuer ce risque.

            Pour chaque risque, fournis EXACTEMENT ces champs : titre, explication, domaine, macroProcessus, processus, probabilite, impact, niveauMaitrise, dmrExistant, planActionTraitement, departement, responsableSuggestion, delaiSuggestion (nombre), frequenceTraitement.
            Réponds UNIQUEMENT avec un tableau JSON valide.`;

            const fullPrompt = `${historiqueContext}${incidentActuelContext}`;

            const response = await ollamaAxios.post(OLLAMA_CHAT_URL, {
                model: MODEL_NAME,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: fullPrompt }
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
            console.log(`[AI] Received response length: ${content.length} chars`);
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            let risks: any[] = [];

            if (jsonMatch) {
                risks = JSON.parse(jsonMatch[0]);
            } else {
                const parsed = JSON.parse(content);
                risks = Array.isArray(parsed) ? parsed : [parsed];
            }

            return risks.map(r => ({
                ...r,
                delaiSuggestion: r.delaiSuggestion ? parseInt(r.delaiSuggestion.toString()) : 30
            }));
        } catch (error: any) {
            console.error('AI Risk Generation Error from Incident:', error.message || error);
            return [];
        }
    }

    /**
     * ÉVALUATION DES RISQUES PAR IA
     * Analyse la priorité, l'impact et les tendances pour une liste de risques.
     */
    static async evaluateRisks(risks: any[], role: UserRole = UserRole.AUDIT_SENIOR): Promise<any[]> {
        if (!risks || risks.length === 0) return [];

        try {
            const risksText = risks.map(r => `- [${r.id}] ${r.titre} (Niveau: ${r.niveauRisque}, Domaine: ${r.domaine})`).join('\n');
            const isIndexed = await RAGEngine.checkIndexStatus();
            let contextText = '';

            if (isIndexed) {
                const query = risks.map(r => r.titre).join(' ');
                const contextChunks = await RAGEngine.searchContext(query, role, 5);
                if (contextChunks.length > 0) {
                    contextText = `\nCONTEXTE ISSU DES NORMES INDEXÉES :\n${contextChunks.join('\n\n')}\n\n`;
                }
            }

            const systemPrompt = `Tu es un Auditeur Senior expert GRC. Analyse la liste de risques suivante et fournis une évaluation stratégique détaillée.${contextText ? ' Utilise les normes fournies en contexte pour affiner ton évaluation.' : ''}
            
            IMPORTANT : Tout le contenu doit être en FRANÇAIS.
            
            ${contextText || ''}
            Considère ces échelles strictes :
            - Impact : 1 (Limité), 4 (Moyen), 16 (Significatif), 64 (Critique)
            - Probabilité : 1 (Rare), 2 (Possible), 4 (Probable), 8 (Permanent)
            - DMR (Maîtrise) : 4 (Faible), 3 (Limité), 2 (Moyen), 1 (Elevé)

            Pour chaque risque, évalue : 
            1. priorite (score de 1 à 10 global pour l'audit)
            2. impact (le type textuel de l'impact, ex: "Critique")
            3. probabilite (ex: "Possible")
            4. tendance (ex: "En hausse", "Stable")
            5. suggestion (Suggestion d'action ou de contrôle d'audit)
            
            Réponds UNIQUEMENT avec un tableau JSON. Exemple : [ { "riskId": 1, "priorite": 8, "impact": "Critique", "probabilite": "Possible", "tendance": "Stable", "suggestion": "..." } ]`;

            const response = await ollamaAxios.post(OLLAMA_CHAT_URL, {
                model: MODEL_NAME,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Liste des risques à évaluer :\n${risksText}` }
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
            let evaluation: any[] = [];

            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                evaluation = JSON.parse(jsonMatch[0]);
            } else {
                // Tente de parser directement ou de transformer un objet unique en tableau
                const parsed = JSON.parse(content);
                evaluation = Array.isArray(parsed) ? parsed : [parsed];
            }

            // Normalisation des données pour Sequelize (Conversion string -> number pour priorite)
            return evaluation.map(item => ({
                ...item,
                priorite: item.priorite ? parseInt(item.priorite.toString()) : 0
            }));
        } catch (error: any) {
            console.error('AI Risk Evaluation Error:', error.message || error);
            // Retourne une liste vide au lieu de crasher le process parent
            return [];
        }
    }

    /**
     * GÉNÉRATION DU PLAN D'AUDIT ANNUEL PAR IA
     * Suggère des missions d'audit basées sur les risques identifiés.
     */
    static async generateAuditPlan(risks: any[], role: UserRole = UserRole.AUDIT_SENIOR): Promise<any[]> {
        if (!risks || risks.length === 0) return [];

        try {
            const risksText = risks.map(r => `- ${r.titre} (Niveau: ${r.niveauRisque}, Domaine: ${r.domaine})`).join('\n');
            const isIndexed = await RAGEngine.checkIndexStatus();
            let contextText = '';

            if (isIndexed) {
                const query = `Procédures d'audit pour : ${risks.map(r => r.domaine).join(', ')}`;
                const contextChunks = await RAGEngine.searchContext(query, role, 5);
                if (contextChunks.length > 0) {
                    contextText = `\nCONTEXTE ISSU DES NORMES INDEXÉES :\n${contextChunks.join('\n\n')}\n\n`;
                }
            }

            const systemPrompt = `Tu es un Auditeur Senior expert GRC. À partir des risques et des normes, génère un plan d'audit annuel.${contextText ? ' Appuie-toi sur le contexte des normes fourni.' : ''}
            
            IMPORTANT : Tout le contenu doit être en FRANÇAIS.
            
            ${contextText || ''}
            Réponds UNIQUEMENT avec un tableau JSON. Exemple : [ { "titre": "...", "objectifs": "...", "responsabilites": "...", "delaiSuggestion": 45, "riskId": 1 } ]`;

            const riskMapping = risks.map(r => `${r.id}: ${r.titre}`).join('\n');

            const response = await ollamaAxios.post(OLLAMA_CHAT_URL, {
                model: MODEL_NAME,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Génère des missions d'audit pour ces risques :\n${riskMapping}` }
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
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            let plan: any[] = [];

            if (jsonMatch) {
                plan = JSON.parse(jsonMatch[0]);
            } else {
                const parsed = JSON.parse(content);
                plan = Array.isArray(parsed) ? parsed : [parsed];
            }

            return plan.map(item => ({
                ...item,
                delaiSuggestion: item.delaiSuggestion ? parseInt(item.delaiSuggestion.toString()) : 30,
                riskId: item.riskId ? parseInt(item.riskId.toString()) : 0
            }));
        } catch (error: any) {
            console.error('AI Audit Plan Generation Error:', error.message || error);
            return [];
        }
    }
    /**
     * Nettoie le texte en supprimant les espaces multiples, les sauts de ligne excessifs
     * et les caractères non imprimables.
     */
    static cleanText(text: string): string {
        return text
            .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '') // Supprime les caractères non imprimables
            .replace(/\s+/g, ' ') // Remplace les espaces multiples/tabulations/sauts de ligne par un seul espace
            .trim();
    }

    /**
     * Limite la taille du texte pour ne pas dépasser le contexte de l'IA.
     */
    static limitText(text: string, maxChars: number = 4000): string {
        if (text.length <= maxChars) return text;
        return text.substring(0, maxChars) + '... [Texte tronqué]';
    }

    /**
     * Extrait le texte d'un fichier (PDF, Word, Image)
     */
    static async extractTextFromFile(file: Express.Multer.File): Promise<string> {
        const extension = file.originalname.split('.').pop()?.toLowerCase();
        let extractedText = '';

        if (extension === 'pdf') {
            extractedText = await new Promise((resolve, reject) => {
                let text = '';
                new PdfReader().parseBuffer(file.buffer, (err: any, item: any) => {
                    if (err) reject(err);
                    else if (!item) resolve(text);
                    else if (item.text) text += item.text + ' ';
                });
            });
        } else if (extension === 'docx') {
            const result = await mammoth.extractRawText({ buffer: file.buffer });
            extractedText = result.value;
        } else if (['jpg', 'jpeg', 'png'].includes(extension || '')) {
            const worker = await createWorker('fra');
            const { data: { text } } = await worker.recognize(file.buffer);
            await worker.terminate();
            extractedText = text;
        } else {
            throw new Error('Format de fichier non supporté pour l\'extraction de texte');
        }

        return this.limitText(this.cleanText(extractedText));
    }
}
