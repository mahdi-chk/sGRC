import { Router } from 'express';
import { ForeignKeyConstraintError, UniqueConstraintError, ValidationError } from 'sequelize';
import { LookupResolutionService } from '../../database/lookups/lookup.service';
import { getSoftDeleteValues, softDeleteInstance } from '../../utils/soft-delete';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { secureUpload } from '../../middleware/file.middleware';
import { UserRole } from '../users/user.roles';
import { AuditMission } from '../auditing/audit-mission.model';
import { Department } from '../departments/department.model';
import { Incident } from '../incidents/incident.model';
import { Risk } from '../risk/risk.model';
import { AIService } from '../ai/ai.service';
import { DocumentTextExtractor } from '../ai/document-text-extractor';
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
import { ComplianceRequirementImportService } from './compliance-requirement-import.service';
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
const uploadRequirementImport = secureUpload(['pdf', 'docx', 'txt'], 'file', 15 * 1024 * 1024);

const isComplianceSchemaMissing = (error: any): boolean => {
    const message = String(error?.message || '').toLowerCase();
    return message.includes('invalid object name') || message.includes('compliance_');
};

const toOptionalString = (value: unknown): string | null =>
    value === undefined || value === null || String(value).trim() === '' ? null : String(value).trim();

const toNullableNumber = (value: unknown): number | null =>
    typeof value === 'number' && Number.isFinite(value) ? value : null;

const sanitizeFrameworkToken = (value: string): string =>
    String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^A-Za-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toUpperCase()
        .slice(0, 40);

const deriveFrameworkName = (filename: string, extractedText: string): string => {
    const firstMeaningfulLine = String(extractedText || '')
        .split(/\r?\n/)
        .map((line) => String(line || '').trim())
        .find((line) => line.length >= 6);

    if (firstMeaningfulLine) {
        return firstMeaningfulLine.slice(0, 120);
    }

    return filename
        .replace(/\.[^.]+$/, '')
        .replace(/[_-]+/g, ' ')
        .trim()
        .slice(0, 120) || 'Referentiel importe';
};

const buildUniqueFrameworkIdentity = async (sourceName: string): Promise<{ code: string; version: string }> => {
    const baseCode = sanitizeFrameworkToken(sourceName) || 'FRAMEWORK';
    const baseVersion = String(new Date().getFullYear());
    let code = baseCode;
    let version = baseVersion;
    let sequence = 1;

    while (await ComplianceFramework.findOne({ where: { code, version } })) {
        sequence += 1;
        version = `${baseVersion}-${sequence}`;
        code = baseCode;
    }

    return { code, version };
};

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

const getComplianceRouteError = (error: any, fallbackMessage: string) => {
    if (error instanceof UniqueConstraintError) {
        return {
            status: 409,
            message: 'Un cadre avec le meme code et la meme version existe deja.'
        };
    }

    if (error instanceof ForeignKeyConstraintError) {
        return {
            status: 400,
            message: 'Une reference associee au cadre ou a l exigence est invalide.'
        };
    }

    if (error instanceof ValidationError) {
        const message = error.errors.map((entry) => entry.message).filter(Boolean)[0];
        return {
            status: 400,
            message: message || fallbackMessage
        };
    }

    return {
        status: 400,
        message: error?.message || fallbackMessage
    };
};

const normalizeCoverageLevel = (value: unknown): string => {
    const normalized = String(value || '').trim().toLowerCase();
    if (normalized === 'covered') {
        return 'covered';
    }
    if (normalized === 'uncovered') {
        return 'uncovered';
    }
    return 'partial';
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
        const routeError = getComplianceRouteError(error, 'Erreur lors de la creation du referentiel');
        res.status(routeError.status).json({
            message: routeError.message,
            error: error?.message || 'unknown_error',
        });
    }
});

