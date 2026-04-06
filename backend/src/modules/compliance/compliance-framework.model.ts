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

export const ComplianceFrameworkStatus = buildLookupCodeMap('complianceFramework.status');
export type ComplianceFrameworkStatus = string;

export class ComplianceFramework extends LookupAwareModel {
    public id!: number;
    public code!: string;
    public name!: string;
    public version!: string;
    public jurisdiction!: string | null;
    public description!: string | null;
    public ownerUserId!: number | null;
    public departmentId!: number | null;
    public entityKey!: string | null;
    public statusId!: number;
    public status!: ComplianceFrameworkStatus;
    public effectiveDate!: Date | null;
    public reviewDate!: Date | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ComplianceFramework.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        version: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        jurisdiction: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        description: {
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
        statusId: {
            ...buildLookupAttribute('complianceFramework.status'),
            defaultValue: getRequiredLookupId('complianceFramework.status', ComplianceFrameworkStatus.DRAFT),
        },
        effectiveDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        reviewDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'compliance_frameworks',
        timestamps: true,
        ...softDeleteModelOptions,
        indexes: [
            { unique: true, fields: ['code', 'version'] },
            { fields: ['statusId'] },
            { fields: ['departmentId'] },
            { fields: ['ownerUserId'] },
        ],
    }
);

ComplianceFramework.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });
ComplianceFramework.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

registerLookupAccessors('complianceFramework', ComplianceFramework);
registerLookupAssociations('complianceFramework', ComplianceFramework);
