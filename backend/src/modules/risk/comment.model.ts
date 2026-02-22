import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';
import { Risk } from './risk.model';

export class Comment extends Model {
    public id!: number;
    public content!: string;
    public riskId!: number;
    public userId!: number;
    public pieceJointe!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

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
        riskId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'risks',
                key: 'id',
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
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

// Associations
Comment.belongsTo(Risk, { foreignKey: 'riskId', as: 'risk' });
Risk.hasMany(Comment, { foreignKey: 'riskId', as: 'comments' });

Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'riskComments' });