router.post('/mappings/auto-map', authorizeRoles(...mappingEditorRoles), async (req: AuthRequest, res) => {
    try {
        const frameworkId = Number(req.body.frameworkId);
        if (!Number.isFinite(frameworkId) || frameworkId <= 0) {
            return res.status(400).json({ message: 'Referentiel invalide' });
        }

        const framework = await ComplianceFramework.findByPk(frameworkId);
        if (!framework) {
            return res.status(404).json({ message: 'Referentiel introuvable' });
        }

        const requirements = await ComplianceRequirement.findAll({
            where: { frameworkId },
            order: [['orderIndex', 'ASC'], ['code', 'ASC']],
        });

        if (!requirements.length) {
            return res.status(400).json({ message: 'Aucune exigence disponible pour ce referentiel' });
        }

        const [risks, audits, incidents, existingMappings] = await Promise.all([
            Risk.findAll({ attributes: ['id', 'titre'], order: [['updatedAt', 'DESC']], limit: 100 }),
            AuditMission.findAll({ attributes: ['id', 'titre'], order: [['updatedAt', 'DESC']], limit: 100 }),
            Incident.findAll({ attributes: ['id', 'titre'], order: [['updatedAt', 'DESC']], limit: 100 }),
            ComplianceMapping.findAll({ where: { requirementId: requirements.map((item: any) => item.id) } }),
        ]);

        const suggestions = await AIService.generateComplianceMappings({
            frameworkName: framework.name,
            requirements: requirements.map((item: any) => ({
                id: item.id,
                code: item.code,
                title: item.title,
                chapter: item.chapter,
                description: item.description,
            })),
            risks: risks.map((item: any) => ({ id: item.id, label: item.titre })),
            audits: audits.map((item: any) => ({ id: item.id, label: item.titre })),
            incidents: incidents.map((item: any) => ({ id: item.id, label: item.titre })),
        });

        const requirementsByCode = new Map(requirements.map((item: any) => [String(item.code || '').trim().toLowerCase(), item]));
        const validSources = {
            risk: new Set(risks.map((item: any) => item.id)),
            audit: new Set(audits.map((item: any) => item.id)),
            incident: new Set(incidents.map((item: any) => item.id)),
        };
        const existingKeys = new Set(existingMappings.map((item: any) => `${item.requirementId}:${item.sourceType}:${item.sourceId || 'null'}`));

        const created: any[] = [];
        const skipped: Array<{ requirementCode: string; sourceType: string; sourceId: number | null; reason: string }> = [];

        for (const suggestion of suggestions) {
            const requirement = suggestion.requirementId
                ? requirements.find((item: any) => item.id === Number(suggestion.requirementId))
                : requirementsByCode.get(String(suggestion.requirementCode || '').trim().toLowerCase());
            const sourceType = String(suggestion.sourceType || '').trim().toLowerCase();
            const sourceId = Number(suggestion.sourceId);

            if (!requirement) {
                skipped.push({ requirementCode: String(suggestion.requirementCode || ''), sourceType, sourceId: Number.isFinite(sourceId) ? sourceId : null, reason: 'Exigence introuvable dans le referentiel' });
                continue;
            }

            if (!['risk', 'audit', 'incident'].includes(sourceType) || !Number.isFinite(sourceId) || !(validSources as any)[sourceType]?.has(sourceId)) {
                skipped.push({ requirementCode: requirement.code, sourceType, sourceId: Number.isFinite(sourceId) ? sourceId : null, reason: 'Source invalide ou absente' });
                continue;
            }

            const mappingKey = `${requirement.id}:${sourceType}:${sourceId}`;
            if (existingKeys.has(mappingKey)) {
                skipped.push({ requirementCode: requirement.code, sourceType, sourceId, reason: 'Mapping deja existant' });
                continue;
            }

            const payload = await LookupResolutionService.resolveEntityPayload('complianceMapping', {
                requirementId: requirement.id,
                sourceType,
                sourceId,
                relatedEntityKey: null,
                coverageLevel: normalizeCoverageLevel(suggestion.coverageLevel),
                rationale: toOptionalString(suggestion.rationale),
                ownerUserId: req.user?.id || null,
                departmentId: req.user?.departementId || null,
                entityKey: framework.entityKey,
            }) as Record<string, unknown>;

            const item = await ComplianceMapping.create(payload as any);
            created.push(item);
            existingKeys.add(mappingKey);

            await ComplianceAuditService.log({
                entityType: 'mapping',
                entityId: item.id,
                action: 'create',
                actorUserId: req.user?.id || null,
                departmentId: toNullableNumber(payload.departmentId),
                entityKey: toOptionalString(payload.entityKey),
                payload,
            });
        }

        res.status(201).json({
            message: `${created.length} mapping(s) genere(s) automatiquement pour ${framework.code}`,
            frameworkId,
            createdCount: created.length,
            skippedCount: skipped.length,
            created: serializeCompliance(created),
            skipped,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors du mapping automatique du referentiel',
            error: error?.message || 'unknown_error',
        });
    }
});

