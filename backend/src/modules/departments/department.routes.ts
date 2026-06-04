import { Router, Response } from 'express';
import { Department } from './department.model';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import * as xlsx from 'xlsx';
import { secureUpload } from '../../middleware/file.middleware';
import { restoreSoftDeletedInstance, softDeleteInstance } from '../../utils/soft-delete';

const router = Router();
const uploadSecureExcel = secureUpload(['xlsx'], 'file', 2 * 1024 * 1024);

// Apply authentication
router.use(authenticateToken);

// Get all departments (Accessible to any authenticated user)
router.get('/', async (req, res) => {
    try {
        const departments = await Department.findAll({ order: [['nom', 'ASC']] });
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching departments', error });
    }
});

router.post('/', authorizeRoles(UserRole.ADMIN_SI), async (req: AuthRequest, res: Response) => {
    try {
        const nom = String(req.body?.nom || '').trim();
        if (!nom) return res.status(400).json({ message: 'Le nom est requis' });

        const existingDepartment = await Department.scope('withDeleted').findOne({ where: { nom } });
        if (existingDepartment) {
            if (existingDepartment.is_deleted) {
                existingDepartment.nom = nom;
                await restoreSoftDeletedInstance(existingDepartment);
                await existingDepartment.save();
                return res.status(200).json(existingDepartment);
            }

            return res.status(409).json({ message: 'Ce departement existe deja' });
        }

        const department = await Department.create({ nom });
        res.status(201).json(department);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', authorizeRoles(UserRole.ADMIN_SI), async (req: AuthRequest, res: Response) => {
    try {
        const nom = String(req.body?.nom || '').trim();
        if (!nom) return res.status(400).json({ message: 'Le nom est requis' });

        const department = await Department.findByPk(req.params.id as string);
        if (!department) return res.status(404).json({ message: 'Departement non trouve' });

        department.nom = nom;
        await department.save();
        res.json(department);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', authorizeRoles(UserRole.ADMIN_SI), async (req: AuthRequest, res: Response) => {
    try {
        const department = await Department.findByPk(req.params.id as string);
        if (!department) return res.status(404).json({ message: 'Departement non trouve' });

        await softDeleteInstance(department);
        res.json({ message: 'Departement supprime' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id/restore', authorizeRoles(UserRole.ADMIN_SI), async (req: AuthRequest, res: Response) => {
    try {
        const department = await Department.scope('withDeleted').findByPk(req.params.id as string);
        if (!department || !department.is_deleted) return res.status(404).json({ message: 'Departement non trouve' });

        await restoreSoftDeletedInstance(department);
        res.json(department);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/import', authorizeRoles(UserRole.ADMIN_SI), uploadSecureExcel, async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Aucun fichier telecharge' });

        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

        const names = data
            .map(row => row[0])
            .filter(value => typeof value === 'string' && value.trim())
            .map(value => value.trim());

        if (names.length === 0) return res.status(400).json({ message: 'Aucune donnee trouvee dans le fichier' });

        let createdCount = 0;
        let restoredCount = 0;
        for (const name of names) {
            const existingDepartment = await Department.scope('withDeleted').findOne({ where: { nom: name } });
            if (existingDepartment) {
                if (existingDepartment.is_deleted) {
                    await restoreSoftDeletedInstance(existingDepartment);
                    restoredCount++;
                }
                continue;
            }

            await Department.create({ nom: name });
            createdCount++;
        }

        res.json({ message: `${createdCount} departements importes avec succes, ${restoredCount} restaures` });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export { router };
