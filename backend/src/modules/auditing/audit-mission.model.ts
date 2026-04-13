/**
 * @file audit-mission.model.ts
 * @description Définition du modèle de données pour les Missions d'Audit.
 */

import { DataTypes } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';
import { Risk } from '../risk/risk.model';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { LookupAwareModel } from '../../database/lookups/lookup-aware.model';
import {
    buildLookupAttribute,
    registerLookupAccessors,
    registerLookupAssociations,
} from '../../database/lookups/lookup-models';

export const AuditMissionStatus = {
    NOK: 'nok',
    A_VENIR: 'nok',
    EN_COURS: 'en_cours',
    OK: 'ok',
    TERMINE: 'ok',
    EN_RETARD: 'nok',
    ANNULE: 'nok',
} as const;
export type AuditMissionStatus = string;
export const AuditRecordType = {
    MISSION_AUDIT: 'mission_audit',
    PLAN_ACTION_AUDIT: 'plan_action_audit',
} as const;
export type AuditRecordType = typeof AuditRecordType[keyof typeof AuditRecordType];

export class AuditMission extends LookupAwareModel {
    public id!: number;
    public type!: AuditRecordType;
    public code!: string | null;
    public titre!: string;
    public objectifs!: string | null;
    public responsabilites!: string | null;
    public delai!: Date | null;
    public statut!: AuditMissionStatus;
    public statutId!: number;
    public auditSeniorId!: number;
    public auditeurId!: number | null;
    public riskId!: number | null;
    public checklistTemplateId!: number | null;
    public ordre!: number;
    public regleDnssi!: string | null;
    public horizon!: string | null;
    public priorite!: number | null;
    public sourceExcelFile!: string | null;
    public sourceExcelSheet!: string | null;
    public sourceExcelRow!: number | null;
    public sourceMissionId!: number | null;
    public rapport!: string | null;
    public recommandations!: string | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditMission.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: AuditRecordType.MISSION_AUDIT,
        },
        code: {
            type: DataTypes.STRING(80),
            allowNull: true,
        },
        titre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        objectifs: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        responsabilites: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        delai: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        statutId: buildLookupAttribute('auditMission.statut'),
        auditSeniorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        auditeurId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        riskId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'risks',
                key: 'id',
            },
        },
        checklistTemplateId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'audit_checklist_templates',
                key: 'id',
            },
        },
        ordre: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        regleDnssi: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        horizon: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        priorite: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        sourceExcelFile: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        sourceExcelSheet: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        sourceExcelRow: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        sourceMissionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'audit_missions',
                key: 'id',
            },
        },
        rapport: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        recommandations: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'audit_missions',
        ...softDeleteModelOptions,
    }
);

/**
 * --- DÉFINITION DES RELATIONS ---
 */

AuditMission.belongsTo(User, { foreignKey: 'auditSeniorId', as: 'auditSenior' });
AuditMission.belongsTo(User, { foreignKey: 'auditeurId', as: 'auditeur' });
AuditMission.belongsTo(Risk, { foreignKey: 'riskId', as: 'risk' });
AuditMission.belongsTo(AuditMission, { foreignKey: 'sourceMissionId', as: 'sourceMission' });
import { AuditChecklistTemplate } from './audit-checklist-template.model';
AuditMission.belongsTo(AuditChecklistTemplate, { foreignKey: 'checklistTemplateId', as: 'checklistTemplate' });

User.hasMany(AuditMission, { foreignKey: 'auditSeniorId', as: 'seniorMissions' });
User.hasMany(AuditMission, { foreignKey: 'auditeurId', as: 'assignedMissions' });
Risk.hasMany(AuditMission, { foreignKey: 'riskId', as: 'auditMissions' });
AuditMission.hasMany(AuditMission, { foreignKey: 'sourceMissionId', as: 'linkedActionPlans' });
AuditChecklistTemplate.hasMany(AuditMission, { foreignKey: 'checklistTemplateId', as: 'missions' });

registerLookupAccessors('auditMission', AuditMission);
registerLookupAssociations('auditMission', AuditMission);
