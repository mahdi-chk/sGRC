/**
 * @file audit-mission.model.ts
 * @description Définition du modèle de données pour les Missions d'Audit.
 */

import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';
import { Risk } from '../risk/risk.model';

export enum AuditMissionStatus {
    A_VENIR = 'À venir',
    EN_COURS = 'En cours',
    TERMINE = 'Terminé',
    EN_RETARD = 'En retard',
    ANNULE = 'Annulé',
}

export class AuditMission extends Model {
    public id!: number;
    public titre!: string;
    public objectifs!: string;
    public responsabilites!: string;
    public delai!: Date;
    public statut!: AuditMissionStatus;
    public auditSeniorId!: number;
    public auditeurId!: number | null;
    public riskId!: number;
    public rapport!: string | null;
    public recommandations!: string | null;
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
        statut: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: AuditMissionStatus.A_VENIR,
            validate: {
                isIn: [Object.values(AuditMissionStatus)],
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
        rapport: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        recommandations: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'audit_missions',
    }
);

/**
 * --- DÉFINITION DES RELATIONS ---
 */

AuditMission.belongsTo(User, { foreignKey: 'auditSeniorId', as: 'auditSenior' });
AuditMission.belongsTo(User, { foreignKey: 'auditeurId', as: 'auditeur' });
AuditMission.belongsTo(Risk, { foreignKey: 'riskId', as: 'risk' });

User.hasMany(AuditMission, { foreignKey: 'auditSeniorId', as: 'seniorMissions' });
User.hasMany(AuditMission, { foreignKey: 'auditeurId', as: 'assignedMissions' });
Risk.hasMany(AuditMission, { foreignKey: 'riskId', as: 'auditMissions' });
