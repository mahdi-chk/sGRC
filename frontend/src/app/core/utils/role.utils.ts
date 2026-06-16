import { UserRole } from '../models/user-role.enum';

export type RoleLike = UserRole | string | { code?: string | null } | null | undefined;

export function normalizeUserRole(role: RoleLike): UserRole | null {
    const rawRole = typeof role === 'object' ? role?.code : role;

    if (!rawRole) {
        return null;
    }

    const normalizedRole = String(rawRole).trim();
    return Object.values(UserRole).find(value => value === normalizedRole) || null;
}

export function getStoredUserRole(): UserRole | null {
    try {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return normalizeUserRole(user?.role);
    } catch {
        return null;
    }
}
