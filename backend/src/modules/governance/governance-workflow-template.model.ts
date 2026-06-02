import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';

export type GovernanceWorkflowModule = 'Risques' | 'Audit' | 'Incidents';

export class GovernanceWorkflowTemplateModel extends Model {
  public id!: number;
  public module!: GovernanceWorkflowModule;
  public process!: string | null;
  public title!: string;
  public description!: string | null;
  public isActive!: boolean;
  public version!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GovernanceWorkflowTemplateModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: 'governance_workflow_templates',
    timestamps: true,
    indexes: [
      { fields: ['module'] },
      { fields: ['process'] },
      { fields: ['isActive'] },
    ],
  }
);

export default GovernanceWorkflowTemplateModel;
