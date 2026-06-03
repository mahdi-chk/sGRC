import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { Department } from '../departments/department.model';
import { Risk } from '../risk/risk.model';
import { User } from '../users/user.model';

export class InternalControl extends Model {
    public id!: number;
    public code!: string;
    public title!: string;
    public description!: string | null;
    public controlType!: string;
    public executionType!: string;
    public frequency!: string;
    public status!: string;
    public maturity!: number;
    public departmentId!: number | null;
    public ownerUserId!: number | null;
    public nextReview!: Date | null;
    public lastTestedAt!: Date | null;
    public effectivenessScore!: number;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

InternalControl.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        code: { type: DataTypes.STRING(40), allowNull: false, unique: true },
        title: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        controlType: { type: DataTypes.STRING(40), allowNull: false, defaultValue: 'preventive' },
        executionType: { type: DataTypes.STRING(40), allowNull: false, defaultValue: 'periodic' },
        frequency: { type: DataTypes.STRING(40), allowNull: false, defaultValue: 'quarterly' },
        status: { type: DataTypes.STRING(40), allowNull: false, defaultValue: 'active' },
        maturity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 3 },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'departments', key: 'id' },
        },
        ownerUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
        },
        nextReview: { type: DataTypes.DATE, allowNull: true },
        lastTestedAt: { type: DataTypes.DATE, allowNull: true },
        effectivenessScore: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'internal_controls',
        ...softDeleteModelOptions,
    }
);

export class InternalControlRisk extends Model {
    public id!: number;
    public controlId!: number;
    public riskId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

InternalControlRisk.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        controlId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'internal_controls', key: 'id' },
        },
        riskId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'risks', key: 'id' },
        },
    },
    {
        sequelize,
        tableName: 'internal_control_risks',
    }
);

export class InternalControlTestExecution extends Model {
    public id!: number;
    public controlId!: number;
    public title!: string;
    public testMethod!: string;
    public result!: string;
    public plannedDate!: Date | null;
    public executedAt!: Date | null;
    public testerUserId!: number | null;
    public score!: number;
    public notes!: string | null;
    public evidenceSummary!: string | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

InternalControlTestExecution.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        controlId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'internal_controls', key: 'id' },
        },
        title: { type: DataTypes.STRING(255), allowNull: false },
        testMethod: { type: DataTypes.STRING(40), allowNull: false, defaultValue: 'manual_review' },
        result: { type: DataTypes.STRING(40), allowNull: false, defaultValue: 'planned' },
        plannedDate: { type: DataTypes.DATE, allowNull: true },
        executedAt: { type: DataTypes.DATE, allowNull: true },
        testerUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
        },
        score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        notes: { type: DataTypes.TEXT, allowNull: true },
        evidenceSummary: { type: DataTypes.TEXT, allowNull: true },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'internal_control_test_executions',
        ...softDeleteModelOptions,
    }
);

InternalControl.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
InternalControl.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });
InternalControl.hasMany(InternalControlRisk, { foreignKey: 'controlId', as: 'riskLinks' });
InternalControl.hasMany(InternalControlTestExecution, { foreignKey: 'controlId', as: 'tests' });

InternalControlRisk.belongsTo(InternalControl, { foreignKey: 'controlId', as: 'control' });
InternalControlRisk.belongsTo(Risk, { foreignKey: 'riskId', as: 'risk' });

InternalControlTestExecution.belongsTo(InternalControl, { foreignKey: 'controlId', as: 'control' });
InternalControlTestExecution.belongsTo(User, { foreignKey: 'testerUserId', as: 'tester' });
