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

export const ComplianceEvidenceSourceType = buildLookupCodeMap('complianceEvidence.sourceType');
export type ComplianceEvidenceSourceType = string;

export class ComplianceEvidence extends LookupAwareModel {
    public id!: number;
    public requirementId!: number | null;
    public title!: string;
    public sourceTypeId!: number;
    public sourceType!: ComplianceEvidenceSourceType;
    public sourceId!: number | null;
    public filename!: string | null;
    public filePath!: string | null;
    public mimeType!: string | null;
    public ownerUserId!: number | null;
    public departmentId!: number | null;
    public entityKey!: string | null;
    public capturedAt!: Date | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ComplianceEvidence.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        requirementId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'compliance_requirements',
                key: 'id',
            },
            onDelete: 'SET NULL',
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        sourceTypeId: {
            ...buildLookupAttribute('complianceEvidence.sourceType'),
            defaultValue: getRequiredLookupId('complianceEvidence.sourceType', ComplianceEvidenceSourceType.DOCUMENT),
        },
        sourceId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        filename: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        filePath: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        mimeType: {
            type: DataTypes.STRING(120),
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
        capturedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'compliance_evidence',
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

ComplianceEvidence.belongsTo(ComplianceRequirement, { foreignKey: 'requirementId', as: 'requirement' });
ComplianceRequirement.hasMany(ComplianceEvidence, { foreignKey: 'requirementId', as: 'evidence' });
ComplianceEvidence.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });
ComplianceEvidence.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

registerLookupAccessors('complianceEvidence', ComplianceEvidence);
registerLookupAssociations('complianceEvidence', ComplianceEvidence);