router.post('/frameworks/import', authorizeRoles(...adminRoles), uploadRequirementImport, async (req: AuthRequest, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun document fourni' });
        }

        const extractedText = await DocumentTextExtractor.extractTextFromFile(req.file, {
            useOcrForPdf: true,
            includeStructuredRegionsForImages: true,
            requireUsableText: true,
            limitChars: 30000,
        });
        const aiDraft = await AIService.generateComplianceFrameworkDraft({
            fileName: req.file.originalname,
            extractedText,
            role: req.user?.role,
        });
        const drafts = aiDraft?.requirements?.length
            ? aiDraft.requirements.map((item, index) => ({
                code: String(item.code || `REQ-${index + 1}`).trim(),
                title: String(item.title || item.code || `Exigence ${index + 1}`).trim(),
                description: toOptionalString(item.description),
                chapter: toOptionalString(item.chapter),
                orderIndex: Number(item.orderIndex || index + 1),
                applicability: String(item.applicability || 'applicable').trim(),
                status: String(item.status || 'active').trim(),
                weight: Number(item.weight || 1),
            }))
            : ComplianceRequirementImportService.parseRequirementsFromText(extractedText);

        if (!drafts.length) {
            return res.status(422).json({
                message: 'Aucune exigence n a ete detectee dans le document importe',
                sourceFile: req.file.originalname,
                extractedCharacters: extractedText.length,
                previewText: extractedText.slice(0, 1200),
                detectedRequirements: 0,
                createdRequirements: 0,
                skippedRequirements: 0,
                created: [],
                skipped: [],
            });
        }

        const sourceLabel = req.file.originalname.replace(/\.[^.]+$/, '');
        const uniqueIdentity = await buildUniqueFrameworkIdentity(sourceLabel);
        const aiCode = sanitizeFrameworkToken(String(aiDraft?.framework?.code || ''));
        const aiVersion = String(aiDraft?.framework?.version || '').trim();
        const canUseAiIdentity = aiCode && aiVersion
            ? !(await ComplianceFramework.findOne({ where: { code: aiCode, version: aiVersion } }))
            : false;
        const frameworkPayload = await LookupResolutionService.resolveEntityPayload('complianceFramework', {
            code: canUseAiIdentity ? aiCode : uniqueIdentity.code,
            name: String(aiDraft?.framework?.name || deriveFrameworkName(req.file.originalname, extractedText)).trim(),
            version: canUseAiIdentity ? aiVersion : uniqueIdentity.version,
            jurisdiction: toOptionalString(aiDraft?.framework?.jurisdiction) || 'Maroc',
            description: toOptionalString(aiDraft?.framework?.description) || `Cadre importe automatiquement depuis le document ${req.file.originalname}.`,
            ownerUserId: req.user?.id || null,
            departmentId: req.user?.departementId || null,
            entityKey: null,
            status: String(aiDraft?.framework?.status || 'draft').trim(),
            effectiveDate: null,
            reviewDate: null,
        }) as Record<string, unknown>;

        const framework = await ComplianceFramework.create(frameworkPayload as any);
        await ComplianceAuditService.log({
            entityType: 'framework',
            entityId: framework.id,
            action: 'create',
            actorUserId: req.user?.id || null,
            departmentId: toNullableNumber(frameworkPayload.departmentId),
            entityKey: toOptionalString(frameworkPayload.entityKey),
            payload: {
                ...frameworkPayload,
                sourceFile: req.file.originalname,
            },
        });

        const created: any[] = [];
        const skipped: Array<{ code: string; title: string; reason: string }> = [];
        const seenCodes = new Set<string>();

        for (const draft of drafts) {
            const normalizedCode = draft.code.trim().toLowerCase();
            if (!normalizedCode) {
                skipped.push({ code: draft.code, title: draft.title, reason: 'Code manquant' });
                continue;
            }

            if (seenCodes.has(normalizedCode)) {
                skipped.push({ code: draft.code, title: draft.title, reason: 'Exigence dupliquee dans le document' });
                continue;
            }

            const payload = await LookupResolutionService.resolveEntityPayload('complianceRequirement', {
                frameworkId: framework.id,
                code: draft.code.trim(),
                title: draft.title.trim(),
                description: toOptionalString(draft.description),
                chapter: toOptionalString(draft.chapter),
                orderIndex: Number(draft.orderIndex || 0),
                applicability: draft.applicability || 'applicable',
                status: draft.status || 'active',
                weight: Number(draft.weight || 1),
            }) as Record<string, unknown>;

            const item = await ComplianceRequirement.create(payload as any);
            created.push(item);
            seenCodes.add(normalizedCode);

            await ComplianceAuditService.log({
                entityType: 'requirement',
                entityId: item.id,
                action: 'create',
                actorUserId: req.user?.id || null,
                departmentId: req.user?.departementId || null,
                entityKey: framework.entityKey,
                payload: {
                    frameworkId: framework.id,
                    code: draft.code,
                    sourceFile: req.file.originalname,
                },
            });
        }

        res.status(201).json({
            message: `${created.length} exigence(s) importee(s) dans le nouveau cadre ${framework.code}`,
            frameworkId: framework.id,
            framework: serializeCompliance(framework),
            sourceFile: req.file.originalname,
            extractedCharacters: extractedText.length,
            previewText: extractedText.slice(0, 1200),
            detectedRequirements: drafts.length,
            createdRequirements: created.length,
            skippedRequirements: skipped.length,
            created: serializeCompliance(created),
            skipped,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de l import du cadre',
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
        const routeError = getComplianceRouteError(error, 'Erreur lors de la mise a jour du referentiel');
        res.status(routeError.status).json({
            message: routeError.message,
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
        const routeError = getComplianceRouteError(error, 'Erreur lors de la creation de l exigence');
        res.status(routeError.status).json({
            message: routeError.message,
            error: error?.message || 'unknown_error',
        });
    }
});

router.post('/frameworks/:id/import-requirements', authorizeRoles(...adminRoles), uploadRequirementImport, async (req: AuthRequest, res) => {
    try {
        const frameworkId = Number(req.params.id);
        if (!Number.isFinite(frameworkId) || frameworkId <= 0) {
            return res.status(400).json({ message: 'Referentiel invalide' });
        }

        const framework = await ComplianceFramework.findByPk(frameworkId);
        if (!framework) {
            return res.status(404).json({ message: 'Referentiel introuvable' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Aucun document fourni' });
        }

        const extractedText = await DocumentTextExtractor.extractTextFromFile(req.file, {
            useOcrForPdf: true,
            includeStructuredRegionsForImages: true,
            requireUsableText: true,
            limitChars: 30000,
        });
        const drafts = ComplianceRequirementImportService.parseRequirementsFromText(extractedText);

        if (!drafts.length) {
            return res.status(422).json({
                message: 'Aucune exigence n a ete detectee dans le document importe',
                sourceFile: req.file.originalname,
                extractedCharacters: extractedText.length,
                previewText: extractedText.slice(0, 1200),
                detectedRequirements: 0,
                createdRequirements: 0,
                skippedRequirements: 0,
                created: [],
                skipped: [],
            });
        }

        const existingRequirements = await ComplianceRequirement.findAll({
            attributes: ['id', 'code'],
            where: { frameworkId },
        });
        const existingByCode = new Set(existingRequirements.map((item: any) => String(item.code || '').trim().toLowerCase()));

        const created: any[] = [];
        const skipped: Array<{ code: string; title: string; reason: string }> = [];

        for (const draft of drafts) {
            const normalizedCode = draft.code.trim().toLowerCase();
            if (!normalizedCode) {
                skipped.push({ code: draft.code, title: draft.title, reason: 'Code manquant' });
                continue;
            }

            if (existingByCode.has(normalizedCode)) {
                skipped.push({ code: draft.code, title: draft.title, reason: 'Exigence deja presente dans le referentiel' });
                continue;
            }

            const payload = await LookupResolutionService.resolveEntityPayload('complianceRequirement', {
                frameworkId,
                code: draft.code.trim(),
                title: draft.title.trim(),
                description: toOptionalString(draft.description),
                chapter: toOptionalString(draft.chapter),
                orderIndex: Number(draft.orderIndex || 0),
                applicability: draft.applicability || 'applicable',
                status: draft.status || 'active',
                weight: Number(draft.weight || 1),
            }) as Record<string, unknown>;

            const item = await ComplianceRequirement.create(payload as any);
            created.push(item);
            existingByCode.add(normalizedCode);

            await ComplianceAuditService.log({
                entityType: 'requirement',
                entityId: item.id,
                action: 'create',
                actorUserId: req.user?.id || null,
                departmentId: req.user?.departementId || null,
                entityKey: framework.entityKey,
                payload: {
                    frameworkId,
                    code: draft.code,
                    sourceFile: req.file.originalname,
                },
            });
        }

        res.status(201).json({
            message: `${created.length} exigence(s) importee(s) depuis ${req.file.originalname}`,
            frameworkId,
            sourceFile: req.file.originalname,
            extractedCharacters: extractedText.length,
            previewText: extractedText.slice(0, 1200),
            detectedRequirements: drafts.length,
            createdRequirements: created.length,
            skippedRequirements: skipped.length,
            created: serializeCompliance(created),
            skipped,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de l import des exigences',
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
        const routeError = getComplianceRouteError(error, 'Erreur lors de la mise a jour de l exigence');
        res.status(routeError.status).json({
            message: routeError.message,
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
