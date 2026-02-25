/**
 * @file auth.middleware.ts
 * @description Middlewares de sécurité pour l'authentification (JWT) 
 * et l'autorisation basée sur les rôles (RBAC).
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../modules/users/user.roles';

const JWT_SECRET = process.env.JWT_SECRET || 'change_me_to_a_secure_value';

/**
 * Extension de l'interface Request d'Express pour inclure les données de l'utilisateur authentifié.
 */
export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: UserRole;
        departementId?: number;
    };
}

/**
 * Middleware pour authentifier le jeton JWT fourni dans les headers.
 * @param req Requête entrante
 * @param res Réponse sortante
 * @param next Fonction suivante
 */
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // Unauthorized si pas de token

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return res.sendStatus(403); // Forbidden si le token est invalide
        req.user = user;
        next();
    });
};

/**
 * Middleware pour autoriser l'accès en fonction des rôles utilisateur.
 * @param allowedRoles Liste des rôles autorisés à accéder à la ressource
 */
export const authorizeRoles = (...allowedRoles: UserRole[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.sendStatus(401);
        }

        // Le Super Admin a accès à tout, ou le rôle de l'utilisateur doit être dans la liste autorisée
        if (req.user.role === UserRole.SUPER_ADMIN || allowedRoles.includes(req.user.role)) {
            return next();
        }

        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    };
};

/**
 * Middleware pour restreindre l'accès aux données d'un département spécifique.
 * Principalement utilisé pour les rôles Audit.
 */
export const restrictToDepartment = () => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) return res.sendStatus(401);

        const { role, departementId } = req.user;

        // Le Super Admin n'est pas restreint par département
        if (role === UserRole.SUPER_ADMIN) {
            return next();
        }

        // Les auditeurs sont limités à leur propre département
        if (role === UserRole.AUDITEUR || role === UserRole.AUDIT_SENIOR) {
            const resourceDeptId = req.params.departementId || req.query.departementId || req.body.departementId;

            if (resourceDeptId && Number(resourceDeptId) !== departementId) {
                return res.status(403).json({ message: 'Access denied: you can only access data from your department' });
            }
        }

        next();
    };
};
