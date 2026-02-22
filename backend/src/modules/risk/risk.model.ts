import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';
import { Department } from '../departments/department.model';

export enum RiskLevel {
    LOW = 'Faible',
    MEDIUM = 'Moyen',
    HIGH = 'Élevé',
    CRITICAL = 'Critique',
}

export enum RiskStatus {
    OPEN = 'Ouvert',
    IN_PROGRESS = 'En cours',
    TREATED = 'Traité',
    CLOSED = 'Clôturé',
}

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
        niveauRisque: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [Object.values(RiskLevel)],
            },
        },
        responsableTraitementId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
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
        statut: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: RiskStatus.OPEN,
            validate: {
                isIn: [Object.values(RiskStatus)],
            },
        },
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

// Associations
Risk.belongsTo(Department, { foreignKey: 'departementId', as: 'departement' });
Risk.belongsTo(User, { foreignKey: 'responsableTraitementId', as: 'responsableTraitement' });
Risk.belongsTo(User, { foreignKey: 'riskManagerId', as: 'riskManager' });
Risk.belongsTo(User, { foreignKey: 'riskAgentId', as: 'riskAgent' });

Department.hasMany(Risk, { foreignKey: 'departementId', as: 'risks' });
User.hasMany(Risk, { foreignKey: 'riskManagerId', as: 'managedRisks' });
User.hasMany(Risk, { foreignKey: 'riskAgentId', as: 'assignedRisks' });
User.hasMany(Risk, { foreignKey: 'responsableTraitementId', as: 'treatableRisks' });
