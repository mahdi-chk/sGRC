import { DataTypes } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { buildLookupCodeMap } from '../../database/lookups/lookup-registry';
import { LookupAwareModel } from '../../database/lookups/lookup-aware.model';
import {
    buildLookupAttribute,
    registerLookupAccessors,
    registerLookupAssociations,
} from '../../database/lookups/lookup-models';

export const NotificationType = buildLookupCodeMap('notification.type');
export type NotificationType = string;

export class Notification extends LookupAwareModel {
    public id!: number;
    public userId!: number;
    public type!: NotificationType;
    public typeId!: number;
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
        typeId: buildLookupAttribute('notification.type'),
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

registerLookupAccessors('notification', Notification);
registerLookupAssociations('notification', Notification);

export default Notification;
