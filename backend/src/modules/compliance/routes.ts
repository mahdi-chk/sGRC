import { Router } from 'express';
import { LookupResolutionService } from '../../database/lookups/lookup.service';
import { getSoftDeleteValues, softDeleteInstance } from '../../utils/soft-delete';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import { AuditMission } from '../auditing/audit-mission.model';
import { Department } from '../departments/department.model';
import { Incident } from '../incidents/incident.model';
import { Risk } from '../risk/risk.model';
import { User } from '../users/user.model';
import { ComplianceAuditService } from './compliance-audit.service';
import { ComplianceCampaign } from './compliance-campaign.model';
import { ComplianceCampaignsService } from './compliance-campaigns.service';
import { ComplianceEvidence } from './compliance-evidence.model';
import { ComplianceEvidenceService } from './compliance-evidence.service';
import { ComplianceFramework } from './compliance-framework.model';
import { ComplianceFrameworksService } from './compliance-frameworks.service';
import { ComplianceGap } from './compliance-gap.model';
import { ComplianceGapsService } from './compliance-gaps.service';
import { ComplianceMapping } from './compliance-mapping.model';
import { ComplianceOverviewService } from './compliance-overview.service';
import { ComplianceRequirement } from './compliance-requirement.model';
import { getComplianceScope } from './compliance.types';
import { normalizeFilters } from './compliance.scope';

const router = Router();

router.use(authenticateToken);

const allowedRoles = [
    UserRole.SUPER_ADMIN,
    UserRole.RISK_MANAGER,
    UserRole.RISK_AGENT,
    UserRole.AUDIT_SENIOR,
    UserRole.AUDITEUR,
    UserRole.TOP_MANAGEMENT,
];

const adminRoles = [UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR];
const mappingEditorRoles = [UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR, UserRole.RISK_MANAGER];

const isComplianceSchemaMissing = (error: any): boolean => {
    const message = String(error?.message || '').toLowerCase();
    return message.includes('invalid object name') || message.includes('compliance_');
};

const toOptionalString = (value: unknown): string | null =>
    value === undefined || value === null || String(value).trim() === '' ? null : String(value).trim();

const toNullableNumber = (value: unknown): number | null =>
    typeof value === 'number' && Number.isFinite(value) ? value : null;

const serializeCompliance = (item: any): any => {
    if (!item) {
        return item;
    }

    if (Array.isArray(item)) {
        return item.map((entry) => serializeCompliance(entry));
    }

    const payload = typeof item.toJSON === 'function' ? item.toJSON() : item;

    for (const field of ['status', 'applicability', 'sourceType', 'coverageLevel', 'severity', 'entityType', 'action']) {
        const codeField = `${field}Code`;
        const labelField = `${field}Label`;

        if (payload[codeField]) {
            payload[`${field}Label`] = payload[field];
            payload[field] = payload[codeField];
        } else if (!payload[labelField] && payload[field]) {
            payload[labelField] = payload[field];
        }
    }

    return payload;
};

const buildEmptyOverview = (role: string) => ({
    generatedAt: new Date().toISOString(),
    role,
    schemaReady: false,
    summary: {
        frameworks: 0,
        activeRequirements: 0,
        mappedRequirements: 0,
        uncoveredRequirements: 0,
        averageCoverage: 0,
        campaignsInProgress: 0,
        openGaps: 0,
        criticalGaps: 0,
        evidenceCount: 0,
        pendingUpdates: 0,
    },
    frameworks: [],
    mappings: [],
    assessments: [],
    gaps: [],
    evidence: [],
    updates: [],
    message: 'Le schema Conformite n est pas encore initialise. Lancez les migrations backend pour activer les donnees persistantes.',
});

router.get(
    '/',
    authorizeRoles(...allowedRoles),
    (_req, res) => res.json({
        message: 'Compliance module ready',
        endpoints: [
            '/api/compliance/overview',
            '/api/compliance/frameworks',
            '/api/compliance/campaigns',
            '/api/compliance/gaps',
            '/api/compliance/evidence',
        ],
    })
);

router.get('/overview', authorizeRoles(...allowedRoles), async (req: AuthRequest, res) => {
    try {
        const payload = await ComplianceOverviewService.get(
            getComplianceScope(req),
            normalizeFilters(req.query)
        );
        res.json(payload);
    } catch (error: any) {
        if (isComplianceSchemaMissing(error)) {
            return res.json(buildEmptyOverview(req.user?.role || ''));
        }

        res.status(500).json({
            message: 'Erreur lors de la preparation du module de conformite',
            error: error?.message || 'unknown_error',
        });
    }
});

