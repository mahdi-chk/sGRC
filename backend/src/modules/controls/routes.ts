import { Router } from 'express';
import { Op } from 'sequelize';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { AUDIT_COORDINATION_ROLES, isAuditCoordinationRole, UserRole } from '../users/user.roles';
import { Risk } from '../risk/risk.model';
import { Department } from '../departments/department.model';
import { Organigramme } from '../organigramme/organigramme.model';
import { Incident } from '../incidents/incident.model';
import { User } from '../users/user.model';
import { AuditMission, AuditRecordType } from '../auditing/audit-mission.model';
import { AuditEvidence } from '../auditing/audit-evidence.model';
import { softDeleteInstance } from '../../utils/soft-delete';
import { InternalControl, InternalControlRisk, InternalControlTestExecution } from './internal-control.model';

const router = Router();

router.use(authenticateToken);

const allowedRoles = [
    UserRole.SUPER_ADMIN,
    UserRole.RISK_MANAGER,
    UserRole.RISK_AGENT,
    ...AUDIT_COORDINATION_ROLES,
    UserRole.TOP_MANAGEMENT,
    UserRole.CONTROLLER
];

const writeRoles = [UserRole.SUPER_ADMIN, UserRole.CONTROLLER];

const CONTROL_LOOKUPS = {
    controlTypes: [
        { code: 'preventive', label: 'Préventif' },
        { code: 'detective', label: 'Détectif' },
        { code: 'corrective', label: 'Correctif' },
        { code: 'directive', label: 'Directif' },
    ],
    frequencies: [
        { code: 'none', label: 'Non récurrent' },
        { code: 'monthly', label: 'Mensuel' },
        { code: 'quarterly', label: 'Trimestriel' },
        { code: 'semi_annual', label: 'Semestriel' },
        { code: 'annual', label: 'Annuel' },
        { code: 'continuous', label: 'Continu' },
    ],
    statuses: [
        { code: 'draft', label: 'Brouillon' },
        { code: 'active', label: 'Actif' },
        { code: 'review_required', label: 'Revue requise' },
        { code: 'ineffective', label: 'Inefficace' },
        { code: 'retired', label: 'Retiré' },
    ],
    testMethods: [
        { code: 'manual_review', label: 'Revue manuelle' },
        { code: 'walkthrough', label: 'Test de cheminement' },
        { code: 'sampling', label: 'Échantillonnage' },
        { code: 'automated_script', label: 'Script automatisé' },
        { code: 'continuous_monitoring', label: 'Surveillance continue' },
    ],
    testResults: [
        { code: 'planned', label: 'Planifié' },
        { code: 'effective', label: 'Efficace' },
        { code: 'partially_effective', label: 'Partiellement efficace' },
        { code: 'ineffective', label: 'Inefficace' },
        { code: 'not_applicable', label: 'Non applicable' },
    ],
};

const controlIncludes = [
    { model: Department, as: 'department', required: false },
    { model: User, as: 'owner', required: false, attributes: ['id', 'prenom', 'nom'] },
    {
        model: InternalControlRisk,
        as: 'riskLinks',
        required: false,
        include: [{ model: Risk, as: 'risk', required: false, include: [{ model: Department, as: 'departement', required: false }] }],
    },
    {
        model: InternalControlTestExecution,
        as: 'tests',
        required: false,
        include: [{ model: User, as: 'tester', required: false, attributes: ['id', 'prenom', 'nom'] }],
    },
];

const normalizeLookupValue = (value: unknown): string =>
    String(value || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[\s-]+/g, '_');

const buildDisplayName = (person: any): string => {
    if (!person) {
        return '';
    }

    if (person.prenom || person.nom) {
        return `${person.prenom || ''} ${person.nom || ''}`.trim();
    }

    return person.nom || '';
};

const nullableDate = (value: unknown): Date | null => {
    if (!value) {
        return null;
    }

    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? null : date;
};

const cleanText = (value: unknown, fallback = ''): string =>
    String(value ?? fallback).trim();

const clampScore = (value: unknown, fallback = 0): number =>
    Math.max(0, Math.min(100, Number.isFinite(Number(value)) ? Number(value) : fallback));

const clampMaturity = (value: unknown): number =>
    Math.max(1, Math.min(5, Number.isFinite(Number(value)) ? Math.round(Number(value)) : 3));

const hasLookupCode = (items: { code: string }[], code: unknown): boolean =>
    items.some((item) => item.code === code);

const getFrequencyLabel = (code: string): string =>
    CONTROL_LOOKUPS.frequencies.find((item) => item.code === code)?.label || code || 'Non renseignée';

const getControlTypeLabel = (code: string): string =>
    CONTROL_LOOKUPS.controlTypes.find((item) => item.code === code)?.label || code || 'Non renseigné';

