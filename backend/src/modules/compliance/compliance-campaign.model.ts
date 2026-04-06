import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { Department } from '../departments/department.model';
import { User } from '../users/user.model';
import { ComplianceFramework } from './compliance-framework.model';

export class ComplianceCampaign extends Model {
    public id!: number;
    public frameworkId!: number;
    public title!: string;
    public status!: string;
    public ownerUserId!: number | null;
    public assignedUserId!: number | null;
    public departmentId!: number | null;
    public entityKey!: string | null;
    public dueDate!: Date | null;
    public startedAt!: Date | null;
    public completedAt!: Date | null;
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
        status: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'draft',
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
    },
    {
        sequelize,
        tableName: 'compliance_campaigns',
        timestamps: true,
        indexes: [
            { fields: ['frameworkId'] },
            { fields: ['status'] },
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
