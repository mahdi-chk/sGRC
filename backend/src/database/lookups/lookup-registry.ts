import rawRegistry from './generated.lookup-registry.json';

export interface LookupValueDefinition {
    id: number;
    symbol: string;
    code: string;
    label: string;
    description?: string | null;
    sortOrder?: number | null;
}

export interface LookupLegacyColumnDefinition {
    name: string;
    type: 'string';
    length: number;
    defaultLabel?: string;
}

export interface LookupDefinition {
    key: string;
    entityKey: string;
    entityTable: string;
    fieldName: string;
    foreignKey: string;
    foreignKeyColumn: string;
    associationAlias: string;
    lookupTable: string;
    lookupModelName: string;
    allowNull: boolean;
    legacyColumn?: LookupLegacyColumnDefinition;
    values: LookupValueDefinition[];
}

interface LookupRegistryFile {
    definitions: LookupDefinition[];
}

const registry = rawRegistry as LookupRegistryFile;

const definitionMap = new Map<string, LookupDefinition>(
    registry.definitions.map((definition) => [definition.key, definition])
);

const entityDefinitionMap = new Map<string, LookupDefinition[]>();
for (const definition of registry.definitions) {
    const existing = entityDefinitionMap.get(definition.entityKey) || [];
    existing.push(definition);
    entityDefinitionMap.set(definition.entityKey, existing);
}

const comparable = (value: string) =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();

export const lookupRegistry = registry.definitions;

export const getLookupDefinition = (key: string): LookupDefinition => {
    const definition = definitionMap.get(key);
    if (!definition) {
        throw new Error(`Unknown lookup definition: ${key}`);
    }

    return definition;
};

export const getLookupDefinitionsForEntity = (entityKey: string): LookupDefinition[] =>
    entityDefinitionMap.get(entityKey) || [];

export const buildLookupCodeMap = (key: string): Record<string, string> =>
    getLookupDefinition(key).values.reduce<Record<string, string>>((codes, value) => {
        codes[value.symbol] = value.code;
        return codes;
    }, {});

export const buildLookupCodeList = (key: string): string[] =>
    getLookupDefinition(key).values.map((value) => value.code);

export const buildLookupOptions = (key: string) =>
    getLookupDefinition(key).values.map((value) => ({
        id: value.id,
        code: value.code,
        label: value.label,
        description: value.description ?? null,
        sortOrder: value.sortOrder ?? null,
    }));

export const findStaticLookupValue = (key: string, rawValue: unknown): LookupValueDefinition | null => {
    if (rawValue === null || rawValue === undefined) {
        return null;
    }

    if (typeof rawValue === 'number' && Number.isInteger(rawValue)) {
        return getLookupDefinition(key).values.find((value) => value.id === rawValue) || null;
    }

    if (typeof rawValue !== 'string') {
        return null;
    }

    const normalized = comparable(rawValue);
    return getLookupDefinition(key).values.find((value) =>
        comparable(value.code) === normalized
        || comparable(value.label) === normalized
        || comparable(value.symbol) === normalized
    ) || null;
};

export const findStaticLookupId = (key: string, rawValue: unknown): number | null =>
    findStaticLookupValue(key, rawValue)?.id ?? null;

export const findStaticLookupCodeById = (key: string, id: unknown): string | null =>
    findStaticLookupValue(key, id)?.code ?? null;

export const findStaticLookupLabelById = (key: string, id: unknown): string | null =>
    findStaticLookupValue(key, id)?.label ?? null;
