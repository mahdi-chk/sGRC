import { Router } from 'express';
import { Department } from './department.model';
import { authenticateToken, authorizeRoles } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';

const router = Router();

// Apply authentication
router.use(authenticateToken);

// Get all departments (Accessible to Admin SI for user management)
router.get('/', authorizeRoles(UserRole.ADMIN_SI), async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching departments', error });
    }
});

export { router };
