import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { SystemSetting } from '../settings/setting.model';

const DEFAULT_NORMES_PATH = 'G:\\T\u00E9l\u00E9chargement\\sGRC\\normes';
const OLLAMA_EMBED_URL = process.env.OLLAMA_EMBED_URL || 'http://localhost:11434/api/embeddings';
const EMBED_MODEL = 'nomic-embed-text';
const STORAGE_DIR = path.join(__dirname, '../../storage');
const DB_FILE = path.join(STORAGE_DIR, 'vector_db.json');

interface VectorEntry {
    text: string;
    embedding: number[];
    metadata: {
        source: string;
        path: string;
    };
}

export class RAGEngine {
    private static db: VectorEntry[] = [];
    private static isLoaded = false;

    private static async loadDB() {
        if (this.isLoaded) return;

        if (fs.existsSync(DB_FILE)) {
            try {
                const data = fs.readFileSync(DB_FILE, 'utf8');
                this.db = JSON.parse(data);
                console.log(`Loaded ${this.db.length} entries from vector DB.`);
            } catch (err) {
                console.error('Error loading vector DB:', err);
                this.db = [];
            }
        }
        this.isLoaded = true;
    }

    private static async saveDB() {
        if (!fs.existsSync(STORAGE_DIR)) {
            fs.mkdirSync(STORAGE_DIR, { recursive: true });
        }
        fs.writeFileSync(DB_FILE, JSON.stringify(this.db), 'utf8');
    }

    static async checkIndexStatus(): Promise<boolean> {
        await this.loadDB();
        return this.db.length > 0;
    }

    static async getNormesPath(): Promise<string> {
        console.log('Fetching DOCS_PATH from database...');
        const setting = await SystemSetting.findOne({ where: { key: 'DOCS_PATH' } });
        const path = setting ? setting.value : DEFAULT_NORMES_PATH;
        console.log('DOCS_PATH used:', path);
        return path;
    }

    static async indexDocuments(): Promise<{ success: boolean; count: number }> {
        this.db = []; // Reset DB for fresh indexing
        let totalChunks = 0;

        const docsPath = await this.getNormesPath();
        const files = this.getAllPdfFiles(docsPath);
        console.log(`Found ${files.length} PDF files to index at ${docsPath}.`);

        for (const file of files) {
            try {
                const text = await this.parsePdf(file);
                const chunks = this.splitText(text, 1000, 200);

                for (const chunk of chunks) {
                    if (!chunk.trim()) continue;
                    const embedding = await this.getEmbedding(chunk);
                    this.db.push({
                        text: chunk,
                        embedding: embedding,
                        metadata: {
                            source: path.basename(file),
                            path: file
                        }
                    });
                    totalChunks++;
                }
                console.log(`Indexed ${path.basename(file)}: ${chunks.length} chunks.`);
            } catch (err) {
                console.error(`Error indexing ${file}:`, err);
            }
        }

        await this.saveDB();
        this.isLoaded = true;
        return { success: true, count: totalChunks };
    }

    private static async parsePdf(filePath: string): Promise<string> {
        const { PdfReader } = require('pdfreader');
        return new Promise((resolve, reject) => {
            let text = '';
            try {
                new PdfReader().parseFileItems(filePath, (err: any, item: any) => {
                    if (err) {
                        reject(err);
                    } else if (!item) {
                        resolve(text);
                    } else if (item.text) {
                        text += item.text + ' ';
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    static async searchContext(query: string, k: number = 3): Promise<string[]> {
        await this.loadDB();
        if (this.db.length === 0) return [];

        const queryEmbedding = await this.getEmbedding(query);

        // Calculate cosine similarity for all entries
        const scoredEntries = this.db.map(entry => ({
            text: entry.text,
            score: this.cosineSimilarity(queryEmbedding, entry.embedding)
        }));

        // Sort by score descending and take top k
        return scoredEntries
            .sort((a, b) => b.score - a.score)
            .slice(0, k)
            .map(e => e.text);
    }

    private static getAllPdfFiles(dirPath: string, fileList: string[] = []): string[] {
        if (!fs.existsSync(dirPath)) return fileList;

        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                this.getAllPdfFiles(filePath, fileList);
            } else if (path.extname(file).toLowerCase() === '.pdf') {
                fileList.push(filePath);
            }
        });
        return fileList;
    }

    private static splitText(text: string, chunkSize: number, overlap: number): string[] {
        const chunks: string[] = [];
        let start = 0;
        // Basic normalization
        const cleanedText = text.replace(/\s+/g, ' ');

        while (start < cleanedText.length) {
            let end = start + chunkSize;
            chunks.push(cleanedText.substring(start, end));
            start += chunkSize - overlap;
        }
        return chunks;
    }

    private static async getEmbedding(text: string): Promise<number[]> {
        try {
            const response = await axios.post(OLLAMA_EMBED_URL, {
                model: EMBED_MODEL,
                prompt: text
            });
            return response.data.embedding;
        } catch (error: any) {
            console.error('Error getting embedding from Ollama:', error.message);
            throw new Error(`Failed to get embedding for model ${EMBED_MODEL}. Make sure it is pulled (ollama pull ${EMBED_MODEL}).`);
        }
    }

    private static cosineSimilarity(vecA: number[], vecB: number[]): number {
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}