const getStatusLabel = (code: string): string =>
    CONTROL_LOOKUPS.statuses.find((item) => item.code === code)?.label || code || 'Non renseigné';

const serializeControl = (control: any) => {
    const riskLinks = control.riskLinks || [];
    const tests = control.tests || [];
    const primaryRisk = riskLinks.find((link: any) => link.risk)?.risk || null;

    return {
        id: control.id,
        code: control.code,
        title: control.title,
        description: control.description,
        controlType: control.controlType,
        controlTypeLabel: getControlTypeLabel(control.controlType),
        executionType: control.executionType,
        occurrenceLabel: control.executionType === 'periodic' ? 'Périodique' : 'Une fois',
        frequency: control.frequency,
        frequencyLabel: getFrequencyLabel(control.frequency),
        departmentId: control.departmentId,
        department: control.department?.nom || primaryRisk?.departement?.nom || 'Non rattaché',
        linkedRisk: primaryRisk?.titre || (riskLinks.length ? `${riskLinks.length} risque(s) lié(s)` : 'Non lié'),
        riskIds: riskLinks.map((link: any) => link.riskId),
        risks: riskLinks
            .filter((link: any) => link.risk)
            .map((link: any) => ({ id: link.risk.id, title: link.risk.titre })),
        ownerUserId: control.ownerUserId,
        owner: buildDisplayName(control.owner) || 'Non assigné',
        maturity: control.maturity,
        nextReview: control.nextReview,
        lastTestedAt: control.lastTestedAt,
        effectivenessScore: control.effectivenessScore,
        status: control.status,
        statusLabel: getStatusLabel(control.status),
        tests: tests.map((test: any) => ({
            id: test.id,
            title: test.title,
            testMethod: test.testMethod,
            result: test.result,
            plannedDate: test.plannedDate,
            executedAt: test.executedAt,
            tester: buildDisplayName(test.tester),
            score: test.score,
            notes: test.notes,
            evidenceSummary: test.evidenceSummary,
        })),
    };
};

const getPersistentControls = async () => InternalControl.findAll({
    include: controlIncludes as any,
    order: [['nextReview', 'ASC'], ['updatedAt', 'DESC']],
});

const generateControlCode = async (): Promise<string> => {
    const count = await InternalControl.count();
    return `CTRL-${String(count + 1).padStart(4, '0')}`;
};

const refreshControlScoreFromTests = async (controlId: number) => {
    const control = await InternalControl.findByPk(controlId);
    if (!control) {
        return null;
    }

    const latestCompletedTest = await InternalControlTestExecution.findOne({
        where: {
            controlId,
            result: { [Op.ne]: 'planned' },
        },
        order: [['executedAt', 'DESC'], ['updatedAt', 'DESC']],
    });

    await control.update({
        lastTestedAt: latestCompletedTest?.executedAt || null,
        effectivenessScore: latestCompletedTest?.score || 0,
        status: latestCompletedTest?.result === 'ineffective'
            ? 'ineffective'
            : latestCompletedTest
                ? 'active'
                : control.status,
    });

    return InternalControl.findByPk(controlId, { include: controlIncludes as any });
};

const isPeriodicFrequency = (value: unknown): boolean => {
    const normalized = normalizeLookupValue(value);
    return Boolean(normalized) && normalized !== 'none' && normalized !== 'aucun';
};

const isCompletedRiskStatus = (value: unknown): boolean => {
    const normalized = normalizeLookupValue(value);
    return normalized === 'treated' || normalized === 'closed' || normalized === 'traite' || normalized === 'clos';
};

const isCompletedMissionStatus = (value: unknown): boolean => {
    const normalized = normalizeLookupValue(value);
    return normalized === 'termine' || normalized === 'closed';
};

const isOpenIncidentStatus = (value: unknown): boolean => {
    const normalized = normalizeLookupValue(value);
    return normalized !== 'traite' && normalized !== 'clos' && normalized !== 'closed' && normalized !== 'treated';
};

const inferControlType = (risk: any): string => {
    const corpus = `${risk?.dmrExistant || ''} ${risk?.planActionTraitement || ''} ${risk?.explication || ''}`.toLowerCase();

    if (/correc|remedi|remediat|action/.test(corpus)) {
        return 'correctif';
    }

    if (/controle|surveill|revue|monitor|detect/.test(corpus)) {
        return 'detectif';
    }

    return 'preventif';
};

const getControlReferenceDate = (risk: any, mission?: any): Date | string | null => (
    mission?.updatedAt ||
    risk?.dernierTraitement ||
    risk?.updatedAt ||
    risk?.createdAt ||
    null
);

