import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { Department } from '../departments/department.model';
import { User } from '../users/user.model';
import { UserRole } from '../users/user.roles';

export class GovernanceAuditEventModel extends Model {
  public id!: number;
  public method!: string;
  public action!: string;
  public module!: string;
  public target!: string;
  public actorUserId!: number | null;
  public actorEmail!: string;
  public actorRole!: UserRole;
  public departmentId!: number | null;
  public statusCode!: number;
  public status!: string;
  public statusClass!: string;
  public details!: string;
  public path!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GovernanceAuditEventModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    method: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    module: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    target: {
      type: DataTypes.STRING(500),
      allowNull: false,
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
    actorEmail: {
      type: DataTypes.STRING(180),
      allowNull: false,
    },
    actorRole: {
      type: DataTypes.STRING(80),
      allowNull: false,
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
    statusCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    statusClass: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING(700),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'governance_audit_events',
    timestamps: true,
    indexes: [
      { fields: ['createdAt'] },
      { fields: ['actorUserId'] },
      { fields: ['departmentId'] },
      { fields: ['module'] },
      { fields: ['statusClass'] },
    ],
  }
);

GovernanceAuditEventModel.belongsTo(User, { foreignKey: 'actorUserId', as: 'actor' });
GovernanceAuditEventModel.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

export default GovernanceAuditEventModel;
