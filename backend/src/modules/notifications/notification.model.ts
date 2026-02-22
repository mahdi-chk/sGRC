import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';

export enum NotificationType {
    RISK_ASSIGNED = 'RISK_ASSIGNED',
    STATUS_CHANGED = 'STATUS_CHANGED',
    COMMENT_ADDED = 'COMMENT_ADDED',
}

export class Notification extends Model {
    public id!: number;
    public userId!: number;
    public type!: NotificationType;
    public content!: string;
    public isRead!: boolean;
    public riskId!: number | null;
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
            defaultValue: false,
        },
        riskId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'risks',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        tableName: 'notifications',
    }
);

Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });

export default Notification;
