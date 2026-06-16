import { UserRole } from '../../core/models/user-role.enum';
import { getStoredUserRole, normalizeUserRole } from '../../core/utils/role.utils';

export interface IncidentNavItem {
  label: string;
  route: string;
  roles: UserRole[];
}

export const INCIDENT_READ_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.RISK_MANAGER,
  UserRole.AUDIT_DIRECTEUR,
  UserRole.AUDIT_RESPONSABLE,
  UserRole.CHEF_MISSION,
  UserRole.TOP_MANAGEMENT
];

export const INCIDENT_WRITE_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.RISK_MANAGER,
  UserRole.AUDIT_DIRECTEUR,
  UserRole.AUDIT_RESPONSABLE,
  UserRole.CHEF_MISSION
];

export const INCIDENT_NAV_ITEMS: IncidentNavItem[] = [
  {
    label: 'Declaration',
    route: '/dashboard/incident-registration',
    roles: INCIDENT_WRITE_ROLES
  },
  {
    label: 'Workflow',
    route: '/dashboard/incident-workflow',
    roles: INCIDENT_WRITE_ROLES
  },
  {
    label: 'Analyse',
    route: '/dashboard/incident-analysis',
    roles: INCIDENT_READ_ROLES
  },
  {
    label: 'Reporting',
    route: '/dashboard/incident-reporting',
    roles: INCIDENT_READ_ROLES
  }
];

export function getStoredIncidentRole(): UserRole | null {
  return getStoredUserRole();
}

export function getIncidentNavItems(role: UserRole | string | null): IncidentNavItem[] {
  const normalizedRole = normalizeUserRole(role);

  if (!normalizedRole) {
    return [];
  }

  return INCIDENT_NAV_ITEMS.filter(item => item.roles.includes(normalizedRole));
}

export function getIncidentRolesByRoute(route: string): UserRole[] {
  return INCIDENT_NAV_ITEMS.find(item => item.route === route)?.roles || [];
}
