import { DataTypes } from 'sequelize';
import sequelize from '../../database';
import { Organigramme } from '../organigramme/organigramme.model';
import { User } from '../users/user.model';
import { Department } from '../departments/department.model';
import { Incident } from '../incidents/incident.model';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { buildLookupCodeMap } from '../../database/lookups/lookup-registry';
import { LookupAwareModel } from '../../database/lookups/lookup-aware.model';
import {
    buildLookupAttribute,
    getRequiredLookupId,
    registerLookupAccessors,
    registerLookupAssociations,
} from '../../database/lookups/lookup-models';

export const RiskLevel = buildLookupCodeMap('risk.niveauRisque');
export type RiskLevel = string;

export const RiskProbability = buildLookupCodeMap('risk.probabilite');
export type RiskProbability = string;

export const RiskImpact = buildLookupCodeMap('risk.impact');
export type RiskImpact = string;

export const MaitriseLevel = buildLookupCodeMap('risk.niveauMaitrise');
export type MaitriseLevel = string;

export const RiskStatus = buildLookupCodeMap('risk.statut');
export type RiskStatus = string;

export const PeriodicFrequency = buildLookupCodeMap('risk.frequenceTraitement');
export type PeriodicFrequency = string;

export class Risk extends LookupAwareModel {
    public id!: number;
    public titre!: string;
    public explication!: string;
    public domaine!: string;
    public departementId!: number;
    public dateEcheance!: Date;
    public niveauRisqueId!: number;
    public niveauRisque!: RiskLevel;
    public responsableTraitementId!: number;
    public riskManagerId!: number;
    public riskAgentId!: number | null;
    public statutId!: number;
    public statut!: RiskStatus;
    public pieceJustificative!: string | null;
    public frequenceTraitementId!: number;
    public frequenceTraitement!: PeriodicFrequency;
    public macroProcessus!: string | null;
    public processus!: string | null;
    public probabiliteId!: number | null;
    public probabilite!: RiskProbability | null;
    public cotationProbabilite!: number | null;
    public impactId!: number | null;
    public impact!: RiskImpact | null;
    public cotationImpact!: number | null;
    public cotationRisqueBrutId!: number | null;
    public cotationRisqueBrut!: RiskLevel | null;
    public niveauCotationRisqueBrut!: number | null;
    public dmrExistant!: string | null;
    public niveauMaitriseId!: number | null;
    public niveauMaitrise!: MaitriseLevel | null;
    public cotationDmr!: number | null;
    public cotationRisqueNetId!: number | null;
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
    public incidentId!: number | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public riskManager?: User;
    public riskAgent?: User;
    public responsableTraitement?: Organigramme;
    public departement?: Department;
}

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
        niveauRisqueId: buildLookupAttribute('risk.niveauRisque'),
        macroProcessus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        processus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        probabiliteId: buildLookupAttribute('risk.probabilite'),
        cotationProbabilite: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        impactId: buildLookupAttribute('risk.impact'),
        cotationImpact: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cotationRisqueBrutId: buildLookupAttribute('risk.cotationRisqueBrut'),
        niveauCotationRisqueBrut: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        dmrExistant: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        niveauMaitriseId: buildLookupAttribute('risk.niveauMaitrise'),
        cotationDmr: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cotationRisqueNetId: buildLookupAttribute('risk.cotationRisqueNet'),
        niveauCotationRisqueNet: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        planActionTraitement: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        responsableTraitementId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'organigramme',
                key: 'id',
            },
        },
        riskManagerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        riskAgentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        statutId: buildLookupAttribute('risk.statut'),
        pieceJustificative: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        frequenceTraitementId: buildLookupAttribute('risk.frequenceTraitement'),
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
                if (risk.probabilite) {
                    switch (risk.probabilite) {
                        case RiskProbability.RARE:
                            risk.cotationProbabilite = 1;
                            break;
                        case RiskProbability.POSSIBLE:
                            risk.cotationProbabilite = 2;
                            break;
                        case RiskProbability.PROBABLE:
                            risk.cotationProbabilite = 4;
                            break;
                        case RiskProbability.PERMANENT:
                            risk.cotationProbabilite = 8;
                            break;
                        default:
                            risk.cotationProbabilite = null;
                    }
                }

                if (risk.impact) {
                    switch (risk.impact) {
                        case RiskImpact.LIMITED:
                            risk.cotationImpact = 1;
                            break;
                        case RiskImpact.MEDIUM:
                            risk.cotationImpact = 4;
                            break;
                        case RiskImpact.SIGNIFICANT:
                            risk.cotationImpact = 16;
                            break;
                        case RiskImpact.CRITICAL:
                            risk.cotationImpact = 64;
                            break;
                        default:
                            risk.cotationImpact = null;
                    }
                }

                if (risk.cotationProbabilite && risk.cotationImpact) {
                    const brut = risk.cotationProbabilite * risk.cotationImpact;
                    risk.niveauCotationRisqueBrut = brut;

                    if (brut <= 8) {
                        risk.cotationRisqueBrutId = getRequiredLookupId('risk.cotationRisqueBrut', RiskLevel.LOW);
                    } else if (brut <= 32) {
                        risk.cotationRisqueBrutId = getRequiredLookupId('risk.cotationRisqueBrut', RiskLevel.LIMITED);
                    } else if (brut <= 128) {
                        risk.cotationRisqueBrutId = getRequiredLookupId('risk.cotationRisqueBrut', RiskLevel.MEDIUM);
                    } else {
                        risk.cotationRisqueBrutId = getRequiredLookupId('risk.cotationRisqueBrut', RiskLevel.HIGH);
                    }
                }

                if (risk.niveauMaitrise) {
                    switch (risk.niveauMaitrise) {
                        case MaitriseLevel.FAIBLE:
                            risk.cotationDmr = 4;
                            break;
                        case MaitriseLevel.LIMITED:
                            risk.cotationDmr = 3;
                            break;
                        case MaitriseLevel.MEDIUM:
                            risk.cotationDmr = 2;
                            break;
                        case MaitriseLevel.HIGH:
                            risk.cotationDmr = 1;
                            break;
                        default:
                            risk.cotationDmr = null;
                    }
                }

                if (risk.niveauCotationRisqueBrut && risk.cotationDmr) {
                    const net = risk.niveauCotationRisqueBrut * risk.cotationDmr;
                    risk.niveauCotationRisqueNet = net;

                    if (net <= 32) {
                        risk.cotationRisqueNetId = getRequiredLookupId('risk.cotationRisqueNet', RiskLevel.LOW);
                    } else if (net <= 128) {
                        risk.cotationRisqueNetId = getRequiredLookupId('risk.cotationRisqueNet', RiskLevel.LIMITED);
                    } else if (net <= 512) {
                        risk.cotationRisqueNetId = getRequiredLookupId('risk.cotationRisqueNet', RiskLevel.MEDIUM);
                    } else {
                        risk.cotationRisqueNetId = getRequiredLookupId('risk.cotationRisqueNet', RiskLevel.HIGH);
                    }

                    risk.niveauRisqueId = risk.cotationRisqueNetId;
                }
            },
            beforeCreate: (risk: Risk) => {
                calculateNextDeadline(risk);
            },
            beforeUpdate: (risk: Risk) => {
                calculateNextDeadline(risk);
            },
        },
    }
);

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
        case PeriodicFrequency.QUOTIDIEN:
            next.setDate(next.getDate() + 1);
            break;
        case PeriodicFrequency.HEBDOMADAIRE:
            next.setDate(next.getDate() + 7);
            break;
        case PeriodicFrequency.BIMENSUEL:
            next.setDate(next.getDate() + 15);
            break;
        case PeriodicFrequency.MENSUEL:
            next.setMonth(next.getMonth() + 1);
            break;
        case PeriodicFrequency.TRIMESTRIEL:
            next.setMonth(next.getMonth() + 3);
            break;
        case PeriodicFrequency.SEMESTRIEL:
            next.setMonth(next.getMonth() + 6);
            break;
        case PeriodicFrequency.ANNUEL:
            next.setFullYear(next.getFullYear() + 1);
            break;
        default:
            return;
    }

    risk.prochaineEcheance = next;
}

Risk.belongsTo(Department, { foreignKey: 'departementId', as: 'departement' });
Risk.belongsTo(Organigramme, { foreignKey: 'responsableTraitementId', as: 'responsableTraitement' });
Risk.belongsTo(User, { foreignKey: 'riskManagerId', as: 'riskManager' });
Risk.belongsTo(User, { foreignKey: 'riskAgentId', as: 'riskAgent' });

Department.hasMany(Risk, { foreignKey: 'departementId', as: 'risks' });
User.hasMany(Risk, { foreignKey: 'riskManagerId', as: 'managedRisks' });
User.hasMany(Risk, { foreignKey: 'riskAgentId', as: 'assignedRisks' });
Organigramme.hasMany(Risk, { foreignKey: 'responsableTraitementId', as: 'treatableRisks' });

Risk.belongsTo(Incident, { foreignKey: 'incidentId', as: 'incidentSource' });
Incident.hasMany(Risk, { foreignKey: 'incidentId', as: 'risquesGeneres' });

registerLookupAccessors('risk', Risk);
registerLookupAssociations('risk', Risk);
