import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';

export enum NotificationType {
    RISK_ASSIGNED = 'RISK_ASSIGNED',
    STATUS_CHANGED = 'STATUS_CHANGED',
    COMMENT_ADDED = 'COMMENT_ADDED',
    REMINDER = 'REMINDER',
    AUDIT_MISSION_ASSIGNED = 'AUDIT_MISSION_ASSIGNED',
    AUDIT_REPORT_SUBMITTED = 'AUDIT_REPORT_SUBMITTED',
}

export class Notification extends Model {
    public id!: number;
    public userId!: number;
    public type!: NotificationType;
    public content!: string;
    public isRead!: boolean;
    public riskId!: number | null;
    public auditMissionId!: number | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Notification.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isRead: {
            type: DataTypes.BOOLEAN,
        },
        riskId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'risks',
                key: 'id',
            }
        },
        auditMissionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'audit_missions',
                key: 'id',
            }
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'notifications',
        ...softDeleteModelOptions,
    }
);

Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });

export default Notification;
