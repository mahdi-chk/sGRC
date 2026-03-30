import { Model, DataTypes } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';
import { AuditMission } from './audit-mission.model';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';

export class AuditEvidence extends Model {
    public id!: number;
    public missionId!: number;
    public filename!: string;
    public path!: string;
    public uploadedById!: number;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditEvidence.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    missionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'audit_missions',
            key: 'id'
        }
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uploadedById: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    ...softDeleteAttributes
}, {
    sequelize,
    tableName: 'audit_evidences',
    ...softDeleteModelOptions
});

AuditMission.hasMany(AuditEvidence, { foreignKey: 'missionId', as: 'evidences' });
AuditEvidence.belongsTo(AuditMission, { foreignKey: 'missionId', as: 'mission' });

User.hasMany(AuditEvidence, { foreignKey: 'uploadedById', as: 'uploadedEvidences' });
AuditEvidence.belongsTo(User, { foreignKey: 'uploadedById', as: 'uploader' });
