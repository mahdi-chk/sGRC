import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { User } from '../users/user.model';
import { AuditMission } from './audit-mission.model';
import { AuditPlan } from './audit-plan.model';

export class AuditEmailLog extends Model {
    public id!: number;
    public planId!: number | null;
    public missionId!: number | null;
    public scope!: string;
    public templateCode!: string;
    public subject!: string;
    public recipientEmail!: string;
    public recipientName!: string | null;
    public recipientUserId!: number | null;
    public actorName!: string | null;
    public deliveryStatus!: string;
    public errorMessage!: string | null;
    public messageId!: string | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditEmailLog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        planId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'audit_plans',
                key: 'id',
            },
        },
        missionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'audit_missions',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        scope: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        templateCode: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        recipientEmail: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        recipientName: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        recipientUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        actorName: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        deliveryStatus: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        errorMessage: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        messageId: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'audit_email_logs',
        ...softDeleteModelOptions,
    }
);

AuditPlan.hasMany(AuditEmailLog, { foreignKey: 'planId', as: 'emailLogs' });
AuditEmailLog.belongsTo(AuditPlan, { foreignKey: 'planId', as: 'plan' });
AuditMission.hasMany(AuditEmailLog, { foreignKey: 'missionId', as: 'emailLogs' });
AuditEmailLog.belongsTo(AuditMission, { foreignKey: 'missionId', as: 'mission' });
AuditEmailLog.belongsTo(User, { foreignKey: 'recipientUserId', as: 'recipient' });
User.hasMany(AuditEmailLog, { foreignKey: 'recipientUserId', as: 'auditEmailLogs' });

export default AuditEmailLog;