const getOccurrenceLabel = (value: unknown): string =>
    isPeriodicFrequency(value) ? 'Periodique' : 'Une fois';

const getSeverityWeight = (value: unknown): number => {
    const normalized = normalizeLookupValue(value);
    if (normalized === 'critical' || normalized === 'critique') {
        return 5;
    }
    if (normalized === 'high' || normalized === 'eleve' || normalized === 'elevee') {
        return 4;
    }
    if (normalized === 'significant' || normalized === 'medium' || normalized === 'significatif' || normalized === 'moyen') {
        return 3;
    }
    if (normalized === 'limited' || normalized === 'limite') {
        return 2;
    }
    return 1;
};

router.get('/lookups', authorizeRoles(...allowedRoles), (_req, res) => {
    res.json(CONTROL_LOOKUPS);
});

router.get('/', authorizeRoles(...allowedRoles), async (_req, res) => {
    try {
        const controls = await getPersistentControls();
        res.json(controls.map(serializeControl));
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors du chargement des contrôles', error: error.message });
    }
});

router.post('/', authorizeRoles(...writeRoles), async (req: AuthRequest, res) => {
    try {
        const body = req.body || {};
        const code = cleanText(body.code) || await generateControlCode();
        const controlType = hasLookupCode(CONTROL_LOOKUPS.controlTypes, body.controlType) ? body.controlType : 'preventive';
        const frequency = hasLookupCode(CONTROL_LOOKUPS.frequencies, body.frequency) ? body.frequency : 'quarterly';
        const status = hasLookupCode(CONTROL_LOOKUPS.statuses, body.status) ? body.status : 'active';
        const executionType = frequency === 'none' ? 'one_time' : cleanText(body.executionType, 'periodic');

        const control = await InternalControl.create({
            code,
            title: cleanText(body.title, 'Nouveau contrôle'),
            description: cleanText(body.description) || null,
            controlType,
            executionType,
            frequency,
            status,
            maturity: clampMaturity(body.maturity),
            departmentId: body.departmentId || null,
            ownerUserId: body.ownerUserId || req.user!.id,
            nextReview: nullableDate(body.nextReview),
            effectivenessScore: clampScore(body.effectivenessScore),
        } as any);

        if (Array.isArray(body.riskIds)) {
            for (const riskId of body.riskIds.map((id: unknown) => Number(id)).filter(Boolean)) {
                await InternalControlRisk.findOrCreate({ where: { controlId: control.id, riskId } });
            }
        }

        const created = await InternalControl.findByPk(control.id, { include: controlIncludes as any });
        res.status(201).json(serializeControl(created));
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la création du contrôle', error: error.message });
    }
});

router.get('/:id(\\d+)', authorizeRoles(...allowedRoles), async (req, res) => {
    try {
        const control = await InternalControl.findByPk(Number(req.params.id), { include: controlIncludes as any });
        if (!control) {
            res.status(404).json({ message: 'Contrôle introuvable' });
            return;
        }

        res.json(serializeControl(control));
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors du chargement du contrôle', error: error.message });
    }
});

router.put('/:id(\\d+)', authorizeRoles(...writeRoles), async (req, res) => {
    try {
        const control = await InternalControl.findByPk(Number(req.params.id));
        if (!control) {
            res.status(404).json({ message: 'Contrôle introuvable' });
            return;
        }

        const body = req.body || {};
        await control.update({
            ...(body.code !== undefined ? { code: cleanText(body.code, control.code) } : {}),
            ...(body.title !== undefined ? { title: cleanText(body.title, control.title) } : {}),
            ...(body.description !== undefined ? { description: cleanText(body.description) || null } : {}),
            ...(body.controlType !== undefined && hasLookupCode(CONTROL_LOOKUPS.controlTypes, body.controlType) ? { controlType: body.controlType } : {}),
            ...(body.frequency !== undefined && hasLookupCode(CONTROL_LOOKUPS.frequencies, body.frequency) ? { frequency: body.frequency, executionType: body.frequency === 'none' ? 'one_time' : 'periodic' } : {}),
            ...(body.executionType !== undefined ? { executionType: cleanText(body.executionType, control.executionType) } : {}),
            ...(body.status !== undefined && hasLookupCode(CONTROL_LOOKUPS.statuses, body.status) ? { status: body.status } : {}),
            ...(body.maturity !== undefined ? { maturity: clampMaturity(body.maturity) } : {}),
            ...(body.departmentId !== undefined ? { departmentId: body.departmentId || null } : {}),
            ...(body.ownerUserId !== undefined ? { ownerUserId: body.ownerUserId || null } : {}),
            ...(body.nextReview !== undefined ? { nextReview: nullableDate(body.nextReview) } : {}),
            ...(body.effectivenessScore !== undefined ? { effectivenessScore: clampScore(body.effectivenessScore) } : {}),
        });

        if (Array.isArray(body.riskIds)) {
            await InternalControlRisk.destroy({ where: { controlId: control.id } });
            for (const riskId of body.riskIds.map((id: unknown) => Number(id)).filter(Boolean)) {
                await InternalControlRisk.findOrCreate({ where: { controlId: control.id, riskId } });
            }
        }

        const updated = await InternalControl.findByPk(control.id, { include: controlIncludes as any });
        res.json(serializeControl(updated));
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du contrôle', error: error.message });
    }
});

