import { Op } from 'sequelize';
import { LookupResolutionService } from '../../database/lookups/lookup.service';
import { getRequiredLookupId } from '../../database/lookups/lookup-models';
import { softDeleteInstance } from '../../utils/soft-delete';
import { User } from '../users/user.model';
import { Department } from '../departments/department.model';
import {
    CONTROL_EVALUATION_LOOKUP_KEYS,
    ControlAssessmentAnswer,
    ControlAssessmentResult,
    ControlConclusionResult,
    ControlDeficiencySeverity,
    ControlDeficiencyStatus,
    ControlEvaluationCampaignStatus,
} from './control-evaluation-lookup-codes';
import {
    ControlCompensatingMeasure,
    ControlDeficiency,
    ControlEvaluationCampaign,
    ControlEvaluationComponent,
    ControlEvaluationConclusion,
    ControlEvaluationEvidence,
    ControlEvaluationFocusPoint,
    ControlEvaluationPrinciple,
    ControlPrincipleAssessment,
} from './control-evaluation.models';

const personAttributes = ['id', 'prenom', 'nom'];

const cleanText = (value: unknown, fallback = ''): string =>
    String(value ?? fallback).trim();

const nullableText = (value: unknown): string | null => {
    const cleaned = cleanText(value);
    return cleaned || null;
};

const nullableDate = (value: unknown): Date | null => {
    if (!value) {
        return null;
    }

    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? null : date;
};

export class ControlEvaluationService {
    static getLookupOptions(key: string) {
        return LookupResolutionService.getStaticOptions(key);
    }

    static async getReference() {
        const components = await ControlEvaluationComponent.findAll({
            where: { isActive: true },
            include: [
                {
                    model: ControlEvaluationPrinciple,
                    as: 'principles',
                    required: false,
                    where: { isActive: true },
                    include: [
                        {
                            model: ControlEvaluationFocusPoint,
                            as: 'focusPoints',
                            required: false,
                            where: { isActive: true },
                        },
                    ],
                },
            ],
            order: [
                ['orderIndex', 'ASC'],
                [{ model: ControlEvaluationPrinciple, as: 'principles' }, 'orderIndex', 'ASC'],
                [
                    { model: ControlEvaluationPrinciple, as: 'principles' },
                    { model: ControlEvaluationFocusPoint, as: 'focusPoints' },
                    'orderIndex',
                    'ASC',
                ],
            ],
        });

        return { components };
    }

    static async listCampaigns() {
        const campaigns = await ControlEvaluationCampaign.findAll({
            include: [
                { model: User, as: 'owner', required: false, attributes: personAttributes },
                { model: User, as: 'validatedBy', required: false, attributes: personAttributes },
                { model: Department, as: 'department', required: false },
                { model: ControlEvaluationConclusion, as: 'conclusions', required: false },
            ],
            order: [['updatedAt', 'DESC']],
        });

        const ids = campaigns.map((campaign) => campaign.id);
        const summaries = await this.getCampaignSummaries(ids);

        return campaigns.map((campaign) => ({
            ...(campaign.toJSON() as Record<string, unknown>),
            summary: summaries[campaign.id] || this.emptySummary(),
        }));
    }

