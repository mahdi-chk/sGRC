import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { ComplianceFramework } from './compliance-framework.model';

export class ComplianceRequirement extends Model {
    public id!: number;
    public frameworkId!: number;
    public code!: string;
    public title!: string;
    public description!: string | null;
    public chapter!: string | null;
    public orderIndex!: number;
    public applicability!: string;
    public status!: string;
    public weight!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ComplianceRequirement.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        frameworkId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'compliance_frameworks',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        code: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        chapter: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        orderIndex: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        applicability: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'applicable',
        },
        status: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'active',
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        sequelize,
        tableName: 'compliance_requirements',
        timestamps: true,
        indexes: [
            { unique: true, fields: ['frameworkId', 'code'] },
            { fields: ['status'] },
            { fields: ['applicability'] },
        ],
    }
);

ComplianceRequirement.belongsTo(ComplianceFramework, { foreignKey: 'frameworkId', as: 'framework' });
ComplianceFramework.hasMany(ComplianceRequirement, { foreignKey: 'frameworkId', as: 'requirements', onDelete: 'CASCADE' });
