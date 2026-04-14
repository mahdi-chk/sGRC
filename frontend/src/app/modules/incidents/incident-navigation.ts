import { UserRole } from '../../core/models/user-role.enum';

export interface IncidentNavItem {
  label: string;
  route: string;
  roles: UserRole[];
}

export const INCIDENT_NAV_ITEMS: IncidentNavItem[] = [
  {
    label: 'Declaration',
    route: '/dashboard/incident-registration',
    roles: [
      UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, 
      UserRole.TOP_MANAGEMENT, UserRole.ADMIN_SI, UserRole.AUDITEUR, UserRole.RISK_AGENT
    ]
  },
  {
    label: 'Workflow',
    route: '/dashboard/incident-workflow',
    roles: [
      UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, 
      UserRole.TOP_MANAGEMENT, UserRole.ADMIN_SI, UserRole.AUDITEUR, UserRole.RISK_AGENT
    ]
  },
  {
    label: 'Analyse',
    route: '/dashboard/incident-analysis',
    roles: [
      UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, 
      UserRole.TOP_MANAGEMENT, UserRole.AUDITEUR, UserRole.RISK_AGENT
    ]
  },
  {
    label: 'Reporting',
    route: '/dashboard/incident-reporting',
    roles: [
      UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, 
      UserRole.TOP_MANAGEMENT, UserRole.AUDITEUR, UserRole.RISK_AGENT
    ]
  }
];

export function getStoredIncidentRole(): UserRole | null {
  try {
    const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
    return (user?.role as UserRole) || null;
  } catch {
    return null;
  }
}

export function getIncidentNavItems(role: UserRole | null): IncidentNavItem[] {
  if (!role) {
    return [];
  }

  return INCIDENT_NAV_ITEMS.filter(item => item.roles.includes(role));
}