router.get('/frameworks', authorizeRoles(...allowedRoles), async (req: AuthRequest, res) => {
    try {
        const items = await ComplianceFrameworksService.list(
            getComplianceScope(req),
            normalizeFilters(req.query)
        );
        res.json(serializeCompliance(items));
    } catch (error: any) {
        if (isComplianceSchemaMissing(error)) {
            return res.json([]);
        }

        res.status(500).json({
            message: 'Erreur lors du chargement des referentiels de conformite',
            error: error?.message || 'unknown_error',
        });
    }
});

router.get('/requirements', authorizeRoles(...allowedRoles), async (req: AuthRequest, res) => {
    try {
        const frameworkId = Number(req.query.frameworkId);
        const where: any = {};

        if (Number.isFinite(frameworkId) && frameworkId > 0) {
            where.frameworkId = frameworkId;
        }

        const items = await ComplianceRequirement.findAll({
            where,
            include: [
                { model: ComplianceFramework, as: 'framework', required: false, attributes: ['id', 'code', 'name', 'version'] },
            ],
            order: [['frameworkId', 'ASC'], ['code', 'ASC']],
        });

        res.json(serializeCompliance(items));
    } catch (error: any) {
        if (isComplianceSchemaMissing(error)) {
            return res.json([]);
        }

        res.status(500).json({
            message: 'Erreur lors du chargement des exigences de conformite',
            error: error?.message || 'unknown_error',
        });
    }
});

router.get('/campaigns', authorizeRoles(...allowedRoles), async (req: AuthRequest, res) => {
    try {
        const items = await ComplianceCampaignsService.list(
            getComplianceScope(req),
            normalizeFilters(req.query)
        );
        res.json(serializeCompliance(items));
    } catch (error: any) {
        if (isComplianceSchemaMissing(error)) {
            return res.json([]);
        }

        res.status(500).json({
            message: 'Erreur lors du chargement des campagnes de conformite',
            error: error?.message || 'unknown_error',
        });
    }
});

router.get('/gaps', authorizeRoles(...allowedRoles), async (req: AuthRequest, res) => {
    try {
        const items = await ComplianceGapsService.list(
            getComplianceScope(req),
            normalizeFilters(req.query)
        );
        res.json(serializeCompliance(items));
    } catch (error: any) {
        if (isComplianceSchemaMissing(error)) {
            return res.json([]);
        }

        res.status(500).json({
            message: 'Erreur lors du chargement des ecarts de conformite',
            error: error?.message || 'unknown_error',
        });
    }
});

router.get('/evidence', authorizeRoles(...allowedRoles), async (req: AuthRequest, res) => {
    try {
        const items = await ComplianceEvidenceService.list(
            getComplianceScope(req),
            normalizeFilters(req.query)
        );
        res.json(serializeCompliance(items));
    } catch (error: any) {
        if (isComplianceSchemaMissing(error)) {
            return res.json([]);
        }

        res.status(500).json({
            message: 'Erreur lors du chargement des preuves de conformite',
            error: error?.message || 'unknown_error',
        });
    }
});

router.get('/mappings', authorizeRoles(...allowedRoles), async (_req: AuthRequest, res) => {
    try {
        const items = await ComplianceMapping.findAll({
            include: [
                {
                    model: ComplianceRequirement,
                    as: 'requirement',
                    required: false,
                    include: [{ model: ComplianceFramework, as: 'framework', required: false, attributes: ['id', 'code', 'name', 'version'] }],
                },
                { model: User, as: 'owner', required: false, attributes: ['id', 'prenom', 'nom'] },
                { model: Department, as: 'department', required: false, attributes: ['id', 'nom'] },
            ],
            order: [['updatedAt', 'DESC']],
        });
        res.json(serializeCompliance(items));
    } catch (error: any) {
        if (isComplianceSchemaMissing(error)) {
            return res.json([]);
        }

        res.status(500).json({
            message: 'Erreur lors du chargement des mappings de conformite',
            error: error?.message || 'unknown_error',
        });
    }
});

