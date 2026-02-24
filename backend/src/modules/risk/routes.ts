import { Router } from 'express';
import { Op } from 'sequelize';
import multer from 'multer';
import path from 'path';
import { Risk, RiskLevel, RiskStatus } from './risk.model';
import { Comment } from './comment.model';
import { User } from '../users/user.model';
import { Department } from '../departments/department.model';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import { emailService } from '../../utils/email.service';
import { Notification, NotificationType } from '../notifications/notification.model';

const router = Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/storage/risks');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|jpg|jpeg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only PDF and Images (JPG/PNG) are allowed'));
    }
});

// Apply authentication to all routes
router.use(authenticateToken);

// Create Risk (Risk Manager and Super Admin)
router.post('/', authorizeRoles(UserRole.RISK_MANAGER, UserRole.SUPER_ADMIN), upload.single('pieceJustificative'), async (req: AuthRequest, res) => {
    try {
        const riskData = {
            ...req.body,
            riskManagerId: req.user!.id,
            pieceJustificative: req.file ? req.file.path : null,
            statut: RiskStatus.OPEN
        };

        const risk = await Risk.create(riskData);
        res.status(201).json(risk);
    } catch (error: any) {
        res.status(400).json({ message: 'Error creating risk', error: error.message });
    }
});

// Get all risks
router.get('/', async (req: AuthRequest, res) => {
    try {
        const { role, id } = req.user!;
        let risks;

        if (role === UserRole.SUPER_ADMIN || role === UserRole.TOP_MANAGEMENT) {
            risks = await Risk.findAll({ include: ['riskAgent', 'responsableTraitement', 'departement'] });
        } else if (role === UserRole.RISK_MANAGER) {
            risks = await Risk.findAll({
                where: {
                    [Op.or]: [
                        { riskManagerId: id },
                        { responsableTraitementId: id }
                    ]
                },
                include: ['riskAgent', 'responsableTraitement', 'departement']
            });
        } else if (role === UserRole.RISK_AGENT) {
            risks = await Risk.findAll({
                where: { riskAgentId: id },
                include: ['riskManager', 'responsableTraitement', 'departement']
            });
        } else {
            risks = await Risk.findAll({
                where: { responsableTraitementId: id },
                include: ['riskManager', 'riskAgent', 'departement']
            });
        }
        res.json(risks);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching risks', error: error.message });
    }
});

// Assign Risk (Risk Manager and Super Admin)
router.put('/:id/assign', authorizeRoles(UserRole.RISK_MANAGER, UserRole.SUPER_ADMIN), async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { riskAgentId } = req.body;

        const risk = await Risk.findByPk(parseInt(id as string));
        if (!risk) return res.status(404).json({ message: 'Risk not found' });

        await risk.update({ riskAgentId: parseInt(riskAgentId as string), statut: RiskStatus.IN_PROGRESS });

        // Background Notifications (non-blocking)
        (async () => {
            try {
                const agent = await User.findByPk(parseInt(riskAgentId as string));
                if (agent) {
                    await emailService.sendRiskAssignedEmail(
                        { mail: agent.mail, nom: agent.nom, prenom: agent.prenom },
                        { titre: risk.titre, id: risk.id }
                    );

                    // Create In-App Notification
                    await Notification.create({
                        userId: agent.id,
                        type: NotificationType.RISK_ASSIGNED,
                        content: `Un nouveau risque vous a été assigné : ${risk.titre}`,
                        riskId: risk.id
                    });
                    console.log('Background notification created for agent:', agent.id);
                }
            } catch (err) {
                console.error('Error in background notification for assignment:', err);
            }
        })();

        res.json(risk);
    } catch (error: any) {
        res.status(400).json({ message: 'Error assigning risk', error: error.message });
    }
});

// Update Risk Details (Risk Manager only)
router.put('/:id', upload.single('pieceJustificative'), async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        const { role } = req.user!;

        if (role !== UserRole.RISK_MANAGER && role !== UserRole.SUPER_ADMIN) {
            return res.status(403).json({ message: 'Only Risk Manager and Super Admin can edit risk details' });
        }

        const risk = await Risk.findByPk(parseInt(id as string));
        if (!risk) return res.status(404).json({ message: 'Risk not found' });

        if (req.file) {
            updateData.pieceJustificative = req.file.path;
        }

        await risk.update(updateData);
        res.json(risk);
    } catch (error: any) {
        res.status(400).json({ message: 'Error updating risk', error: error.message });
    }
});

