import axios from 'axios';

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
const MODEL_NAME = process.env.OLLAMA_MODEL || 'llama3';

export class AIService {
    static async generateResponse(prompt: string): Promise<string> {
        try {
            const response = await axios.post(OLLAMA_URL, {
                model: MODEL_NAME,
                prompt: prompt,
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