router.get('/linkable-sources', authorizeRoles(...mappingEditorRoles), async (_req: AuthRequest, res) => {
    try {
        const [risks, audits, incidents] = await Promise.all([
            Risk.findAll({ attributes: ['id', 'titre'], order: [['updatedAt', 'DESC']], limit: 100 }),
            AuditMission.findAll({ attributes: ['id', 'titre'], order: [['updatedAt', 'DESC']], limit: 100 }),
            Incident.findAll({ attributes: ['id', 'titre'], order: [['updatedAt', 'DESC']], limit: 100 }),
        ]);

        res.json({
            risk: risks.map((item: any) => ({ id: item.id, label: item.titre })),
            audit: audits.map((item: any) => ({ id: item.id, label: item.titre })),
            incident: incidents.map((item: any) => ({ id: item.id, label: item.titre })),
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors du chargement des sources de liaison',
            error: error?.message || 'unknown_error',
        });
    }
});

router.post('/frameworks', authorizeRoles(...adminRoles), async (req: AuthRequest, res) => {
    try {
        const payload = await LookupResolutionService.resolveEntityPayload('complianceFramework', {
            code: String(req.body.code || '').trim(),
            name: String(req.body.name || '').trim(),
            version: String(req.body.version || '').trim(),
            jurisdiction: toOptionalString(req.body.jurisdiction),
            description: toOptionalString(req.body.description),
            ownerUserId: req.body.ownerUserId ? Number(req.body.ownerUserId) : req.user?.id || null,
            departmentId: req.body.departmentId ? Number(req.body.departmentId) : req.user?.departementId || null,
            entityKey: toOptionalString(req.body.entityKey),
            status: req.body.status ? String(req.body.status).trim() : 'draft',
            effectiveDate: req.body.effectiveDate || null,
            reviewDate: req.body.reviewDate || null,
        }) as Record<string, unknown>;

        const item = await ComplianceFramework.create(payload as any);
        await ComplianceAuditService.log({
            entityType: 'framework',
            entityId: item.id,
            action: 'create',
            actorUserId: req.user?.id || null,
            departmentId: toNullableNumber(payload.departmentId),
            entityKey: toOptionalString(payload.entityKey),
            payload,
        });

        res.status(201).json(serializeCompliance(item));
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la creation du referentiel',
            error: error?.message || 'unknown_error',
        });
    }
});

router.put('/frameworks/:id', authorizeRoles(...adminRoles), async (req: AuthRequest, res) => {
    try {
        const item = await ComplianceFramework.findByPk(Number(req.params.id));
        if (!item) {
            return res.status(404).json({ message: 'Referentiel introuvable' });
        }

        const payload = await LookupResolutionService.resolveEntityPayload('complianceFramework', {
            code: String(req.body.code || item.code).trim(),
            name: String(req.body.name || item.name).trim(),
            version: String(req.body.version || item.version).trim(),
            jurisdiction: req.body.jurisdiction !== undefined ? toOptionalString(req.body.jurisdiction) : item.jurisdiction,
            description: req.body.description !== undefined ? toOptionalString(req.body.description) : item.description,
            ownerUserId: req.body.ownerUserId ? Number(req.body.ownerUserId) : item.ownerUserId,
            departmentId: req.body.departmentId ? Number(req.body.departmentId) : item.departmentId,
            entityKey: req.body.entityKey !== undefined ? toOptionalString(req.body.entityKey) : item.entityKey,
            status: req.body.status ? String(req.body.status).trim() : item.status,
            effectiveDate: req.body.effectiveDate !== undefined ? req.body.effectiveDate || null : item.effectiveDate,
            reviewDate: req.body.reviewDate !== undefined ? req.body.reviewDate || null : item.reviewDate,
        }) as Record<string, unknown>;

        await item.update(payload as any);
        await ComplianceAuditService.log({
            entityType: 'framework',
            entityId: item.id,
            action: 'update',
            actorUserId: req.user?.id || null,
            departmentId: toNullableNumber(payload.departmentId),
            entityKey: toOptionalString(payload.entityKey),
            payload,
        });

        res.json(serializeCompliance(item));
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la mise a jour du referentiel',
            error: error?.message || 'unknown_error',
        });
    }
});

