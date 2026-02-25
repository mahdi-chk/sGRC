/**
 * @file comment.model.ts
 * @description Modèle pour les commentaires et preuves (evidences) associés aux risques.
 */

import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';
import { Risk } from './risk.model';

/**
 * Classe représentant un Commentaire ou une Preuve de traitement.
 */
export class Comment extends Model {
    public id!: number;
    public content!: string;
    public riskId!: number;
    public userId!: number;
    public pieceJointe!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialisation du schéma de la table 'risk_comments'
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // Id du risque associé
        riskId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'risks',
                key: 'id',
            },
        },
        // Id de l'auteur du commentaire
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        // Chemin vers un fichier joint (preuve facultative)
        pieceJointe: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'risk_comments',
    }
);

/**
 * --- RELATIONS ---
 */

// Un commentaire est lié à un risque et à un utilisateur
Comment.belongsTo(Risk, { foreignKey: 'riskId', as: 'risk' });
Risk.hasMany(Comment, { foreignKey: 'riskId', as: 'comments' });

Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'riskComments' });
