import { Router } from 'express';
import { SystemSetting } from './setting.model';
import { authenticateToken, authorizeRoles } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles(UserRole.ADMIN_SI));

// Get all settings or a specific one
router.get('/', async (req, res) => {
    try {
        const settings = await SystemSetting.findAll();
        const settingsMap = settings.reduce((acc: any, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {});
        res.json(settingsMap);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching settings', error });
    }
});

// Update or create a setting
router.post('/', async (req, res) => {
    try {
        const { key, value } = req.body;
        console.log(`Updating setting: ${key} = ${value}`);
        const [setting, created] = await SystemSetting.upsert({ key, value });
        console.log(`Setting ${key} ${created ? 'created' : 'updated'}.`);
        res.status(created ? 201 : 200).json(setting);
    } catch (error) {
        console.error('Error updating setting:', error);
        res.status(400).json({ message: 'Error updating setting', error });
    }
});

export { router };
