/**
 * @file incident.model.ts
 * @description Définition du modèle de données pour les Incidents.
 */

import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';

export enum IncidentStatus {
    NOUVEAU = 'Nouveau',
    EN_COURS = 'En cours',
    TRAITE = 'Traité',
    CLOS = 'Clos',
}

export class Incident extends Model {
    public id!: number;
    public titre!: string;
    public description!: string;
    public dateSurvenance!: Date;
    public statut!: IncidentStatus;
    public pieceJointe!: string | null;
    public userId!: number | null; // L'utilisateur ayant déclaré l'incident

    // Nouveaux champs pour Fiche Incident
    public departementId!: number | null;
    public domaine!: string | null;
    public macroProcessus!: string | null;
    public processus!: string | null;
    public planActionTraitement!: string | null;
    public dateEcheance!: Date | null;
    public niveauRisque!: string | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Associations
    public declareur?: User;
}

Incident.init(
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
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        dateSurvenance: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        statut: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: IncidentStatus.NOUVEAU,
            validate: {
                isIn: [Object.values(IncidentStatus)],
            },
        },
        pieceJointe: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        departementId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        domaine: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        macroProcessus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        processus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        planActionTraitement: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        dateEcheance: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        niveauRisque: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'incidents',
    }
);

// Un incident est déclaré par un utilisateur
Incident.belongsTo(User, { foreignKey: 'userId', as: 'declareur' });
User.hasMany(Incident, { foreignKey: 'userId', as: 'incidentsDeclares' });
