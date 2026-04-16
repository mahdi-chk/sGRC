import { ComplianceMappingCoverageLevel } from './compliance-mapping.model';

export interface ImportedRequirementDraft {
    code: string;
    title: string;
    description: string | null;
    chapter: string | null;
    orderIndex: number;
    applicability: string;
    status: string;
    weight: number;
}

type RequirementAccumulator = ImportedRequirementDraft & {
    descriptionLines: string[];
};

const cleanInlineText = (value: string): string =>
    value
        .replace(/\u00a0/g, ' ')
        .replace(/[ \t]+/g, ' ')
        .replace(/\s*[:;,.]+\s*$/g, '')
        .trim();

const normalizeLine = (value: string): string =>
    cleanInlineText(value)
        .replace(/[•■▪◆►▶]/g, ' ')
        .replace(/^[\-\u2013\u2014*]+\s*/, '')
        .replace(/\s+/g, ' ')
        .trim();

const toOrderIndex = (code: string, fallbackIndex: number): number => {
    const numericParts = (code.match(/\d+/g) || []).map((part) => Number(part));
    if (!numericParts.length) {
        return fallbackIndex;
    }

    return numericParts
        .slice(0, 4)
        .reduce((sum, value, index) => sum + value / Math.pow(100, index), 0);
};

const isNoiseLine = (line: string): boolean => {
    if (!line) {
        return true;
    }

    if (line.length < 3) {
        return true;
    }

    return /^(page\s+\d+|\d+\s*\/\s*\d+|table des matieres|sommaire)$/i.test(line);
};

const isChapterHeading = (line: string): boolean =>
    /^(chapitre|chapter|section|annexe|appendice|titre|domaine|theme|axe)\b/i.test(line)
    || /^\d+\.\s+[A-ZÀ-Ý][A-ZÀ-Ý\s,'()/-]{8,}$/.test(line);

const extractRequirementHeader = (line: string): { code: string; title: string } | null => {
    const articleMatch = line.match(/^(Article\s+\d+[A-Za-z0-9.\-]*)\s*[:.)-]?\s*(.+)?$/i);
    if (articleMatch) {
        return {
            code: cleanInlineText(articleMatch[1]),
            title: cleanInlineText(articleMatch[2] || articleMatch[1]),
        };
    }

    const structuredCodeMatch = line.match(/^((?:[A-Z]\.)?\d+(?:\.\d+){1,5}[A-Za-z0-9.\-]*)\s*[:)\]-]?\s+(.+)$/);
    if (structuredCodeMatch) {
        return {
            code: cleanInlineText(structuredCodeMatch[1]),
            title: cleanInlineText(structuredCodeMatch[2]),
        };
    }

    const numberedTitleMatch = line.match(/^(\d+)\.\s+(.{6,})$/);
    if (numberedTitleMatch) {
        return {
            code: cleanInlineText(numberedTitleMatch[1]),
            title: cleanInlineText(numberedTitleMatch[2]),
        };
    }

    return null;
};

const extractRequirementMatchesFromFlatText = (text: string): Array<{ code: string; title: string; body: string }> => {
    const normalized = String(text || '')
        .replace(/\u00a0/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    if (!normalized) {
        return [];
    }

    const headerRegex = /(Article\s+\d+[A-Za-z0-9.\-]*|(?:[A-Z]\.)?\d+(?:\.\d+){1,5}[A-Za-z0-9.\-]*|\d+\.)\s*(?:[:)\]-]?\s*)/gi;
    const matches = Array.from(normalized.matchAll(headerRegex));
    const items: Array<{ code: string; title: string; body: string }> = [];

    for (let index = 0; index < matches.length; index += 1) {
        const match = matches[index];
        const code = cleanInlineText(match[1] || '');
        const start = match.index ?? 0;
        const nextStart = index + 1 < matches.length ? (matches[index + 1].index ?? normalized.length) : normalized.length;
        const segment = normalized.slice(start + match[0].length, nextStart).trim();

        if (!code || segment.length < 4) {
            continue;
        }

        const titleMatch = segment.match(/^(.{4,140}?)(?=(?:\s+[A-ZÀ-Ý][a-zà-ÿ]|\.|;|:))/);
        const title = cleanInlineText(titleMatch?.[1] || segment.slice(0, 120));
        const body = cleanInlineText(segment.slice(title.length).trim());

        items.push({ code, title, body });
    }

    return items;
};

const finalizeRequirement = (draft: RequirementAccumulator | null): ImportedRequirementDraft | null => {
    if (!draft?.code || !draft.title) {
        return null;
    }

    const description = draft.descriptionLines
        .map((line) => normalizeLine(line))
        .filter(Boolean)
        .join(' ');

    return {
        code: draft.code,
        title: draft.title,
        description: description || draft.description || null,
        chapter: draft.chapter,
        orderIndex: draft.orderIndex,
        applicability: draft.applicability,
        status: draft.status,
        weight: draft.weight,
    };
};

export class ComplianceRequirementImportService {
    static readonly supportedCoverage = [
        ComplianceMappingCoverageLevel.UNCOVERED,
        ComplianceMappingCoverageLevel.PARTIAL,
        ComplianceMappingCoverageLevel.COVERED,
    ];

    static parseRequirementsFromText(text: string): ImportedRequirementDraft[] {
        const lines = String(text || '')
            .split(/\r?\n/)
            .map((line) => normalizeLine(line))
            .filter((line) => !isNoiseLine(line));

        const items: ImportedRequirementDraft[] = [];
        const seenCodes = new Set<string>();
        let currentChapter: string | null = null;
        let current: RequirementAccumulator | null = null;
        let fallbackIndex = 1;

        for (const line of lines) {
            if (isChapterHeading(line)) {
                currentChapter = line;
                continue;
            }

            const header = extractRequirementHeader(line);
            if (header) {
                const finalized = finalizeRequirement(current);
                if (finalized && !seenCodes.has(finalized.code.toLowerCase())) {
                    items.push(finalized);
                    seenCodes.add(finalized.code.toLowerCase());
                }

                current = {
                    code: header.code,
                    title: header.title,
                    description: null,
                    chapter: currentChapter,
                    orderIndex: toOrderIndex(header.code, fallbackIndex),
                    applicability: 'applicable',
                    status: 'active',
                    weight: 1,
                    descriptionLines: [],
                };
                fallbackIndex += 1;
                continue;
            }

            if (current) {
                current.descriptionLines.push(line);
            }
        }

        const finalized = finalizeRequirement(current);
        if (finalized && !seenCodes.has(finalized.code.toLowerCase())) {
            items.push(finalized);
        }

        if (items.length > 0) {
            return items;
        }

        const flatMatches = extractRequirementMatchesFromFlatText(text);
        return flatMatches.map((item, index) => ({
            code: item.code,
            title: item.title,
            description: item.body || null,
            chapter: null,
            orderIndex: toOrderIndex(item.code, index + 1),
            applicability: 'applicable',
            status: 'active',
            weight: 1,
        }));
    }
}
