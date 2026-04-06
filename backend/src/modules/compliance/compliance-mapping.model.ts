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
import { Department } from '../departments/department.model';
import { User } from '../users/user.model';
import { ComplianceRequirement } from './compliance-requirement.model';

export const ComplianceMappingSourceType = buildLookupCodeMap('complianceMapping.sourceType');
export type ComplianceMappingSourceType = string;

export const ComplianceMappingCoverageLevel = buildLookupCodeMap('complianceMapping.coverageLevel');
export type ComplianceMappingCoverageLevel = string;

export class ComplianceMapping extends LookupAwareModel {
    public id!: number;
    public requirementId!: number;
    public sourceTypeId!: number;
    public sourceType!: ComplianceMappingSourceType;
    public sourceId!: number | null;
    public relatedEntityKey!: string | null;
    public coverageLevelId!: number;
    public coverageLevel!: ComplianceMappingCoverageLevel;
    public rationale!: string | null;
    public ownerUserId!: number | null;
    public departmentId!: number | null;
    public entityKey!: string | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ComplianceMapping.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        requirementId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'compliance_requirements',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        sourceTypeId: {
            ...buildLookupAttribute('complianceMapping.sourceType'),
            defaultValue: getRequiredLookupId('complianceMapping.sourceType', ComplianceMappingSourceType.RISK),
        },
        sourceId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        relatedEntityKey: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        coverageLevelId: {
            ...buildLookupAttribute('complianceMapping.coverageLevel'),
            defaultValue: getRequiredLookupId('complianceMapping.coverageLevel', ComplianceMappingCoverageLevel.PARTIAL),
        },
        rationale: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ownerUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'departments',
                key: 'id',
            },
        },
        entityKey: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'compliance_mappings',
        timestamps: true,
        ...softDeleteModelOptions,
        indexes: [
            { fields: ['requirementId'] },
            { fields: ['sourceTypeId', 'sourceId'] },
            { fields: ['ownerUserId'] },
            { fields: ['departmentId'] },
        ],
    }
);

ComplianceMapping.belongsTo(ComplianceRequirement, { foreignKey: 'requirementId', as: 'requirement' });
ComplianceRequirement.hasMany(ComplianceMapping, { foreignKey: 'requirementId', as: 'mappings', onDelete: 'CASCADE' });
ComplianceMapping.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });
ComplianceMapping.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

registerLookupAccessors('complianceMapping', ComplianceMapping);
registerLookupAssociations('complianceMapping', ComplianceMapping);
