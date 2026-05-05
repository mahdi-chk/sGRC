import { UserRole } from '../../core/models/user-role.enum';

export interface AuditNavItem {
  label: string;
  route: string;
  roles: UserRole[];
  section: 'planning';
}

const AUDIT_CONSTRUCTION_ROLES = [UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.SUPER_ADMIN];
const AUDIT_PLANNING_ROLES = [
  UserRole.AUDIT_DIRECTEUR,
  UserRole.AUDIT_RESPONSABLE,
  UserRole.CHEF_MISSION,
  UserRole.AUDITEUR,
  UserRole.TOP_MANAGEMENT,
  UserRole.CONTROLLER,
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
    roles: [UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.SUPER_ADMIN, UserRole.TOP_MANAGEMENT],
    section: 'planning'
  }
];

export function getStoredAuditRole(): UserRole | null {
  try {
    const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
    return (user?.role as UserRole) || null;
  } catch {
    return null;
  }
}

function getAuditNavItemsBySection(
  role: UserRole | null,
  sections: Array<AuditNavItem['section']>
): AuditNavItem[] {
  if (!role) {
    return [];
  }

  return AUDIT_NAV_ITEMS.filter(item => item.roles.includes(role) && sections.includes(item.section));
}

export function getAuditPlanningNavItems(role: UserRole | null): AuditNavItem[] {
  return getAuditNavItemsBySection(role, ['planning']);
}

export function getAuditManagementNavItems(role: UserRole | null): AuditNavItem[] {
  return getAuditNavItemsBySection(role, ['planning']);
}

export function getAuditorNavItems(role: UserRole | null): AuditNavItem[] {
  return getAuditNavItemsBySection(role, ['planning']);
}

export function getAuditNavItems(role: UserRole | null): AuditNavItem[] {
  return getAuditNavItemsBySection(role, ['planning']);
}
