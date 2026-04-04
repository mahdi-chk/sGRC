import { UserRole } from '../../core/models/user-role.enum';

export interface ActionsNavItem {
  label: string;
  route: string;
  description: string;
  roles: UserRole[];
}

export interface ActionsModuleItem {
  title: string;
  route: string;
  description: string;
}

const ALL_ACTION_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.RISK_MANAGER,
  UserRole.RISK_AGENT,
  UserRole.AUDIT_SENIOR,
  UserRole.TOP_MANAGEMENT
];

const NOTIFICATION_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.RISK_MANAGER,
  UserRole.AUDIT_SENIOR
];

const INDICATOR_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.RISK_MANAGER,
  UserRole.RISK_AGENT,
  UserRole.AUDIT_SENIOR,
  UserRole.TOP_MANAGEMENT
];

export const ACTIONS_NAV_ITEMS: ActionsNavItem[] = [
  {
    label: 'Vue d ensemble',
    route: '/dashboard/actions',
    description: 'Synthese du portefeuille global des plans d actions.',
    roles: ALL_ACTION_ROLES
  },
  {
    label: 'Gestion Centralisee',
    route: '/dashboard/actions-centralized',
    description: 'Referentiel unique des actions, avec origine, proprietaires et dependances.',
    roles: ALL_ACTION_ROLES
  },
  {
    label: 'Suivi des Echeances',
    route: '/dashboard/actions-deadlines',
    description: 'Lecture calendrier des actions, jalons, retards et previsions.',
    roles: ALL_ACTION_ROLES
  },
  {
    label: 'Notifications',
    route: '/dashboard/actions-notifications',
    description: 'Rappels, escalades et gouvernance des alertes automatiques.',
    roles: NOTIFICATION_ROLES
  },
  {
    label: 'Indicateurs',
    route: '/dashboard/actions-indicators',
    description: 'Pilotage executif du taux d achevement et de l efficacite des remediations.',
    roles: INDICATOR_ROLES
  }
];

function normalizeActionsRole(role: UserRole | string | null): UserRole | null {
  if (!role) {
    return null;
  }

  const matchedRole = Object.values(UserRole).find(value => value === role);
  return matchedRole || null;
}

export function getStoredActionsRole(): UserRole | null {
  try {
    const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
    return normalizeActionsRole(user?.role);
  } catch {
    return null;
  }
}

export function getActionsNavItems(role: UserRole | string | null): ActionsNavItem[] {
  const normalizedRole = normalizeActionsRole(role);

  if (!normalizedRole) {
    return [];
  }

  return ACTIONS_NAV_ITEMS.filter(item => item.roles.includes(normalizedRole));
}

export function getActionsModuleItems(role: UserRole | string | null): ActionsModuleItem[] {
  return getActionsNavItems(role)
    .filter(item => item.route !== '/dashboard/actions')
    .map(item => ({
      title: item.label,
      route: item.route,
      description: item.description
    }));
}

export function getActionsDashboardSubmodules(role: UserRole | string | null): { title: string }[] {
  return getActionsModuleItems(role).map(item => ({ title: item.title }));
}

export function getActionsRolesByRoute(route: string): UserRole[] {
  return ACTIONS_NAV_ITEMS.find(item => item.route === route)?.roles || [];
}
