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

export const ComplianceGapSeverity = buildLookupCodeMap('complianceGap.severity');
export type ComplianceGapSeverity = string;

export const ComplianceGapStatus = buildLookupCodeMap('complianceGap.status');
export type ComplianceGapStatus = string;

export const ComplianceGapSourceType = buildLookupCodeMap('complianceGap.sourceType');
export type ComplianceGapSourceType = string;

export class ComplianceGap extends LookupAwareModel {
    public id!: number;
    public requirementId!: number | null;
    public title!: string;
    public description!: string | null;
    public severityId!: number;
    public severity!: ComplianceGapSeverity;
    public statusId!: number;
    public status!: ComplianceGapStatus;
    public sourceTypeId!: number;
    public sourceType!: ComplianceGapSourceType;
    public sourceId!: number | null;
    public ownerUserId!: number | null;
    public departmentId!: number | null;
    public entityKey!: string | null;
    public dueDate!: Date | null;
    public remediationActionId!: string | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ComplianceGap.init(
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
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        severityId: {
            ...buildLookupAttribute('complianceGap.severity'),
            defaultValue: getRequiredLookupId('complianceGap.severity', ComplianceGapSeverity.MEDIUM),
        },
        statusId: {
            ...buildLookupAttribute('complianceGap.status'),
            defaultValue: getRequiredLookupId('complianceGap.status', ComplianceGapStatus.OPEN),
        },
        sourceTypeId: {
            ...buildLookupAttribute('complianceGap.sourceType'),
            defaultValue: getRequiredLookupId('complianceGap.sourceType', ComplianceGapSourceType.ASSESSMENT),
        },
        sourceId: {
            type: DataTypes.INTEGER,
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
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        remediationActionId: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'compliance_gaps',
        timestamps: true,
        ...softDeleteModelOptions,
        indexes: [
            { fields: ['requirementId'] },
            { fields: ['statusId'] },
            { fields: ['severityId'] },
            { fields: ['departmentId'] },
            { fields: ['ownerUserId'] },
        ],
    }
);

ComplianceGap.belongsTo(ComplianceRequirement, { foreignKey: 'requirementId', as: 'requirement' });
ComplianceRequirement.hasMany(ComplianceGap, { foreignKey: 'requirementId', as: 'gaps' });
ComplianceGap.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });
ComplianceGap.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

registerLookupAccessors('complianceGap', ComplianceGap);
registerLookupAssociations('complianceGap', ComplianceGap);
