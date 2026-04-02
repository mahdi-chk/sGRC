import { DataTypes } from 'sequelize';
import sequelize from '../../database';
import { buildLookupCodeList, buildLookupCodeMap } from '../../database/lookups/lookup-registry';
import { LookupAwareModel } from '../../database/lookups/lookup-aware.model';
import {
    buildLookupAttribute,
    registerLookupAccessors,
    registerLookupAssociations,
} from '../../database/lookups/lookup-models';

export const AIContextType = buildLookupCodeMap('aiContext.type');
export type AIContextType = string;
export const AI_CONTEXT_TYPES = buildLookupCodeList('aiContext.type');

export class AIContext extends LookupAwareModel {
    public id!: number;
    public name!: string;
    public type!: AIContextType;
    public typeId!: number;
    public content!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AIContext.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 100],
            },
        },
        typeId: buildLookupAttribute('aiContext.type'),
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        sequelize,
        tableName: 'ai_contexts',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['name', 'typeId'],
            },
            {
                fields: ['name'],
            },
        ],
    }
);

registerLookupAccessors('aiContext', AIContext);
registerLookupAssociations('aiContext', AIContext);
