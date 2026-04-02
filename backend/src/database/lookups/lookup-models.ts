import { DataTypes, Model, ModelStatic } from 'sequelize';
import sequelize from '../../database';
import {
    LookupDefinition,
    findStaticLookupCodeById,
    findStaticLookupId,
    findStaticLookupLabelById,
    getLookupDefinition,
    getLookupDefinitionsForEntity,
    lookupRegistry,
} from './lookup-registry';
import { LookupAwareModel } from './lookup-aware.model';

export interface LookupRecord extends Model {
    id: number;
    code: string;
    label: string;
    description?: string | null;
    isActive: boolean;
    sortOrder?: number | null;
    createdAt: Date;
    updatedAt: Date;
}

const lookupModels = new Map<string, ModelStatic<LookupRecord>>();

const registerLookupModel = (definition: LookupDefinition): ModelStatic<LookupRecord> => {
    const existing = lookupModels.get(definition.key);
    if (existing) {
        return existing;
    }

    const model = sequelize.define<LookupRecord>(definition.lookupModelName, {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'is_active',
        },
        sortOrder: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'sort_order',
        },
    }, {
        tableName: definition.lookupTable,
        timestamps: true,
        underscored: true,
    });

    lookupModels.set(definition.key, model);
    return model;
};

for (const definition of lookupRegistry) {
    registerLookupModel(definition);
}

const registeredAssociationKeys = new Set<string>();

export const getLookupModel = (key: string): ModelStatic<LookupRecord> => {
    const model = lookupModels.get(key);
    if (!model) {
        throw new Error(`Lookup model not registered for ${key}`);
    }

    return model;
};

export const buildLookupAttribute = (key: string, dataTypes = DataTypes) => {
    const definition = getLookupDefinition(key);
    return {
        type: dataTypes.INTEGER,
        allowNull: definition.allowNull,
        field: definition.foreignKeyColumn,
        references: {
            model: definition.lookupTable,
            key: 'id',
        },
    };
};

export const registerLookupAssociations = (entityKey: string, model: ModelStatic<Model>) => {
    for (const definition of getLookupDefinitionsForEntity(entityKey)) {
        const lookupModel = getLookupModel(definition.key);
        const associationKey = `${entityKey}:${definition.key}`;

        if (registeredAssociationKeys.has(associationKey)) {
            continue;
        }

        model.belongsTo(lookupModel, {
            foreignKey: definition.foreignKey,
            as: definition.associationAlias,
        });

        lookupModel.hasMany(model, {
            foreignKey: definition.foreignKey,
            as: `${entityKey}${definition.fieldName}References`,
        });

        registeredAssociationKeys.add(associationKey);
    }
};

export const registerLookupAccessors = (entityKey: string, model: typeof LookupAwareModel) => {
    (model as typeof LookupAwareModel).lookupEntityKey = entityKey;

    for (const definition of getLookupDefinitionsForEntity(entityKey)) {
        if (!Object.getOwnPropertyDescriptor(model.prototype, definition.fieldName)) {
            Object.defineProperty(model.prototype, definition.fieldName, {
                get(this: Model) {
                    const association = (this as unknown as Record<string, unknown>)[definition.associationAlias] as Record<string, unknown> | undefined;
                    const id = this.getDataValue(definition.foreignKey);
                    return association?.code ?? findStaticLookupCodeById(definition.key, id);
                },
                configurable: true,
                enumerable: true,
            });
        }

        const labelProperty = `${definition.fieldName}Label`;
        if (!Object.getOwnPropertyDescriptor(model.prototype, labelProperty)) {
            Object.defineProperty(model.prototype, labelProperty, {
                get(this: Model) {
                    const association = (this as unknown as Record<string, unknown>)[definition.associationAlias] as Record<string, unknown> | undefined;
                    const id = this.getDataValue(definition.foreignKey);
                    return association?.label ?? findStaticLookupLabelById(definition.key, id);
                },
                configurable: true,
                enumerable: true,
            });
        }
    }
};

export const getRequiredLookupId = (key: string, rawValue: unknown): number => {
    const id = findStaticLookupId(key, rawValue);
    if (id === null) {
        throw new Error(`Unknown lookup value for ${key}: ${String(rawValue)}`);
    }

    return id;
};
