import { DataTypes } from 'sequelize';
import sequelize from '../../database';
import { LookupAwareModel } from '../../database/lookups/lookup-aware.model';
import {
    buildLookupAttribute,
    registerLookupAccessors,
    registerLookupAssociations,
} from '../../database/lookups/lookup-models';
import { softDeleteAttributes, softDeleteModelOptions } from '../../utils/soft-delete';
import { User } from '../users/user.model';
import { AuditPlan } from './audit-plan.model';

export class AuditPlanWorkflowEvent extends LookupAwareModel {
    public id!: number;
    public planId!: number;
    public transitionId!: number;
    public fromStatusId!: number | null;
    public toStatusId!: number;
    public actorUserId!: number;
    public comment!: string | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditPlanWorkflowEvent.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        planId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'audit_plans',
                key: 'id',
            },
        },
        transitionId: buildLookupAttribute('auditPlanWorkflowEvent.transition'),
        fromStatusId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'from_status_id',
            references: {
                model: 'audit_plan_statuses',
                key: 'id',
            },
        },
        toStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'to_status_id',
            references: {
                model: 'audit_plan_statuses',
                key: 'id',
            },
        },
        actorUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'audit_plan_workflow_events',
        ...softDeleteModelOptions,
    }
);

AuditPlan.hasMany(AuditPlanWorkflowEvent, { foreignKey: 'planId', as: 'workflowEvents' });
AuditPlanWorkflowEvent.belongsTo(AuditPlan, { foreignKey: 'planId', as: 'plan' });
AuditPlanWorkflowEvent.belongsTo(User, { foreignKey: 'actorUserId', as: 'actor' });
User.hasMany(AuditPlanWorkflowEvent, { foreignKey: 'actorUserId', as: 'auditPlanWorkflowActions' });

registerLookupAccessors('auditPlanWorkflowEvent', AuditPlanWorkflowEvent);
registerLookupAssociations('auditPlanWorkflowEvent', AuditPlanWorkflowEvent);

export default AuditPlanWorkflowEvent;
