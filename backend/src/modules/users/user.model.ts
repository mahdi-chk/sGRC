import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { Department } from '../departments/department.model';

import { UserRole } from './user.roles';

export class User extends Model {
    public id!: number;
    public nom!: string;
    public prenom!: string;
    public mail!: string;
    public telephone!: string;
    public poste!: string;
    public departementId!: number;
    public password_hash!: string;
    public password_salt!: string;
    public role!: UserRole;
    public readonly departement?: Department;
}

User.init(
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
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        poste: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        departementId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'departments',
                key: 'id',
            }
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password_salt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: UserRole.AUDITEUR,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);

User.belongsTo(Department, { foreignKey: 'departementId', as: 'departement' });
Department.hasMany(User, { foreignKey: 'departementId', as: 'users' });

