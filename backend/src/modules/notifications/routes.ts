import { Router } from 'express';
import { Notification } from './notification.model';
import { authenticateToken, AuthRequest } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

// Get all notifications for current user
router.get('/', async (req: AuthRequest, res) => {
    try {
        const notifications = await Notification.findAll({
            where: { userId: req.user!.id },
            order: [['createdAt', 'DESC']],
            limit: 50
        });
        res.json(notifications);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
});

// Mark notification as read
router.put('/:id/read', async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findOne({
            where: { id, userId: req.user!.id }
        });

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        await notification.update({ isRead: true });
        res.json(notification);
    } catch (error: any) {
        res.status(400).json({ message: 'Error marking notification as read', error: error.message });
    }
});

// Mark all as read
router.put('/read-all', async (req: AuthRequest, res) => {
    try {
        await Notification.update(
            { isRead: true },
            { where: { userId: req.user!.id, isRead: false } }
        );
        res.json({ message: 'All notifications marked as read' });
    } catch (error: any) {
        res.status(400).json({ message: 'Error marking all notifications as read', error: error.message });
    }
});

export { router };
