import { DataTypes } from 'sequelize';
import sequelize from '../../database';
import { LookupAwareModel } from '../../database/lookups/lookup-aware.model';
import {
    buildLookupAttribute,
    registerLookupAccessors,
    registerLookupAssociations,
} from '../../database/lookups/lookup-models';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { Department } from '../departments/department.model';
import { User } from '../users/user.model';

export class ComplianceAuditTrail extends LookupAwareModel {
    public id!: number;
    public entityTypeId!: number;
    public entityType!: string;
    public entityId!: number;
    public actionId!: number;
    public action!: string;
    public actorUserId!: number | null;
    public departmentId!: number | null;
    public entityKey!: string | null;
    public payload!: string | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ComplianceAuditTrail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        entityTypeId: buildLookupAttribute('complianceAuditTrail.entityType'),
        entityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actionId: buildLookupAttribute('complianceAuditTrail.action'),
        actorUserId: {
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
        payload: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'compliance_audit_trail',
        timestamps: true,
        ...softDeleteModelOptions,
        indexes: [
            { fields: ['entityTypeId', 'entityId'] },
            { fields: ['actionId'] },
            { fields: ['actorUserId'] },
            { fields: ['departmentId'] },
            { fields: ['createdAt'] },
        ],
    }
);

ComplianceAuditTrail.belongsTo(User, { foreignKey: 'actorUserId', as: 'actor' });
ComplianceAuditTrail.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

registerLookupAccessors('complianceAuditTrail', ComplianceAuditTrail);
registerLookupAssociations('complianceAuditTrail', ComplianceAuditTrail);
