import { UserRole } from '../../core/models/user-role.enum';

export interface AuditNavItem {
  label: string;
  route: string;
  roles: UserRole[];
}

const AUDIT_DIRECTOR_ROLES = [UserRole.AUDIT_DIRECTEUR, UserRole.SUPER_ADMIN];
const AUDIT_MANAGEMENT_ROLES = [UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.SUPER_ADMIN];

export const AUDIT_NAV_ITEMS: AuditNavItem[] = [
  {
    label: 'Gestion des Audits',
    route: '/dashboard/auditing',
    roles: AUDIT_MANAGEMENT_ROLES
  },
  {
    label: 'Planification',
    route: '/dashboard/audit-planning',
    roles: AUDIT_DIRECTOR_ROLES
  },
  {
    label: 'Checklists',
    route: '/dashboard/audit-checklists',
    roles: AUDIT_MANAGEMENT_ROLES
  },
  {
    label: 'Traitement checklists',
    route: '/dashboard/auditor-checklist',
    roles: [UserRole.AUDITEUR, UserRole.SUPER_ADMIN]
  },
  {
    label: 'Explorateur des Preuves',
    route: '/dashboard/audit-evidence-explorer',
    roles: AUDIT_MANAGEMENT_ROLES
  },
  {
    label: 'Revision des Rapports',
    route: '/dashboard/audit-report-review',
    roles: AUDIT_MANAGEMENT_ROLES
  },
  {
    label: 'Statistiques',
    route: '/dashboard/audit-statistics',
    roles: [UserRole.AUDIT_DIRECTEUR, UserRole.AUDIT_RESPONSABLE, UserRole.SUPER_ADMIN, UserRole.TOP_MANAGEMENT]
  },
  {
    label: 'Mes Missions',
    route: '/dashboard/auditor-missions',
    roles: [UserRole.AUDITEUR, UserRole.SUPER_ADMIN]
  },
  {
    label: 'Mes Preuves',
    route: '/dashboard/auditor-evidence',
    roles: [UserRole.AUDITEUR, UserRole.SUPER_ADMIN]
  },
  {
    label: 'Mon Rapport',
    route: '/dashboard/auditor-report',
    roles: [UserRole.AUDITEUR, UserRole.SUPER_ADMIN]
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

export function getAuditNavItems(role: UserRole | null): AuditNavItem[] {
  if (!role) {
    return [];
  }

  return AUDIT_NAV_ITEMS.filter(item => item.roles.includes(role));
}
