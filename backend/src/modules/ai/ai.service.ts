import axios from 'axios';
import { RAGEngine } from './rag.engine';
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

    private static getSession(sessionId: string, role: UserRole): UserSession {
        if (!this.sessions.has(sessionId)) {
            let roleContext = '';

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
            } else {
                roleContext = "TU AGIS POUR : Profil 'ADMINISTRATEUR'. Tu as accès à tous les modules et à la configuration du système.";
            }

            this.sessions.set(sessionId, {
                messages: [
                    {
                        role: 'system',
                        content: `Tu es l'Assistant Expert de la plateforme sGRC. Réponds en français. 
                        
                        ${PLATFORM_CONTEXT}
                        
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

    static async generateResponse(prompt: string, role: UserRole, sessionId: string, res?: Response): Promise<string | void> {
        try {
            const session = this.getSession(sessionId, role);
            const isIndexed = await RAGEngine.checkIndexStatus();
            let contextText = '';

            if (isIndexed) {
                const contextChunks = await RAGEngine.searchContext(prompt, role);
                if (contextChunks.length > 0) {
                    contextText = `CONTEXTE EXTRAIT DES NORMES :\n${contextChunks.join('\n\n')}\n\n`;
                }
            }

            // Prepare history for chat
            const fullPrompt = contextText ? `${contextText}QUESTION : ${prompt}` : prompt;
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

            const systemPrompt = `Tu es un expert en gestion des risques GRC. 
            À partir de la situation fournie par l'utilisateur${contextText ? ' et du contexte des normes ci-après' : ''}, génère une liste de 3 à 5 risques potentiels.${contextText ? contextText : ''}
            
            IMPORTANT : Tout le contenu doit être en FRANÇAIS.
            
            Départements valides (choisis OBLIGATOIREMENT l'un d'eux pour chaque risque) :
            - Audit financier & comptable
            - Audit des systèmes d’information
            - Audit qualité
            - Audit de conformité & réglementaire
            - Audit opérationnel
            - Audit des risques
            - Audit technique spécialisé
            - Audit public / inspection
            - Audit interne
            - Audit externe
            - Audit tierce partie

            Pour chaque risque, fournis :
            1. titre : Un titre court et clair.
            2. explication : Une description détaillée du risque.
            3. domaine : Le domaine concerné (ex: Cybersécurité, Opérationnel, Juridique, RH, etc.).
            4. niveauRisque : Le niveau de risque parmi : 'Faible', 'Moyen', 'Élevé', 'Critique'.
            5. departement : Le nom EXACT du département (parmi la liste ci-dessus).
            6. responsableSuggestion : Le titre ou rôle de la personne qui devrait être responsable (ex: 'DSI', 'Responsable Qualité').
            7. delaiSuggestion : Un délai réaliste en NOMBRE DE JOURS (ex: 5, 15, 29, 100, etc.) selon la criticité.

            Réponds UNIQUEMENT avec un tableau JSON valide. Exemple de format :
            [
              {
                "titre": "...",
                "explication": "...",
                "domaine": "...",
                "niveauRisque": "...",
                "departement": "...",
                "responsableSuggestion": "...",
                "delaiSuggestion": 15
              }
            ]`;

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
            // Attempt to extract JSON if there's surrounding text
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('Format de réponse IA invalide');
        } catch (error: any) {
            console.error('AI Risk Generation Error:', error.message || error);
            throw new Error('Impossible de générer les risques par IA');
        }
    }
}
