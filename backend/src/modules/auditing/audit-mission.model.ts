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
import { AuditPlan } from './audit-plan.model';

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
    public planActionType!: string | null;
    public code!: string | null;
    public titre!: string;
    public objectifs!: string | null;
    public responsabilites!: string | null;
    public delai!: Date | null;
    public statut!: AuditMissionStatus;
    public statutId!: number;
    public auditPlanId!: number | null;
    public auditSeniorId!: number;
    public chefMissionId!: number | null;
    public auditeurId!: number | null;
    public auditedPrincipalId!: number | null;
    public riskId!: number | null;
    public checklistTemplateId!: number | null;
    public categoryId!: number | null;
    public ordre!: number;
    public axe!: string | null;
    public evaluation!: string | null;
    public quarterId!: number | null;
    public datePrevueDebut!: Date | null;
    public datePrevueFin!: Date | null;
    public dateReelleDebut!: Date | null;
    public dateReelleFin!: Date | null;
    public progressPercent!: number | null;
    public regleDnssi!: string | null;
    public horizon!: string | null;
    public priorite!: number | null;
    public sourceExcelFile!: string | null;
    public sourceExcelSheet!: string | null;
    public sourceExcelRow!: number | null;
    public sourceMissionId!: number | null;
    public rapport!: string | null;
    public recommandations!: string | null;
    public missionOrderReference!: string | null;
    public missionOrderSentAt!: Date | null;
    public missionOrderSentById!: number | null;
    public workProgramStatus!: string;
    public workProgramSubmittedAt!: Date | null;
    public workProgramValidatedAt!: Date | null;
    public workProgramApprovedAt!: Date | null;
    public workProgramLastComment!: string | null;
    public workProgramPreparedById!: number | null;
    public workProgramValidatedById!: number | null;
    public workProgramApprovedById!: number | null;
    public reportStatus!: string;
    public reportSubmittedAt!: Date | null;
    public reportValidatedAt!: Date | null;
    public reportApprovedAt!: Date | null;
    public reportLastComment!: string | null;
    public reportPreparedById!: number | null;
    public reportValidatedById!: number | null;
    public reportApprovedById!: number | null;
    public recommendationWorkflowStatus!: string;
    public recommendationLastComment!: string | null;
    public recommendationPlanAction!: string | null;
    public recommendationEvaluationAvancement!: string | null;
    public recommendationSentAt!: Date | null;
    public recommendationPlanSubmittedAt!: Date | null;
    public recommendationPlanValidatedAt!: Date | null;
    public recommendationProgressSubmittedAt!: Date | null;
    public recommendationProgressValidatedAt!: Date | null;
    public recommendationClosedAt!: Date | null;
    public recommendationFinalClosedAt!: Date | null;
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
        planActionType: {
            type: DataTypes.STRING(120),
            allowNull: true,
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
        auditPlanId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'audit_plans',
                key: 'id',
            },
        },
        auditSeniorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        chefMissionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        auditedPrincipalId: {
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
        categoryId: buildLookupAttribute('auditMission.category'),
        ordre: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        axe: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        evaluation: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        quarterId: buildLookupAttribute('auditMission.quarter'),
        datePrevueDebut: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        datePrevueFin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dateReelleDebut: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dateReelleFin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        progressPercent: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        missionOrderReference: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        missionOrderSentAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        missionOrderSentById: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        workProgramStatus: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'draft',
        },
        workProgramSubmittedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        workProgramValidatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        workProgramApprovedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        workProgramLastComment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        workProgramPreparedById: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        workProgramValidatedById: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        workProgramApprovedById: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        reportStatus: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'draft',
        },
        reportSubmittedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        reportValidatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        reportApprovedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        reportLastComment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        reportPreparedById: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        reportValidatedById: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        reportApprovedById: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        recommendationWorkflowStatus: {
            type: DataTypes.STRING(60),
            allowNull: false,
            defaultValue: 'cree',
        },
        recommendationLastComment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        recommendationPlanAction: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        recommendationEvaluationAvancement: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        recommendationSentAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        recommendationPlanSubmittedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        recommendationPlanValidatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        recommendationProgressSubmittedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        recommendationProgressValidatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        recommendationClosedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        recommendationFinalClosedAt: {
            type: DataTypes.DATE,
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

AuditMission.belongsTo(AuditPlan, { foreignKey: 'auditPlanId', as: 'auditPlan' });
AuditMission.belongsTo(User, { foreignKey: 'auditSeniorId', as: 'auditSenior' });
AuditMission.belongsTo(User, { foreignKey: 'chefMissionId', as: 'chefMission' });
AuditMission.belongsTo(User, { foreignKey: 'auditeurId', as: 'auditeur' });
AuditMission.belongsTo(User, { foreignKey: 'auditedPrincipalId', as: 'auditedPrincipal' });
AuditMission.belongsTo(User, { foreignKey: 'missionOrderSentById', as: 'missionOrderSender' });
AuditMission.belongsTo(User, { foreignKey: 'workProgramPreparedById', as: 'workProgramPreparedBy' });
AuditMission.belongsTo(User, { foreignKey: 'workProgramValidatedById', as: 'workProgramValidatedBy' });
AuditMission.belongsTo(User, { foreignKey: 'workProgramApprovedById', as: 'workProgramApprovedBy' });
AuditMission.belongsTo(User, { foreignKey: 'reportPreparedById', as: 'reportPreparedBy' });
AuditMission.belongsTo(User, { foreignKey: 'reportValidatedById', as: 'reportValidatedBy' });
AuditMission.belongsTo(User, { foreignKey: 'reportApprovedById', as: 'reportApprovedBy' });
AuditMission.belongsTo(Risk, { foreignKey: 'riskId', as: 'risk' });
AuditMission.belongsTo(AuditMission, { foreignKey: 'sourceMissionId', as: 'sourceMission' });
import { AuditChecklistTemplate } from './audit-checklist-template.model';
AuditMission.belongsTo(AuditChecklistTemplate, { foreignKey: 'checklistTemplateId', as: 'checklistTemplate' });

AuditPlan.hasMany(AuditMission, { foreignKey: 'auditPlanId', as: 'missions' });
User.hasMany(AuditMission, { foreignKey: 'auditSeniorId', as: 'seniorMissions' });
User.hasMany(AuditMission, { foreignKey: 'chefMissionId', as: 'managedAuditMissions' });
User.hasMany(AuditMission, { foreignKey: 'auditeurId', as: 'assignedMissions' });
User.hasMany(AuditMission, { foreignKey: 'auditedPrincipalId', as: 'auditedPrincipalMissions' });
User.hasMany(AuditMission, { foreignKey: 'missionOrderSentById', as: 'sentMissionOrders' });
User.hasMany(AuditMission, { foreignKey: 'workProgramPreparedById', as: 'preparedWorkPrograms' });
User.hasMany(AuditMission, { foreignKey: 'workProgramValidatedById', as: 'validatedWorkPrograms' });
User.hasMany(AuditMission, { foreignKey: 'workProgramApprovedById', as: 'approvedWorkPrograms' });
User.hasMany(AuditMission, { foreignKey: 'reportPreparedById', as: 'preparedAuditReports' });
User.hasMany(AuditMission, { foreignKey: 'reportValidatedById', as: 'validatedAuditReports' });
User.hasMany(AuditMission, { foreignKey: 'reportApprovedById', as: 'approvedAuditReports' });
Risk.hasMany(AuditMission, { foreignKey: 'riskId', as: 'auditMissions' });
AuditMission.hasMany(AuditMission, { foreignKey: 'sourceMissionId', as: 'linkedActionPlans' });
AuditChecklistTemplate.hasMany(AuditMission, { foreignKey: 'checklistTemplateId', as: 'missions' });

registerLookupAccessors('auditMission', AuditMission);
registerLookupAssociations('auditMission', AuditMission);
