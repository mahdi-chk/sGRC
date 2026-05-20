import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { Department } from '../departments/department.model';
import { User } from '../users/user.model';

export class GovernanceApprovalWorkflowModel extends Model {
  public id!: number;
  public title!: string;
  public scope!: string;
  public folderKey!: string;
  public folderLabel!: string;
  public documentName!: string | null;
  public documentPath!: string | null;
  public targetType!: string;
  public targetId!: string | null;
  public status!: string;
  public priority!: string;
  public requestedById!: number | null;
  public departmentId!: number | null;
  public dueDate!: Date | null;
  public submittedAt!: Date | null;
  public completedAt!: Date | null;
  public currentStageIndex!: number;
  public description!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GovernanceApprovalWorkflowModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    scope: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    folderKey: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    folderLabel: {
      type: DataTypes.STRING(180),
      allowNull: false,
    },
    documentName: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    documentPath: {
      type: DataTypes.STRING(700),
      allowNull: true,
    },
    targetType: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: 'document',
    },
    targetId: {
      type: DataTypes.STRING(180),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: 'submitted',
    },
    priority: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: 'Normale',
    },
    requestedById: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'departments',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    submittedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    currentStageIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'governance_approval_workflows',
    timestamps: true,
    indexes: [
      { fields: ['folderKey'] },
      { fields: ['status'] },
      { fields: ['priority'] },
      { fields: ['departmentId'] },
      { fields: ['dueDate'] },
      { unique: true, fields: ['folderKey', 'documentName'] },
    ],
  }
);

GovernanceApprovalWorkflowModel.belongsTo(User, { foreignKey: 'requestedById', as: 'requester' });
GovernanceApprovalWorkflowModel.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

export default GovernanceApprovalWorkflowModel;
