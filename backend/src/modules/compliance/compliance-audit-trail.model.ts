import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { Department } from '../departments/department.model';
import { User } from '../users/user.model';

export class ComplianceAuditTrail extends Model {
    public id!: number;
    public entityType!: string;
    public entityId!: number;
    public action!: string;
    public actorUserId!: number | null;
    public departmentId!: number | null;
    public entityKey!: string | null;
    public payload!: string | null;
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
        entityType: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        entityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
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
    },
    {
        sequelize,
        tableName: 'compliance_audit_trail',
        timestamps: true,
        indexes: [
            { fields: ['entityType', 'entityId'] },
            { fields: ['actorUserId'] },
            { fields: ['departmentId'] },
            { fields: ['createdAt'] },
        ],
    }
);

ComplianceAuditTrail.belongsTo(User, { foreignKey: 'actorUserId', as: 'actor' });
ComplianceAuditTrail.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
