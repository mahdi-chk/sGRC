import { UserRole } from '../../core/models/user-role.enum';
import { getStoredUserRole, normalizeUserRole } from '../../core/utils/role.utils';

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
  UserRole.AUDIT_DIRECTEUR,
  UserRole.AUDIT_RESPONSABLE,
  UserRole.CHEF_MISSION,
  UserRole.TOP_MANAGEMENT,
  UserRole.CONTROLLER
];

const EVIDENCE_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.RISK_MANAGER,
  UserRole.RISK_AGENT,
  UserRole.AUDIT_DIRECTEUR,
  UserRole.AUDIT_RESPONSABLE,
  UserRole.CHEF_MISSION,
  UserRole.CONTROLLER
];

const EFFECTIVENESS_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.RISK_MANAGER,
  UserRole.AUDIT_DIRECTEUR,
  UserRole.AUDIT_RESPONSABLE,
  UserRole.CHEF_MISSION,
  UserRole.TOP_MANAGEMENT,
  UserRole.CONTROLLER
];

const EVALUATION_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.CONTROLLER,
  UserRole.TOP_MANAGEMENT,
  UserRole.RISK_MANAGER,
  UserRole.AUDIT_DIRECTEUR,
  UserRole.AUDIT_RESPONSABLE,
  UserRole.CHEF_MISSION
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
    label: 'Efficacite des Controles',
    route: '/dashboard/controls-effectiveness',
    description: 'Mesure de la recurrence des incidents apres mise en oeuvre.',
    roles: EFFECTIVENESS_ROLES
  },
  {
    label: 'Suivi des Non-Conformites',
    route: '/dashboard/controls-non-conformities',
    description: 'Traitement continu des ecarts detectes apres execution.',
    roles: ALL_CONTROLS_ROLES
  },
  {
    label: 'Campagnes d Evaluation',
    route: '/dashboard/control-evaluations',
    description: 'Campagnes d evaluation, criteres, deficiences et conclusion globale.',
    roles: EVALUATION_ROLES
  }
];

function normalizeControlsRole(role: UserRole | string | null): UserRole | null {
  return normalizeUserRole(role);
}

export function getStoredControlsRole(): UserRole | null {
  return getStoredUserRole();
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
