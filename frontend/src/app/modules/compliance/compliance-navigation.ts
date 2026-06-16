import { UserRole } from '../../core/models/user-role.enum';
import { getStoredUserRole, normalizeUserRole } from '../../core/utils/role.utils';

export interface ComplianceNavItem {
  label: string;
  route: string;
  description: string;
  roles: UserRole[];
}

export interface ComplianceModuleItem {
  title: string;
  route: string;
  description: string;
}

const ALL_COMPLIANCE_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.AUDIT_SENIOR,
  UserRole.AUDIT_RESPONSABLE,
  UserRole.CHEF_MISSION,
  UserRole.AUDITEUR,
  UserRole.RISK_MANAGER,
  UserRole.TOP_MANAGEMENT
];

const CONTRIBUTOR_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.AUDIT_SENIOR,
  UserRole.AUDIT_RESPONSABLE,
  UserRole.CHEF_MISSION,
  UserRole.AUDITEUR,
  UserRole.RISK_MANAGER
];

const ASSESSMENT_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.AUDIT_SENIOR,
  UserRole.AUDIT_RESPONSABLE,
  UserRole.CHEF_MISSION,
  UserRole.AUDITEUR,
  UserRole.RISK_MANAGER,
  UserRole.RISK_AGENT
];

export const COMPLIANCE_MODULE_ROLES: UserRole[] = Array.from(new Set([
  ...ALL_COMPLIANCE_ROLES,
  ...CONTRIBUTOR_ROLES,
  ...ASSESSMENT_ROLES
]));

export const COMPLIANCE_NAV_ITEMS: ComplianceNavItem[] = [
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

function normalizeComplianceRole(role: UserRole | string | null): UserRole | null {
  return normalizeUserRole(role);
}

export function getStoredComplianceRole(): UserRole | null {
  return getStoredUserRole();
}

export function getComplianceNavItems(role: UserRole | string | null): ComplianceNavItem[] {
  const normalizedRole = normalizeComplianceRole(role);

  if (!normalizedRole) {
    return [];
  }

  return COMPLIANCE_NAV_ITEMS.filter(item => item.roles.includes(normalizedRole));
}

export function getComplianceModuleItems(role: UserRole | string | null): ComplianceModuleItem[] {
  return getComplianceNavItems(role).map(item => ({
    title: item.label,
    route: item.route,
    description: item.description
  }));
}

export function getComplianceDashboardSubmodules(role: UserRole | string | null): { title: string }[] {
  return getComplianceNavItems(role)
    .filter(item => item.label !== 'Cockpit')
    .map(item => ({ title: item.label }));
}

export function getComplianceRolesByRoute(route: string): UserRole[] {
  return COMPLIANCE_NAV_ITEMS.find(item => item.route === route)?.roles || [];
}
