import { Department } from '../departments/department.model';
import { User } from '../users/user.model';
import { ComplianceCampaign } from './compliance-campaign.model';
import { ComplianceEvidence } from './compliance-evidence.model';
import { ComplianceFramework } from './compliance-framework.model';
import { ComplianceGap } from './compliance-gap.model';
import { ComplianceMapping } from './compliance-mapping.model';
import { ComplianceRequirement } from './compliance-requirement.model';
import { buildFrameworkWhere } from './compliance.scope';
import { ComplianceScoreService } from './compliance-score.service';
import { ComplianceFilters, ComplianceScope } from './compliance.types';

const buildDisplayName = (person: any): string => {
    if (!person) {
        return 'Non assigne';
    }

    if (person.prenom || person.nom) {
        return `${person.prenom || ''} ${person.nom || ''}`.trim();
    }

    return person.nom || 'Non assigne';
};

const toIso = (value: unknown): string | null => {
    if (!value) {
        return null;
    }

    const date = new Date(value as any);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

export class ComplianceOverviewService {
    static async get(scope: ComplianceScope, filters: ComplianceFilters = {}) {
        const frameworks = await ComplianceFramework.findAll({
            where: buildFrameworkWhere(scope, filters),
            include: [
                { model: User, as: 'owner', required: false, attributes: ['id', 'prenom', 'nom'] },
                { model: Department, as: 'department', required: false, attributes: ['id', 'nom'] },
                {
                    model: ComplianceRequirement,
                    as: 'requirements',
                    required: false,
                    include: [
                        {
                            model: ComplianceMapping,
                            as: 'mappings',
                            required: false,
                            include: [{ model: User, as: 'owner', required: false, attributes: ['id', 'prenom', 'nom'] }],
                        },
                        {
                            model: ComplianceGap,
                            as: 'gaps',
                            required: false,
                            include: [{ model: User, as: 'owner', required: false, attributes: ['id', 'prenom', 'nom'] }],
                        },
                        {
                            model: ComplianceEvidence,
                            as: 'evidence',
                            required: false,
                            include: [{ model: User, as: 'owner', required: false, attributes: ['id', 'prenom', 'nom'] }],
                        },
                    ],
                },
                { model: ComplianceCampaign, as: 'campaigns', required: false, include: [{ model: User, as: 'owner', required: false, attributes: ['id', 'prenom', 'nom'] }] },
            ],
            order: [['updatedAt', 'DESC']],
        });

        const serializedFrameworks = frameworks.map((framework: any) => {
            const requirements = framework.requirements || [];
            const weights = requirements.map((requirement: any) => ({
                total: Number(requirement.weight || 1),
                mapped: (requirement.mappings || []).length > 0 ? Number(requirement.weight || 1) : 0,
            }));
            const mappedRequirements = requirements.filter((requirement: any) => (requirement.mappings || []).length > 0).length;

            return {
                id: framework.id,
                code: framework.code,
                name: framework.name,
                version: framework.version,
                jurisdiction: framework.jurisdiction,
                owner: buildDisplayName(framework.owner),
                requirements: requirements.length,
                mappedRequirements,
                coverage: ComplianceScoreService.summarizeCoverage(weights),
                status: framework.status,
                department: framework.department?.nom || 'Non rattache',
                lastReview: toIso(framework.reviewDate || framework.updatedAt),
                requirementsRaw: requirements,
                campaignsRaw: framework.campaigns || [],
            };
        });

        const mappings = serializedFrameworks.flatMap((framework: any) =>
            framework.requirementsRaw.flatMap((requirement: any) =>
                (requirement.mappings || []).map((mapping: any) => ({
                    requirementCode: requirement.code,
                    framework: framework.name,
                    requirementTitle: requirement.title,
                    coverageLevel: mapping.coverageLevel,
                    linkedControls: mapping.sourceType === 'control' ? 1 : 0,
                    linkedRisks: mapping.sourceType === 'risk' ? 1 : 0,
                    linkedPolicies: mapping.sourceType === 'policy' ? 1 : 0,
                    linkedActions: mapping.sourceType === 'action' ? 1 : 0,
                    owner: buildDisplayName(mapping.owner),
                }))
            )
        );

        const assessments = serializedFrameworks.flatMap((framework: any) =>
            framework.campaignsRaw.map((campaign: any) => ({
                id: `cmp-${campaign.id}`,
                title: campaign.title,
                framework: framework.name,
                owner: buildDisplayName(campaign.owner),
                dueDate: toIso(campaign.dueDate),
                completion: campaign.status === 'completed' ? 100 : campaign.status === 'in_progress' ? 60 : 10,
                answered: campaign.status === 'completed' ? 10 : campaign.status === 'in_progress' ? 6 : 1,
                totalQuestions: 10,
                status: campaign.status,
            }))
        );

        const gaps = serializedFrameworks.flatMap((framework: any) =>
            framework.requirementsRaw.flatMap((requirement: any) =>
                (requirement.gaps || []).map((gap: any) => ({
                    id: `gap-${gap.id}`,
                    title: gap.title,
                    framework: framework.name,
                    severity: gap.severity,
                    status: gap.status,
                    owner: buildDisplayName(gap.owner),
                    dueDate: toIso(gap.dueDate),
                    source: gap.sourceType,
                    remediationLink: gap.remediationActionId || 'Action a definir',
                }))
            )
        );

        const evidence = serializedFrameworks.flatMap((framework: any) =>
            framework.requirementsRaw.flatMap((requirement: any) =>
                (requirement.evidence || []).map((item: any) => ({
                    id: `evidence-${item.id}`,
                    title: item.title,
                    framework: framework.name,
                    sourceType: item.sourceType,
                    owner: buildDisplayName(item.owner),
                    uploadedAt: toIso(item.capturedAt || item.createdAt),
                    filename: item.filename || 'piece-jointe',
                }))
            )
        );

        const totalRequirements = serializedFrameworks.reduce((sum, item: any) => sum + item.requirements, 0);
        const totalMappedRequirements = serializedFrameworks.reduce((sum, item: any) => sum + item.mappedRequirements, 0);

        return {
            generatedAt: new Date().toISOString(),
            role: scope.role,
            summary: {
                frameworks: serializedFrameworks.length,
                activeRequirements: totalRequirements,
                mappedRequirements: totalMappedRequirements,
                uncoveredRequirements: Math.max(totalRequirements - totalMappedRequirements, 0),
                averageCoverage: serializedFrameworks.length
                    ? Math.round(serializedFrameworks.reduce((sum: number, item: any) => sum + item.coverage, 0) / serializedFrameworks.length)
                    : 0,
                campaignsInProgress: assessments.filter((item) => item.status === 'in_progress').length,
                openGaps: gaps.filter((item) => item.status !== 'closed').length,
                criticalGaps: gaps.filter((item) => ['critical', 'critique', 'high', 'eleve'].includes(String(item.severity || '').toLowerCase())).length,
                evidenceCount: evidence.length,
                pendingUpdates: serializedFrameworks.filter((item: any) => item.status !== 'active').length,
            },
            frameworks: serializedFrameworks.map(({ id: _id, requirementsRaw: _requirementsRaw, campaignsRaw: _campaignsRaw, ...item }: any) => item),
            mappings,
            assessments,
            gaps,
            evidence,
            updates: serializedFrameworks.map((item: any) => ({
                id: `upd-${item.code}`,
                title: `Revue ${item.name}`,
                framework: item.name,
                impactLevel: item.coverage < 60 ? 'eleve' : item.coverage < 80 ? 'moyen' : 'faible',
                status: item.status,
                owner: item.owner,
                detectedAt: item.lastReview,
                nextAction: item.coverage < 100 ? 'Completer la couverture et les preuves' : 'Maintenir la revue periodique',
            })),
        };
    }
}
