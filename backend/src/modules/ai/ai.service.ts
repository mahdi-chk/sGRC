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
            let roleInstruction = '';
            if (role === UserRole.RISK_MANAGER || role === UserRole.RISK_AGENT) {
                roleInstruction = "Tu agis pour un profil 'Gestion des Risques'. Tu dois répondre UNIQUEMENT aux questions concernant les risques, la norme ISO 27005 et le traitement des risques. Si on t'interroge sur l'audit interne ou d'autres normes (ISO 27001/27002, COBIT), refuse poliment car cela ne relève pas de tes attributions.";
            } else if (role === UserRole.AUDIT_SENIOR || role === UserRole.AUDITEUR) {
                roleInstruction = "Tu agis pour un profil 'Audit'. Tu dois répondre UNIQUEMENT aux questions concernant l'audit interne, les contrôles et les normes ISO 27001, 27002 ou COBIT. Si on t'interroge sur la gestion opérationnelle des risques ou l'ISO 27005, refuse poliment car cela ne relève pas de tes attributions.";
            } else {
                roleInstruction = "Tu es un administrateur avec un accès complet à la base de connaissances (Risques et Audit).";
            }

            this.sessions.set(sessionId, {
                messages: [
                    {
                        role: 'system',
                        content: `Tu es un assistant expert en GRC (Gouvernance, Risque et Conformité). Réponds toujours de manière professionnelle, précise et en français par défaut. ${roleInstruction}`
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

    static async generateRisksFromSituation(situation: string): Promise<any[]> {
        try {
            const systemPrompt = `Tu es un expert en gestion des risques GRC. 
            À partir de la situation fournie par l'utilisateur, génère une liste de 3 à 5 risques potentiels.
            
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
