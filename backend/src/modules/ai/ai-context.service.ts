import { AIContext, AIContextType, AI_CONTEXT_TYPES } from './ai-context.model';
import { DEFAULT_AI_CONTEXTS, DefaultAIContext, getDefaultContextsByName } from './ai-context.defaults';
import { getRequiredLookupId } from '../../database/lookups/lookup-models';

export interface AIContextGroup {
    name: string;
    segments: Partial<Record<AIContextType, string>>;
}

export interface AIContextSyncResult {
    createdCount: number;
    updatedCount: number;
    touchedNames: string[];
}

interface CachedContextGroup {
    expiresAt: number;
    value: AIContextGroup;
}

export class AIContextValidationError extends Error { }

export class AIContextService {
    private static readonly cache = new Map<string, CachedContextGroup>();
    private static readonly cacheTtlMs = Number(process.env.AI_CONTEXT_CACHE_TTL_MS || 5 * 60 * 1000);

    static async getContextByName(name: string): Promise<AIContextGroup> {
        const normalizedName = this.normalizeName(name);
        const cached = this.cache.get(normalizedName);
        const now = Date.now();

        if (cached && cached.expiresAt > now) {
            return cached.value;
        }

        let contexts = await AIContext.findAll({
            where: { name: normalizedName },
            order: [['typeId', 'ASC']],
        });

        const missingDefaults = this.getMissingDefaultContexts(normalizedName, contexts);
        if (missingDefaults.length > 0) {
            for (const context of missingDefaults) {
                await AIContext.findOrCreate({
                    where: {
                        name: context.name,
                        typeId: getRequiredLookupId('aiContext.type', context.type),
                    },
                    defaults: {
                        content: context.content,
                    },
                });
            }

            contexts = await AIContext.findAll({
                where: { name: normalizedName },
                order: [['typeId', 'ASC']],
            });
        }

        const grouped: AIContextGroup = {
            name: normalizedName,
            segments: contexts.reduce((segments, context) => {
                segments[context.type] = context.content;
                return segments;
            }, {} as Partial<Record<AIContextType, string>>),
        };

        this.cache.set(normalizedName, {
            value: grouped,
            expiresAt: now + this.cacheTtlMs,
        });

        return grouped;
    }

    static async getAllContexts(): Promise<AIContext[]> {
        return AIContext.findAll({
            order: [['name', 'ASC'], ['typeId', 'ASC']],
        });
    }

    static async ensureDefaultContexts(): Promise<AIContextSyncResult> {
        let createdCount = 0;
        let updatedCount = 0;
        const touchedNames = new Set<string>();

        for (const context of DEFAULT_AI_CONTEXTS) {
            const [record, created] = await AIContext.findOrCreate({
                where: {
                    name: context.name,
                    typeId: getRequiredLookupId('aiContext.type', context.type),
                },
                defaults: {
                    content: context.content,
                },
            });

            if (created) {
                createdCount += 1;
                touchedNames.add(context.name);
                continue;
            }

            if (this.normalizeStoredContent(record.content) !== this.normalizeStoredContent(context.content)) {
                await record.update({ content: context.content });
                updatedCount += 1;
                touchedNames.add(context.name);
            }
        }

        if (touchedNames.size > 0) {
            for (const name of touchedNames) {
                this.cache.delete(name);
            }
        }

        return {
            createdCount,
            updatedCount,
            touchedNames: Array.from(touchedNames).sort(),
        };
    }

    static async updateContext(name: string, type: string, content: string): Promise<AIContext> {
        const normalizedName = this.normalizeName(name);
        const normalizedType = this.normalizeType(type);
        const normalizedContent = this.normalizeContent(content);

        const existing = await AIContext.findOne({
            where: {
                name: normalizedName,
                typeId: getRequiredLookupId('aiContext.type', normalizedType),
            },
        });

        const context = existing
            ? await existing.update({ content: normalizedContent })
            : await AIContext.create({
                name: normalizedName,
                typeId: getRequiredLookupId('aiContext.type', normalizedType),
                content: normalizedContent,
            });

        this.cache.delete(normalizedName);
        return context;
    }

    private static getMissingDefaultContexts(name: string, contexts: AIContext[]): DefaultAIContext[] {
        const defaultContexts = getDefaultContextsByName(name);
        if (defaultContexts.length === 0) {
            return [];
        }

        const existingTypes = new Set(contexts.map((context) => context.type));
        return defaultContexts.filter((context) => !existingTypes.has(context.type));
    }

    private static normalizeName(name: string): string {
        if (typeof name !== 'string') {
            throw new AIContextValidationError('Le champ name doit etre une chaine de caracteres.');
        }

        const normalized = name.trim();
        if (!normalized) {
            throw new AIContextValidationError('Le champ name est obligatoire.');
        }

        if (normalized.length > 100) {
            throw new AIContextValidationError('Le champ name ne doit pas depasser 100 caracteres.');
        }

        return normalized;
    }

    private static normalizeType(type: string): AIContextType {
        if (typeof type !== 'string') {
            throw new AIContextValidationError('Le champ type doit etre une chaine de caracteres.');
        }

        const normalized = type.trim() as AIContextType;
        if (!AI_CONTEXT_TYPES.includes(normalized)) {
            throw new AIContextValidationError('Le champ type est invalide. Valeurs autorisees: system, business, instruction.');
        }

        return normalized;
    }

    private static normalizeContent(content: string): string {
        if (typeof content !== 'string') {
            throw new AIContextValidationError('Le champ content doit etre une chaine de caracteres.');
        }

        const normalized = content.trim();
        if (!normalized) {
            throw new AIContextValidationError('Le champ content est obligatoire.');
        }

        return normalized;
    }

    private static normalizeStoredContent(content: string): string {
        return typeof content === 'string' ? content.trim().replace(/\r\n/g, '\n') : '';
    }
}
