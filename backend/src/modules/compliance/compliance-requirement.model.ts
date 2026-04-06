import { DataTypes } from 'sequelize';
import sequelize from '../../database';
import { LookupAwareModel } from '../../database/lookups/lookup-aware.model';
import { buildLookupCodeMap } from '../../database/lookups/lookup-registry';
import {
    buildLookupAttribute,
    getRequiredLookupId,
    registerLookupAccessors,
    registerLookupAssociations,
} from '../../database/lookups/lookup-models';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { ComplianceFramework } from './compliance-framework.model';

export const ComplianceRequirementApplicability = buildLookupCodeMap('complianceRequirement.applicability');
export type ComplianceRequirementApplicability = string;

export const ComplianceRequirementStatus = buildLookupCodeMap('complianceRequirement.status');
export type ComplianceRequirementStatus = string;

export class ComplianceRequirement extends LookupAwareModel {
    public id!: number;
    public frameworkId!: number;
    public code!: string;
    public title!: string;
    public description!: string | null;
    public chapter!: string | null;
    public orderIndex!: number;
    public applicabilityId!: number;
    public applicability!: ComplianceRequirementApplicability;
    public statusId!: number;
    public status!: ComplianceRequirementStatus;
    public weight!: number;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
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
        applicabilityId: {
            ...buildLookupAttribute('complianceRequirement.applicability'),
            defaultValue: getRequiredLookupId('complianceRequirement.applicability', ComplianceRequirementApplicability.APPLICABLE),
        },
        statusId: {
            ...buildLookupAttribute('complianceRequirement.status'),
            defaultValue: getRequiredLookupId('complianceRequirement.status', ComplianceRequirementStatus.ACTIVE),
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 1,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'compliance_requirements',
        timestamps: true,
        ...softDeleteModelOptions,
        indexes: [
            { unique: true, fields: ['frameworkId', 'code'] },
            { fields: ['statusId'] },
            { fields: ['applicabilityId'] },
        ],
    }
);

ComplianceRequirement.belongsTo(ComplianceFramework, { foreignKey: 'frameworkId', as: 'framework' });
ComplianceFramework.hasMany(ComplianceRequirement, { foreignKey: 'frameworkId', as: 'requirements', onDelete: 'CASCADE' });

registerLookupAccessors('complianceRequirement', ComplianceRequirement);
registerLookupAssociations('complianceRequirement', ComplianceRequirement);
