import { UserRole } from '../../core/models/user-role.enum';
import { getStoredUserRole, normalizeUserRole } from '../../core/utils/role.utils';

export interface AuditNavItem {
  label: string;
  route: string;
  roles: UserRole[];
  section: 'planning';
}

export const AUDIT_CONSTRUCTION_ROLES: UserRole[] = [UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.SUPER_ADMIN];
export const AUDIT_PLANNING_ROLES: UserRole[] = [
  UserRole.AUDIT_DIRECTEUR,
  UserRole.AUDIT_RESPONSABLE,
  UserRole.CHEF_MISSION,
  UserRole.AUDITEUR,
  UserRole.SUPER_ADMIN
];

export const AUDIT_NAV_ITEMS: AuditNavItem[] = [
  {
    label: 'Plans d Audit',
    route: '/dashboard/audit-plans',
    roles: AUDIT_PLANNING_ROLES,
    section: 'planning'
  },
  {
    label: 'Construction du Plan',
    route: '/dashboard/audit-planning',
    roles: AUDIT_CONSTRUCTION_ROLES,
    section: 'planning'
  },
  {
    label: 'Statistiques',
    route: '/dashboard/audit-statistics',
    roles: [UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.AUDITEUR, UserRole.SUPER_ADMIN],
    section: 'planning'
  }
];

export function getStoredAuditRole(): UserRole | null {
  return getStoredUserRole();
}

function getAuditNavItemsBySection(
  role: UserRole | string | null,
  sections: Array<AuditNavItem['section']>
): AuditNavItem[] {
  const normalizedRole = normalizeUserRole(role);

  if (!normalizedRole) {
    return [];
  }

  return AUDIT_NAV_ITEMS.filter(item => item.roles.includes(normalizedRole) && sections.includes(item.section));
}

export function getAuditPlanningNavItems(role: UserRole | string | null): AuditNavItem[] {
  return getAuditNavItemsBySection(role, ['planning']);
}

export function getAuditManagementNavItems(role: UserRole | string | null): AuditNavItem[] {
  return getAuditNavItemsBySection(role, ['planning']);
}

export function getAuditorNavItems(role: UserRole | string | null): AuditNavItem[] {
  return getAuditNavItemsBySection(role, ['planning']);
}

export function getAuditNavItems(role: UserRole | string | null): AuditNavItem[] {
  return getAuditNavItemsBySection(role, ['planning']);
}

export function getAuditRolesByRoute(route: string): UserRole[] {
  return AUDIT_NAV_ITEMS.find(item => item.route === route)?.roles || [];
}
