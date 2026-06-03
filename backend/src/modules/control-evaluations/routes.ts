import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { secureUpload } from '../../middleware/file.middleware';
import { UserRole } from '../users/user.roles';
import { ControlEvaluationService } from './control-evaluation.service';

const router = Router();
const uploadEvidence = secureUpload(['pdf', 'docx', 'xlsx', 'jpg', 'jpeg', 'png'], 'evidenceFile', 15 * 1024 * 1024);

const saveToStorage = (file: Express.Multer.File, subDir: string): string => {
    const storageDir = path.join(process.cwd(), 'src', 'storage', subDir);
    if (!fs.existsSync(storageDir)) {
        fs.mkdirSync(storageDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const filePath = path.join(storageDir, fileName);
    fs.writeFileSync(filePath, file.buffer);
    return `/src/storage/${subDir}/${fileName}`;
};

router.use(authenticateToken);

const readRoles = [
    UserRole.SUPER_ADMIN,
    UserRole.CONTROLLER,
    UserRole.TOP_MANAGEMENT,
    UserRole.RISK_MANAGER,
    UserRole.AUDIT_DIRECTEUR,
    UserRole.AUDIT_RESPONSABLE,
    UserRole.CHEF_MISSION,
];

const writeRoles = [
    UserRole.SUPER_ADMIN,
    UserRole.CONTROLLER,
];

const contributionRoles = [
    UserRole.SUPER_ADMIN,
    UserRole.CONTROLLER,
    UserRole.RISK_MANAGER,
];

const validationRoles = [
    UserRole.SUPER_ADMIN,
    UserRole.TOP_MANAGEMENT,
];

const toId = (value: unknown): number => Number.parseInt(String(value), 10);

router.get('/', authorizeRoles(...readRoles), (_req, res) => {
    res.json({
        message: 'Control evaluation module ready',
        endpoints: [
            '/api/control-evaluations/reference',
            '/api/control-evaluations/campaigns',
        ],
    });
});

router.get('/lookups/:key', authorizeRoles(...readRoles), (req, res) => {
    try {
        res.json(ControlEvaluationService.getLookupOptions(String(req.params.key || '').trim()));
    } catch (error: any) {
        res.status(400).json({ message: 'Lookup controle interne non supporte', error: error.message });
    }
});

router.get('/reference', authorizeRoles(...readRoles), async (_req, res) => {
    try {
        res.json(await ControlEvaluationService.getReference());
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors du chargement du referentiel d evaluation', error: error.message });
    }
});

router.get('/campaigns', authorizeRoles(...readRoles), async (_req, res) => {
    try {
        res.json(await ControlEvaluationService.listCampaigns());
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors du chargement des campagnes', error: error.message });
    }
});

router.post('/campaigns', authorizeRoles(...writeRoles), async (req: AuthRequest, res) => {
    try {
        const campaign = await ControlEvaluationService.createCampaign(req.body || {}, req.user!.id);
        res.status(201).json(campaign);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la creation de la campagne', error: error.message });
    }
});

router.get('/campaigns/:id', authorizeRoles(...readRoles), async (req, res) => {
    try {
        const campaign = await ControlEvaluationService.getCampaign(toId(req.params.id));
        if (!campaign) {
            res.status(404).json({ message: 'Campagne introuvable' });
            return;
        }

        res.json(campaign);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors du chargement de la campagne', error: error.message });
    }
});

router.put('/campaigns/:id', authorizeRoles(...writeRoles), async (req, res) => {
    try {
        const campaign = await ControlEvaluationService.updateCampaign(toId(req.params.id), req.body || {});
        if (!campaign) {
            res.status(404).json({ message: 'Campagne introuvable' });
            return;
        }

        res.json(campaign);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise a jour de la campagne', error: error.message });
    }
});

router.delete('/campaigns/:id', authorizeRoles(...writeRoles), async (req, res) => {
    try {
        const deleted = await ControlEvaluationService.deleteCampaign(toId(req.params.id));
        if (!deleted) {
            res.status(404).json({ message: 'Campagne introuvable' });
            return;
        }

        res.json({ success: true });
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression de la campagne', error: error.message });
    }
});

router.post('/campaigns/:id/assessments/sync', authorizeRoles(...writeRoles), async (req: AuthRequest, res) => {
    try {
        await ControlEvaluationService.ensureCampaignAssessments(toId(req.params.id), req.user!.id);
        res.json(await ControlEvaluationService.getCampaign(toId(req.params.id)));
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la synchronisation des criteres', error: error.message });
    }
});

router.put('/assessments/:id', authorizeRoles(...writeRoles), async (req: AuthRequest, res) => {
    try {
        const campaign = await ControlEvaluationService.updateAssessment(toId(req.params.id), req.body || {}, req.user!.id);
        if (!campaign) {
            res.status(404).json({ message: 'Evaluation introuvable' });
            return;
        }

        res.json(campaign);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise a jour de l evaluation', error: error.message });
    }
});

router.post('/deficiencies', authorizeRoles(...contributionRoles), async (req: AuthRequest, res) => {
    try {
        res.status(201).json(await ControlEvaluationService.createDeficiency(req.body || {}, req.user!.id));
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la creation de la deficience', error: error.message });
    }
});

router.post('/campaigns/:id/evidence', authorizeRoles(...contributionRoles), uploadEvidence, async (req: AuthRequest, res) => {
    try {
        const filePath = req.file ? saveToStorage(req.file, 'control-evidence') : null;
        res.status(201).json(await ControlEvaluationService.createEvidence({
            ...(req.body || {}),
            campaignId: toId(req.params.id),
            title: req.body?.title || req.file?.originalname,
            filename: req.file?.originalname || req.body?.filename,
            filePath: filePath || req.body?.filePath,
            mimeType: req.file?.mimetype || req.body?.mimeType,
        }, req.user!.id));
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l ajout de la preuve', error: error.message });
    }
});

router.delete('/evidence/:id', authorizeRoles(...contributionRoles), async (req, res) => {
    try {
        const campaign = await ControlEvaluationService.deleteEvidence(toId(req.params.id));
        if (!campaign) {
            res.status(404).json({ message: 'Preuve introuvable' });
            return;
        }

        res.json(campaign);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la suppression de la preuve', error: error.message });
    }
});

router.put('/deficiencies/:id', authorizeRoles(...contributionRoles), async (req, res) => {
    try {
        const campaign = await ControlEvaluationService.updateDeficiency(toId(req.params.id), req.body || {});
        if (!campaign) {
            res.status(404).json({ message: 'Deficience introuvable' });
            return;
        }

        res.json(campaign);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise a jour de la deficience', error: error.message });
    }
});

router.post('/deficiencies/:id/measures', authorizeRoles(...contributionRoles), async (req: AuthRequest, res) => {
    try {
        const campaign = await ControlEvaluationService.createCompensatingMeasure(toId(req.params.id), req.body || {}, req.user!.id);
        if (!campaign) {
            res.status(404).json({ message: 'Deficience introuvable' });
            return;
        }

        res.status(201).json(campaign);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la creation de la mesure compensatoire', error: error.message });
    }
});

router.put('/measures/:id', authorizeRoles(...contributionRoles), async (req, res) => {
    try {
        const campaign = await ControlEvaluationService.updateCompensatingMeasure(toId(req.params.id), req.body || {});
        if (!campaign) {
            res.status(404).json({ message: 'Mesure compensatoire introuvable' });
            return;
        }

        res.json(campaign);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise a jour de la mesure compensatoire', error: error.message });
    }
});

router.get('/campaigns/:id/conclusion-preview', authorizeRoles(...readRoles), async (req, res) => {
    try {
        res.json(await ControlEvaluationService.computeConclusion(toId(req.params.id)));
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors du calcul de la conclusion', error: error.message });
    }
});

router.post('/campaigns/:id/conclusion', authorizeRoles(...validationRoles), async (req: AuthRequest, res) => {
    try {
        res.status(201).json(await ControlEvaluationService.createConclusion(toId(req.params.id), req.body || {}, req.user!.id));
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la validation de la conclusion', error: error.message });
    }
});

export default router;
