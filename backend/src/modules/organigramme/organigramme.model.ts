import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';

/**
 * Modèle représentant la table 'organigramme'.
 * Contient seulement l'attribut 'nom' (intitulé).
 */
export class Organigramme extends Model {
    public id!: number;
    public nom!: string;
}

Organigramme.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'organigramme',
    }
);
