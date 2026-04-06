import sequelize from './database';
import { LookupResolutionService } from './database/lookups/lookup.service';
import './modules/compliance';
import { Department } from './modules/departments/department.model';
import { User } from './modules/users/user.model';
import { UserRole } from './modules/users/user.roles';
import { Risk } from './modules/risk/risk.model';
import { Incident } from './modules/incidents/incident.model';
import { AuditMission } from './modules/auditing/audit-mission.model';
import { ComplianceAuditService } from './modules/compliance/compliance-audit.service';
import { ComplianceCampaign } from './modules/compliance/compliance-campaign.model';
import { ComplianceEvidence } from './modules/compliance/compliance-evidence.model';
import { ComplianceFramework } from './modules/compliance/compliance-framework.model';
import { ComplianceGap } from './modules/compliance/compliance-gap.model';
import { ComplianceMapping } from './modules/compliance/compliance-mapping.model';
import { ComplianceRequirement } from './modules/compliance/compliance-requirement.model';

type FrameworkSeed = {
    code: string;
    name: string;
    version: string;
    jurisdiction: string;
    description: string;
    status: string;
    requirements: Array<{
        code: string;
        title: string;
        chapter: string;
        description: string;
        weight: number;
    }>;
};

const frameworkSeeds: FrameworkSeed[] = [
    {
        code: 'ISO-27001',
        name: 'ISO 27001',
        version: '2022',
        jurisdiction: 'International',
        description: 'Systeme de management de la securite de l information.',
        status: 'active',
        requirements: [
            { code: '5.1', title: 'Politiques de securite', chapter: 'Controles organisationnels', description: 'Les politiques de securite doivent etre etablies, approuvees et revues.', weight: 1.5 },
            { code: '5.2', title: 'Roles et responsabilites', chapter: 'Controles organisationnels', description: 'Les responsabilites de securite doivent etre definies et attribuees.', weight: 1.2 },
            { code: '5.7', title: 'Veille sur les menaces', chapter: 'Controles organisationnels', description: 'L organisation doit collecter et analyser les renseignements de menace.', weight: 1.1 },
            { code: '5.23', title: 'Securite des services cloud', chapter: 'Controles technologiques', description: 'Les services cloud doivent etre gouvernes et proteges.', weight: 1.4 },
            { code: '8.15', title: 'Journalisation', chapter: 'Controles technologiques', description: 'Les journaux d evenements doivent etre produits, proteges et analyses.', weight: 1.3 },
            { code: '8.16', title: 'Surveillance des activites', chapter: 'Controles technologiques', description: 'Les activites et evenements doivent etre surveilles en continu.', weight: 1.4 },
            { code: '8.28', title: 'Codage securise', chapter: 'Controles technologiques', description: 'Les principes de codage securise doivent etre appliques.', weight: 1.3 },
        ],
    },
    {
        code: 'ISO-9001',
        name: 'ISO 9001',
        version: '2015',
        jurisdiction: 'International',
        description: 'Systeme de management de la qualite et amelioration continue.',
        status: 'active',
        requirements: [
            { code: '4.4', title: 'Maitrise des processus', chapter: 'Contexte et processus', description: 'Les processus doivent etre definis, surveilles et ameliores.', weight: 1.2 },
            { code: '6.1', title: 'Actions face aux risques', chapter: 'Planification', description: 'Les risques et opportunites doivent etre identifies et traites.', weight: 1.1 },
            { code: '7.5', title: 'Information documentee', chapter: 'Support', description: 'Les documents et enregistrements doivent etre maitrises.', weight: 1.3 },
            { code: '8.7', title: 'Maitrise des sorties non conformes', chapter: 'Realisation', description: 'Les non-conformites doivent etre identifiees et traitees.', weight: 1.4 },
            { code: '9.1', title: 'Surveillance et mesure', chapter: 'Evaluation des performances', description: 'Les indicateurs et resultats doivent etre suivis et analyses.', weight: 1.2 },
            { code: '10.2', title: 'Non-conformite et action corrective', chapter: 'Amelioration', description: 'Les causes racines et actions correctives doivent etre tracees.', weight: 1.5 },
        ],
    },
    {
        code: 'RGPD',
        name: 'RGPD',
        version: 'UE-2016',
        jurisdiction: 'Union Europeenne',
        description: 'Protection des donnees personnelles et responsabilite de traitement.',
        status: 'review_required',
        requirements: [
            { code: 'Art.5', title: 'Principes de traitement', chapter: 'Principes', description: 'Le traitement doit respecter licite, loyautee, transparence et minimisation.', weight: 1.5 },
            { code: 'Art.24', title: 'Responsabilite du traitement', chapter: 'Responsabilite', description: 'Le responsable doit mettre en oeuvre des mesures appropriees.', weight: 1.4 },
            { code: 'Art.25', title: 'Privacy by design', chapter: 'Protection des donnees', description: 'La protection des donnees doit etre integree par defaut et par conception.', weight: 1.4 },
            { code: 'Art.30', title: 'Registre des traitements', chapter: 'Documentation', description: 'Les activites de traitement doivent etre documentees.', weight: 1.2 },
            { code: 'Art.32', title: 'Securite du traitement', chapter: 'Securite', description: 'Des mesures techniques et organisationnelles doivent proteger les donnees.', weight: 1.5 },
            { code: 'Art.33', title: 'Notification de violation', chapter: 'Incidents', description: 'Les violations doivent etre notifiees dans les delais requis.', weight: 1.5 },
        ],
    },
];

