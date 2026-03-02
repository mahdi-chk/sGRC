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
 * Fréquences de traitement périodique pour un risque.
 */
export enum PeriodicFrequency {
    QUOTIDIEN = 'Quotidien',
    HEBDOMADAIRE = 'Hebdomadaire',
    BIMENSUEL = 'Bimensuel',
    MENSUEL = 'Mensuel',
    TRIMESTRIEL = 'Trimestriel',
    SEMESTRIEL = 'Semestriel',
    ANNUEL = 'Annuel',
    NONE = 'Aucun',
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
    public frequenceTraitement!: PeriodicFrequency;
    public prochaineEcheance!: Date | null;
    public dernierTraitement!: Date | null;
    public aiAnalysisScore!: number | null;
    public aiAnalysisImpact!: string | null;
    public aiAnalysisTendance!: string | null;
    public aiAnalysisSuggestion!: string | null;
    public aiAnalysisDate!: Date | null;
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
        frequenceTraitement: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: PeriodicFrequency.NONE,
            validate: {
                isIn: [Object.values(PeriodicFrequency)],
            },
        },
        prochaineEcheance: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dernierTraitement: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        aiAnalysisScore: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        aiAnalysisImpact: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        aiAnalysisTendance: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        aiAnalysisSuggestion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        aiAnalysisDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'risks',
        hooks: {
            beforeValidate: (risk: Risk) => {
                // Normalisation de la fréquence (ex: "trimestriel" -> "Trimestriel")
                if (risk.frequenceTraitement && typeof risk.frequenceTraitement === 'string') {
                    const normalized = risk.frequenceTraitement.charAt(0).toUpperCase() + risk.frequenceTraitement.slice(1).toLowerCase();
                    if (Object.values(PeriodicFrequency).includes(normalized as any)) {
                        risk.frequenceTraitement = normalized as any;
                    }
                }
            },
            beforeCreate: (risk: Risk) => {
                calculateNextDeadline(risk);
            },
            beforeUpdate: (risk: Risk) => {
                calculateNextDeadline(risk);
            }
        }
    }
);

/**
 * Calcule la prochaine échéance en fonction de la fréquence.
 */
function calculateNextDeadline(risk: Risk) {
    if (!risk.frequenceTraitement || risk.frequenceTraitement === PeriodicFrequency.NONE) {
        risk.prochaineEcheance = null;
        return;
    }

    const baseDate = risk.dernierTraitement ? new Date(risk.dernierTraitement) : new Date(risk.dateEcheance);
    const next = new Date(baseDate);

    if (isNaN(next.getTime())) {
        risk.prochaineEcheance = null;
        return;
    }

    switch (risk.frequenceTraitement) {
        case PeriodicFrequency.QUOTIDIEN: next.setDate(next.getDate() + 1); break;
        case PeriodicFrequency.HEBDOMADAIRE: next.setDate(next.getDate() + 7); break;
        case PeriodicFrequency.BIMENSUEL: next.setDate(next.getDate() + 15); break;
        case PeriodicFrequency.MENSUEL: next.setMonth(next.getMonth() + 1); break;
        case PeriodicFrequency.TRIMESTRIEL: next.setMonth(next.getMonth() + 3); break;
        case PeriodicFrequency.SEMESTRIEL: next.setMonth(next.getMonth() + 6); break;
        case PeriodicFrequency.ANNUEL: next.setFullYear(next.getFullYear() + 1); break;
        default: return;
    }
    risk.prochaineEcheance = next;
}

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