    static async getCampaign(id: number) {
        const campaign = await ControlEvaluationCampaign.findByPk(id, {
            include: [
                { model: User, as: 'owner', required: false, attributes: personAttributes },
                { model: User, as: 'validatedBy', required: false, attributes: personAttributes },
                { model: Department, as: 'department', required: false },
                {
                    model: ControlPrincipleAssessment,
                    as: 'assessments',
                    required: false,
                    include: [
                        { model: ControlEvaluationComponent, as: 'component', required: false },
                        { model: ControlEvaluationPrinciple, as: 'principle', required: false },
                        { model: User, as: 'evaluator', required: false, attributes: personAttributes },
                        {
                            model: ControlDeficiency,
                            as: 'deficiencies',
                            required: false,
                            include: [{ model: User, as: 'owner', required: false, attributes: personAttributes }],
                        },
                    ],
                },
                {
                    model: ControlDeficiency,
                    as: 'deficiencies',
                    required: false,
                    include: [
                        { model: ControlEvaluationComponent, as: 'component', required: false },
                        { model: ControlEvaluationPrinciple, as: 'principle', required: false },
                        { model: User, as: 'owner', required: false, attributes: personAttributes },
                        { model: ControlCompensatingMeasure, as: 'compensatingMeasures', required: false },
                    ],
                },
                { model: ControlEvaluationEvidence, as: 'evidence', required: false },
                { model: ControlEvaluationConclusion, as: 'conclusions', required: false },
            ],
            order: [
                [{ model: ControlPrincipleAssessment, as: 'assessments' }, 'componentId', 'ASC'],
                [{ model: ControlPrincipleAssessment, as: 'assessments' }, 'principleId', 'ASC'],
                [{ model: ControlDeficiency, as: 'deficiencies' }, 'createdAt', 'DESC'],
            ],
        });

        if (!campaign) {
            return null;
        }

        const summaries = await this.getCampaignSummaries([campaign.id]);
        return {
            ...(campaign.toJSON() as Record<string, unknown>),
            summary: summaries[campaign.id] || this.emptySummary(),
        };
    }

    static async createCampaign(data: Record<string, unknown>, actorUserId: number) {
        const payload = await LookupResolutionService.resolveEntityPayload('controlEvaluationCampaign', {
            title: cleanText(data.title, 'Nouvelle evaluation'),
            description: nullableText(data.description),
            status: data.status || ControlEvaluationCampaignStatus.DRAFT,
            objectiveType: data.objectiveType || 'combined',
            scopeType: data.scopeType || 'entity',
            scopeLabel: nullableText(data.scopeLabel),
            riskTolerance: nullableText(data.riskTolerance),
            ownerUserId: data.ownerUserId || actorUserId,
            departmentId: data.departmentId || null,
            startDate: nullableDate(data.startDate),
            dueDate: nullableDate(data.dueDate),
        });

        const campaign = await ControlEvaluationCampaign.create(payload as any);
        await this.ensureCampaignAssessments(campaign.id, actorUserId);
        return this.getCampaign(campaign.id);
    }

    static async updateCampaign(id: number, data: Record<string, unknown>) {
        const campaign = await ControlEvaluationCampaign.findByPk(id);
        if (!campaign) {
            return null;
        }

        const payload = await LookupResolutionService.resolveEntityPayload('controlEvaluationCampaign', {
            ...(data.title !== undefined ? { title: cleanText(data.title) } : {}),
            ...(data.description !== undefined ? { description: nullableText(data.description) } : {}),
            ...(data.status !== undefined ? { status: data.status } : {}),
            ...(data.objectiveType !== undefined ? { objectiveType: data.objectiveType } : {}),
            ...(data.scopeType !== undefined ? { scopeType: data.scopeType } : {}),
            ...(data.scopeLabel !== undefined ? { scopeLabel: nullableText(data.scopeLabel) } : {}),
            ...(data.riskTolerance !== undefined ? { riskTolerance: nullableText(data.riskTolerance) } : {}),
            ...(data.ownerUserId !== undefined ? { ownerUserId: data.ownerUserId || null } : {}),
            ...(data.departmentId !== undefined ? { departmentId: data.departmentId || null } : {}),
            ...(data.startDate !== undefined ? { startDate: nullableDate(data.startDate) } : {}),
            ...(data.dueDate !== undefined ? { dueDate: nullableDate(data.dueDate) } : {}),
        });

        await campaign.update(payload);
        return this.getCampaign(id);
    }

    static async deleteCampaign(id: number) {
        const campaign = await ControlEvaluationCampaign.findByPk(id);
        if (!campaign) {
            return false;
        }

        await softDeleteInstance(campaign);
        return true;
    }

