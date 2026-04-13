import { UserRole } from '../../core/models/user-role.enum';
const SUPERVISION_ROLES = [
    UserRole.SUPER_ADMIN,
    UserRole.TOP_MANAGEMENT,
    UserRole.ADMIN_SI
];
export const SUPERVISION_NAV_ITEMS = [
    {
        label: 'Bibliotheque de Bonnes Pratiques',
        route: '/dashboard/supervision/best-practices',
        description: 'Referentiel des cadres, modeles et pratiques actionnables pour chaque domaine GRC.',
        roles: SUPERVISION_ROLES
    },
    {
        label: 'Recommandations Contextualisees',
        route: '/dashboard/supervision/recommendations',
        description: 'Actions priorisees a partir des signaux de risque, audit, conformite et incidents.',
        roles: SUPERVISION_ROLES
    },
    {
        label: 'Benchmarks Sectoriels',
        route: '/dashboard/supervision/benchmarks',
        description: 'Lecture comparative de la maturite GRC par rapport aux reperes du secteur.',
        roles: SUPERVISION_ROLES
    },
    {
        label: 'Assistance Experte',
        route: '/dashboard/supervision/expert-assistance',
        description: 'Support guide, FAQ et playbooks d execution pour accelerer les remediations.',
        roles: SUPERVISION_ROLES
    },
    {
        label: 'Supervision Continue',
        route: '/dashboard/supervision/continuous-monitoring',
        description: 'Cockpit de sante GRC, alertes prioritaires et zones sous tension.',
        roles: SUPERVISION_ROLES
    }
];
function normalizeSupervisionRole(role) {
    if (!role) {
        return null;
    }
    const matchedRole = Object.values(UserRole).find(value => value === role);
    return matchedRole || null;
}
export function getStoredSupervisionRole() {
    try {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return normalizeSupervisionRole(user === null || user === void 0 ? void 0 : user.role);
    }
    catch (_a) {
        return null;
    }
}
export function getSupervisionNavItems(role) {
    const normalizedRole = normalizeSupervisionRole(role);
    if (!normalizedRole) {
        return [];
    }
    return SUPERVISION_NAV_ITEMS.filter(item => item.roles.includes(normalizedRole));
}
export function getSupervisionDashboardSubmodules(role) {
    return getSupervisionNavItems(role).map(item => ({ title: item.label }));
}
//# sourceMappingURL=supervision-navigation.js.map