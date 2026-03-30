import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';

export class Department extends Model {
    public id!: number;
    public nom!: string;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
}

Department.init(
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
        tableName: 'departments',
        ...softDeleteModelOptions,
        indexes: [
            {
                unique: true,
                fields: ['nom'],
            },
        ],
    }
);
