import { AuthRequest } from '../../middleware/auth.middleware';

export interface ComplianceScope {
    role: string;
    userId: number;
    departmentId: number | null;
    entityKey: string | null;
}

export interface ComplianceFilters {
    frameworkId?: number;
    departmentId?: number;
    ownerUserId?: number;
    entityKey?: string;
    status?: string;
}

export function getComplianceScope(req: AuthRequest): ComplianceScope {
    return {
        role: req.user?.role || '',
        userId: req.user?.id || 0,
        departmentId: typeof req.user?.departementId === 'number' ? req.user.departementId : null,
        entityKey: typeof req.query.entityKey === 'string' ? req.query.entityKey : null,
    };
}
