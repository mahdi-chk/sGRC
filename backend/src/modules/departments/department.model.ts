import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';

export class Department extends Model {
    public id!: number;
    public nom!: string;
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
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'departments',
    }
);
