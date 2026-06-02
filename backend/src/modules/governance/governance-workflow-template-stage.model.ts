import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { GovernanceWorkflowTemplateModel } from './governance-workflow-template.model';

export class GovernanceWorkflowTemplateStageModel extends Model {
  public id!: number;
  public templateId!: number;
  public stageIndex!: number;
  public role!: string;
  public owner!: string | null;
  public rule!: string;
  public slaDays!: number | null;
  public escalationTo!: string | null;
  public escalationRule!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GovernanceWorkflowTemplateStageModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    templateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'governance_workflow_templates',
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
    slaDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    escalationTo: {
      type: DataTypes.STRING(180),
      allowNull: true,
    },
    escalationRule: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'governance_workflow_template_stages',
    timestamps: true,
    indexes: [
      { fields: ['templateId'] },
      { unique: true, fields: ['templateId', 'stageIndex'] },
    ],
  }
);

GovernanceWorkflowTemplateModel.hasMany(GovernanceWorkflowTemplateStageModel, { foreignKey: 'templateId', as: 'stages' });
GovernanceWorkflowTemplateStageModel.belongsTo(GovernanceWorkflowTemplateModel, { foreignKey: 'templateId', as: 'template' });

export default GovernanceWorkflowTemplateStageModel;
