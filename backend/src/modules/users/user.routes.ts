import { Router } from 'express';
import { ForeignKeyConstraintError, Op, UniqueConstraintError, ValidationError } from 'sequelize';
import { User } from './user.model';
import { Department } from '../departments/department.model';
import { hashPassword } from '../../utils/security';
import { authenticateToken, authorizeRoles } from '../../middleware/auth.middleware';
import { UserRole } from './user.roles';
import { emailService } from '../../utils/email.service';
import { restoreSoftDeletedInstance, softDeleteInstance } from '../../utils/soft-delete';
import { appLogger } from '../../utils/app-logger';

const router = Router();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const publicUserAttributes: string[] = ['id', 'nom', 'prenom', 'mail', 'telephone', 'poste', 'role', 'departementId'];

const sanitizeString = (value: unknown) => typeof value === 'string' ? value.trim() : '';

const normalizeUserPayload = (payload: any) => {
    const role = sanitizeString(payload.role);
    const poste = sanitizeString(payload.poste) || role;
    const normalized: any = {
        nom: sanitizeString(payload.nom),
        prenom: sanitizeString(payload.prenom),
        mail: sanitizeString(payload.mail).toLowerCase(),
        telephone: sanitizeString(payload.telephone),
        poste,
        role,
        departementId: Number(payload.departementId),
    };

    if (typeof payload.password === 'string' && payload.password.length > 0) {
        normalized.password = payload.password;
    }

    return normalized;
};

const validateUserPayload = (payload: any, requirePassword: boolean) => {
    if (!payload.nom) return 'Le nom est obligatoire.';
    if (!payload.prenom) return 'Le prenom est obligatoire.';
    if (!payload.mail) return 'L\'email est obligatoire.';
    if (!emailRegex.test(payload.mail)) return 'Le format de l\'email est invalide.';
    if (!payload.telephone) return 'Le telephone est obligatoire.';
    if (!payload.role || !Object.values(UserRole).includes(payload.role)) return 'Le role selectionne est invalide.';
    if (!Number.isInteger(payload.departementId) || payload.departementId <= 0) return 'Le departement selectionne est invalide.';
    if (!payload.poste) return 'Le poste est obligatoire.';
    if (requirePassword && !payload.password) return 'Le mot de passe est obligatoire pour un nouvel utilisateur.';
    if (payload.password && payload.password.length < 6) return 'Le mot de passe doit contenir au moins 6 caracteres.';
    return null;
};

const getUserRouteError = (error: any) => {
    if (error instanceof UniqueConstraintError) {
        return { status: 409, message: 'Cette adresse email est deja utilisee.' };
    }

    if (error instanceof ForeignKeyConstraintError) {
        return { status: 400, message: 'Le departement selectionne est introuvable.' };
    }

    if (error instanceof ValidationError) {
        const message = error.errors.map(entry => entry.message).filter(Boolean)[0];
        return { status: 400, message: message || 'Les donnees utilisateur sont invalides.' };
    }

    return {
        status: 400,
        message: error?.message || 'Erreur lors de la sauvegarde de l\'utilisateur.'
    };
};

const sendWelcomeEmailInBackground = (user: { mail: string; nom: string; prenom: string }) => {
    Promise.resolve()
        .then(() => emailService.sendWelcomeEmail(user))
        .catch((emailError) => {
            appLogger.error('Users', 'Failed to send welcome email', {
                email: user.mail,
                error: emailError,
            });
        });
};

router.use(authenticateToken);

router.get('/roles', (req, res) => {
    const roles = Object.values(UserRole);
    res.json(roles);
});

router.get('/assignable/auditors', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.AUDIT_SENIOR), async (req, res) => {
    try {
        const auditors = await User.findAll({
            where: { role: UserRole.AUDITEUR },
            attributes: publicUserAttributes
        });
        res.json(auditors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching auditors', error });
    }
});

router.get('/assignable/risk-agents', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER), async (req, res) => {
    try {
        const riskAgents = await User.findAll({
            where: { role: UserRole.RISK_AGENT },
            attributes: publicUserAttributes
        });
        res.json(riskAgents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching risk agents', error });
    }
});

