import { Op } from 'sequelize';
import { UserRole } from '../users/user.roles';
import { GovernanceAuditEventModel } from './governance-audit-event.model';

export type GovernanceAuditStatusClass = 'success' | 'warning' | 'info' | 'danger';

export interface GovernanceAuditEvent {
  id: number;
  method: string;
  action: string;
  module: string;
  target: string;
  actorId: number | null;
  actorEmail: string;
  actorRole: UserRole;
  departementId: number | null;
  statusCode: number;
  status: string;
  statusClass: GovernanceAuditStatusClass;
  date: string;
  details: string;
  path: string;
}

type AuditActor = {
  id: number;
  email: string;
  role: UserRole;
  departementId?: number;
};

const MODULE_LABELS: Record<string, string> = {
  risk: 'Gestion des Risques',
  risks: 'Gestion des Risques',
  auditing: 'Audit',
  'audit-planning': 'Audit',
  governance: 'Gouvernance',
  compliance: 'Conformite',
  controls: 'Controles Internes',
  incidents: 'Incidents',
  actions: 'Plans d Actions',
  users: 'Utilisateurs',
  departments: 'Departements',
  organigramme: 'Organigramme',
  settings: 'Parametrage',
  assistant: 'Assistant IA',
  'ai-contexts': 'Contextes IA',
  reporting: 'Reporting',
  supervision: 'Supervision'
};

const ACTION_LABELS: Record<string, string> = {
  POST: 'Creation / soumission',
  PUT: 'Modification',
  PATCH: 'Changement de statut',
  DELETE: 'Suppression / archivage'
};

const getPathSegments = (url: string): string[] => {
  const pathname = url.split('?')[0] || '';
  return pathname.split('/').filter(Boolean);
};

const getModuleLabel = (url: string): string => {
  const segments = getPathSegments(url);
  const moduleKey = segments[1] || segments[0] || 'system';
  return MODULE_LABELS[moduleKey] || moduleKey;
};

const getTarget = (url: string): string => {
  const segments = getPathSegments(url);
  const candidates = segments.slice(2).filter(segment => segment !== 'api');
  const target = candidates.join(' / ');
  return target || getModuleLabel(url);
};

const getStatusLabel = (statusCode: number): { status: string; statusClass: GovernanceAuditStatusClass } => {
  if (statusCode >= 200 && statusCode < 300) {
    return { status: 'Executee', statusClass: 'success' };
  }

  if (statusCode >= 400 && statusCode < 500) {
    return { status: 'Refusee', statusClass: 'warning' };
  }

  if (statusCode >= 500) {
    return { status: 'Erreur', statusClass: 'danger' };
  }

  return { status: 'Traitee', statusClass: 'info' };
};

const toAuditEvent = (event: GovernanceAuditEventModel): GovernanceAuditEvent => ({
  id: event.id,
  method: event.method,
  action: event.action,
  module: event.module,
  target: event.target,
  actorId: event.actorUserId,
  actorEmail: event.actorEmail,
  actorRole: event.actorRole,
  departementId: event.departmentId,
  statusCode: event.statusCode,
  status: event.status,
  statusClass: event.statusClass as GovernanceAuditStatusClass,
  date: event.createdAt.toISOString(),
  details: event.details,
  path: event.path
});

export const isAuditableMethod = (method: string): boolean =>
  ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase());

export const recordGovernanceAuditEvent = async (
  actor: AuditActor,
  method: string,
  originalUrl: string,
  statusCode: number
): Promise<void> => {
  if (!isAuditableMethod(method)) {
    return;
  }

  const normalizedMethod = method.toUpperCase();
  const status = getStatusLabel(statusCode);
  const target = getTarget(originalUrl);

  await GovernanceAuditEventModel.create({
    method: normalizedMethod,
    action: ACTION_LABELS[normalizedMethod] || normalizedMethod,
    module: getModuleLabel(originalUrl),
    target,
    actorUserId: actor.id || null,
    actorEmail: actor.email,
    actorRole: actor.role,
    departmentId: actor.departementId ?? null,
    statusCode,
    status: status.status,
    statusClass: status.statusClass,
    details: `${normalizedMethod} ${target} - HTTP ${statusCode}`,
    path: originalUrl.split('?')[0] || originalUrl
  });
};

const canSeeTeamEvents = (role: UserRole): boolean =>
  [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN_SI,
    UserRole.TOP_MANAGEMENT,
    UserRole.RISK_MANAGER,
    UserRole.AUDIT_DIRECTEUR,
    UserRole.AUDIT_RESPONSABLE,
    UserRole.CHEF_MISSION,
    UserRole.CONTROLLER
  ].includes(role);

export const getGovernanceAuditEventsForActor = async (actor: AuditActor): Promise<GovernanceAuditEvent[]> => {
  try {
    const where: any = {};

    if (actor.role !== UserRole.SUPER_ADMIN && actor.role !== UserRole.TOP_MANAGEMENT) {
      if (canSeeTeamEvents(actor.role) && actor.departementId) {
        where[Op.or] = [
          { actorUserId: actor.id },
          { departmentId: actor.departementId }
        ];
      } else {
        where.actorUserId = actor.id;
      }
    }

    const events = await GovernanceAuditEventModel.findAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: 500
    });

    return events.map(toAuditEvent);
  } catch (_error) {
    return [];
  }
};