router.delete('/frameworks/:id', authorizeRoles(...adminRoles), async (req: AuthRequest, res) => {
    try {
        const item = await ComplianceFramework.findByPk(Number(req.params.id));
        if (!item) {
            return res.status(404).json({ message: 'Referentiel introuvable' });
        }

        await ComplianceAuditService.log({
            entityType: 'framework',
            entityId: item.id,
            action: 'delete',
            actorUserId: req.user?.id || null,
            departmentId: item.departmentId,
            entityKey: item.entityKey,
            payload: { code: item.code, version: item.version },
        });

        const frameworkIds = [item.id];
        const requirementIds = (await ComplianceRequirement.findAll({
            attributes: ['id'],
            where: { frameworkId: item.id },
        })).map((entry: any) => entry.id);

        await ComplianceCampaign.update(getSoftDeleteValues(), { where: { frameworkId: frameworkIds } });
        if (requirementIds.length > 0) {
            await ComplianceMapping.update(getSoftDeleteValues(), { where: { requirementId: requirementIds } });
            await ComplianceGap.update(getSoftDeleteValues(), { where: { requirementId: requirementIds } });
            await ComplianceEvidence.update(getSoftDeleteValues(), { where: { requirementId: requirementIds } });
            await ComplianceRequirement.update(getSoftDeleteValues(), { where: { id: requirementIds } });
        }
        await softDeleteInstance(item);
        res.json({ message: 'Referentiel supprime avec succes' });
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la suppression du referentiel',
            error: error?.message || 'unknown_error',
        });
    }
});

router.post('/requirements', authorizeRoles(...adminRoles), async (req: AuthRequest, res) => {
    try {
        const payload = await LookupResolutionService.resolveEntityPayload('complianceRequirement', {
            frameworkId: Number(req.body.frameworkId),
            code: String(req.body.code || '').trim(),
            title: String(req.body.title || '').trim(),
            description: toOptionalString(req.body.description),
            chapter: toOptionalString(req.body.chapter),
            orderIndex: req.body.orderIndex ? Number(req.body.orderIndex) : 0,
            applicability: req.body.applicability ? String(req.body.applicability).trim() : 'applicable',
            status: req.body.status ? String(req.body.status).trim() : 'active',
            weight: req.body.weight ? Number(req.body.weight) : 1,
        }) as Record<string, unknown>;

        const item = await ComplianceRequirement.create(payload as any);
        await ComplianceAuditService.log({
            entityType: 'requirement',
            entityId: item.id,
            action: 'create',
            actorUserId: req.user?.id || null,
            departmentId: req.user?.departementId || null,
            entityKey: null,
            payload,
        });

        res.status(201).json(serializeCompliance(item));
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la creation de l exigence',
            error: error?.message || 'unknown_error',
        });
    }
});

router.put('/requirements/:id', authorizeRoles(...adminRoles), async (req: AuthRequest, res) => {
    try {
        const item = await ComplianceRequirement.findByPk(Number(req.params.id));
        if (!item) {
            return res.status(404).json({ message: 'Exigence introuvable' });
        }

        const payload = await LookupResolutionService.resolveEntityPayload('complianceRequirement', {
            frameworkId: req.body.frameworkId ? Number(req.body.frameworkId) : item.frameworkId,
            code: String(req.body.code || item.code).trim(),
            title: String(req.body.title || item.title).trim(),
            description: req.body.description !== undefined ? toOptionalString(req.body.description) : item.description,
            chapter: req.body.chapter !== undefined ? toOptionalString(req.body.chapter) : item.chapter,
            orderIndex: req.body.orderIndex !== undefined ? Number(req.body.orderIndex || 0) : item.orderIndex,
            applicability: req.body.applicability ? String(req.body.applicability).trim() : item.applicability,
            status: req.body.status ? String(req.body.status).trim() : item.status,
            weight: req.body.weight !== undefined ? Number(req.body.weight || 1) : item.weight,
        }) as Record<string, unknown>;

        await item.update(payload as any);
        await ComplianceAuditService.log({
            entityType: 'requirement',
            entityId: item.id,
            action: 'update',
            actorUserId: req.user?.id || null,
            departmentId: req.user?.departementId || null,
            entityKey: null,
            payload,
        });

        res.json(serializeCompliance(item));
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la mise a jour de l exigence',
            error: error?.message || 'unknown_error',
        });
    }
});

router.delete('/requirements/:id', authorizeRoles(...adminRoles), async (req: AuthRequest, res) => {
    try {
        const item = await ComplianceRequirement.findByPk(Number(req.params.id));
        if (!item) {
            return res.status(404).json({ message: 'Exigence introuvable' });
        }

        await ComplianceAuditService.log({
            entityType: 'requirement',
            entityId: item.id,
            action: 'delete',
            actorUserId: req.user?.id || null,
            departmentId: req.user?.departementId || null,
            entityKey: null,
            payload: { frameworkId: item.frameworkId, code: item.code },
        });

        await ComplianceMapping.update(getSoftDeleteValues(), { where: { requirementId: item.id } });
        await ComplianceGap.update(getSoftDeleteValues(), { where: { requirementId: item.id } });
        await ComplianceEvidence.update(getSoftDeleteValues(), { where: { requirementId: item.id } });
        await softDeleteInstance(item);
        res.json({ message: 'Exigence supprimee avec succes' });
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la suppression de l exigence',
            error: error?.message || 'unknown_error',
        });
    }
});

