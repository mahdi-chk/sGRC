import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { AuditMission } from './audit-mission.model';
import { User } from '../users/user.model';

export class AuditMissionActionPlanItem extends Model {
    public id!: number;
    public missionId!: number;
    public ordre!: number;
    public regleDnssi!: string;
    public recommandations!: string;
    public horizon!: string | null;
    public priorite!: number | null;
    public responsableId!: number | null;
    public responsableNom!: string | null;
    public echeance!: Date | null;
    public etatAvancement!: string;
    public sourceExcelFile!: string | null;
    public sourceExcelSheet!: string | null;
    public sourceExcelRow!: number | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditMissionActionPlanItem.init(
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
        ordre: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        regleDnssi: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        recommandations: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        horizon: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        priorite: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        responsableId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        responsableNom: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        echeance: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        etatAvancement: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'nok',
        },
        sourceExcelFile: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        sourceExcelSheet: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        sourceExcelRow: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'audit_mission_action_plan_items',
        timestamps: true,
        ...softDeleteModelOptions,
        indexes: [
            { fields: ['missionId'] },
            { fields: ['responsableId'] },
            { fields: ['etatAvancement'] },
            { fields: ['echeance'] },
        ],
    }
);

AuditMission.hasMany(AuditMissionActionPlanItem, { foreignKey: 'missionId', as: 'actionPlanItems', onDelete: 'CASCADE' });
AuditMissionActionPlanItem.belongsTo(AuditMission, { foreignKey: 'missionId', as: 'mission' });
AuditMissionActionPlanItem.belongsTo(User, { foreignKey: 'responsableId', as: 'responsable' });
