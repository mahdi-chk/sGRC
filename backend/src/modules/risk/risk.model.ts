/**
 * @file risk.model.ts
 * @description Définition du modèle de données pour les Risques.
 * Utilise Sequelize pour la gestion du schéma et des relations.
 */

import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { Organigramme } from '../organigramme/organigramme.model';
import { User } from '../users/user.model';
import { Department } from '../departments/department.model';
import { Incident } from '../incidents/incident.model';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';

/**
 * Niveaux de sévérité d'un risque / Cotation générique
 */
export enum RiskLevel {
    LOW = 'Faible',
    MEDIUM = 'Moyen',
    HIGH = 'Élevé',
    CRITICAL = 'Critique',
    LIMITED = 'Limité',
}

/**
 * Probabilité du risque
 */
export enum RiskProbability {
    RARE = 'Rare', // 1
    POSSIBLE = 'Possible', // 2
    PROBABLE = 'Probable', // 4
    PERMANENT = 'Permanent', // 8
}

/**
 * Impact du risque
 */
export enum RiskImpact {
    LIMITÉ = 'Limité', // 1
    MOYEN = 'Moyen', // 4
    SIGNIFICATIF = 'Significatif', // 16
    CRITIQUE = 'Critique', // 64
}

/**
 * Niveau de maîtrise (DMR)
 */
export enum MaitriseLevel {
    FAIBLE = 'Faible', // 4
    LIMITÉ = 'Limité', // 3
    MOYEN = 'Moyen', // 2
    ÉLEVÉ = 'Elevé', // 1
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
    
    // Nouveaux champs d'évaluation complète
    public macroProcessus!: string | null;
    public processus!: string | null;
    
    public probabilite!: RiskProbability | null;
    public cotationProbabilite!: number | null;
    
    public impact!: RiskImpact | null;
    public cotationImpact!: number | null;
    
    public cotationRisqueBrut!: RiskLevel | null;
    public niveauCotationRisqueBrut!: number | null;
    
    public dmrExistant!: string | null;
    public niveauMaitrise!: MaitriseLevel | null;
    public cotationDmr!: number | null;
    
    // Le risque net correspondra au niveauGlobal (RiskLevel) et aura sa propre valeur calculée
    public cotationRisqueNet!: RiskLevel | null;
    public niveauCotationRisqueNet!: number | null;
    
    public planActionTraitement!: string | null;