router.delete('/:id(\\d+)', authorizeRoles(...writeRoles), async (req, res) => {
    try {
        const control = await InternalControl.findByPk(Number(req.params.id));
        if (!control) {
            res.status(404).json({ message: 'Contrôle introuvable' });
            return;
        }

        await softDeleteInstance(control);
        res.json({ success: true });
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression du contrôle', error: error.message });
    }
});

router.post('/:id(\\d+)/risks', authorizeRoles(...writeRoles), async (req, res) => {
    try {
        const control = await InternalControl.findByPk(Number(req.params.id));
        if (!control) {
            res.status(404).json({ message: 'Contrôle introuvable' });
            return;
        }

        const riskIds = Array.isArray(req.body?.riskIds)
            ? req.body.riskIds.map((id: unknown) => Number(id)).filter(Boolean)
            : [Number(req.body?.riskId)].filter(Boolean);

        for (const riskId of riskIds) {
            await InternalControlRisk.findOrCreate({ where: { controlId: control.id, riskId } });
        }

        const updated = await InternalControl.findByPk(control.id, { include: controlIncludes as any });
        res.status(201).json(serializeControl(updated));
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la liaison risque/contrôle', error: error.message });
    }
});

router.post('/:id(\\d+)/tests', authorizeRoles(...writeRoles), async (req: AuthRequest, res) => {
    try {
        const control = await InternalControl.findByPk(Number(req.params.id));
        if (!control) {
            res.status(404).json({ message: 'Contrôle introuvable' });
            return;
        }

        const body = req.body || {};
        const result = hasLookupCode(CONTROL_LOOKUPS.testResults, body.result) ? body.result : 'planned';
        const score = clampScore(body.score, result === 'effective' ? 90 : result === 'partially_effective' ? 65 : result === 'ineffective' ? 30 : 0);
        const executedAt = nullableDate(body.executedAt);

        await InternalControlTestExecution.create({
            controlId: control.id,
            title: cleanText(body.title, `Test ${control.code}`),
            testMethod: hasLookupCode(CONTROL_LOOKUPS.testMethods, body.testMethod) ? body.testMethod : 'manual_review',
            result,
            plannedDate: nullableDate(body.plannedDate),
            executedAt,
            testerUserId: body.testerUserId || req.user!.id,
            score,
            notes: cleanText(body.notes) || null,
            evidenceSummary: cleanText(body.evidenceSummary) || null,
        } as any);

        await control.update({
            ...(executedAt ? { lastTestedAt: executedAt } : {}),
            ...(result !== 'planned' ? { effectivenessScore: score, status: result === 'ineffective' ? 'ineffective' : 'active' } : {}),
        });

        const updated = await InternalControl.findByPk(control.id, { include: controlIncludes as any });
        res.status(201).json(serializeControl(updated));
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la création du test de contrôle', error: error.message });
    }
});

router.put('/tests/:testId(\\d+)', authorizeRoles(...writeRoles), async (req: AuthRequest, res) => {
    try {
        const test = await InternalControlTestExecution.findByPk(Number(req.params.testId));
        if (!test) {
            res.status(404).json({ message: 'Test introuvable' });
            return;
        }

        const body = req.body || {};
        const result = body.result !== undefined && hasLookupCode(CONTROL_LOOKUPS.testResults, body.result)
            ? body.result
            : test.result;
        const score = body.score !== undefined
            ? clampScore(body.score, test.score)
            : test.score;

        await test.update({
            ...(body.title !== undefined ? { title: cleanText(body.title, test.title) } : {}),
            ...(body.testMethod !== undefined && hasLookupCode(CONTROL_LOOKUPS.testMethods, body.testMethod) ? { testMethod: body.testMethod } : {}),
            ...(body.result !== undefined ? { result } : {}),
            ...(body.plannedDate !== undefined ? { plannedDate: nullableDate(body.plannedDate) } : {}),
            ...(body.executedAt !== undefined ? { executedAt: nullableDate(body.executedAt) } : {}),
            ...(body.score !== undefined ? { score } : {}),
            ...(body.notes !== undefined ? { notes: cleanText(body.notes) || null } : {}),
            ...(body.evidenceSummary !== undefined ? { evidenceSummary: cleanText(body.evidenceSummary) || null } : {}),
            testerUserId: body.testerUserId || req.user!.id,
        });

        const updated = await refreshControlScoreFromTests(test.controlId);
        res.json(serializeControl(updated));
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du test', error: error.message });
    }
});