router.get('/', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN_SI), async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: publicUserAttributes
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

router.post('/', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN_SI), async (req, res) => {
    try {
        const userData = normalizeUserPayload(req.body);
        const validationMessage = validateUserPayload(userData, true);
        if (validationMessage) {
            return res.status(400).json({ message: validationMessage });
        }

        const department = await Department.findByPk(userData.departementId);
        if (!department) {
            return res.status(400).json({ message: 'Le departement selectionne est introuvable.' });
        }

        const activeUser = await User.findOne({
            where: { mail: userData.mail }
        });
        if (activeUser) {
            return res.status(409).json({ message: 'Cette adresse email est deja utilisee.' });
        }

        const { hash, salt } = hashPassword(userData.password);
        userData.password_hash = hash;
        userData.password_salt = salt;
        delete userData.password;

        const deletedUser = await User.scope('withDeleted').findOne({
            where: { mail: userData.mail },
        });

        let user: User;
        if (deletedUser && deletedUser.is_deleted) {
            await restoreSoftDeletedInstance(deletedUser);
            user = await deletedUser.update(userData);
        } else {
            user = await User.create(userData);
        }

        const userResponse = user.toJSON();
        delete userResponse.password_hash;
        delete userResponse.password_salt;

        sendWelcomeEmailInBackground({
            mail: user.mail,
            nom: user.nom,
            prenom: user.prenom
        });

        return res.status(201).json(userResponse);
    } catch (error: any) {
        appLogger.error('Users', 'User creation failed', error.message);
        const { status, message } = getUserRouteError(error);
        return res.status(status).json({ message });
    }
});

router.put('/:id', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN_SI), async (req, res) => {
    try {
        const { id } = req.params;
        const userData = normalizeUserPayload(req.body);
        const validationMessage = validateUserPayload(userData, false);
        if (validationMessage) {
            return res.status(400).json({ message: validationMessage });
        }

        const department = await Department.findByPk(userData.departementId);
        if (!department) {
            return res.status(400).json({ message: 'Le departement selectionne est introuvable.' });
        }

        const existingUser = await User.scope('withDeleted').findOne({
            where: {
                mail: userData.mail,
                id: { [Op.ne]: Number(id) }
            }
        });
        if (existingUser) {
            return res.status(409).json({ message: 'Cette adresse email est deja utilisee.' });
        }

        if (userData.password) {
            const { hash, salt } = hashPassword(userData.password);
            userData.password_hash = hash;
            userData.password_salt = salt;
            delete userData.password;
        }

        const [updated] = await User.update(userData, { where: { id } });
        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await User.findByPk(id as string);
        const userResponse = updatedUser?.toJSON() || {};
        delete userResponse.password_hash;
        delete userResponse.password_salt;
        return res.json(userResponse);
    } catch (error: any) {
        appLogger.error('Users', 'User update failed', error.message);
        const { status, message } = getUserRouteError(error);
        return res.status(status).json({ message });
    }
});

router.delete('/:id', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN_SI), async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id as string);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await softDeleteInstance(user);
        return res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
        appLogger.error('Users', 'User deletion failed', error.message);
        return res.status(400).json({ message: 'Erreur inattendue lors de la suppression de l\'utilisateur.' });
    }
});

router.patch('/:id/restore', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN_SI), async (req, res) => {
    try {
        const user = await User.scope('withDeleted').findByPk(req.params.id as string);
        if (!user || !user.is_deleted) {
            return res.status(404).json({ message: 'User not found' });
        }

        await restoreSoftDeletedInstance(user);

        const restoredUser = await User.findByPk(req.params.id as string);
        const userResponse = restoredUser?.toJSON() || {};
        delete userResponse.password_hash;
        delete userResponse.password_salt;
        return res.json(userResponse);
    } catch (error: any) {
        appLogger.error('Users', 'User restore failed', error.message);
        return res.status(400).json({ message: 'Erreur inattendue lors de la restauration de l\'utilisateur.' });
    }
});

export { router };
