import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';

export class GovernanceWorkflowAccessRuleModel extends Model {
  public id!: number;
  public module!: string;
  public process!: string | null;
  public principalType!: 'role' | 'user';
  public principalRole!: string | null;
  public principalUserId!: number | null;
  public canView!: boolean;
  public canEdit!: boolean;
  public canApprove!: boolean;
  public canAdmin!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GovernanceWorkflowAccessRuleModel.init(
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
    principalType: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    principalRole: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    principalUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    canView: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    canEdit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    canApprove: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    canAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'governance_workflow_access_rules',
    timestamps: true,
    indexes: [
      { fields: ['module', 'process'] },
      { fields: ['principalType'] },
      { fields: ['principalRole'] },
      { fields: ['principalUserId'] },
    ],
  }
);

GovernanceWorkflowAccessRuleModel.belongsTo(User, { foreignKey: 'principalUserId', as: 'principalUser' });

export default GovernanceWorkflowAccessRuleModel;
