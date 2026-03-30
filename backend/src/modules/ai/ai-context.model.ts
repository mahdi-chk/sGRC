import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';

export const AI_CONTEXT_TYPES = ['system', 'business', 'instruction'] as const;

export type AIContextType = typeof AI_CONTEXT_TYPES[number];

export class AIContext extends Model {
    public id!: number;
    public name!: string;
    public type!: AIContextType;
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
        type: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                isIn: [AI_CONTEXT_TYPES as unknown as string[]],
            },
        },
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
                fields: ['name', 'type'],
            },
            {
                fields: ['name'],
            },
        ],
    }
);
