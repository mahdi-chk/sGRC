import { AIContextService } from './ai-context.service';
import { AIContextType } from './ai-context.model';
import { appLogger } from '../../utils/app-logger';

interface BuildPromptOptions {
    name: string;
    businessPayload?: Record<string, unknown> | string;
    userInput?: string;
}

const CONTEXT_ORDER: AIContextType[] = ['system', 'business', 'instruction'];

export class AIPromptBuilder {
    static async buildPrompt(options: BuildPromptOptions): Promise<string> {
        const context = await AIContextService.getContextByName(options.name);
        const sections: string[] = [];
        const missingSegments: AIContextType[] = [];

        for (const segmentType of CONTEXT_ORDER) {
            const content = context.segments[segmentType];
            if (!content) {
                missingSegments.push(segmentType);
                continue;
            }

            sections.push(content.trim());
        }

        if (missingSegments.length > 0) {
            appLogger.warn('AIContext', 'Prompt context incomplete', {
                name: options.name,
                missingSegments,
            });
        }

        const payloadText = this.renderPayload(options.businessPayload);
        if (payloadText) {
            sections.push(payloadText);
        }

        if (typeof options.userInput === 'string' && options.userInput.trim()) {
            sections.push(`ENTREE UTILISATEUR :\n${options.userInput.trim()}`);
        }

        return sections.filter(Boolean).join('\n\n').trim();
    }

    private static renderPayload(payload?: Record<string, unknown> | string): string {
        if (!payload) {
            return '';
        }

        if (typeof payload === 'string') {
            return payload.trim();
        }

        const sections = Object.entries(payload)
            .map(([key, value]) => {
                const renderedValue = this.renderValue(value);
                if (!renderedValue) {
                    return '';
                }

                return `${this.formatLabel(key)} :\n${renderedValue}`;
            })
            .filter(Boolean);

        return sections.join('\n\n');
    }

    private static renderValue(value: unknown): string {
        if (value === null || value === undefined) {
            return '';
        }

        if (typeof value === 'string') {
            return value.trim();
        }

        if (typeof value === 'number' || typeof value === 'boolean') {
            return String(value);
        }

        if (Array.isArray(value)) {
            const renderedItems = value
                .map((item) => this.renderValue(item))
                .filter(Boolean);

            return renderedItems.join('\n');
        }

        try {
            return JSON.stringify(value, null, 2);
        } catch (_error) {
            return String(value);
        }
    }

    private static formatLabel(key: string): string {
        return key
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
            .replace(/[_-]+/g, ' ')
            .trim()
            .toUpperCase();
    }
}
