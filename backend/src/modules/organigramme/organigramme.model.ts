import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';

/**
 * Modèle représentant la table 'organigramme'.
 * Contient seulement l'attribut 'nom' (intitulé).
 */
export class Organigramme extends Model {
    public id!: number;
    public nom!: string;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
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
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'organigramme',
        ...softDeleteModelOptions,
        indexes: [
            {
                unique: true,
                fields: ['nom'],
            },
        ],
    }
);
