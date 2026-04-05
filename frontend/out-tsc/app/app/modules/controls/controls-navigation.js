import { UserRole } from '../../core/models/user-role.enum';
const ALL_CONTROLS_ROLES = [
    UserRole.SUPER_ADMIN,
    UserRole.RISK_MANAGER,
    UserRole.RISK_AGENT,
    UserRole.AUDIT_SENIOR,
    UserRole.TOP_MANAGEMENT
];
const EVIDENCE_ROLES = [
    UserRole.SUPER_ADMIN,
    UserRole.RISK_MANAGER,
    UserRole.RISK_AGENT,
    UserRole.AUDIT_SENIOR
];
const EFFECTIVENESS_ROLES = [
    UserRole.SUPER_ADMIN,
    UserRole.RISK_MANAGER,
    UserRole.AUDIT_SENIOR,
    UserRole.TOP_MANAGEMENT
];
export const CONTROLS_NAV_ITEMS = [
    {
        label: 'Referentiel des Controles',
        route: '/dashboard/controls-referential',
        description: 'Catalogue des controles relies aux risques, responsables et frequences.',
        roles: ALL_CONTROLS_ROLES
    },
    {
        label: 'Planification Automatisee',
        route: '/dashboard/controls-planning',
        description: 'Agenda consolide des controles et des audits, ponctuels ou periodiques.',
        roles: ALL_CONTROLS_ROLES
    },
    {
        label: 'Collecte de Preuves',
        route: '/dashboard/controls-evidence',
        description: 'Centralisation des justificatifs avec auteur et rattachement metier.',
        roles: EVIDENCE_ROLES
    },
    {
        label: 'Evaluation d Efficacite',
        route: '/dashboard/controls-effectiveness',
        description: 'Mesure de la recurrence des incidents apres mise en oeuvre.',
        roles: EFFECTIVENESS_ROLES
    },
    {
        label: 'Suivi des Non-Conformites',
        route: '/dashboard/controls-non-conformities',
        description: 'Traitement continu des ecarts detectes apres execution.',
        roles: ALL_CONTROLS_ROLES
    }
];
function normalizeControlsRole(role) {
    if (!role) {
        return null;
    }
    const matchedRole = Object.values(UserRole).find(value => value === role);
    return matchedRole || null;
}
export function getStoredControlsRole() {
    try {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return normalizeControlsRole(user === null || user === void 0 ? void 0 : user.role);
    }
    catch (_a) {
        return null;
    }
}
export function getControlsNavItems(role) {
    const normalizedRole = normalizeControlsRole(role);
    if (!normalizedRole) {
        return [];
    }
    return CONTROLS_NAV_ITEMS.filter(item => item.roles.includes(normalizedRole));
}
export function getControlsModuleItems(role) {
    return getControlsNavItems(role).map(item => ({
        title: item.label,
        route: item.route,
        description: item.description
    }));
}
export function getControlsDashboardSubmodules(role) {
    return getControlsNavItems(role).map(item => ({ title: item.label }));
}
export function getControlsRolesByRoute(route) {
    var _a;
    return ((_a = CONTROLS_NAV_ITEMS.find(item => item.route === route)) === null || _a === void 0 ? void 0 : _a.roles) || [];
}
//# sourceMappingURL=controls-navigation.js.map