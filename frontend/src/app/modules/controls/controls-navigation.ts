import { UserRole } from '../../core/models/user-role.enum';

export interface ControlsNavItem {
  label: string;
  route: string;
  description: string;
  roles: UserRole[];
}

export interface ControlsModuleItem {
  title: string;
  route: string;
  description: string;
}

const ALL_CONTROLS_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.RISK_MANAGER,
  UserRole.RISK_AGENT,
  UserRole.AUDIT_SENIOR,
  UserRole.TOP_MANAGEMENT
];

const EVIDENCE_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.RISK_MANAGER,
  UserRole.RISK_AGENT,
  UserRole.AUDIT_SENIOR
];

const EFFECTIVENESS_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.RISK_MANAGER,
  UserRole.AUDIT_SENIOR,
  UserRole.TOP_MANAGEMENT
];

export const CONTROLS_NAV_ITEMS: ControlsNavItem[] = [
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

function normalizeControlsRole(role: UserRole | string | null): UserRole | null {
  if (!role) {
    return null;
  }

  const matchedRole = Object.values(UserRole).find(value => value === role);
  return matchedRole || null;
}

export function getStoredControlsRole(): UserRole | null {
  try {
    const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
    return normalizeControlsRole(user?.role);
  } catch {
    return null;
  }
}

export function getControlsNavItems(role: UserRole | string | null): ControlsNavItem[] {
  const normalizedRole = normalizeControlsRole(role);

  if (!normalizedRole) {
    return [];
  }

  return CONTROLS_NAV_ITEMS.filter(item => item.roles.includes(normalizedRole));
}

export function getControlsModuleItems(role: UserRole | string | null): ControlsModuleItem[] {
  return getControlsNavItems(role).map(item => ({
    title: item.label,
    route: item.route,
    description: item.description
  }));
}

export function getControlsDashboardSubmodules(role: UserRole | string | null): { title: string }[] {
  return getControlsNavItems(role).map(item => ({ title: item.label }));
}

export function getControlsRolesByRoute(route: string): UserRole[] {
  return CONTROLS_NAV_ITEMS.find(item => item.route === route)?.roles || [];
}
