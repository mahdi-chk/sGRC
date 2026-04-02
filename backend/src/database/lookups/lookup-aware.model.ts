import { Model } from 'sequelize';
import {
    findStaticLookupCodeById,
    findStaticLookupLabelById,
    getLookupDefinitionsForEntity,
} from './lookup-registry';

export abstract class LookupAwareModel extends Model {
    static lookupEntityKey?: string;

    toJSON(): object {
        const payload = super.toJSON() as Record<string, unknown>;
        const entityKey = (this.constructor as typeof LookupAwareModel).lookupEntityKey;

        if (!entityKey) {
            return payload;
        }

        for (const definition of getLookupDefinitionsForEntity(entityKey)) {
            const idValue = payload[definition.foreignKey];
            const association = payload[definition.associationAlias] as Record<string, unknown> | undefined;
            const code = association?.code ?? findStaticLookupCodeById(definition.key, idValue);
            const label = association?.label ?? findStaticLookupLabelById(definition.key, idValue);

            payload[definition.fieldName] = label ?? null;
            payload[`${definition.fieldName}Code`] = code ?? null;
            payload[`${definition.fieldName}Id`] = idValue ?? null;
        }

        return payload;
    }
}
