import { UserRole } from '../../core/models/user-role.enum';

export interface AuditNavItem {
  label: string;
  route: string;
  roles: UserRole[];
}

export const AUDIT_NAV_ITEMS: AuditNavItem[] = [
  {
    label: 'Gestion des Audits',
    route: '/dashboard/auditing',
    roles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN]
  },
  {
    label: 'Planification',
    route: '/dashboard/audit-planning',
    roles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN]
  },
  {
    label: 'Explorateur des Preuves',
    route: '/dashboard/audit-evidence-explorer',
    roles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN]
  },
  {
    label: 'Revision des Rapports',
    route: '/dashboard/audit-report-review',
    roles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN]
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
