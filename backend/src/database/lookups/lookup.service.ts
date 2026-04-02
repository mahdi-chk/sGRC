import { Op } from 'sequelize';
import {
    LookupDefinition,
    findStaticLookupId,
    findStaticLookupValue,
    getLookupDefinition,
    getLookupDefinitionsForEntity,
} from './lookup-registry';
import { getLookupModel } from './lookup-models';

const sanitizeLookupInput = (value: unknown) => {
    if (value === undefined) {
        return undefined;
    }

    if (value === null) {
        return null;
    }

    if (typeof value === 'string') {
        const normalized = value.trim();
        return normalized === '' ? null : normalized;
    }

    return value;
};

const getPayloadCandidates = (payload: Record<string, unknown>, definition: LookupDefinition) => [
    payload[definition.foreignKey],
    payload[definition.fieldName],
    payload[`${definition.fieldName}Code`],
    payload[definition.foreignKeyColumn],
];

export class LookupResolutionService {
    static async resolveLookupId(key: string, rawValue: unknown): Promise<number | null> {
        const sanitized = sanitizeLookupInput(rawValue);
        if (sanitized === undefined || sanitized === null) {
            return null;
        }

        const staticId = findStaticLookupId(key, sanitized);
        if (staticId !== null) {
            return staticId;
        }

        if (typeof sanitized === 'number' && Number.isInteger(sanitized)) {
            const lookup = await getLookupModel(key).findByPk(sanitized);
            return lookup ? sanitized : null;
        }

        const lookup = await getLookupModel(key).findOne({
            where: {
                [Op.or]: [
                    { code: sanitized },
                    { label: sanitized },
                ],
            },
        });

        return lookup?.id ?? null;
    }

    static async requireLookupId(key: string, rawValue: unknown): Promise<number> {
        const id = await this.resolveLookupId(key, rawValue);
        if (id === null) {
            throw new Error(`Unknown code for ${key}: ${String(rawValue)}`);
        }

        return id;
    }

    static async resolveEntityPayload(entityKey: string, payload: Record<string, unknown>): Promise<Record<string, unknown>> {
        const nextPayload = { ...payload };

        for (const definition of getLookupDefinitionsForEntity(entityKey)) {
            const candidates = getPayloadCandidates(nextPayload, definition)
                .map(sanitizeLookupInput)
                .filter((value) => value !== undefined);

            if (candidates.length === 0) {
                continue;
            }

            const rawValue = candidates[0];
            if (rawValue === null) {
                if (!definition.allowNull) {
                    throw new Error(`Lookup ${definition.key} is required.`);
                }

                nextPayload[definition.foreignKey] = null;
            } else {
                nextPayload[definition.foreignKey] = await this.requireLookupId(definition.key, rawValue);
            }

            delete nextPayload[definition.fieldName];
            delete nextPayload[`${definition.fieldName}Code`];
            delete nextPayload[definition.foreignKeyColumn];
        }

        return nextPayload;
    }

    static getStaticOptions(key: string) {
        const definition = getLookupDefinition(key);
        return definition.values.map((value) => ({
            id: value.id,
            code: value.code,
            label: value.label,
            description: value.description ?? null,
            sortOrder: value.sortOrder ?? null,
        }));
    }

    static getStaticValue(key: string, rawValue: unknown) {
        return findStaticLookupValue(key, rawValue);
    }
}
