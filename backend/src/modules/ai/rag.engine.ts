import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { SystemSetting } from '../settings/setting.model';
import { UserRole } from '../users/user.roles';

const DEFAULT_NORMES_PATH = 'G:\\Téléchargement\\sGRC\\normes';
const OLLAMA_EMBED_URL = process.env.OLLAMA_EMBED_URL || 'http://localhost:11434/api/embeddings';
const EMBED_MODEL = 'nomic-embed-text';
const STORAGE_DIR = path.join(__dirname, '../../storage');
const DB_FILE = path.join(STORAGE_DIR, 'vector_db.json');

interface VectorEntry {
    text: string;
    embedding: number[];
    topic: 'risk' | 'audit' | 'general';
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
        const setting = await SystemSetting.findOne({ where: { key: 'DOCS_PATH' } });
        return setting ? setting.value : DEFAULT_NORMES_PATH;
    }

    static async indexDocuments(): Promise<{ success: boolean; count: number }> {
        this.db = [];
        const docsPath = await this.getNormesPath();
        const files = this.getAllPdfFiles(docsPath);
        console.log(`Found ${files.length} PDF files to index.`);

        // Process files in batches to avoid memory/process overload
        const BATCH_SIZE = 2;
        for (let i = 0; i < files.length; i += BATCH_SIZE) {
            const batch = files.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(file => this.indexFile(file)));
        }

        await this.saveDB();
        this.isLoaded = true;
        console.log(`Indexing complete. Total chunks: ${this.db.length}`);
        return { success: true, count: this.db.length };
    }

    private static async indexFile(file: string) {
        try {
            console.log(`Indexing ${path.basename(file)}...`);
            const text = await this.parsePdf(file);
            const chunks = this.splitText(text, 1000, 200);

            // Refined topic classification
            let topic: 'risk' | 'audit' | 'general' = 'general';
            const fileName = path.basename(file).toLowerCase();
            const lowerPath = file.toLowerCase();

            // Risk specific (ISO 27005 is for risk management)
            if (fileName.includes('27005') || lowerPath.includes('risk') || lowerPath.includes('risque')) {
                topic = 'risk';
            }
            // Audit specific (ISO 27001, 27002, COBIT, Audit procedures)
            else if (fileName.includes('27001') || fileName.includes('27002') || fileName.includes('27000') ||
                fileName.includes('27032') || lowerPath.includes('audit') || lowerPath.includes('cobit')) {
                topic = 'audit';
            }

            // Process chunks in parallel for this file
            const embeddings = await Promise.all(
                chunks.filter(c => c.trim()).map(chunk => this.getEmbedding(chunk))
            );

            chunks.filter(c => c.trim()).forEach((chunk, idx) => {
                this.db.push({
                    text: chunk,
                    embedding: embeddings[idx],
                    topic: topic,
                    metadata: {
                        source: path.basename(file),
                        path: file
                    }
                });
            });
        } catch (err: any) {
            console.error(`Error indexing ${file}:`, err.message || err);
        }
    }

    private static async parsePdf(filePath: string): Promise<string> {
        const { PdfReader } = require('pdfreader');
        return new Promise((resolve, reject) => {
            let text = '';
            try {
                new PdfReader().parseFileItems(filePath, (err: any, item: any) => {
                    if (err) reject(err);
                    else if (!item) resolve(text);
                    else if (item.text) text += item.text + ' ';
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    static async searchContext(query: string, role: UserRole, k: number = 3): Promise<string[]> {
        await this.loadDB();
        if (this.db.length === 0) return [];

        const queryEmbedding = await this.getEmbedding(query);

        // Filter by topic based on role
        let allowedTopics: string[] = ['general'];
        if (role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN_SI || role === UserRole.TOP_MANAGEMENT) {
            allowedTopics = ['risk', 'audit', 'general'];
        } else if (role === UserRole.RISK_MANAGER || role === UserRole.RISK_AGENT) {
            allowedTopics = ['risk', 'general'];
        } else if (role === UserRole.AUDIT_SENIOR || role === UserRole.AUDITEUR) {
            allowedTopics = ['audit', 'general'];
        }

        const filteredDb = this.db.filter(entry => allowedTopics.includes(entry.topic));

        const scoredEntries = filteredDb.map(entry => ({
            text: entry.text,
            score: this.cosineSimilarity(queryEmbedding, entry.embedding)
        }));

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
        const cleanedText = text.replace(/\s+/g, ' ');
        const chunks: string[] = [];
        let start = 0;
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
        let dotProduct = 0, normA = 0, normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}
