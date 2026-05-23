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
import { Department } from '../departments/department.model';
import { CONTROL_EVALUATION_LOOKUP_KEYS } from './control-evaluation-lookup-codes';

export class ControlEvaluationComponent extends LookupAwareModel {
    public id!: number;
    public code!: string;
    public title!: string;
    public description!: string | null;
    public orderIndex!: number;
    public isActive!: boolean;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ControlEvaluationComponent.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        code: { type: DataTypes.STRING(80), allowNull: false },
        title: { type: DataTypes.STRING(180), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'control_evaluation_components',
        ...softDeleteModelOptions,
    }
);

export class ControlEvaluationPrinciple extends LookupAwareModel {
    public id!: number;
    public componentId!: number;
    public code!: string;
    public title!: string;
    public description!: string | null;
    public orderIndex!: number;
    public isActive!: boolean;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ControlEvaluationPrinciple.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        componentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'control_evaluation_components', key: 'id' },
        },
        code: { type: DataTypes.STRING(80), allowNull: false },
        title: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'control_evaluation_principles',
        ...softDeleteModelOptions,
    }
);

export class ControlEvaluationFocusPoint extends LookupAwareModel {
    public id!: number;
    public principleId!: number;
    public title!: string;
    public description!: string | null;
    public orderIndex!: number;
    public isActive!: boolean;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ControlEvaluationFocusPoint.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        principleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'control_evaluation_principles', key: 'id' },
        },
        title: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'control_evaluation_focus_points',
        ...softDeleteModelOptions,
    }
);

export class ControlEvaluationCampaign extends LookupAwareModel {
    public id!: number;
    public title!: string;
    public description!: string | null;
    public statusId!: number;
    public objectiveTypeId!: number;
    public scopeTypeId!: number;
    public scopeLabel!: string | null;
    public riskTolerance!: string | null;
    public ownerUserId!: number | null;
    public departmentId!: number | null;
    public startDate!: Date | null;
    public dueDate!: Date | null;
    public completedAt!: Date | null;
    public validatedById!: number | null;
    public validatedAt!: Date | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ControlEvaluationCampaign.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        statusId: buildLookupAttribute(CONTROL_EVALUATION_LOOKUP_KEYS.CAMPAIGN_STATUS),
        objectiveTypeId: buildLookupAttribute(CONTROL_EVALUATION_LOOKUP_KEYS.OBJECTIVE_TYPE),
        scopeTypeId: buildLookupAttribute(CONTROL_EVALUATION_LOOKUP_KEYS.SCOPE_TYPE),
        scopeLabel: { type: DataTypes.STRING(180), allowNull: true },
        riskTolerance: { type: DataTypes.TEXT, allowNull: true },
        ownerUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'departments', key: 'id' },
        },
        startDate: { type: DataTypes.DATE, allowNull: true },
        dueDate: { type: DataTypes.DATE, allowNull: true },
        completedAt: { type: DataTypes.DATE, allowNull: true },
        validatedById: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
        },
        validatedAt: { type: DataTypes.DATE, allowNull: true },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'control_evaluation_campaigns',
        ...softDeleteModelOptions,
    }
);

export class ControlPrincipleAssessment extends LookupAwareModel {
    public id!: number;
    public campaignId!: number;
    public componentId!: number;
    public principleId!: number;
    public implementationAnswerId!: number;
    public operatingAnswerId!: number;
    public resultId!: number;
    public score!: number;
    public justification!: string | null;
    public evaluatorUserId!: number | null;
    public evaluatedAt!: Date | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ControlPrincipleAssessment.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        campaignId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'control_evaluation_campaigns', key: 'id' },
        },
        componentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'control_evaluation_components', key: 'id' },
        },
        principleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'control_evaluation_principles', key: 'id' },
        },
        implementationAnswerId: buildLookupAttribute(CONTROL_EVALUATION_LOOKUP_KEYS.IMPLEMENTATION_ANSWER),
        operatingAnswerId: buildLookupAttribute(CONTROL_EVALUATION_LOOKUP_KEYS.OPERATING_ANSWER),
        resultId: buildLookupAttribute(CONTROL_EVALUATION_LOOKUP_KEYS.ASSESSMENT_RESULT),
        score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        justification: { type: DataTypes.TEXT, allowNull: true },
        evaluatorUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
        },
        evaluatedAt: { type: DataTypes.DATE, allowNull: true },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'control_principle_assessments',
        ...softDeleteModelOptions,
    }
);

