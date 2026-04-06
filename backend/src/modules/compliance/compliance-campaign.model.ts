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
import { ComplianceFramework } from './compliance-framework.model';

export const ComplianceCampaignStatus = buildLookupCodeMap('complianceCampaign.status');
export type ComplianceCampaignStatus = string;

export class ComplianceCampaign extends LookupAwareModel {
    public id!: number;
    public frameworkId!: number;
    public title!: string;
    public statusId!: number;
    public status!: ComplianceCampaignStatus;
    public ownerUserId!: number | null;
    public assignedUserId!: number | null;
    public departmentId!: number | null;
    public entityKey!: string | null;
    public dueDate!: Date | null;
    public startedAt!: Date | null;
    public completedAt!: Date | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ComplianceCampaign.init(
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
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        statusId: {
            ...buildLookupAttribute('complianceCampaign.status'),
            defaultValue: getRequiredLookupId('complianceCampaign.status', ComplianceCampaignStatus.DRAFT),
        },
        ownerUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        assignedUserId: {
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
        startedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        completedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'compliance_campaigns',
        timestamps: true,
        ...softDeleteModelOptions,
        indexes: [
            { fields: ['frameworkId'] },
            { fields: ['statusId'] },
            { fields: ['departmentId'] },
            { fields: ['ownerUserId'] },
            { fields: ['assignedUserId'] },
        ],
    }
);

ComplianceCampaign.belongsTo(ComplianceFramework, { foreignKey: 'frameworkId', as: 'framework' });
ComplianceFramework.hasMany(ComplianceCampaign, { foreignKey: 'frameworkId', as: 'campaigns', onDelete: 'CASCADE' });
ComplianceCampaign.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });
ComplianceCampaign.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignee' });
ComplianceCampaign.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

registerLookupAccessors('complianceCampaign', ComplianceCampaign);
registerLookupAssociations('complianceCampaign', ComplianceCampaign);
