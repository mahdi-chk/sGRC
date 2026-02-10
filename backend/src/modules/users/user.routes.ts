import { Router } from 'express';
import { User } from './user.model';
import { hashPassword } from '../../utils/security';
import { authenticateToken, authorizeRoles } from '../../middleware/auth.middleware';
import { UserRole } from './user.roles';

const router = Router();

// Apply authentication and Admin SI authorization to all user routes
router.use(authenticateToken);
router.use(authorizeRoles(UserRole.ADMIN_SI));

// Get all roles
router.get('/roles', (req, res) => {
    const roles = Object.values(UserRole);
    res.json(roles);
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Create user
router.post('/', async (req, res) => {
    try {
        const userData = { ...req.body };
        if (userData.password) {
            const { hash, salt } = hashPassword(userData.password);
            userData.password_hash = hash;
            userData.password_salt = salt;
            delete userData.password;
        }
        const user = await User.create(userData);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});

// Update user
router.put('/:id', async (req, res) => {
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
            const updatedUser = await User.findByPk(id);
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
});

export { router };
