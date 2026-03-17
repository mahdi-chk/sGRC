import { Router, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Incident } from './incident.model';
import { authenticateToken, AuthRequest, authorizeRoles } from '../../middleware/auth.middleware';
import { secureUpload } from '../../middleware/file.middleware';
import { AIService } from '../ai/ai.service';
import { User } from '../users/user.model';
import { UserRole } from '../users/user.roles';

const router = Router();

/**
 * Middleware d'upload sécurisé pour les pièces jointes des incidents
 */
const uploadSecurePiece = secureUpload(['pdf', 'docx', 'jpg', 'jpeg', 'png'], 'pieceJointe', 10 * 1024 * 1024);

/**
 * Helper to save buffer to storage
 */
const saveToStorage = (file: Express.Multer.File, subDir: string): string => {
    const fileName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    const fullPath = path.join('src/storage', subDir, fileName);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, file.buffer);
    return fullPath;
};

// Appliquer l'authentification et l'autorisation par défaut à toutes les routes de ce module
router.use(authenticateToken);
router.use(authorizeRoles(UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR));

/**
 * CRÉER UN INCIDENT
 */
router.post('/', uploadSecurePiece, async (req: AuthRequest, res: Response) => {
    try {
        const cleanedBody = { ...req.body };
        for (const key in cleanedBody) {
            if (cleanedBody[key] === '' || cleanedBody[key] === 'null' || cleanedBody[key] === 'undefined') {
                cleanedBody[key] = null;
            }
        }

        const incidentData = {
            ...cleanedBody,
            userId: req.user!.id,
            pieceJointe: req.file ? saveToStorage(req.file, 'incidents') : null,
            dateSurvenance: cleanedBody.dateSurvenance || new Date()
        };

        const incident = await Incident.create(incidentData);
        res.status(201).json(incident);
    } catch (error: any) {
        console.error('Erreur creation incident:', error);
        res.status(400).json({
            message: 'Erreur lors de la création de l\'incident',
            error: error.message,
            validationErrors: error.errors ? error.errors.map((e: any) => e.message) : undefined
        });
    }
});

/**
 * RÉCUPÉRER TOUS LES INCIDENTS
 */
router.get('/', async (req: AuthRequest, res: Response) => {
    try {
        // Optionnellement: restriction par rôle, mais ici on expose tout pour l'historique
        const incidents = await Incident.findAll({
            include: [{ model: User, as: 'declareur', attributes: ['id', 'nom', 'prenom', 'mail'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(incidents);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la récupération des incidents', error: error.message });
    }
});

/**
 * GÉNÉRER DES RISQUES PAR IA À PARTIR D'UN INCIDENT
 */
router.post('/:id/generate-risks', async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const incident = await Incident.findByPk(parseInt(id, 10));

        if (!incident) {
            return res.status(404).json({ message: 'Incident non trouvé' });
        }

        let pieceJointeTexte = '';

        // Si une pièce jointe existe, on extrait son texte
        if (incident.pieceJointe) {
            try {
                // On recrée un objet type Express.Multer.File pour réutiliser l'extracteur
                const fileBuffer = fs.readFileSync(path.resolve(incident.pieceJointe));
                const originalname = path.basename(incident.pieceJointe);
                
                const dummyFile: Express.Multer.File = {
                    buffer: fileBuffer,
                    originalname: originalname,
                    fieldname: 'pieceJointe',
                    encoding: '7bit',
                    mimetype: 'application/octet-stream', // Approximatif
                    size: fileBuffer.length,
                    destination: '',
                    filename: originalname,
                    path: incident.pieceJointe,
                    stream: null as any
                };

                pieceJointeTexte = await AIService.extractTextFromFile(dummyFile);
            } catch (fileErr) {
                console.warn(`Impossible d'extraire le texte de la pièce jointe pour l'incident ${id}`, fileErr);
            }
        }

        // Appel au service IA pour une analyse intelligente prenant en compte le nouvel incident et l'historique
        const risks = await AIService.generateRisksFromIncident(incident, pieceJointeTexte, req.user!.role);
        
        // On retourne la prévisualisation au frontend (non inséré en base pour laisser la validation humaine)
        res.json(risks);

    } catch (error: any) {
        console.error('Erreur génération risques incident:', error);
        res.status(500).json({ message: 'Erreur lors de la génération des risques', error: error.message });
    }
});

/**
 * METTRE À JOUR UN INCIDENT (ÉDITER)
 */
router.put('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const incident = await Incident.findByPk(parseInt(id, 10));

        if (!incident) {
            return res.status(404).json({ message: 'Incident non trouvé' });
        }

        const cleanedBody = { ...req.body };
        for (const key in cleanedBody) {
            if (cleanedBody[key] === '' || cleanedBody[key] === 'null' || cleanedBody[key] === 'undefined') {
                cleanedBody[key] = null;
            }
        }

        await incident.update(cleanedBody);
        
        // Récupérer l'incident mis à jour avec les associations pour le renvoyer
        const updatedIncident = await Incident.findByPk(parseInt(id, 10), {
            include: [{ model: User, as: 'declareur', attributes: ['id', 'nom', 'prenom', 'mail'] }]
        });

        res.json(updatedIncident);
    } catch (error: any) {
        console.error('Erreur mise à jour incident:', error);
        res.status(400).json({
            message: 'Erreur lors de la mise à jour de l\'incident',
            error: error.message
        });
    }
});

export default router;