async function findPreferredUser(role: string): Promise<User | null> {
    const roleLookup = LookupResolutionService.getStaticValue('user.role', role);
    if (!roleLookup) {
        return null;
    }

    return User.findOne({
        where: { roleId: roleLookup.id },
        order: [['id', 'ASC']],
    });
}

async function findFallbackDepartment(): Promise<Department | null> {
    return Department.findOne({
        order: [['id', 'ASC']],
    });
}

async function upsertFramework(seed: FrameworkSeed, ownerUserId: number | null, departmentId: number | null): Promise<ComplianceFramework> {
    const existing = await ComplianceFramework.findOne({
        where: { code: seed.code, version: seed.version },
    });

    if (existing) {
        await existing.update({
            name: seed.name,
            jurisdiction: seed.jurisdiction,
            description: seed.description,
            ownerUserId,
            departmentId,
            entityKey: 'seed-demo',
            status: seed.status,
            effectiveDate: new Date('2026-01-01'),
            reviewDate: new Date('2026-04-01'),
        });
        return existing;
    }

    return ComplianceFramework.create({
        code: seed.code,
        name: seed.name,
        version: seed.version,
        jurisdiction: seed.jurisdiction,
        description: seed.description,
        ownerUserId,
        departmentId,
        entityKey: 'seed-demo',
        status: seed.status,
        effectiveDate: new Date('2026-01-01'),
        reviewDate: new Date('2026-04-01'),
    } as any);
}

async function upsertRequirement(
    frameworkId: number,
    requirement: FrameworkSeed['requirements'][number]
): Promise<ComplianceRequirement> {
    const existing = await ComplianceRequirement.findOne({
        where: { frameworkId, code: requirement.code },
    });

    if (existing) {
        await existing.update({
            title: requirement.title,
            description: requirement.description,
            chapter: requirement.chapter,
            applicability: 'applicable',
            status: 'active',
            weight: requirement.weight,
        });
        return existing;
    }

    return ComplianceRequirement.create({
        frameworkId,
        code: requirement.code,
        title: requirement.title,
        description: requirement.description,
        chapter: requirement.chapter,
        orderIndex: 0,
        applicability: 'applicable',
        status: 'active',
        weight: requirement.weight,
    } as any);
}

