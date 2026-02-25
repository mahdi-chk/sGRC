/**
 * @file routes.ts
 * @description Définition des points de terminaison (endpoints) pour la gestion des risques.
 * Gère la création, l'assignation, le suivi du statut et les commentaires.
 */

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

/**
 * --- CONFIGURATION DU STOCKAGE DES FICHIERS (MULTER) ---
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/storage/risks');
    },
    filename: (req, file, cb) => {
        // Génération d'un nom de fichier unique
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 Mo
    fileFilter: (req, file, cb) => {
        // Filtrage des types de fichiers autorisés
        const allowedTypes = /pdf|jpg|jpeg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Seuls les fichiers PDF et les images (JPG/PNG) sont autorisés'));
    }
});

// Appliquer l'authentification à toutes les routes de ce module
router.use(authenticateToken);

/**
 * --- ROUTES DE GESTION DES RISQUES ---
 */

/**
 * CRÉER UN RISQUE
 * Accessible par : Risk Manager, Super Admin
 */
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
        res.status(400).json({ message: 'Erreur lors de la création du risque', error: error.message });
    }
});

/**
 * RÉCUPÉRER TOUS LES RISQUES
 * Filtre les résultats en fonction du rôle de l'utilisateur.
 */
router.get('/', async (req: AuthRequest, res) => {
    try {
        const { role, id } = req.user!;
        let risks;

        // Logique de filtrage par rôle
        if (role === UserRole.SUPER_ADMIN || role === UserRole.TOP_MANAGEMENT) {
            // Accès total
            risks = await Risk.findAll({ include: ['riskAgent', 'responsableTraitement', 'departement'] });
        } else if (role === UserRole.RISK_MANAGER) {
            // Risques créés par lui ou dont il est responsable
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
            // Risques qui lui sont assignés pour traitement
            risks = await Risk.findAll({
                where: { riskAgentId: id },
                include: ['riskManager', 'responsableTraitement', 'departement']
            });
        } else {
            // Autres rôles (ex: Responsable de département)
            risks = await Risk.findAll({
                where: { responsableTraitementId: id },
                include: ['riskManager', 'riskAgent', 'departement']
            });
        }
        res.json(risks);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la récupération des risques', error: error.message });
    }
});

/**
 * ASSIGNER UN RISQUE À UN AGENT
 */
router.put('/:id/assign', authorizeRoles(UserRole.RISK_MANAGER, UserRole.SUPER_ADMIN), async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { riskAgentId } = req.body;

        const risk = await Risk.findByPk(parseInt(id as string));
        if (!risk) return res.status(404).json({ message: 'Risque non trouvé' });

        await risk.update({ riskAgentId: parseInt(riskAgentId as string), statut: RiskStatus.IN_PROGRESS });

        // Notifications en arrière-plan (non-bloquant)
        (async () => {
            try {
                const agent = await User.findByPk(parseInt(riskAgentId as string));
                if (agent) {
                    // Envoi d'email
                    await emailService.sendRiskAssignedEmail(
                        { mail: agent.mail, nom: agent.nom, prenom: agent.prenom },
                        { titre: risk.titre, id: risk.id }
                    );

                    // Création de notification in-app
                    await Notification.create({
                        userId: agent.id,
                        type: NotificationType.RISK_ASSIGNED,
                        content: `Un nouveau risque vous a été assigné : ${risk.titre}`,
                        riskId: risk.id
                    });
                }
            } catch (err) {
                console.error('Erreur lors de la notification d\'assignation:', err);
            }
        })();

        res.json(risk);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l\'assignation du risque', error: error.message });
    }
});

/**
 * METTRE À JOUR LES DÉTAILS D'UN RISQUE
 */
router.put('/:id', upload.single('pieceJustificative'), async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        const { role } = req.user!;

        // Seuls le Risk Manager et le Super Admin peuvent modifier les détails
        if (role !== UserRole.RISK_MANAGER && role !== UserRole.SUPER_ADMIN) {
            return res.status(403).json({ message: 'Permissions insuffisantes' });
        }

        const risk = await Risk.findByPk(parseInt(id as string));
        if (!risk) return res.status(404).json({ message: 'Risque non trouvé' });

        if (req.file) {
            updateData.pieceJustificative = req.file.path;
        }

        await risk.update(updateData);
        res.json(risk);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du risque', error: error.message });
    }
});