router.delete('/tests/:testId(\\d+)', authorizeRoles(...writeRoles), async (req, res) => {
    try {
        const test = await InternalControlTestExecution.findByPk(Number(req.params.testId));
        if (!test) {
            res.status(404).json({ message: 'Test introuvable' });
            return;
        }

        const controlId = test.controlId;
        await softDeleteInstance(test);
        const updated = await refreshControlScoreFromTests(controlId);
        res.json(serializeControl(updated));
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression du test', error: error.message });
    }
});

router.get('/overview', authorizeRoles(...allowedRoles), async (req: AuthRequest, res) => {
    try {
        const role = req.user!.role;
        const userId = req.user!.id;

        const riskIncludes = [
            { model: Department, as: 'departement', required: false },
            { model: User, as: 'riskManager', required: false, attributes: ['id', 'prenom', 'nom'] },
            { model: User, as: 'riskAgent', required: false, attributes: ['id', 'prenom', 'nom'] },
            { model: Organigramme, as: 'responsableTraitement', required: false, attributes: ['id', 'nom'] },
        ];

        let risks: any[] = [];
        let missions: any[] = [];

        if (isAuditCoordinationRole(role)) {
            missions = await AuditMission.findAll({
                where: { auditSeniorId: userId, type: AuditRecordType.MISSION_AUDIT },
                include: [
                    {
                        model: Risk,
                        as: 'risk',
                        required: false,
                        include: riskIncludes as any,
                    },
                    { model: User, as: 'auditSenior', required: false, attributes: ['id', 'prenom', 'nom'] },
                    { model: User, as: 'auditeur', required: false, attributes: ['id', 'prenom', 'nom'] },
                ],
                order: [['delai', 'ASC']],
            });

            const riskIds = Array.from(
                new Set(
                    missions
                        .map((mission) => mission.riskId)
                        .filter((riskId) => typeof riskId === 'number')
                )
            );

            risks = riskIds.length
                ? await Risk.findAll({
                    where: { id: { [Op.in]: riskIds } },
                    include: riskIncludes as any,
                    order: [['updatedAt', 'DESC']],
                })
                : [];
        } else {
            const riskWhere: Record<string, unknown> = {};

            if (role === UserRole.RISK_MANAGER) {
                riskWhere.riskManagerId = userId;
            } else if (role === UserRole.RISK_AGENT) {
                riskWhere.riskAgentId = userId;
            }

            risks = await Risk.findAll({
                where: riskWhere,
                include: riskIncludes as any,
                order: [['updatedAt', 'DESC']],
            });

            const riskIds = risks.map((risk) => risk.id);
            const missionWhere: Record<string, unknown> = {};
            missionWhere.type = AuditRecordType.MISSION_AUDIT;

            if ((role === UserRole.RISK_MANAGER || role === UserRole.RISK_AGENT) && riskIds.length) {
                missionWhere.riskId = { [Op.in]: riskIds };
            } else if (role === UserRole.RISK_MANAGER || role === UserRole.RISK_AGENT) {
                missionWhere.riskId = { [Op.in]: [-1] };
            }

            missions = await AuditMission.findAll({
                where: missionWhere,
                include: [
                    {
                        model: Risk,
                        as: 'risk',
                        required: false,
                        include: riskIncludes as any,
                    },
                    { model: User, as: 'auditSenior', required: false, attributes: ['id', 'prenom', 'nom'] },
                    { model: User, as: 'auditeur', required: false, attributes: ['id', 'prenom', 'nom'] },
                ],
                order: [['delai', 'ASC']],
            });
        }

        const scopedRiskIds = Array.from(new Set(risks.map((risk) => risk.id)));
        const scopedDepartmentIds = Array.from(
            new Set(
                risks
                    .map((risk) => risk.departementId)
                    .filter((departementId) => typeof departementId === 'number')
            )
        );

        let incidents: any[] = [];
        if (role === UserRole.SUPER_ADMIN || role === UserRole.TOP_MANAGEMENT || role === UserRole.CONTROLLER) {
            incidents = await Incident.findAll({
                include: [{ model: User, as: 'declareur', required: false, attributes: ['id', 'prenom', 'nom'] }],
                order: [['updatedAt', 'DESC']],
            });
        } else if (scopedRiskIds.length || scopedDepartmentIds.length) {
            const incidentFilters: any[] = [];

            if (scopedRiskIds.length) {
                incidentFilters.push({ riskId: { [Op.in]: scopedRiskIds } });
            }

            if (scopedDepartmentIds.length) {
                incidentFilters.push({ departementId: { [Op.in]: scopedDepartmentIds } });
            }

            incidents = await Incident.findAll({
                where: { [Op.or]: incidentFilters },
                include: [{ model: User, as: 'declareur', required: false, attributes: ['id', 'prenom', 'nom'] }],
                order: [['updatedAt', 'DESC']],
            });
        }

        const missionIds = missions.map((mission) => mission.id);
        const evidences = missionIds.length
            ? await AuditEvidence.findAll({
                where: { missionId: { [Op.in]: missionIds } },
                include: [
                    { model: User, as: 'uploader', required: false, attributes: ['id', 'prenom', 'nom'] },
                    {
                        model: AuditMission,
                        as: 'mission',
                        required: false,
                        include: [
                            {
                                model: Risk,
                                as: 'risk',
                                required: false,
                                include: [{ model: Department, as: 'departement', required: false }],
                            },
                        ],
                    },
                ],
                order: [['createdAt', 'DESC']],
            })
            : [];

        const persistentControls = await getPersistentControls();
        const persistentRegistry = persistentControls.map(serializeControl);

        const fallbackRegistry = risks.map((risk) => {
            const owner =
                buildDisplayName(risk.riskAgent) ||
                buildDisplayName(risk.riskManager) ||
                buildDisplayName(risk.responsableTraitement);

            return {
                id: risk.id,
                code: `CTRL-${String(risk.id).padStart(4, '0')}`,
                title: risk.dmrExistant || risk.titre,
                controlType: inferControlType(risk),
                controlTypeLabel: inferControlType(risk),
                executionType: isPeriodicFrequency(risk.frequenceTraitement) ? 'periodique' : 'ponctuel',
                occurrenceLabel: getOccurrenceLabel(risk.frequenceTraitement),
                frequency: risk.frequenceTraitement || 'none',
                frequencyLabel: risk.frequenceTraitement || 'Non renseignee',
                departmentId: risk.departementId || null,
                department: risk.departement?.nom || 'Non rattache',
                linkedRisk: risk.titre,
                riskIds: [risk.id],
                risks: [{ id: risk.id, title: risk.titre }],
                ownerUserId: risk.riskAgentId || risk.riskManagerId || null,
                owner: owner || 'Non assigne',
                maturity: Math.max(1, Math.min(5, Math.round((risk.niveauCotationRisqueNet || risk.niveauCotationRisqueBrut || 40) / 128))),
                nextReview: risk.prochaineEcheance || risk.dateEcheance || null,
                lastTestedAt: null,
                effectivenessScore: 0,
                status: isCompletedRiskStatus(risk.statut) ? 'maitrise' : 'a_revoir',
                statusLabel: isCompletedRiskStatus(risk.statut) ? 'Maîtrisé' : 'À revoir',
                tests: [],
            };
        });

        const registry = persistentRegistry.length ? persistentRegistry : fallbackRegistry;

        const planning = [
            ...registry.map((control) => ({
                id: `control-${control.id}`,
                title: control.title,
                scheduleType: 'controle',
                cadence: control.executionType === 'periodic' || control.executionType === 'periodique' ? 'periodique' : 'ponctuel',
                occurrenceLabel: control.occurrenceLabel,
                frequencyLabel: control.frequencyLabel,
                dueDate: control.nextReview,
                department: control.department,
                owner: control.owner,
                status: control.status,
                controlCode: control.code,
                linkLabel: control.linkedRisk,
            })),
            ...missions.map((mission) => ({
                id: `audit-${mission.id}`,
                title: mission.titre,
                scheduleType: 'audit',
                cadence: isPeriodicFrequency(mission.risk?.frequenceTraitement) ? 'periodique' : 'ponctuel',
                occurrenceLabel: getOccurrenceLabel(mission.risk?.frequenceTraitement),
                frequencyLabel: mission.risk?.frequenceTraitement || 'Selon plan audit',
                dueDate: mission.delai || null,
                department: mission.risk?.departement?.nom || 'Non rattache',
                owner: buildDisplayName(mission.auditeur) || buildDisplayName(mission.auditSenior),
                status: normalizeLookupValue(mission.statut) === 'en_retard' ? 'en_retard' : mission.statut,
                controlCode: mission.riskId ? `CTRL-${String(mission.riskId).padStart(4, '0')}` : null,
                linkLabel: mission.risk?.titre || 'Mission transverse',
            })),
        ].sort((first, second) => {
            const firstTime = first.dueDate ? new Date(first.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
            const secondTime = second.dueDate ? new Date(second.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
            return firstTime - secondTime;
        });

        const evidenceEntries = [
            ...evidences.map((evidence: any) => ({
                id: `audit-${evidence.id}`,
                title: evidence.mission?.titre || evidence.filename,
                sourceType: 'audit',
                author: buildDisplayName(evidence.uploader),
                depositedBy: buildDisplayName(evidence.uploader) || 'Auteur non renseigne',
                department: evidence.mission?.risk?.departement?.nom || 'Non rattache',
                controlCode: evidence.mission?.riskId ? `CTRL-${String(evidence.mission.riskId).padStart(4, '0')}` : null,
                controlTitle: evidence.mission?.risk?.dmrExistant || evidence.mission?.risk?.titre || null,
                linkedAudit: evidence.mission?.titre || null,
                auditLabel: evidence.mission?.titre || 'Audit non rattache',
                uploadedAt: evidence.createdAt,
                filename: evidence.filename,
            })),
            ...risks
                .filter((risk) => Boolean(risk.pieceJustificative))
                .map((risk) => ({
                    id: `risk-${risk.id}`,
                    title: risk.titre,
                    sourceType: 'risque',
                    author: buildDisplayName(risk.riskManager),
                    depositedBy: buildDisplayName(risk.riskManager) || 'Auteur non renseigne',
                    department: risk.departement?.nom || 'Non rattache',
                    controlCode: `CTRL-${String(risk.id).padStart(4, '0')}`,
                    controlTitle: risk.dmrExistant || risk.titre,
                    linkedAudit: null,
                    auditLabel: 'Hors audit',
                    uploadedAt: risk.updatedAt,
                    filename: String(risk.pieceJustificative).split(/[\\/]/).pop() || 'justificatif',
                })),
            ...incidents
                .filter((incident) => Boolean(incident.pieceJointe))
                .map((incident) => ({
                    id: `incident-${incident.id}`,
                    title: incident.titre,
                    sourceType: 'incident',
                    author: buildDisplayName(incident.declareur),
                    depositedBy: buildDisplayName(incident.declareur) || 'Auteur non renseigne',
                    department: risks.find((risk) => risk.departementId === incident.departementId)?.departement?.nom || 'Non rattache',
                    controlCode: incident.riskId ? `CTRL-${String(incident.riskId).padStart(4, '0')}` : null,
                    controlTitle: risks.find((risk) => risk.id === incident.riskId)?.dmrExistant || risks.find((risk) => risk.id === incident.riskId)?.titre || null,
                    linkedAudit: null,
                    auditLabel: 'Incident hors audit',
                    uploadedAt: incident.updatedAt,
                    filename: String(incident.pieceJointe).split(/[\\/]/).pop() || 'piece-jointe',
                })),
        ].sort((first, second) => new Date(second.uploadedAt).getTime() - new Date(first.uploadedAt).getTime());

        const effectiveness = registry.map((control) => {
            const controlRiskIds = Array.isArray(control.riskIds) && control.riskIds.length ? control.riskIds : [control.id];
            const linkedRisk = risks.find((risk) => controlRiskIds.includes(risk.id));
            const linkedMission = missions
                .filter((mission) => controlRiskIds.includes(mission.riskId) && isCompletedMissionStatus(mission.statut))
                .sort((first, second) => new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime())[0];

            const referenceDate = control.lastTestedAt || getControlReferenceDate(linkedRisk, linkedMission);
            const relatedIncidents = incidents.filter((incident) => controlRiskIds.includes(incident.riskId) || incident.departementId === linkedRisk?.departementId);
            const beforeCount = referenceDate
                ? relatedIncidents.filter((incident) => new Date(incident.dateSurvenance).getTime() < new Date(referenceDate).getTime()).length
                : relatedIncidents.length;
            const afterCount = referenceDate
                ? relatedIncidents.filter((incident) => new Date(incident.dateSurvenance).getTime() >= new Date(referenceDate).getTime()).length
                : relatedIncidents.length;
            const incidentsAfterControl = referenceDate
                ? relatedIncidents.filter((incident) => new Date(incident.dateSurvenance).getTime() >= new Date(referenceDate).getTime())
                : relatedIncidents;
            const lastIncidentAfterControl = incidentsAfterControl
                .sort((first, second) => new Date(second.dateSurvenance).getTime() - new Date(first.dateSurvenance).getTime())[0];

            let score = Number(control.effectivenessScore || 0) || 68;
            if (afterCount === 0) {
                score += 16;
            }
            if (afterCount < beforeCount) {
                score += 8;
            }
            if (afterCount > beforeCount) {
                score -= 18;
            }
            if (isCompletedRiskStatus(linkedRisk?.statut)) {
                score += 8;
            } else {
                score -= 6;
            }
            if (evidenceEntries.some((entry) => controlRiskIds.some((riskId: number) => entry.id === `risk-${riskId}`) || entry.linkedAudit === linkedMission?.titre)) {
                score += 6;
            }

            score = Math.max(25, Math.min(100, score));

            return {
                controlCode: control.code,
                title: control.title,
                implementationDate: referenceDate || null,
                department: control.department,
                incidentsBefore: beforeCount,
                incidentsAfter: afterCount,
                incidentsReproduced: afterCount > 0,
                lastIncidentDate: lastIncidentAfterControl?.dateSurvenance || null,
                recurrenceTrend: afterCount < beforeCount ? 'en_baisse' : afterCount > beforeCount ? 'en_hausse' : 'stable',
                evaluationResult: afterCount === 0 ? 'efficace' : afterCount > beforeCount ? 'inefficace' : 'a_confirmer',
                recurrenceNote: afterCount === 0
                    ? 'Aucun incident reproduit apres le controle'
                    : `${afterCount} incident(s) reproduit(s) apres le controle`,
                score,
            };
        }).sort((first, second) => second.score - first.score);

        const nonConformities = incidents
            .filter((incident) => isOpenIncidentStatus(incident.statut))
            .map((incident) => {
                const linkedRisk = risks.find((risk) => risk.id === incident.riskId);
                const severity = linkedRisk?.niveauRisque || incident.niveauRisque || 'medium';
                const linkedMission = missions
                    .filter((mission) => mission.riskId === linkedRisk?.id && isCompletedMissionStatus(mission.statut))
                    .sort((first, second) => new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime())[0];
                const referenceDate = getControlReferenceDate(linkedRisk, linkedMission);
                const occurredAfterControl = referenceDate
                    ? new Date(incident.dateSurvenance).getTime() >= new Date(referenceDate).getTime()
                    : false;

                return {
                    id: incident.id,
                    title: incident.titre,
                    department: linkedRisk?.departement?.nom || risks.find((risk) => risk.departementId === incident.departementId)?.departement?.nom || 'Non rattache',
                    status: incident.statut,
                    severity,
                    dueDate: incident.dateEcheance || linkedRisk?.dateEcheance || null,
                    owner: buildDisplayName(incident.declareur),
                    controlCode: linkedRisk ? `CTRL-${String(linkedRisk.id).padStart(4, '0')}` : 'CTRL-N/A',
                    controlTitle: linkedRisk?.dmrExistant || linkedRisk?.titre || 'Controle a qualifier',
                    detectionDate: incident.dateSurvenance || incident.createdAt,
                    followUpStatus: occurredAfterControl ? 'Suivi post-controle' : 'Suivi ouvert',
                    correctiveAction: incident.planActionTraitement || linkedRisk?.planActionTraitement || 'Action corrective a definir',
                    occurredAfterControl,
                    source: linkedRisk ? linkedRisk.titre : 'Surveillance continue',
                };
            })
            .sort((first, second) => {
                const severityDelta = getSeverityWeight(second.severity) - getSeverityWeight(first.severity);
                if (severityDelta !== 0) {
                    return severityDelta;
                }

                const firstTime = first.dueDate ? new Date(first.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
                const secondTime = second.dueDate ? new Date(second.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
                return firstTime - secondTime;
            });

        const now = Date.now();
        const planningWithDueDates = planning.filter((item) => Boolean(item.dueDate));

        const summary = {
            totalControls: registry.length,
            periodicControls: registry.filter((control) => control.executionType === 'periodique' || control.executionType === 'periodic').length,
            ponctualControls: registry.filter((control) => control.executionType === 'ponctuel' || control.executionType === 'one_time').length,
            upcomingActions: planningWithDueDates.filter((item) => {
                const dueTime = new Date(item.dueDate as string).getTime();
                return dueTime >= now && dueTime <= now + 30 * 24 * 60 * 60 * 1000;
            }).length,
            overdueActions: planningWithDueDates.filter((item) => new Date(item.dueDate as string).getTime() < now).length,
            evidenceCount: evidenceEntries.length,
            effectivenessScore: effectiveness.length
                ? Math.round(effectiveness.reduce((total, item) => total + item.score, 0) / effectiveness.length)
                : 0,
            openNonConformities: nonConformities.length,
        };

        res.json({
            generatedAt: new Date().toISOString(),
            summary,
            registry,
            planning,
            evidence: evidenceEntries,
            effectiveness,
            nonConformities,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Erreur lors de la preparation du module de controles internes',
            error: error?.message || 'unknown_error',
        });
    }
});

export default router;
