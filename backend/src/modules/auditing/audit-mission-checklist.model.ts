import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { AuditMission } from './audit-mission.model';

export class AuditMissionChecklistItem extends Model {
    public id!: number;
    public missionId!: number;
    public texte!: string;
    public estFait!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditMissionChecklistItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        missionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'audit_missions',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        texte: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estFait: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'audit_mission_checklist_items',
    }
);

AuditMission.hasMany(AuditMissionChecklistItem, { foreignKey: 'missionId', as: 'checklistItems', onDelete: 'CASCADE' });
AuditMissionChecklistItem.belongsTo(AuditMission, { foreignKey: 'missionId', as: 'mission' });