// Update Status (Risk Agent or Risk Manager)
router.put('/:id/status', async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;
        const { id: userId, role } = req.user!;

        const risk = await Risk.findByPk(parseInt(id as string));
        if (!risk) return res.status(404).json({ message: 'Risk not found' });

        // RBAC: Only manager, super admin or assigned agent can update status
        if (role !== UserRole.SUPER_ADMIN && role !== UserRole.RISK_MANAGER && risk.riskAgentId !== userId) {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }

        // Risk Manager and Super Admin can set to CLOSED, Agent can set to TREATED
        if (statut === RiskStatus.CLOSED && role !== UserRole.RISK_MANAGER && role !== UserRole.SUPER_ADMIN) {
            return res.status(403).json({ message: 'Only Risk Manager and Super Admin can close risks' });
        }

        const oldStatut = risk.statut;
        const newStatut = statut as RiskStatus;
        await risk.update({ statut: newStatut });

        // Notifications
        if (newStatut === RiskStatus.TREATED) {
            const manager = await User.findByPk(risk.riskManagerId);
            if (manager) {
                await emailService.sendRiskStatusUpdateEmail(
                    { mail: manager.mail, nom: manager.nom, prenom: manager.prenom },
                    { titre: risk.titre, statut: newStatut }
                );

                // Create In-App Notification for Manager
                try {
                    await Notification.create({
                        userId: manager.id,
                        type: NotificationType.STATUS_CHANGED,
                        content: `Le statut du risque "${risk.titre}" a été mis à jour par l'agent : ${newStatut}`,
                        riskId: risk.id
                    });
                    console.log('Notification created for manager:', manager.id);
                } catch (notifErr) {
                    console.error('Error creating notification for manager:', notifErr);
                }
            }
        } else if (newStatut === RiskStatus.CLOSED) {
            const agent = await User.findByPk(risk.riskAgentId!);
            if (agent) {
                await emailService.sendRiskClosedEmail(
                    { mail: agent.mail, nom: agent.nom, prenom: agent.prenom },
                    { titre: risk.titre }
                );

                // Create In-App Notification for Agent
                try {
                    await Notification.create({
                        userId: agent.id,
                        type: NotificationType.STATUS_CHANGED,
                        content: `Le risque "${risk.titre}" a été clôturé par le manager.`,
                        riskId: risk.id
                    });
                    console.log('Notification created for agent:', agent.id);
                } catch (notifErr) {
                    console.error('Error creating notification for agent:', notifErr);
                }
            }
        } else if (newStatut === RiskStatus.IN_PROGRESS && oldStatut === RiskStatus.TREATED && role === UserRole.RISK_MANAGER) {
            const agent = await User.findByPk(risk.riskAgentId!);
            if (agent) {
                try {
                    await Notification.create({
                        userId: agent.id,
                        type: NotificationType.STATUS_CHANGED,
                        content: `Le risque "${risk.titre}" a été remis en cours de traitement par le manager car il n'a pas été traité correctement.`,
                        riskId: risk.id
                    });
                    console.log('Notification created for agent (revert):', agent.id);
                } catch (notifErr) {
                    console.error('Error creating notification for agent (revert):', notifErr);
                }
            }
        }

        res.json(risk);
    } catch (error: any) {
        res.status(400).json({ message: 'Error updating status', error: error.message });
    }
});

// Add Comment/Evidence (Risk Agent or Risk Manager)
router.post('/:id/comments', upload.single('pieceJointe'), async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const { id: userId } = req.user!;

        const comment = await Comment.create({
            content,
            riskId: parseInt(id as string),
            userId,
            pieceJointe: req.file ? (req.file.path as string) : null
        });

        // Notify other party
        const risk = await Risk.findByPk(parseInt(id as string));
        if (risk) {
            const recipientId = userId === risk.riskManagerId ? risk.riskAgentId : risk.riskManagerId;
            if (recipientId) {
                try {
                    await Notification.create({
                        userId: recipientId,
                        type: NotificationType.COMMENT_ADDED,
                        content: `Un nouveau commentaire a été ajouté au risque : ${risk.titre}`,
                        riskId: risk.id
                    });
                    console.log('Notification created for comment recipient:', recipientId);
                } catch (notifErr) {
                    console.error('Error creating notification for comment:', notifErr);
                }
            }
        }

        res.status(201).json(comment);
    } catch (error: any) {
        res.status(400).json({ message: 'Error adding comment', error: error.message });
    }
});

// Get Comments for a Risk
router.get('/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Comment.findAll({
            where: { riskId: id },
            include: ['user'],
            order: [['createdAt', 'ASC']]
        });
        res.json(comments);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
});

export { router };