export class ControlDeficiency extends LookupAwareModel {
    public id!: number;
    public campaignId!: number;
    public assessmentId!: number | null;
    public componentId!: number | null;
    public principleId!: number | null;
    public title!: string;
    public description!: string | null;
    public severityId!: number;
    public statusId!: number;
    public isMajor!: boolean;
    public impact!: string | null;
    public ownerUserId!: number | null;
    public dueDate!: Date | null;
    public correctiveAction!: string | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ControlDeficiency.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        campaignId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'control_evaluation_campaigns', key: 'id' },
        },
        assessmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'control_principle_assessments', key: 'id' },
        },
        componentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'control_evaluation_components', key: 'id' },
        },
        principleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'control_evaluation_principles', key: 'id' },
        },
        title: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        severityId: buildLookupAttribute(CONTROL_EVALUATION_LOOKUP_KEYS.DEFICIENCY_SEVERITY),
        statusId: buildLookupAttribute(CONTROL_EVALUATION_LOOKUP_KEYS.DEFICIENCY_STATUS),
        isMajor: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        impact: { type: DataTypes.TEXT, allowNull: true },
        ownerUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
        },
        dueDate: { type: DataTypes.DATE, allowNull: true },
        correctiveAction: { type: DataTypes.TEXT, allowNull: true },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'control_deficiencies',
        ...softDeleteModelOptions,
    }
);

export class ControlCompensatingMeasure extends LookupAwareModel {
    public id!: number;
    public deficiencyId!: number;
    public title!: string;
    public description!: string | null;
    public statusId!: number;
    public ownerUserId!: number | null;
    public dueDate!: Date | null;
    public effectivenessNote!: string | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ControlCompensatingMeasure.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        deficiencyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'control_deficiencies', key: 'id' },
        },
        title: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        statusId: buildLookupAttribute(CONTROL_EVALUATION_LOOKUP_KEYS.MEASURE_STATUS),
        ownerUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
        },
        dueDate: { type: DataTypes.DATE, allowNull: true },
        effectivenessNote: { type: DataTypes.TEXT, allowNull: true },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'control_compensating_measures',
        ...softDeleteModelOptions,
    }
);

export class ControlEvaluationEvidence extends LookupAwareModel {
    public id!: number;
    public campaignId!: number;
    public assessmentId!: number | null;
    public deficiencyId!: number | null;
    public title!: string;
    public sourceTypeId!: number;
    public sourceId!: number | null;
    public filename!: string | null;
    public filePath!: string | null;
    public mimeType!: string | null;
    public ownerUserId!: number | null;
    public capturedAt!: Date | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ControlEvaluationEvidence.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        campaignId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'control_evaluation_campaigns', key: 'id' },
        },
        assessmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'control_principle_assessments', key: 'id' },
        },
        deficiencyId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'control_deficiencies', key: 'id' },
        },
        title: { type: DataTypes.STRING(255), allowNull: false },
        sourceTypeId: buildLookupAttribute(CONTROL_EVALUATION_LOOKUP_KEYS.EVIDENCE_SOURCE_TYPE),
        sourceId: { type: DataTypes.INTEGER, allowNull: true },
        filename: { type: DataTypes.STRING(255), allowNull: true },
        filePath: { type: DataTypes.STRING(500), allowNull: true },
        mimeType: { type: DataTypes.STRING(120), allowNull: true },
        ownerUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
        },
        capturedAt: { type: DataTypes.DATE, allowNull: true },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'control_evaluation_evidence',
        ...softDeleteModelOptions,
    }
);

export class ControlEvaluationConclusion extends LookupAwareModel {
    public id!: number;
    public campaignId!: number;
    public resultId!: number;
    public score!: number;
    public summary!: string | null;
    public justification!: string | null;
    public validatedById!: number | null;
    public validatedAt!: Date | null;
    public is_deleted!: boolean;
    public deleted_at!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ControlEvaluationConclusion.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        campaignId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'control_evaluation_campaigns', key: 'id' },
        },
        resultId: buildLookupAttribute(CONTROL_EVALUATION_LOOKUP_KEYS.CONCLUSION_RESULT),
        score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        summary: { type: DataTypes.TEXT, allowNull: true },
        justification: { type: DataTypes.TEXT, allowNull: true },
        validatedById: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
        },
        validatedAt: { type: DataTypes.DATE, allowNull: true },
        ...softDeleteAttributes,
    },
    {
        sequelize,
        tableName: 'control_evaluation_conclusions',
        ...softDeleteModelOptions,
    }
);

