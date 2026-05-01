import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { User } from '../users/user.model';
import { AuditMission } from './audit-mission.model';

export class AuditMissionWorkflowEvent extends Model {
    public id!: number;
    public missionId!: number;
    public workflowType!: string;
    public transitionCode!: string;
    public fromStatus!: string | null;
    public toStatus!: string | null;
    public actorUserId!: number;
    public comment!: string | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditMissionWorkflowEvent.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        missionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'audit_missions',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        workflowType: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        transitionCode: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        fromStatus: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        toStatus: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        actorUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'audit_mission_workflow_events',
        ...softDeleteModelOptions,
    }
);

AuditMission.hasMany(AuditMissionWorkflowEvent, { foreignKey: 'missionId', as: 'workflowEvents' });
AuditMissionWorkflowEvent.belongsTo(AuditMission, { foreignKey: 'missionId', as: 'mission' });
AuditMissionWorkflowEvent.belongsTo(User, { foreignKey: 'actorUserId', as: 'actor' });
User.hasMany(AuditMissionWorkflowEvent, { foreignKey: 'actorUserId', as: 'auditMissionWorkflowActions' });

export default AuditMissionWorkflowEvent;
