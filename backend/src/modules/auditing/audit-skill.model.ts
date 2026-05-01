import { DataTypes } from 'sequelize';
import sequelize from '../../database';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { LookupAwareModel } from '../../database/lookups/lookup-aware.model';
import { User } from '../users/user.model';
import { AuditMission } from './audit-mission.model';

export class AuditSkill extends LookupAwareModel {
    public id!: number;
    public code!: string;
    public label!: string;
    public description!: string | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditSkill.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING(120),
            allowNull: false,
            unique: true,
        },
        label: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'audit_skills',
        ...softDeleteModelOptions,
    }
);

export class UserAuditSkill extends LookupAwareModel {
    public id!: number;
    public userId!: number;
    public skillId!: number;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserAuditSkill.init(
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
            },
        },
        skillId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'audit_skills',
                key: 'id',
            },
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'user_audit_skills',
        ...softDeleteModelOptions,
    }
);

export class AuditMissionRequiredSkill extends LookupAwareModel {
    public id!: number;
    public missionId!: number;
    public skillId!: number;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditMissionRequiredSkill.init(
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
        skillId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'audit_skills',
                key: 'id',
            },
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'audit_mission_required_skills',
        ...softDeleteModelOptions,
    }
);

AuditSkill.hasMany(UserAuditSkill, { foreignKey: 'skillId', as: 'userLinks' });
UserAuditSkill.belongsTo(AuditSkill, { foreignKey: 'skillId', as: 'skill' });
UserAuditSkill.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(UserAuditSkill, { foreignKey: 'userId', as: 'auditSkillLinks' });

AuditSkill.hasMany(AuditMissionRequiredSkill, { foreignKey: 'skillId', as: 'missionLinks' });
AuditMissionRequiredSkill.belongsTo(AuditSkill, { foreignKey: 'skillId', as: 'skill' });
AuditMissionRequiredSkill.belongsTo(AuditMission, { foreignKey: 'missionId', as: 'mission' });
AuditMission.hasMany(AuditMissionRequiredSkill, { foreignKey: 'missionId', as: 'requiredSkills' });

export default AuditSkill;