ControlEvaluationComponent.hasMany(ControlEvaluationPrinciple, { foreignKey: 'componentId', as: 'principles' });
ControlEvaluationPrinciple.belongsTo(ControlEvaluationComponent, { foreignKey: 'componentId', as: 'component' });
ControlEvaluationPrinciple.hasMany(ControlEvaluationFocusPoint, { foreignKey: 'principleId', as: 'focusPoints' });
ControlEvaluationFocusPoint.belongsTo(ControlEvaluationPrinciple, { foreignKey: 'principleId', as: 'principle' });

ControlEvaluationCampaign.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });
ControlEvaluationCampaign.belongsTo(User, { foreignKey: 'validatedById', as: 'validatedBy' });
ControlEvaluationCampaign.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
ControlEvaluationCampaign.hasMany(ControlPrincipleAssessment, { foreignKey: 'campaignId', as: 'assessments' });
ControlEvaluationCampaign.hasMany(ControlDeficiency, { foreignKey: 'campaignId', as: 'deficiencies' });
ControlEvaluationCampaign.hasMany(ControlEvaluationEvidence, { foreignKey: 'campaignId', as: 'evidence' });
ControlEvaluationCampaign.hasMany(ControlEvaluationConclusion, { foreignKey: 'campaignId', as: 'conclusions' });

ControlPrincipleAssessment.belongsTo(ControlEvaluationCampaign, { foreignKey: 'campaignId', as: 'campaign' });
ControlPrincipleAssessment.belongsTo(ControlEvaluationComponent, { foreignKey: 'componentId', as: 'component' });
ControlPrincipleAssessment.belongsTo(ControlEvaluationPrinciple, { foreignKey: 'principleId', as: 'principle' });
ControlPrincipleAssessment.belongsTo(User, { foreignKey: 'evaluatorUserId', as: 'evaluator' });
ControlPrincipleAssessment.hasMany(ControlDeficiency, { foreignKey: 'assessmentId', as: 'deficiencies' });
ControlPrincipleAssessment.hasMany(ControlEvaluationEvidence, { foreignKey: 'assessmentId', as: 'evidence' });

ControlDeficiency.belongsTo(ControlEvaluationCampaign, { foreignKey: 'campaignId', as: 'campaign' });
ControlDeficiency.belongsTo(ControlPrincipleAssessment, { foreignKey: 'assessmentId', as: 'assessment' });
ControlDeficiency.belongsTo(ControlEvaluationComponent, { foreignKey: 'componentId', as: 'component' });
ControlDeficiency.belongsTo(ControlEvaluationPrinciple, { foreignKey: 'principleId', as: 'principle' });
ControlDeficiency.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });
ControlDeficiency.hasMany(ControlCompensatingMeasure, { foreignKey: 'deficiencyId', as: 'compensatingMeasures' });

ControlCompensatingMeasure.belongsTo(ControlDeficiency, { foreignKey: 'deficiencyId', as: 'deficiency' });
ControlCompensatingMeasure.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });

ControlEvaluationEvidence.belongsTo(ControlEvaluationCampaign, { foreignKey: 'campaignId', as: 'campaign' });
ControlEvaluationEvidence.belongsTo(ControlPrincipleAssessment, { foreignKey: 'assessmentId', as: 'assessment' });
ControlEvaluationEvidence.belongsTo(ControlDeficiency, { foreignKey: 'deficiencyId', as: 'deficiency' });
ControlEvaluationEvidence.belongsTo(User, { foreignKey: 'ownerUserId', as: 'owner' });

ControlEvaluationConclusion.belongsTo(ControlEvaluationCampaign, { foreignKey: 'campaignId', as: 'campaign' });
ControlEvaluationConclusion.belongsTo(User, { foreignKey: 'validatedById', as: 'validatedBy' });

registerLookupAccessors('controlEvaluationCampaign', ControlEvaluationCampaign);
registerLookupAssociations('controlEvaluationCampaign', ControlEvaluationCampaign);
registerLookupAccessors('controlPrincipleAssessment', ControlPrincipleAssessment);
registerLookupAssociations('controlPrincipleAssessment', ControlPrincipleAssessment);
registerLookupAccessors('controlDeficiency', ControlDeficiency);
registerLookupAssociations('controlDeficiency', ControlDeficiency);
registerLookupAccessors('controlCompensatingMeasure', ControlCompensatingMeasure);
registerLookupAssociations('controlCompensatingMeasure', ControlCompensatingMeasure);
registerLookupAccessors('controlEvaluationEvidence', ControlEvaluationEvidence);
registerLookupAssociations('controlEvaluationEvidence', ControlEvaluationEvidence);
registerLookupAccessors('controlEvaluationConclusion', ControlEvaluationConclusion);
registerLookupAssociations('controlEvaluationConclusion', ControlEvaluationConclusion);
