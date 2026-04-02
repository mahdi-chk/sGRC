import { UserRole } from '../../core/models/user-role.enum';
export const AUDIT_NAV_ITEMS = [
    {
        label: 'Gestion des Audits',
        route: '/dashboard/auditing',
        roles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN]
    },
    {
        label: 'Planification',
        route: '/dashboard/audit-planning',
        roles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN]
    },
    {
        label: 'Checklists',
        route: '/dashboard/audit-checklists',
        roles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN]
    },
    {
        label: 'Explorateur des Preuves',
        route: '/dashboard/audit-evidence-explorer',
        roles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN]
    },
    {
        label: 'Revision des Rapports',
        route: '/dashboard/audit-report-review',
        roles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN]
    },
    {
        label: 'Mes Missions',
        route: '/dashboard/auditor-missions',
        roles: [UserRole.AUDITEUR, UserRole.SUPER_ADMIN]
    },
    {
        label: 'Ma Checklist',
        route: '/dashboard/auditor-checklist',
        roles: [UserRole.AUDITEUR, UserRole.SUPER_ADMIN]
    },
    {
        label: 'Mes Preuves',
        route: '/dashboard/auditor-evidence',
        roles: [UserRole.AUDITEUR, UserRole.SUPER_ADMIN]
    },
    {
        label: 'Mon Rapport',
        route: '/dashboard/auditor-report',
        roles: [UserRole.AUDITEUR, UserRole.SUPER_ADMIN]
    }
];
export function getStoredAuditRole() {
    try {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return (user === null || user === void 0 ? void 0 : user.role) || null;
    }
    catch (_a) {
        return null;
    }
}
export function getAuditNavItems(role) {
    if (!role) {
        return [];
    }
    return AUDIT_NAV_ITEMS.filter(item => item.roles.includes(role));
}
//# sourceMappingURL=audit-navigation.js.map