    static async ensureCampaignAssessments(campaignId: number, actorUserId?: number) {
        const principles = await ControlEvaluationPrinciple.findAll({
            where: { isActive: true },
            include: [{ model: ControlEvaluationComponent, as: 'component', required: true }],
            order: [['orderIndex', 'ASC']],
        });

        const existing = await ControlPrincipleAssessment.findAll({ where: { campaignId } });
        const existingPrincipleIds = new Set(existing.map((assessment) => assessment.principleId));
        const answerId = getRequiredLookupId(
            CONTROL_EVALUATION_LOOKUP_KEYS.IMPLEMENTATION_ANSWER,
            ControlAssessmentAnswer.NOT_APPLICABLE
        );
        const resultId = getRequiredLookupId(
            CONTROL_EVALUATION_LOOKUP_KEYS.ASSESSMENT_RESULT,
            ControlAssessmentResult.NOT_ASSESSED
        );

        for (const principle of principles) {
            if (existingPrincipleIds.has(principle.id)) {
                continue;
            }

            await ControlPrincipleAssessment.create({
                campaignId,
                componentId: principle.componentId,
                principleId: principle.id,
                implementationAnswerId: answerId,
                operatingAnswerId: answerId,
                resultId,
                score: 0,
                evaluatorUserId: actorUserId || null,
                evaluatedAt: null,
            } as any);
        }
    }

    static async updateAssessment(id: number, data: Record<string, unknown>, actorUserId: number) {
        const assessment = await ControlPrincipleAssessment.findByPk(id);
        if (!assessment) {
            return null;
        }

        const payload = await LookupResolutionService.resolveEntityPayload('controlPrincipleAssessment', {
            ...(data.implementationAnswer !== undefined ? { implementationAnswer: data.implementationAnswer } : {}),
            ...(data.operatingAnswer !== undefined ? { operatingAnswer: data.operatingAnswer } : {}),
            ...(data.result !== undefined ? { result: data.result } : {}),
            ...(data.score !== undefined ? { score: Math.max(0, Math.min(100, Number(data.score) || 0)) } : {}),
            ...(data.justification !== undefined ? { justification: nullableText(data.justification) } : {}),
            evaluatorUserId: actorUserId,
            evaluatedAt: new Date(),
        });

        await assessment.update(payload);
        return this.getCampaign(assessment.campaignId);
    }

    static async createDeficiency(data: Record<string, unknown>, actorUserId: number) {
        const assessment = data.assessmentId
            ? await ControlPrincipleAssessment.findByPk(Number(data.assessmentId))
            : null;
        const campaignId = Number(data.campaignId || assessment?.campaignId);

        const payload = await LookupResolutionService.resolveEntityPayload('controlDeficiency', {
            campaignId,
            assessmentId: assessment?.id || data.assessmentId || null,
            componentId: data.componentId || assessment?.componentId || null,
            principleId: data.principleId || assessment?.principleId || null,
            title: cleanText(data.title, 'Deficience a qualifier'),
            description: nullableText(data.description),
            severity: data.severity || ControlDeficiencySeverity.MEDIUM,
            status: data.status || ControlDeficiencyStatus.OPEN,
            isMajor: Boolean(data.isMajor),
            impact: nullableText(data.impact),
            ownerUserId: data.ownerUserId || actorUserId || null,
            dueDate: nullableDate(data.dueDate),
            correctiveAction: nullableText(data.correctiveAction),
        });

        await ControlDeficiency.create(payload as any);
        return this.getCampaign(campaignId);
    }

    static async updateDeficiency(id: number, data: Record<string, unknown>) {
        const deficiency = await ControlDeficiency.findByPk(id);
        if (!deficiency) {
            return null;
        }

        const payload = await LookupResolutionService.resolveEntityPayload('controlDeficiency', {
            ...(data.title !== undefined ? { title: cleanText(data.title) } : {}),
            ...(data.description !== undefined ? { description: nullableText(data.description) } : {}),
            ...(data.severity !== undefined ? { severity: data.severity } : {}),
            ...(data.status !== undefined ? { status: data.status } : {}),
            ...(data.isMajor !== undefined ? { isMajor: Boolean(data.isMajor) } : {}),
            ...(data.impact !== undefined ? { impact: nullableText(data.impact) } : {}),
            ...(data.ownerUserId !== undefined ? { ownerUserId: data.ownerUserId || null } : {}),
            ...(data.dueDate !== undefined ? { dueDate: nullableDate(data.dueDate) } : {}),
            ...(data.correctiveAction !== undefined ? { correctiveAction: nullableText(data.correctiveAction) } : {}),
        });

        await deficiency.update(payload);
        return this.getCampaign(deficiency.campaignId);
    }

