import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { Department } from '../departments/department.model';
import { User } from '../users/user.model';
import { ComplianceRequirement } from './compliance-requirement.model';

export class ComplianceMapping extends Model {
    public id!: number;
    public requirementId!: number;
    public sourceType!: string;
    public sourceId!: number | null;
    public relatedEntityKey!: string | null;
    public coverageLevel!: string;
    public rationale!: string | null;
    public ownerUserId!: number | null;
    public departmentId!: number | null;
    public entityKey!: string | null;
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
        sourceType: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        sourceId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        relatedEntityKey: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        coverageLevel: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'partial',
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
    },
    {
        sequelize,
        tableName: 'compliance_mappings',
        timestamps: true,
        indexes: [
            { fields: ['requirementId'] },
            { fields: ['sourceType', 'sourceId'] },
            { fields: ['ownerUserId'] },
            { fields: ['departmentId'] },
        ],
    }
);

ComplianceMapping.belongsTo(ComplianceRequirement, { foreignKey: 'requirementId', as: 'requirement' });
ComplianceRequirement.hasMany(ComplianceMapping, { foreignKey: 'requirementId', as: 'mappings', onDelete: 'CASCADE' });
ComplianceMapping.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });
ComplianceMapping.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
