import { Router } from 'express';
import { User } from './user.model';
import { hashPassword } from '../../utils/security';
import { authenticateToken, authorizeRoles } from '../../middleware/auth.middleware';
import { UserRole } from './user.roles';
import { emailService } from '../../utils/email.service';

const router = Router();

// Apply authentication to all user routes
router.use(authenticateToken);
// We no longer apply authorizeRoles(UserRole.ADMIN_SI) globally here 
// to allow other roles (like Risk Manager) to fetch users for assignment.

// Get all roles
router.get('/roles', (req, res) => {
    const roles = Object.values(UserRole);
    res.json(roles);
});

// Get all users (Accessible to anyone authenticated, or restricted to specific roles if needed)
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'nom', 'prenom', 'mail', 'telephone', 'poste', 'role', 'departementId']
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Create user (Admin SI only)
router.post('/', authorizeRoles(UserRole.ADMIN_SI), async (req, res) => {
    try {
        const userData = { ...req.body };
        if (userData.password) {
            const { hash, salt } = hashPassword(userData.password);
            userData.password_hash = hash;
            userData.password_salt = salt;
            delete userData.password;
        }
        const user = await User.create(userData);

        try {
            const { mail, nom, prenom } = user;
            await emailService.sendWelcomeEmail({ mail, nom, prenom });
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
        }

        res.status(201).json(user);
    } catch (error: any) {
        console.error('Sequelize Error Details:', error);
        res.status(400).json({
            message: 'Error creating user',
            error: error.message,
            details: error.errors // Sequelize validation errors
        });
    }
});

// Update user (Admin SI only)
router.put('/:id', authorizeRoles(UserRole.ADMIN_SI), async (req, res) => {
    try {
        const { id } = req.params;
        const userData = { ...req.body };
        if (userData.password) {
            const { hash, salt } = hashPassword(userData.password);
            userData.password_hash = hash;
            userData.password_salt = salt;
            delete userData.password;
        }
        const [updated] = await User.update(userData, { where: { id } });
        if (updated) {
            const updatedUser = await User.findByPk(id as string);
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        console.error('Sequelize Error Details:', error);
        res.status(400).json({
            message: 'Error updating user',
            error: error.message,
            details: error.errors
        });
    }
});

// Delete user (Admin SI only)
router.delete('/:id', authorizeRoles(UserRole.ADMIN_SI), async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error });
    }
});

export { router };