router.post('/mappings', authorizeRoles(...mappingEditorRoles), async (req: AuthRequest, res) => {
    try {
        const payload = await LookupResolutionService.resolveEntityPayload('complianceMapping', {
            requirementId: Number(req.body.requirementId),
            sourceType: String(req.body.sourceType || '').trim(),
            sourceId: req.body.sourceId ? Number(req.body.sourceId) : null,
            relatedEntityKey: toOptionalString(req.body.relatedEntityKey),
            coverageLevel: req.body.coverageLevel ? String(req.body.coverageLevel).trim() : 'partial',
            rationale: toOptionalString(req.body.rationale),
            ownerUserId: req.body.ownerUserId ? Number(req.body.ownerUserId) : req.user?.id || null,
            departmentId: req.body.departmentId ? Number(req.body.departmentId) : req.user?.departementId || null,
            entityKey: toOptionalString(req.body.entityKey),
        }) as Record<string, unknown>;

        const item = await ComplianceMapping.create(payload as any);
        await ComplianceAuditService.log({
            entityType: 'mapping',
            entityId: item.id,
            action: 'create',
            actorUserId: req.user?.id || null,
            departmentId: toNullableNumber(payload.departmentId),
            entityKey: toOptionalString(payload.entityKey),
            payload,
        });

        res.status(201).json(serializeCompliance(item));
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la creation du mapping',
            error: error?.message || 'unknown_error',
        });
    }
});

router.put('/mappings/:id', authorizeRoles(...mappingEditorRoles), async (req: AuthRequest, res) => {
    try {
        const item = await ComplianceMapping.findByPk(Number(req.params.id));
        if (!item) {
            return res.status(404).json({ message: 'Mapping introuvable' });
        }

        const payload = await LookupResolutionService.resolveEntityPayload('complianceMapping', {
            requirementId: req.body.requirementId ? Number(req.body.requirementId) : item.requirementId,
            sourceType: String(req.body.sourceType || item.sourceType).trim(),
            sourceId: req.body.sourceId !== undefined ? (req.body.sourceId ? Number(req.body.sourceId) : null) : item.sourceId,
            relatedEntityKey: req.body.relatedEntityKey !== undefined ? toOptionalString(req.body.relatedEntityKey) : item.relatedEntityKey,
            coverageLevel: req.body.coverageLevel ? String(req.body.coverageLevel).trim() : item.coverageLevel,
            rationale: req.body.rationale !== undefined ? toOptionalString(req.body.rationale) : item.rationale,
            ownerUserId: req.body.ownerUserId ? Number(req.body.ownerUserId) : item.ownerUserId,
            departmentId: req.body.departmentId ? Number(req.body.departmentId) : item.departmentId,
            entityKey: req.body.entityKey !== undefined ? toOptionalString(req.body.entityKey) : item.entityKey,
        }) as Record<string, unknown>;

        await item.update(payload as any);
        await ComplianceAuditService.log({
            entityType: 'mapping',
            entityId: item.id,
            action: 'update',
            actorUserId: req.user?.id || null,
            departmentId: toNullableNumber(payload.departmentId),
            entityKey: toOptionalString(payload.entityKey),
            payload,
        });

        res.json(serializeCompliance(item));
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la mise a jour du mapping',
            error: error?.message || 'unknown_error',
        });
    }
});

router.delete('/mappings/:id', authorizeRoles(...mappingEditorRoles), async (req: AuthRequest, res) => {
    try {
        const item = await ComplianceMapping.findByPk(Number(req.params.id));
        if (!item) {
            return res.status(404).json({ message: 'Mapping introuvable' });
        }

        await ComplianceAuditService.log({
            entityType: 'mapping',
            entityId: item.id,
            action: 'delete',
            actorUserId: req.user?.id || null,
            departmentId: item.departmentId,
            entityKey: item.entityKey,
            payload: {
                requirementId: item.requirementId,
                sourceType: item.sourceType,
                sourceId: item.sourceId,
            },
        });

        await softDeleteInstance(item);
        res.json({ message: 'Mapping supprime avec succes' });
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la suppression du mapping',
            error: error?.message || 'unknown_error',
        });
    }
});

export default router;