async function upsertMapping(payload: {
    requirementId: number;
    sourceType: string;
    sourceId: number | null;
    relatedEntityKey?: string | null;
    coverageLevel: string;
    rationale: string;
    ownerUserId: number | null;
    departmentId: number | null;
}) {
    const existing = await ComplianceMapping.findOne({
        where: {
            requirementId: payload.requirementId,
            sourceType: payload.sourceType,
            sourceId: payload.sourceId,
        },
    });

    if (existing) {
        return existing.update(payload as any);
    }

    return ComplianceMapping.create({
        ...payload,
        entityKey: 'seed-demo',
    } as any);
}

async function upsertCampaign(payload: {
    frameworkId: number;
    title: string;
    status: string;
    ownerUserId: number | null;
    assignedUserId: number | null;
    departmentId: number | null;
    dueDate: Date | null;
    startedAt: Date | null;
    completedAt: Date | null;
}) {
    const existing = await ComplianceCampaign.findOne({
        where: {
            frameworkId: payload.frameworkId,
            title: payload.title,
        },
    });

    if (existing) {
        return existing.update({
            ...payload,
            entityKey: 'seed-demo',
        } as any);
    }

    return ComplianceCampaign.create({
        ...payload,
        entityKey: 'seed-demo',
    } as any);
}

async function upsertGap(payload: {
    requirementId: number | null;
    title: string;
    description: string;
    severity: string;
    status: string;
    sourceType: string;
    sourceId: number | null;
    ownerUserId: number | null;
    departmentId: number | null;
    dueDate: Date | null;
    remediationActionId: string | null;
}) {
    const existing = await ComplianceGap.findOne({
        where: {
            title: payload.title,
            requirementId: payload.requirementId,
        },
    });

    if (existing) {
        return existing.update({
            ...payload,
            entityKey: 'seed-demo',
        } as any);
    }

    return ComplianceGap.create({
        ...payload,
        entityKey: 'seed-demo',
    } as any);
}

async function upsertEvidence(payload: {
    requirementId: number | null;
    title: string;
    sourceType: string;
    sourceId: number | null;
    filename: string;
    filePath: string;
    mimeType: string;
    ownerUserId: number | null;
    departmentId: number | null;
    capturedAt: Date;
}) {
    const existing = await ComplianceEvidence.findOne({
        where: {
            requirementId: payload.requirementId,
            title: payload.title,
            sourceType: payload.sourceType,
            sourceId: payload.sourceId,
        },
    });

    if (existing) {
        return existing.update({
            ...payload,
            entityKey: 'seed-demo',
        } as any);
    }

    return ComplianceEvidence.create({
        ...payload,
        entityKey: 'seed-demo',
    } as any);
}

