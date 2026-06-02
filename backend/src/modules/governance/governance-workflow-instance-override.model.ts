import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';

export class GovernanceWorkflowInstanceOverrideModel extends Model {
  public id!: number;
  public workflowKey!: string;
  public sourceType!: string;
  public sourceId!: string;
  public module!: string;
  public process!: string | null;
  public title!: string | null;
  public description!: string | null;
  public stagesJson!: string;
  public updatedById!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GovernanceWorkflowInstanceOverrideModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    workflowKey: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },
    sourceType: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    sourceId: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    module: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    process: {
      type: DataTypes.STRING(180),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stagesJson: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    updatedById: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    tableName: 'governance_workflow_instance_overrides',
    timestamps: true,
    indexes: [
      { fields: ['workflowKey'] },
      { fields: ['sourceType', 'sourceId'] },
      { fields: ['module', 'process'] },
    ],
  }
);

GovernanceWorkflowInstanceOverrideModel.belongsTo(User, { foreignKey: 'updatedById', as: 'updatedBy' });

export default GovernanceWorkflowInstanceOverrideModel;
