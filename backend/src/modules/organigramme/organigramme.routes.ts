import { Router, Response } from 'express';
import { Organigramme } from './organigramme.model';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import multer from 'multer';
import * as xlsx from 'xlsx';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @route GET /api/organigramme
 * @desc Récupérer tous les éléments de l'organigramme
 * @access Authentifié
 */
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const items = await Organigramme.findAll({ order: [['nom', 'ASC']] });
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route POST /api/organigramme
 * @desc Créer un nouvel élément (Admin seulement)
 * @access Admin SI, Super Admin
 */
router.post('/', authenticateToken, authorizeRoles(UserRole.ADMIN_SI), async (req: AuthRequest, res: Response) => {
    try {
        const { nom } = req.body;
        if (!nom) return res.status(400).json({ message: 'Le nom est requis' });

        const item = await Organigramme.create({ nom });
        res.status(201).json(item);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @route PUT /api/organigramme/:id
 * @desc Modifier un élément (Admin seulement)
 * @access Admin SI, Super Admin
 */
router.put('/:id', authenticateToken, authorizeRoles(UserRole.ADMIN_SI), async (req: AuthRequest, res: Response) => {
    try {
        const { nom } = req.body;
        const item = await Organigramme.findByPk(req.params.id as string);
        if (!item) return res.status(404).json({ message: 'Élément non trouvé' });

        item.nom = nom;
        await item.save();
        res.json(item);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @route DELETE /api/organigramme/:id
 * @desc Supprimer un élément (Admin seulement)
 * @access Admin SI, Super Admin
 */
router.delete('/:id', authenticateToken, authorizeRoles(UserRole.ADMIN_SI), async (req: AuthRequest, res: Response) => {
    try {
        const item = await Organigramme.findByPk(req.params.id as string);
        if (!item) return res.status(404).json({ message: 'Élément non trouvé' });

        await item.destroy();
        res.json({ message: 'Élément supprimé' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route POST /api/organigramme/import
 * @desc Importer des noms depuis un fichier Excel (Admin seulement)
 * @access Admin SI, Super Admin
 */
router.post('/import', authenticateToken, authorizeRoles(UserRole.ADMIN_SI), upload.single('file'), async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Aucun fichier téléchargé' });

        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

        const names: string[] = [];
        data.forEach(row => {
            if (row[0] && typeof row[0] === 'string') {
                names.push(row[0].trim());
            }
        });

        if (names.length === 0) return res.status(400).json({ message: 'Aucune donnée trouvée dans le fichier' });

        let createdCount = 0;
        for (const name of names) {
            try {
                const [item, created] = await Organigramme.findOrCreate({ where: { nom: name } });
                if (created) createdCount++;
            } catch (e) {
                // Skip errors (e.g. duplicates)
            }
        }

        res.json({ message: `${createdCount} éléments importés avec succès` });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
