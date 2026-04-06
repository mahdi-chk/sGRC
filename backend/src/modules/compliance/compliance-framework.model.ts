import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { Department } from '../departments/department.model';
import { User } from '../users/user.model';

export class ComplianceFramework extends Model {
    public id!: number;
    public code!: string;
    public name!: string;
    public version!: string;
    public jurisdiction!: string | null;
    public description!: string | null;
    public ownerUserId!: number | null;
    public departmentId!: number | null;
    public entityKey!: string | null;
    public status!: string;
    public effectiveDate!: Date | null;
    public reviewDate!: Date | null;
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
        status: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'draft',
        },
        effectiveDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        reviewDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'compliance_frameworks',
        timestamps: true,
        indexes: [
            { unique: true, fields: ['code', 'version'] },
            { fields: ['status'] },
            { fields: ['departmentId'] },
            { fields: ['ownerUserId'] },
        ],
    }
);

ComplianceFramework.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });
ComplianceFramework.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
