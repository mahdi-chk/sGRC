/**
 * @file audit-mission.model.ts
 * @description Définition du modèle de données pour les Missions d'Audit.
 */

import { DataTypes } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';
import { Risk } from '../risk/risk.model';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { buildLookupCodeMap } from '../../database/lookups/lookup-registry';
import { LookupAwareModel } from '../../database/lookups/lookup-aware.model';
import {
    buildLookupAttribute,
    registerLookupAccessors,
    registerLookupAssociations,
} from '../../database/lookups/lookup-models';

export const AuditMissionStatus = buildLookupCodeMap('auditMission.statut');
export type AuditMissionStatus = string;

export class AuditMission extends LookupAwareModel {
    public id!: number;
    public titre!: string;
    public objectifs!: string;
    public responsabilites!: string;
    public delai!: Date;
    public statut!: AuditMissionStatus;
    public statutId!: number;
    public auditSeniorId!: number;
    public auditeurId!: number | null;
    public riskId!: number;
    public checklistTemplateId!: number | null;
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
        titre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        objectifs: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        responsabilites: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        delai: {
            type: DataTypes.DATE,
            allowNull: false,
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
            allowNull: false,
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
import { AuditChecklistTemplate } from './audit-checklist-template.model';
AuditMission.belongsTo(AuditChecklistTemplate, { foreignKey: 'checklistTemplateId', as: 'checklistTemplate' });

User.hasMany(AuditMission, { foreignKey: 'auditSeniorId', as: 'seniorMissions' });
User.hasMany(AuditMission, { foreignKey: 'auditeurId', as: 'assignedMissions' });
Risk.hasMany(AuditMission, { foreignKey: 'riskId', as: 'auditMissions' });
AuditChecklistTemplate.hasMany(AuditMission, { foreignKey: 'checklistTemplateId', as: 'missions' });

registerLookupAccessors('auditMission', AuditMission);
registerLookupAssociations('auditMission', AuditMission);
