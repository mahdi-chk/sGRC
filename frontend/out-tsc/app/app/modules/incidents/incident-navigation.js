import { UserRole } from '../../core/models/user-role.enum';
export const INCIDENT_NAV_ITEMS = [
    {
        label: 'Declaration',
        route: '/dashboard/incident-registration',
        roles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR]
    },
    {
        label: 'Workflow',
        route: '/dashboard/incident-workflow',
        roles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR]
    },
    {
        label: 'Analyse',
        route: '/dashboard/incident-analysis',
        roles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT]
    },
    {
        label: 'Reporting',
        route: '/dashboard/incident-reporting',
        roles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT]
    }
];
export function getStoredIncidentRole() {
    try {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return (user === null || user === void 0 ? void 0 : user.role) || null;
    }
    catch (_a) {
        return null;
    }
}
export function getIncidentNavItems(role) {
    if (!role) {
        return [];
    }
    return INCIDENT_NAV_ITEMS.filter(item => item.roles.includes(role));
}
//# sourceMappingURL=incident-navigation.js.map