    public prochaineEcheance!: Date | null;
    public dernierTraitement!: Date | null;
    public aiAnalysisScore!: number | null;
    public aiAnalysisImpact!: string | null;
    public aiAnalysisTendance!: string | null;
    public aiAnalysisSuggestion!: string | null;
    public aiAnalysisDate!: Date | null;
    public incidentId!: number | null; // Traçabilité: incident d'origine
    public is_deleted!: boolean;
    public deleted_at!: Date | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Associations
    public riskManager?: User;
    public riskAgent?: User;
    public responsableTraitement?: Organigramme;
    public departement?: Department;
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
        macroProcessus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        processus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        probabilite: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [Object.values(RiskProbability)],
            },
        },
        cotationProbabilite: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        impact: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [Object.values(RiskImpact)],
            },
        },
        cotationImpact: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cotationRisqueBrut: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        niveauCotationRisqueBrut: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        dmrExistant: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        niveauMaitrise: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [Object.values(MaitriseLevel)],
            },
        },
        cotationDmr: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cotationRisqueNet: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        niveauCotationRisqueNet: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        planActionTraitement: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // Organigramme responsable du département (Responsable de traitement)
        responsableTraitementId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'organigramme',
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
        incidentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'incidents',
                key: 'id',
            },
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'risks',
        ...softDeleteModelOptions,
        hooks: {
            beforeValidate: (risk: Risk) => {
                // Normalisation de la fréquence (ex: "trimestriel" -> "Trimestriel")
                if (risk.frequenceTraitement && typeof risk.frequenceTraitement === 'string') {
                    const normalized = risk.frequenceTraitement.charAt(0).toUpperCase() + risk.frequenceTraitement.slice(1).toLowerCase();
                    if (Object.values(PeriodicFrequency).includes(normalized as any)) {
                        risk.frequenceTraitement = normalized as any;
                    }
                }
                
                // --- Calculs Automatiques de Cotation ---
                
                // 1. Détermination de la cotation de la probabilité
                if (risk.probabilite) {
                    switch (risk.probabilite) {
                        case RiskProbability.RARE: risk.cotationProbabilite = 1; break;
                        case RiskProbability.POSSIBLE: risk.cotationProbabilite = 2; break;
                        case RiskProbability.PROBABLE: risk.cotationProbabilite = 4; break;
                        case RiskProbability.PERMANENT: risk.cotationProbabilite = 8; break;
                        default: risk.cotationProbabilite = null;
                    }
                }

                // 2. Détermination de la cotation de l'impact
                if (risk.impact) {
                    switch (risk.impact) {
                        case RiskImpact.LIMITÉ: risk.cotationImpact = 1; break;
                        case RiskImpact.MOYEN: risk.cotationImpact = 4; break;
                        case RiskImpact.SIGNIFICATIF: risk.cotationImpact = 16; break;
                        case RiskImpact.CRITIQUE: risk.cotationImpact = 64; break;
                        default: risk.cotationImpact = null;
                    }
                }

                // 3. Calcul du Risque Brut
                if (risk.cotationProbabilite && risk.cotationImpact) {
                    const brut = risk.cotationProbabilite * risk.cotationImpact;
                    risk.niveauCotationRisqueBrut = brut;
                    
                    if (brut <= 8) risk.cotationRisqueBrut = RiskLevel.LOW;
                    else if (brut <= 32) risk.cotationRisqueBrut = RiskLevel.LIMITED;
                    else if (brut <= 128) risk.cotationRisqueBrut = RiskLevel.MEDIUM;
                    else risk.cotationRisqueBrut = RiskLevel.HIGH;
                }

                // 4. Détermination de la cotation du DMR
                if (risk.niveauMaitrise) {
                    switch (risk.niveauMaitrise) {
                        case MaitriseLevel.FAIBLE: risk.cotationDmr = 4; break;
                        case MaitriseLevel.LIMITÉ: risk.cotationDmr = 3; break;
                        case MaitriseLevel.MOYEN: risk.cotationDmr = 2; break;
                        case MaitriseLevel.ÉLEVÉ: risk.cotationDmr = 1; break;
                        default: risk.cotationDmr = null;
                    }
                }

                // 5. Calcul du Risque Net
                if (risk.niveauCotationRisqueBrut && risk.cotationDmr) {
                    const net = risk.niveauCotationRisqueBrut * risk.cotationDmr;
                    risk.niveauCotationRisqueNet = net;
                    
                    if (net <= 32) risk.cotationRisqueNet = RiskLevel.LOW;
                    else if (net <= 128) risk.cotationRisqueNet = RiskLevel.LIMITED;
                    else if (net <= 512) risk.cotationRisqueNet = RiskLevel.MEDIUM;
                    else risk.cotationRisqueNet = RiskLevel.HIGH;

                    // Synchronisation de l'ancien champ 'niveauRisque' avec le risque net calculé
                    risk.niveauRisque = risk.cotationRisqueNet;
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
// Relations avec les utilisateurs/organigramme selon leur rôle dans le traitement du risque
Risk.belongsTo(Organigramme, { foreignKey: 'responsableTraitementId', as: 'responsableTraitement' });
Risk.belongsTo(User, { foreignKey: 'riskManagerId', as: 'riskManager' });
Risk.belongsTo(User, { foreignKey: 'riskAgentId', as: 'riskAgent' });

// Inverse des relations pour faciliter les requêtes
Department.hasMany(Risk, { foreignKey: 'departementId', as: 'risks' });
User.hasMany(Risk, { foreignKey: 'riskManagerId', as: 'managedRisks' });
User.hasMany(Risk, { foreignKey: 'riskAgentId', as: 'assignedRisks' });
Organigramme.hasMany(Risk, { foreignKey: 'responsableTraitementId', as: 'treatableRisks' });

// Association avec l'incident d'origine (Traçabilité)
Risk.belongsTo(Incident, { foreignKey: 'incidentId', as: 'incidentSource' });
Incident.hasMany(Risk, { foreignKey: 'incidentId', as: 'risquesGeneres' });
