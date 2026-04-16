import { UserRole } from '../../core/models/user-role.enum';
const ALL_COMPLIANCE_ROLES = [
    UserRole.SUPER_ADMIN,
    UserRole.AUDIT_SENIOR,
    UserRole.AUDITEUR,
    UserRole.RISK_MANAGER,
    UserRole.TOP_MANAGEMENT
];
const CONTRIBUTOR_ROLES = [
    UserRole.SUPER_ADMIN,
    UserRole.AUDIT_SENIOR,
    UserRole.AUDITEUR,
    UserRole.RISK_MANAGER
];
const ASSESSMENT_ROLES = [
    UserRole.SUPER_ADMIN,
    UserRole.AUDIT_SENIOR,
    UserRole.AUDITEUR,
    UserRole.RISK_MANAGER,
    UserRole.RISK_AGENT
];
export const COMPLIANCE_NAV_ITEMS = [
    {
        label: 'Cockpit',
        route: '/dashboard/compliance',
        description: 'Vue d ensemble du dispositif de conformite, de la couverture et des ecarts.',
        roles: ALL_COMPLIANCE_ROLES
    },
    {
        label: 'Referentiels Integres',
        route: '/dashboard/compliance-frameworks',
        description: 'Catalogue des exigences, normes et versions applicables.',
        roles: ALL_COMPLIANCE_ROLES
    },
    {
        label: 'KPI de Maturite',
        route: '/dashboard/compliance-maturity',
        description: 'Radar de maturite et lecture par chapitre de la couverture des exigences.',
        roles: ALL_COMPLIANCE_ROLES
    },
    {
        label: 'Mapping et Liens',
        route: '/dashboard/compliance-mappings',
        description: 'Matrices de couverture entre exigences, controles, risques et preuves.',
        roles: CONTRIBUTOR_ROLES
    },
    {
        label: 'Auto-Evaluations',
        route: '/dashboard/compliance-assessments',
        description: 'Campagnes d evaluation, questionnaires et progression des reponses.',
        roles: ASSESSMENT_ROLES
    },
    {
        label: 'Suivi des Ecarts',
        route: '/dashboard/compliance-gaps',
        description: 'Gestion des ecarts, priorites, responsables et remediations.',
        roles: ALL_COMPLIANCE_ROLES
    },
    {
        label: 'Mises a Jour et Preuves',
        route: '/dashboard/compliance-updates',
        description: 'Flux de veille, preuves collectees et elements de dossier d audit.',
        roles: ALL_COMPLIANCE_ROLES
    }
];
function normalizeComplianceRole(role) {
    if (!role) {
        return null;
    }
    const matchedRole = Object.values(UserRole).find(value => value === role);
    return matchedRole || null;
}
export function getStoredComplianceRole() {
    try {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return normalizeComplianceRole(user === null || user === void 0 ? void 0 : user.role);
    }
    catch (_a) {
        return null;
    }
}
export function getComplianceNavItems(role) {
    const normalizedRole = normalizeComplianceRole(role);
    if (!normalizedRole) {
        return [];
    }
    return COMPLIANCE_NAV_ITEMS.filter(item => item.roles.includes(normalizedRole));
}
export function getComplianceModuleItems(role) {
    return getComplianceNavItems(role).map(item => ({
        title: item.label,
        route: item.route,
        description: item.description
    }));
}
export function getComplianceDashboardSubmodules(role) {
    return getComplianceNavItems(role)
        .filter(item => item.label !== 'Cockpit')
        .map(item => ({ title: item.label }));
}
export function getComplianceRolesByRoute(route) {
    var _a;
    return ((_a = COMPLIANCE_NAV_ITEMS.find(item => item.route === route)) === null || _a === void 0 ? void 0 : _a.roles) || [];
}
//# sourceMappingURL=compliance-navigation.js.map