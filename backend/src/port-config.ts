/**
 * @file port-config.ts
 * @description Configuration centralisée des ports de l'application.
 *
 * Todos les ports de service (excepté Ollama et SMTP qui gardent leurs ports par défaut) sont dérivés d'un BASE_PORT unique (défaut : 6000).
 * Schéma consécutif :
 *   Backend  = BASE_PORT + 0  → 6000
 *   Frontend = BASE_PORT + 1  → 6001
 *   Ollama   = 11434 (par défaut)
 *
 * Chaque port peut être surchargé individuellement via sa propre variable d'env.
 */

import dotenv from 'dotenv';
dotenv.config();

const BASE_PORT = parseInt(process.env.BASE_PORT || '6000', 10);

export const PortConfig = {
    /** Port de base à partir duquel les ports consécutifs sont calculés. */
    BASE_PORT,

    /** Port du serveur backend Express. */
    BACKEND_PORT: parseInt(process.env.BACKEND_PORT || String(BASE_PORT + 0), 10),

    /** Port du dev-server frontend Angular. */
    FRONTEND_PORT: parseInt(process.env.FRONTEND_PORT || String(BASE_PORT + 1), 10),

    /** Port du serveur Ollama (LLM). */
    OLLAMA_PORT: parseInt(process.env.OLLAMA_PORT || '11434', 10),

    /** Port SMTP (port standard, non consécutif). */
    SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),

    /** URL de l'API de chat Ollama. */
    get OLLAMA_CHAT_URL(): string {
        if (process.env.OLLAMA_CHAT_URL) return process.env.OLLAMA_CHAT_URL;
        const host = process.env.OLLAMA_HOST || process.env.OLLAMA_URL || `http://127.0.0.1:${this.OLLAMA_PORT}`;
        return `${host.replace(/\/+$/, '')}/api/chat`;
    },

    /** URL de l'API d'embeddings Ollama. */
    get OLLAMA_EMBED_URL(): string {
        if (process.env.OLLAMA_EMBED_URL) return process.env.OLLAMA_EMBED_URL;
        const host = process.env.OLLAMA_HOST || process.env.OLLAMA_URL || `http://127.0.0.1:${this.OLLAMA_PORT}`;
        return `${host.replace(/\/+$/, '')}/api/embeddings`;
    },

    /** URL du frontend (pour CORS, emails, etc.). */
    get FRONTEND_URL(): string {
        if (process.env.FRONTEND_URL) return process.env.FRONTEND_URL;
        if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL;
        return process.env.NODE_ENV === 'production' ? '' : `http://localhost:${this.FRONTEND_PORT}`;
    },

    /** Affiche un résumé de la configuration des ports dans la console. */
    logSummary(): Record<string, number | string> {
        return {
            BASE_PORT: this.BASE_PORT,
            BACKEND_PORT: this.BACKEND_PORT,
            FRONTEND_PORT: this.FRONTEND_PORT,
            OLLAMA_PORT: this.OLLAMA_PORT,
            SMTP_PORT: this.SMTP_PORT,
            OLLAMA_CHAT_URL: this.OLLAMA_CHAT_URL,
            OLLAMA_EMBED_URL: this.OLLAMA_EMBED_URL,
            FRONTEND_URL: this.FRONTEND_URL,
        };
    },
};
