import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { Department } from '../departments/department.model';
import { User } from '../users/user.model';
import { ComplianceRequirement } from './compliance-requirement.model';

export class ComplianceGap extends Model {
    public id!: number;
    public requirementId!: number | null;
    public title!: string;
    public description!: string | null;
    public severity!: string;
    public status!: string;
    public sourceType!: string;
    public sourceId!: number | null;
    public ownerUserId!: number | null;
    public departmentId!: number | null;
    public entityKey!: string | null;
    public dueDate!: Date | null;
    public remediationActionId!: string | null;
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
        severity: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'medium',
        },
        status: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'open',
        },
        sourceType: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'assessment',
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
    },
    {
        sequelize,
        tableName: 'compliance_gaps',
        timestamps: true,
        indexes: [
            { fields: ['requirementId'] },
            { fields: ['status'] },
            { fields: ['severity'] },
            { fields: ['departmentId'] },
            { fields: ['ownerUserId'] },
        ],
    }
);

ComplianceGap.belongsTo(ComplianceRequirement, { foreignKey: 'requirementId', as: 'requirement' });
ComplianceRequirement.hasMany(ComplianceGap, { foreignKey: 'requirementId', as: 'gaps' });
ComplianceGap.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });
ComplianceGap.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