    static async createConclusion(campaignId: number, data: Record<string, unknown>, actorUserId: number) {
        const computed = await this.computeConclusion(campaignId);
        const payload = await LookupResolutionService.resolveEntityPayload('controlEvaluationConclusion', {
            campaignId,
            result: data.result || computed.result,
            score: data.score !== undefined ? Math.max(0, Math.min(100, Number(data.score) || 0)) : computed.score,
            summary: nullableText(data.summary) || computed.summary,
            justification: nullableText(data.justification),
            validatedById: actorUserId,
            validatedAt: new Date(),
        });

        await ControlEvaluationConclusion.create(payload as any);
        await ControlEvaluationCampaign.update(
            await LookupResolutionService.resolveEntityPayload('controlEvaluationCampaign', {
                status: ControlEvaluationCampaignStatus.VALIDATED,
                validatedById: actorUserId,
                validatedAt: new Date(),
            }),
            { where: { id: campaignId } }
        );

        return this.getCampaign(campaignId);
    }

    static async computeConclusion(campaignId: number) {
        const assessments = await ControlPrincipleAssessment.findAll({ where: { campaignId } });
        const deficiencies = await ControlDeficiency.findAll({ where: { campaignId } });
        const majorCount = deficiencies.filter((item) => item.isMajor).length;
        const assessed = assessments.filter((item) => item.score > 0);
        const score = assessed.length
            ? Math.round(assessed.reduce((total, item) => total + item.score, 0) / assessed.length)
            : 0;

        let result: string = ControlConclusionResult.EFFECTIVE;
        if (majorCount > 0 || score < 40) {
            result = ControlConclusionResult.INEFFECTIVE;
        } else if (score < 70) {
            result = ControlConclusionResult.PARTIALLY_EFFECTIVE;
        } else if (deficiencies.length > 0 || score < 85) {
            result = ControlConclusionResult.EFFECTIVE_WITH_RESERVATIONS;
        }

        return {
            result,
            score,
            summary: `${assessments.length} criteres, ${deficiencies.length} deficience(s), ${majorCount} majeure(s).`,
        };
    }

    private static async getCampaignSummaries(ids: number[]) {
        if (ids.length === 0) {
            return {};
        }

        const [assessments, deficiencies, conclusions] = await Promise.all([
            ControlPrincipleAssessment.findAll({ where: { campaignId: { [Op.in]: ids } } }),
            ControlDeficiency.findAll({ where: { campaignId: { [Op.in]: ids } } }),
            ControlEvaluationConclusion.findAll({
                where: { campaignId: { [Op.in]: ids } },
                order: [['createdAt', 'DESC']],
            }),
        ]);

        const summaries: Record<number, ReturnType<typeof ControlEvaluationService.emptySummary>> = {};
        for (const id of ids) {
            const campaignAssessments = assessments.filter((item) => item.campaignId === id);
            const assessed = campaignAssessments.filter((item) => item.score > 0);
            const campaignDeficiencies = deficiencies.filter((item) => item.campaignId === id);
            const lastConclusion = conclusions.find((item) => item.campaignId === id);
            summaries[id] = {
                assessmentCount: campaignAssessments.length,
                assessedCount: assessed.length,
                deficiencyCount: campaignDeficiencies.length,
                majorDeficiencyCount: campaignDeficiencies.filter((item) => item.isMajor).length,
                averageScore: assessed.length
                    ? Math.round(assessed.reduce((total, item) => total + item.score, 0) / assessed.length)
                    : 0,
                lastConclusion: lastConclusion ? lastConclusion.toJSON() : null,
            };
        }

        return summaries;
    }

    private static emptySummary() {
        return {
            assessmentCount: 0,
            assessedCount: 0,
            deficiencyCount: 0,
            majorDeficiencyCount: 0,
            averageScore: 0,
            lastConclusion: null as object | null,
        };
    }
}
