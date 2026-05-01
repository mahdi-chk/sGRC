import { DataTypes } from 'sequelize';
import sequelize from '../../database';
import { LookupAwareModel } from '../../database/lookups/lookup-aware.model';
import {
    buildLookupAttribute,
    registerLookupAccessors,
    registerLookupAssociations,
} from '../../database/lookups/lookup-models';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { User } from '../users/user.model';
import { AuditMission } from './audit-mission.model';

export class AuditMissionResource extends LookupAwareModel {
    public id!: number;
    public missionId!: number;
    public userId!: number;
    public assignmentRoleId!: number;
    public allocationPercent!: number;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditMissionResource.init(
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
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        assignmentRoleId: buildLookupAttribute('auditMissionResource.assignmentRole'),
        allocationPercent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'audit_mission_resources',
        ...softDeleteModelOptions,
    }
);

AuditMission.hasMany(AuditMissionResource, { foreignKey: 'missionId', as: 'resourceAssignments' });
AuditMissionResource.belongsTo(AuditMission, { foreignKey: 'missionId', as: 'mission' });
AuditMissionResource.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(AuditMissionResource, { foreignKey: 'userId', as: 'auditMissionAssignments' });

registerLookupAccessors('auditMissionResource', AuditMissionResource);
registerLookupAssociations('auditMissionResource', AuditMissionResource);

export default AuditMissionResource;
