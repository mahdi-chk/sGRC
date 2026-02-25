/**
 * @file risk.model.ts
 * @description Définition du modèle de données pour les Risques.
 * Utilise Sequelize pour la gestion du schéma et des relations.
 */

import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';
import { Department } from '../departments/department.model';

/**
 * Niveaux de sévérité d'un risque.
 */
export enum RiskLevel {
    LOW = 'Faible',
    MEDIUM = 'Moyen',
    HIGH = 'Élevé',
    CRITICAL = 'Critique',
}

/**
 * États possibles du cycle de vie d'un risque.
 */
export enum RiskStatus {
    OPEN = 'Ouvert',
    IN_PROGRESS = 'En cours',
    TREATED = 'Traité',
    CLOSED = 'Clôturé',
}

/**
 * Classe représentant un Risque dans le système GRC.
 */
export class Risk extends Model {
    public id!: number;
    public titre!: string;
    public explication!: string;
    public domaine!: string;
    public departementId!: number;
    public dateEcheance!: Date;
    public niveauRisque!: RiskLevel;
    public responsableTraitementId!: number;
    public riskManagerId!: number;
    public riskAgentId!: number | null;
    public statut!: RiskStatus;
    public pieceJustificative!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialisation du schéma de la table 'risks'
Risk.init(
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
        explication: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        domaine: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Clé étrangère vers le Département concerné
        departementId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'departments',
                key: 'id',
            },
        },
        dateEcheance: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        niveauRisque: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [Object.values(RiskLevel)],
            },
        },
        // Utilisateur responsable du département (Responsable de traitement)
        responsableTraitementId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        // Créateur du risque (Risk Manager)
        riskManagerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        // Agent de traitement assigné
        riskAgentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        statut: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: RiskStatus.OPEN,
            validate: {
                isIn: [Object.values(RiskStatus)],
            },
        },
        // Chemin vers le fichier justificatif (Upload)
        pieceJustificative: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'risks',
    }
);

/**
 * --- DÉFINITION DES RELATIONS ---
 */

// Un risque appartient à un département
Risk.belongsTo(Department, { foreignKey: 'departementId', as: 'departement' });
// Relations avec les utilisateurs selon leur rôle dans le traitement du risque
Risk.belongsTo(User, { foreignKey: 'responsableTraitementId', as: 'responsableTraitement' });
Risk.belongsTo(User, { foreignKey: 'riskManagerId', as: 'riskManager' });
Risk.belongsTo(User, { foreignKey: 'riskAgentId', as: 'riskAgent' });

// Inverse des relations pour faciliter les requêtes
Department.hasMany(Risk, { foreignKey: 'departementId', as: 'risks' });
User.hasMany(Risk, { foreignKey: 'riskManagerId', as: 'managedRisks' });
User.hasMany(Risk, { foreignKey: 'riskAgentId', as: 'assignedRisks' });
User.hasMany(Risk, { foreignKey: 'responsableTraitementId', as: 'treatableRisks' });
