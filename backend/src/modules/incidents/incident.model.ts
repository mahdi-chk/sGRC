/**
 * @file incident.model.ts
 * @description Définition du modèle de données pour les Incidents.
 */

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

export const IncidentStatus = buildLookupCodeMap('incident.statut');
export type IncidentStatus = string;

export class Incident extends LookupAwareModel {
    public id!: number;
    public titre!: string;
    public description!: string;
    public dateSurvenance!: Date;
    public statut!: IncidentStatus;
    public statutId!: number;
    public pieceJointe!: string | null;
    public userId!: number | null; // L'utilisateur ayant déclaré l'incident
    public assigneeId!: number | null; // L'utilisateur assigné au traitement

    // Nouveaux champs pour Fiche Incident
    public departementId!: number | null;
    public domaine!: string | null;
    public macroProcessus!: string | null;
    public processus!: string | null;
    public planActionTraitement!: string | null;
    public dateEcheance!: Date | null;
    public niveauRisqueId!: number | null;
    public niveauRisque!: string | null;
    public riskId!: number | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Associations
    public declareur?: User;
    public assignee?: User;
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
        statutId: buildLookupAttribute('incident.statut'),
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
        assigneeId: {
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
        niveauRisqueId: buildLookupAttribute('incident.niveauRisque'),
        riskId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'risks',
                key: 'id',
            },
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'incidents',
        ...softDeleteModelOptions,
    }
);

// Un incident est déclaré par un utilisateur
Incident.belongsTo(User, { foreignKey: 'userId', as: 'declareur' });
User.hasMany(Incident, { foreignKey: 'userId', as: 'incidentsDeclares' });

// Un incident peut être assigné à un utilisateur pour traitement
Incident.belongsTo(User, { foreignKey: 'assigneeId', as: 'assignee' });
User.hasMany(Incident, { foreignKey: 'assigneeId', as: 'incidentsAssignes' });

registerLookupAccessors('incident', Incident);
registerLookupAssociations('incident', Incident);
