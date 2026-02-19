import axios from 'axios';
import { RAGEngine } from './rag.engine';

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
const MODEL_NAME = process.env.OLLAMA_MODEL || 'llama3';

export class AIService {
    static async generateResponse(prompt: string): Promise<string> {
        try {
            // Retrieve context from RAG
            let augmentedPrompt = prompt;
            const isIndexed = await RAGEngine.checkIndexStatus();

            if (isIndexed) {
                const contextChunks = await RAGEngine.searchContext(prompt);
                if (contextChunks.length > 0) {
                    const contextText = contextChunks.join('\n\n');
                    augmentedPrompt = `
Utilise les informations suivantes extraites des normes (ISO, COBIT) pour répondre à la question de l'utilisateur. 
Si la réponse ne se trouve pas dans le contexte, réponds avec tes connaissances générales mais précise-le.

CONTEXTE :
${contextText}

QUESTION :
${prompt}
`;
                }
            }

            const response = await axios.post(OLLAMA_URL, {
                model: MODEL_NAME,
                prompt: augmentedPrompt,
                stream: false,
            });

            return response.data.response;
        } catch (error: any) {
            if (error.response && error.response.status === 404 && error.response.data?.error?.includes('not found')) {
                console.error('Model not found in Ollama:', MODEL_NAME);
                throw new Error(`Modèle '${MODEL_NAME}' introuvable. Veuillez exécuter 'ollama pull ${MODEL_NAME}' sur votre machine.`);
            }
            console.error('Error calling Ollama:', error.message || error);
            throw new Error('Could not get response from AI');
        }
    }
}
