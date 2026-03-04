import axios from 'axios';
import { RAGEngine } from './rag.engine';
import { AIDataService } from './ai.data.service';
import { UserRole } from '../users/user.roles';
import { Response } from 'express';

const OLLAMA_CHAT_URL = process.env.OLLAMA_CHAT_URL || 'http://localhost:11434/api/chat';
const MODEL_NAME = process.env.OLLAMA_MODEL || 'llama3';

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

    private static async getSession(sessionId: string, role: UserRole): Promise<UserSession> {
        if (!this.sessions.has(sessionId)) {
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

            this.sessions.set(sessionId, {
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
        const session = this.sessions.get(sessionId)!;
        session.lastAccess = Date.now();
        return session;
    }

    static async generateResponse(prompt: string, role: UserRole, sessionId: string, userId: number, res?: Response): Promise<string | void> {
        try {
            const session = await this.getSession(sessionId, role);

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

            const response = await axios.post(OLLAMA_CHAT_URL, {
                model: MODEL_NAME,
                messages: session.messages,
                stream: isStreaming,
            }, {
                responseType: isStreaming ? 'stream' : 'json'
            });

            if (isStreaming) {
                res!.setHeader('Content-Type', 'text/event-stream');
                res!.setHeader('Cache-Control', 'no-cache');
                res!.setHeader('Connection', 'keep-alive');

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
                            }
                        } catch (e) {
                            // Incomplete JSON chunk, skip or handle buffering
                        }
                    }
                });
                return;
            } else {
                const aiMsg = response.data.message.content;
                session.messages.push({ role: 'assistant', content: aiMsg });
                return aiMsg;
            }
        } catch (error: any) {
            console.error('AI Service Error:', error.message || error);
            throw new Error(error.message || 'Could not get response from AI');
        }
    }

    static async generateRisksFromSituation(situation: string, role: UserRole): Promise<any[]> {
        try {
            const isIndexed = await RAGEngine.checkIndexStatus();
            let contextText = '';

            if (isIndexed) {
                const contextChunks = await RAGEngine.searchContext(situation, role, 5);
                if (contextChunks.length > 0) {
                    contextText = `\nCONTEXTE ISSU DES NORMES INDEXÉES :\n${contextChunks.join('\n\n')}\n\n`;
                }
            }

            const metadata = await AIDataService.fetchSystemMetadata();

            const systemPrompt = `Tu es un expert en gestion des risques GRC. 
            À partir de la situation fournie par l'utilisateur${contextText ? ' et du contexte des normes ci-après' : ''}, génère une liste de 3 à 5 risques potentiels.${contextText ? contextText : ''}
            
            IMPORTANT : Tout le contenu doit être en FRANÇAIS.
            
            ${metadata}
            
            CONSIGNE : Pour chaque risque, choisis OBLIGATOIREMENT un département parmi ceux listés ci-dessus.

            Pour chaque risque, fournis : titre, explication, domaine, niveauRisque, departement, responsableSuggestion, delaiSuggestion (nombre), frequenceTraitement.
            Réponds UNIQUEMENT avec un tableau JSON.`;

            const response = await axios.post(OLLAMA_CHAT_URL, {
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
                    num_ctx: 2048
                }
            });

            const content = response.data.message.content;
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

            const systemPrompt = `Tu es un Auditeur Senior expert GRC. Analyse la liste de risques suivante et fournis une évaluation stratégique.${contextText ? ' Utilise les normes fournies en contexte pour affiner ton évaluation.' : ''}
            
            IMPORTANT : Tout le contenu doit être en FRANÇAIS.
            
            ${contextText || ''}
            Pour chaque risque, évalue : priorité (score de 1 à 10), impact potentiel, tendance, et suggestion d'audit.
            Réponds UNIQUEMENT avec un tableau JSON. Exemple : [ { "riskId": 1, "priorite": 8, "impact": "...", "tendance": "...", "suggestion": "..." } ]`;

            const response = await axios.post(OLLAMA_CHAT_URL, {
                model: MODEL_NAME,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Liste des risques à évaluer :\n${risksText}` }
                ],
                stream: false,
                format: 'json'
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

            const response = await axios.post(OLLAMA_CHAT_URL, {
                model: MODEL_NAME,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Génère des missions d'audit pour ces risques :\n${riskMapping}` }
                ],
                stream: false,
                format: 'json'
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
}