async function seedCompliance() {
    try {
        await sequelize.authenticate();

        const [auditSenior, auditeur, riskManager] = await Promise.all([
            findPreferredUser(UserRole.AUDIT_SENIOR),
            findPreferredUser(UserRole.AUDITEUR),
            findPreferredUser(UserRole.RISK_MANAGER),
        ]);

        const fallbackDepartment = await findFallbackDepartment();
        const ownerUser = auditSenior || riskManager || auditeur || null;
        const departmentId = ownerUser?.departementId || fallbackDepartment?.id || null;

        const risks = await Risk.findAll({ order: [['id', 'ASC']], limit: 6 });
        const incidents = await Incident.findAll({ order: [['id', 'ASC']], limit: 3 });
        const missions = await AuditMission.findAll({ order: [['id', 'ASC']], limit: 3 });

        for (const frameworkSeed of frameworkSeeds) {
            const framework = await upsertFramework(
                frameworkSeed,
                ownerUser?.id || null,
                departmentId
            );

            await ComplianceAuditService.log({
                entityType: 'framework',
                entityId: framework.id,
                action: 'seed_upsert',
                actorUserId: ownerUser?.id || null,
                departmentId,
                entityKey: 'seed-demo',
                payload: { code: framework.code, version: framework.version },
            });

            const requirementRecords: ComplianceRequirement[] = [];

            for (const requirementSeed of frameworkSeed.requirements) {
                const requirement = await upsertRequirement(framework.id, requirementSeed);
                requirementRecords.push(requirement);

                await ComplianceAuditService.log({
                    entityType: 'requirement',
                    entityId: requirement.id,
                    action: 'seed_upsert',
                    actorUserId: ownerUser?.id || null,
                    departmentId,
                    entityKey: 'seed-demo',
                    payload: { code: requirement.code, frameworkId: framework.id },
                });
            }

            for (let index = 0; index < requirementRecords.length; index += 1) {
                const requirement = requirementRecords[index];
                const risk = risks[index % Math.max(risks.length, 1)] || null;
                const incident = incidents[index % Math.max(incidents.length, 1)] || null;
                const mission = missions[index % Math.max(missions.length, 1)] || null;

                if (risk) {
                    await upsertMapping({
                        requirementId: requirement.id,
                        sourceType: 'risk',
                        sourceId: risk.id,
                        coverageLevel: index % 3 === 0 ? 'covered' : 'partial',
                        rationale: `Couverture rattachee au risque ${risk.titre}.`,
                        ownerUserId: riskManager?.id || ownerUser?.id || null,
                        departmentId: risk.departementId || departmentId,
                    });
                }

                if (mission && index % 2 === 0) {
                    await upsertMapping({
                        requirementId: requirement.id,
                        sourceType: 'control',
                        sourceId: mission.id,
                        relatedEntityKey: 'audit-mission',
                        coverageLevel: 'covered',
                        rationale: `Mission d audit ${mission.titre} utilisee comme preuve de maitrise.`,
                        ownerUserId: auditSenior?.id || ownerUser?.id || null,
                        departmentId,
                    });
                }

                if (incident && index % 4 === 0) {
                    await upsertGap({
                        requirementId: requirement.id,
                        title: `${framework.code} ${requirement.code} - Ecart de couverture`,
                        description: `Un ecart a ete constate pour l exigence ${requirement.title}.`,
                        severity: index % 2 === 0 ? 'critique' : 'moyen',
                        status: index % 2 === 0 ? 'open' : 'in_progress',
                        sourceType: 'incident',
                        sourceId: incident.id,
                        ownerUserId: ownerUser?.id || null,
                        departmentId: incident.departementId || departmentId,
                        dueDate: new Date('2026-05-15'),
                        remediationActionId: incident.planActionTraitement ? `INC-${incident.id}` : null,
                    });
                }

                await upsertEvidence({
                    requirementId: requirement.id,
                    title: `Preuve ${framework.code} ${requirement.code}`,
                    sourceType: mission ? 'audit' : risk ? 'risk' : 'manual',
                    sourceId: mission?.id || risk?.id || null,
                    filename: `${framework.code.toLowerCase()}-${String(requirement.code).replace(/[^a-z0-9]+/gi, '-')}.pdf`,
                    filePath: `/seed/compliance/${framework.code.toLowerCase()}/${String(requirement.code).replace(/[^a-z0-9]+/gi, '-')}.pdf`,
                    mimeType: 'application/pdf',
                    ownerUserId: ownerUser?.id || null,
                    departmentId: risk?.departementId || departmentId,
                    capturedAt: new Date('2026-04-01'),
                });
            }

            await upsertCampaign({
                frameworkId: framework.id,
                title: `Campagne initiale ${framework.name}`,
                status: framework.code === 'RGPD' ? 'in_progress' : 'draft',
                ownerUserId: auditSenior?.id || ownerUser?.id || null,
                assignedUserId: auditeur?.id || ownerUser?.id || null,
                departmentId,
                dueDate: new Date('2026-05-30'),
                startedAt: framework.code === 'RGPD' ? new Date('2026-04-02') : null,
                completedAt: null,
            });
        }

        console.log('Compliance seed completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding compliance module:', error);
        process.exit(1);
    }
}

seedCompliance();
