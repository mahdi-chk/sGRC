import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';
import { GovernanceApprovalWorkflowModel } from './governance-approval-workflow.model';

export class GovernanceApprovalStageModel extends Model {
  public id!: number;
  public workflowId!: number;
  public stageIndex!: number;
  public role!: string;
  public owner!: string | null;
  public rule!: string;
  public status!: string;
  public decision!: string | null;
  public actorUserId!: number | null;
  public comment!: string | null;
  public decidedAt!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GovernanceApprovalStageModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    workflowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'governance_approval_workflows',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    stageIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(160),
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING(180),
      allowNull: true,
    },
    rule: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: 'todo',
    },
    decision: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    actorUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    decidedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'governance_approval_stages',
    timestamps: true,
    indexes: [
      { fields: ['workflowId'] },
      { fields: ['status'] },
      { fields: ['actorUserId'] },
      { unique: true, fields: ['workflowId', 'stageIndex'] },
    ],
  }
);

GovernanceApprovalWorkflowModel.hasMany(GovernanceApprovalStageModel, { foreignKey: 'workflowId', as: 'stages' });
GovernanceApprovalStageModel.belongsTo(GovernanceApprovalWorkflowModel, { foreignKey: 'workflowId', as: 'workflow' });
GovernanceApprovalStageModel.belongsTo(User, { foreignKey: 'actorUserId', as: 'actor' });

export default GovernanceApprovalStageModel;
