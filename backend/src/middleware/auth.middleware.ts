import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../modules/users/user.roles';

const JWT_SECRET = process.env.JWT_SECRET || 'change_me_to_a_secure_value';

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: UserRole;
        departementId?: number;
    };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: insufficient permissions' });
        }
        next();
    };
};

export const restrictToDepartment = () => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) return res.sendStatus(401);

        const { role, departementId } = req.user;

        // Auditeur and Audit Senior are restricted to their department
        if (role === UserRole.AUDITEUR || role === UserRole.AUDIT_SENIOR) {
            const resourceDeptId = req.params.departementId || req.query.departementId || req.body.departementId;

            if (resourceDeptId && Number(resourceDeptId) !== departementId) {
                return res.status(403).json({ message: 'Access denied: you can only access data from your department' });
            }
        }

        next();
    };
};