/**
 * METTRE À JOUR LE STATUT DU RISQUE
 */
router.put('/:id/status', async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;
        const { id: userId, role } = req.user!;

        const risk = await Risk.findByPk(parseInt(id as string));
        if (!risk) return res.status(404).json({ message: 'Risque non trouvé' });

        // Vérification des permissions (RBAC)
        if (role !== UserRole.SUPER_ADMIN && role !== UserRole.RISK_MANAGER && risk.riskAgentId !== userId) {
            return res.status(403).json({ message: 'Permissions insuffisantes' });
        }

        // Restriction : Seuls le Manager/Admin peuvent clôturer
        if (statut === RiskStatus.CLOSED && role !== UserRole.RISK_MANAGER && role !== UserRole.SUPER_ADMIN) {
            return res.status(403).json({ message: 'Seul le manager peut clôturer un risque' });
        }

        const oldStatut = risk.statut;
        const newStatut = statut as RiskStatus;
        await risk.update({ statut: newStatut });

        /**
         * LOGIQUE DE NOTIFICATION SUR CHANGEMENT DE STATUT
         */
        if (newStatut === RiskStatus.TREATED) {
            // L'agent a traité le risque, on notifie le manager
            const manager = await User.findByPk(risk.riskManagerId);
            if (manager) {
                await emailService.sendRiskStatusUpdateEmail(
                    { mail: manager.mail, nom: manager.nom, prenom: manager.prenom },
                    { titre: risk.titre, statut: newStatut }
                );
                await Notification.create({
                    userId: manager.id,
                    type: NotificationType.STATUS_CHANGED,
                    content: `Le statut du risque "${risk.titre}" a été mis à jour par l'agent : ${newStatut}`,
                    riskId: risk.id
                });
            }
        } else if (newStatut === RiskStatus.CLOSED) {
            // Le manager a clôturé, on notifie l'agent
            const agent = await User.findByPk(risk.riskAgentId!);
            if (agent) {
                await emailService.sendRiskClosedEmail(
                    { mail: agent.mail, nom: agent.nom, prenom: agent.prenom },
                    { titre: risk.titre }
                );
                await Notification.create({
                    userId: agent.id,
                    type: NotificationType.STATUS_CHANGED,
                    content: `Le risque "${risk.titre}" a été clôturé par le manager.`,
                    riskId: risk.id
                });
            }
        } else if (newStatut === RiskStatus.IN_PROGRESS && oldStatut === RiskStatus.TREATED && role === UserRole.RISK_MANAGER) {
            // Le manager rejette le traitement et remet en cours
            const agent = await User.findByPk(risk.riskAgentId!);
            if (agent) {
                await Notification.create({
                    userId: agent.id,
                    type: NotificationType.STATUS_CHANGED,
                    content: `Le risque "${risk.titre}" a été remis en cours de traitement par le manager car il n'a pas été traité correctement.`,
                    riskId: risk.id
                });
            }
        }

        res.json(risk);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du statut', error: error.message });
    }
});

/**
 * AJOUTER UN COMMENTAIRE OU UNE PREUVE
 */
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

        // Notifier l'autre partie (Agent <=> Manager)
        const risk = await Risk.findByPk(parseInt(id as string));
        if (risk) {
            const recipientId = userId === risk.riskManagerId ? risk.riskAgentId : risk.riskManagerId;
            if (recipientId) {
                await Notification.create({
                    userId: recipientId,
                    type: NotificationType.COMMENT_ADDED,
                    content: `Un nouveau commentaire a été ajouté au risque : ${risk.titre}`,
                    riskId: risk.id
                });
            }
        }

        res.status(201).json(comment);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l\'ajout du commentaire', error: error.message });
    }
});

/**
 * RÉCUPÉRER TOUS LES COMMENTAIRES D'UN RISQUE
 */
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
        res.status(500).json({ message: 'Erreur lors de la récupération des commentaires', error: error.message });
    }
});

export { router };
