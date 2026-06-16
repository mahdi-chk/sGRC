import { UserRole } from '../../core/models/user-role.enum';
import { getStoredUserRole, normalizeUserRole } from '../../core/utils/role.utils';

export interface GovernanceNavItem {
  label: string;
  route: string;
  roles: UserRole[];
}

export const ALL_GOVERNANCE_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.ADMIN_SI,
  UserRole.TOP_MANAGEMENT,
  UserRole.RISK_MANAGER,
  UserRole.RISK_AGENT,
  UserRole.AUDIT_DIRECTEUR,
  UserRole.AUDIT_RESPONSABLE,
  UserRole.CHEF_MISSION,
  UserRole.AUDITEUR,
  UserRole.CONTROLLER
];

export const GOVERNANCE_SUPERVISION_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.ADMIN_SI,
  UserRole.TOP_MANAGEMENT,
  UserRole.RISK_MANAGER,
  UserRole.AUDIT_DIRECTEUR,
  UserRole.AUDIT_RESPONSABLE,
  UserRole.CHEF_MISSION,
  UserRole.CONTROLLER
];

export const GOVERNANCE_NAV_ITEMS: GovernanceNavItem[] = [
  { label: 'Gestion Documentaire', route: '/dashboard/governance-documents', roles: ALL_GOVERNANCE_ROLES },
  { label: 'Tracabilite et Historique', route: '/dashboard/governance-history', roles: ALL_GOVERNANCE_ROLES },
  { label: 'Workflows d Approbation', route: '/dashboard/governance-workflows', roles: ALL_GOVERNANCE_ROLES },
  { label: 'Indicateurs de Maturite', route: '/dashboard/governance-maturity', roles: GOVERNANCE_SUPERVISION_ROLES },
  { label: 'Adhesion et Application', route: '/dashboard/governance-adoption', roles: GOVERNANCE_SUPERVISION_ROLES }
];

export const getGovernanceNavItems = (role?: UserRole | string | null): GovernanceNavItem[] => {
  const normalizedRole = normalizeUserRole(role);

  if (!normalizedRole) {
    return [];
  }

  return GOVERNANCE_NAV_ITEMS.filter(item => item.roles.includes(normalizedRole));
};

export const getGovernanceDashboardSubmodules = (role?: UserRole | string | null) =>
  getGovernanceNavItems(role).map(item => ({ title: item.label }));

export const getGovernanceRolesByRoute = (route: string): UserRole[] =>
  GOVERNANCE_NAV_ITEMS.find(item => item.route === route)?.roles || [];

export const getStoredGovernanceRole = (): UserRole | null => {
  return getStoredUserRole();
};
