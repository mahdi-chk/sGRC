import { DataTypes } from 'sequelize';
import sequelize from '../../database';
import { User } from '../users/user.model';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { LookupAwareModel } from '../../database/lookups/lookup-aware.model';
import {
    buildLookupAttribute,
    registerLookupAccessors,
    registerLookupAssociations,
} from '../../database/lookups/lookup-models';

export class AuditPlan extends LookupAwareModel {
    public id!: number;
    public nom!: string;
    public calendrier!: string | null;
    public statusId!: number;
    public natureId!: number;
    public isTemplate!: boolean;
    public description!: string | null;
    public dateDebut!: Date | null;
    public dateFin!: Date | null;
    public createdById!: number;
    public submittedAt!: Date | null;
    public validatedDirectionAt!: Date | null;
    public validatedCouncilAt!: Date | null;
    public validatedCommitteeAt!: Date | null;
    public closedAt!: Date | null;
    public closedDefinitivelyAt!: Date | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditPlan.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        calendrier: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        statusId: buildLookupAttribute('auditPlan.status'),
        natureId: buildLookupAttribute('auditPlan.nature'),
        isTemplate: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        dateDebut: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dateFin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdById: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        submittedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        validatedDirectionAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        validatedCouncilAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        validatedCommitteeAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        closedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        closedDefinitivelyAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'audit_plans',
        ...softDeleteModelOptions,
    }
);

AuditPlan.belongsTo(User, { foreignKey: 'createdById', as: 'createdBy' });
User.hasMany(AuditPlan, { foreignKey: 'createdById', as: 'createdAuditPlans' });

registerLookupAccessors('auditPlan', AuditPlan);
registerLookupAssociations('auditPlan', AuditPlan);

export default AuditPlan;
