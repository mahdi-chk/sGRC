import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import { Op } from 'sequelize';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { secureUpload } from '../../middleware/file.middleware';
import { UserRole } from '../users/user.roles';
import { User } from '../users/user.model';
import { Department } from '../departments/department.model';
import { Organigramme } from '../organigramme/organigramme.model';
import { Risk, RiskStatus } from '../risk/risk.model';
import { AuditMission, AuditMissionStatus } from '../auditing/audit-mission.model';
import { Incident, IncidentStatus } from '../incidents/incident.model';
import { LookupResolutionService } from '../../database/lookups/lookup.service';
import { GovernanceAuditEvent, getGovernanceAuditEventsForActor } from './audit-trail.service';
import { GovernanceApprovalWorkflowModel } from './governance-approval-workflow.model';
import { GovernanceApprovalStageModel } from './governance-approval-stage.model';
import { GovernanceWorkflowTemplateModel, GovernanceWorkflowModule } from './governance-workflow-template.model';
import { GovernanceWorkflowTemplateStageModel } from './governance-workflow-template-stage.model';
import { GovernanceWorkflowInstanceOverrideModel } from './governance-workflow-instance-override.model';
import { GovernanceWorkflowAccessRuleModel } from './governance-workflow-access-rule.model';

const router = Router();

const DOCUMENT_EXTENSIONS = [
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'xlsm',
  'ppt',
  'pptx',
  'txt',
  'md',
  'jpg',
  'jpeg',
  'png',
  'odt',
  'zip'
];

const WORKSPACE_ROOT = path.resolve(__dirname, '../../../../../');

type RoleFolderConfig = {
  key: string;
  label: string;
  relativePath: string;
};

type RoleFolderMap = Record<UserRole, RoleFolderConfig>;

type GovernanceDocumentPayload = {
  name: string;
  extension: string;
  size: number;
  lastModified: string;
  folderKey: string;
  folderLabel: string;
};

type GovernanceFolderAnalytics = {
  key: string;
  label: string;
  relativePath: string;
  documentCount: number;
  recentDocuments: number;
  staleDocuments: number;
  latestUpdate: string | null;
  averageAgeDays: number;
  totalSize: number;
};

type GovernanceRolePair = {
  supervisorRole: UserRole;
  supervisorLabel: string;
  subordinateRoles: UserRole[];
  subordinateLabel: string;
  module: 'Risques' | 'Audit' | 'Incidents';
};

type GovernanceStagePayload = {
  role: string;
  rule: string;
  owner?: string;
  status?: 'done' | 'current' | 'todo' | 'rejected' | 'changes_requested';
  slaDays?: number | null;
  escalationTo?: string;
  escalationRule?: string;
};

type GovernanceWorkflowSourceType = 'document' | 'risk' | 'audit' | 'incident';

type GovernanceWorkflowPayload = {
  id: string;
  name: string;
  scope: string;
  pending: number;
  recentDocuments: number;
  totalDocuments: number;
  sla: string;
  channel: string;
  alert: string;
  alertClass: 'success' | 'warning';
  lastUpdate: string | null;
  dueDate?: string | null;
  status?: 'a_initialiser' | 'en_retard' | 'approuve' | 'en_cours' | 'rejete';
  priority?: string;
  progress?: number;
  completedApprovals?: number;
  requiredApprovals?: number;
  nextAction?: string;
  actionsRequired?: string[];
  approvers?: Array<{ role: string; name: string; decision: string }>;
  type?: string;
  escalation?: string;
  decisionRules?: string[];
  stages: GovernanceStagePayload[];
  module?: string;
  process?: string | null;
  macroProcess?: string | null;
  sourceType?: GovernanceWorkflowSourceType;
  sourceId?: number | string | null;
  owner?: string;
  assignedTo?: string;
  actionable?: boolean;
  configured?: boolean;
  overridden?: boolean;
  canEditWorkflow?: boolean;
  canApproveWorkflow?: boolean;
  canAdminWorkflow?: boolean;
};

type AuthenticatedUser = NonNullable<AuthRequest['user']>;
type WorkflowRight = 'canView' | 'canEdit' | 'canApprove' | 'canAdmin';
type ConfigurableWorkflowSourceType = Exclude<GovernanceWorkflowSourceType, 'document'>;

type WorkflowStageInput = {
  role?: unknown;
  owner?: unknown;
  rule?: unknown;
  slaDays?: unknown;
  escalationTo?: unknown;
  escalationRule?: unknown;
};

type NormalizedWorkflowStage = {
  role: string;
  owner?: string;
  rule: string;
  slaDays: number | null;
  escalationTo?: string;
  escalationRule?: string;
};

const ROLE_DOCUMENT_FOLDERS: RoleFolderMap = {
  [UserRole.SUPER_ADMIN]: {
    key: 'super-admin',
    label: 'Dossier Super Admin',
    relativePath: 'doc/ressources-par-role/super-admin'
  },
  [UserRole.ADMIN_SI]: {
    key: 'administrateur-si',
    label: 'Dossier Administrateur SI',
    relativePath: 'doc/ressources-par-role/administrateur-si'
  },
  [UserRole.TOP_MANAGEMENT]: {
    key: 'top-management',
    label: 'Dossier Top Management',
    relativePath: 'doc/ressources-par-role/top-management'
  },
  [UserRole.RISK_MANAGER]: {
    key: 'risk-manager',
    label: 'Dossier Risk Manager',
    relativePath: 'doc/ressources-par-role/risk-manager'
  },
  [UserRole.RISK_AGENT]: {
    key: 'risk-agent',
    label: 'Dossier Risk Agent',
    relativePath: 'doc/ressources-par-role/risk-agent'
  },
  [UserRole.AUDIT_DIRECTEUR]: {
    key: 'audit-directeur',
    label: 'Dossier Audit Directeur',
    relativePath: 'doc/ressources-par-role/audit-directeur'
  },
  [UserRole.AUDIT_RESPONSABLE]: {
    key: 'audit-responsable',
    label: 'Dossier Audit Responsable',
    relativePath: 'doc/ressources-par-role/audit-responsable'
  },
  [UserRole.CHEF_MISSION]: {
    key: 'chef-mission',
    label: 'Dossier Chef de Mission',
    relativePath: 'doc/ressources-par-role/chef-mission'
  },
  [UserRole.AUDITEUR]: {
    key: 'auditeur',
    label: 'Dossier Auditeur',
    relativePath: 'doc/ressources-par-role/auditeur'
  },
  [UserRole.CONTROLLER]: {
    key: 'controller',
    label: 'Dossier Controleur Interne',
    relativePath: 'doc/ressources-par-role/controller'
  } 

};

const uploadSecureDocument = secureUpload(DOCUMENT_EXTENSIONS, 'document', 20 * 1024 * 1024);
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const RECENT_WINDOW_DAYS = 30;
const REVIEW_WINDOW_DAYS = 90;
const CONFIGURABLE_WORKFLOW_MODULES: GovernanceWorkflowModule[] = ['Risques', 'Audit', 'Incidents'];
const WORKFLOW_CONFIG_ADMIN_ROLES = [UserRole.SUPER_ADMIN, UserRole.ADMIN_SI];

const sanitizeFileName = (fileName: string): string => {
  const normalizedName = path.basename(fileName).replace(/[<>:"/\\|?*\x00-\x1F]/g, '-').trim();
  return normalizedName || `document-${Date.now()}`;
};

const getSingleValue = (value: unknown): string | null => {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value) && typeof value[0] === 'string') {
    return value[0];
  }

  return null;
};

const cleanConfigText = (value: unknown, maxLength = 500): string => {
  const text = getSingleValue(value) || '';
  return text.trim().slice(0, maxLength);
};

const normalizeWorkflowModule = (value: unknown): GovernanceWorkflowModule | null => {
  const module = cleanConfigText(value, 40);
  return CONFIGURABLE_WORKFLOW_MODULES.includes(module as GovernanceWorkflowModule)
    ? module as GovernanceWorkflowModule
    : null;
};

const normalizeWorkflowProcess = (value: unknown): string | null => {
  const process = cleanConfigText(value, 180);
  return process || null;
};

const normalizeWorkflowSourceId = (value: unknown): string => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value).slice(0, 120);
  }

  return cleanConfigText(value, 120);
};

const sourceTypeToWorkflowModule = (sourceType?: GovernanceWorkflowSourceType): GovernanceWorkflowModule | null => {
  switch (sourceType) {
    case 'risk':
      return 'Risques';
    case 'audit':
      return 'Audit';
    case 'incident':
      return 'Incidents';
    default:
      return null;
  }
};

const isWorkflowConfigAdmin = (actor: AuthenticatedUser): boolean =>
  WORKFLOW_CONFIG_ADMIN_ROLES.includes(actor.role);

const toBoolean = (value: unknown, fallback = false): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    return value === 'true' || value === '1';
  }

  return fallback;
};

const normalizeWorkflowStages = (stages: unknown): NormalizedWorkflowStage[] => {
  if (!Array.isArray(stages)) {
    return [];
  }

  return stages
    .map(stage => {
      const item = stage as WorkflowStageInput;
      const role = cleanConfigText(item.role, 160);
      const rule = cleanConfigText(item.rule, 1000);
      const owner = cleanConfigText(item.owner, 180);
      const escalationTo = cleanConfigText(item.escalationTo, 180);
      const escalationRule = cleanConfigText(item.escalationRule, 1000);
      const slaDaysNumber = Number(item.slaDays);

      return {
        role,
        rule,
        owner: owner || undefined,
        slaDays: Number.isInteger(slaDaysNumber) && slaDaysNumber >= 0 ? slaDaysNumber : null,
        escalationTo: escalationTo || undefined,
        escalationRule: escalationRule || undefined
      };
    })
    .filter(stage => stage.role && stage.rule);
};

const getAbsoluteFolderPath = (folder: RoleFolderConfig): string => {
  return path.resolve(WORKSPACE_ROOT, folder.relativePath);
};

const ensureFolderExists = (folder: RoleFolderConfig): string => {
  const absolutePath = getAbsoluteFolderPath(folder);
  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath, { recursive: true });
  }
  return absolutePath;
};

const getAccessibleFolders = (role: UserRole): RoleFolderConfig[] => {
  if (role === UserRole.SUPER_ADMIN) {
    return Object.values(ROLE_DOCUMENT_FOLDERS);
  }

  const folder = ROLE_DOCUMENT_FOLDERS[role];
  return folder ? [folder] : [];
};

const getFolderByKey = (folderKey: string): RoleFolderConfig | undefined => {
  return Object.values(ROLE_DOCUMENT_FOLDERS).find(folder => folder.key === folderKey);
};

const canAccessFolder = (role: UserRole, folderKey: string): boolean => {
  if (role === UserRole.SUPER_ADMIN) {
    return true;
  }

  return ROLE_DOCUMENT_FOLDERS[role]?.key === folderKey;
};

const buildDocumentPayload = (folder: RoleFolderConfig, fileName: string): GovernanceDocumentPayload => {
  const absoluteFolderPath = ensureFolderExists(folder);
  const absoluteFilePath = path.join(absoluteFolderPath, fileName);
  const stats = fs.statSync(absoluteFilePath);

  return {
    name: fileName,
    extension: path.extname(fileName).replace('.', '').toLowerCase(),
    size: stats.size,
    lastModified: stats.mtime.toISOString(),
    folderKey: folder.key,
    folderLabel: folder.label
  };
};

const listDocumentsForFolder = (folder: RoleFolderConfig) => {
  const absoluteFolderPath = ensureFolderExists(folder);

  return fs.readdirSync(absoluteFolderPath)
    .filter(fileName => {
      const absoluteFilePath = path.join(absoluteFolderPath, fileName);
      return fs.statSync(absoluteFilePath).isFile();
    })
    .sort((left, right) => right.localeCompare(left, 'fr'))
    .map(fileName => buildDocumentPayload(folder, fileName));
};

const getDocumentAgeInDays = (lastModified: string): number => {
  const age = Date.now() - new Date(lastModified).getTime();
  return Math.max(0, Math.round(age / DAY_IN_MS));
};

const analyzeFolderDocuments = (folder: RoleFolderConfig, documents: GovernanceDocumentPayload[]): GovernanceFolderAnalytics => {
  const recentDocuments = documents.filter(document => getDocumentAgeInDays(document.lastModified) <= RECENT_WINDOW_DAYS).length;
  const staleDocuments = documents.filter(document => getDocumentAgeInDays(document.lastModified) > REVIEW_WINDOW_DAYS).length;
  const latestDocument = documents
    .slice()
    .sort((left, right) => new Date(right.lastModified).getTime() - new Date(left.lastModified).getTime())[0];
  const totalAge = documents.reduce((sum, document) => sum + getDocumentAgeInDays(document.lastModified), 0);
  const totalSize = documents.reduce((sum, document) => sum + document.size, 0);

  return {
    key: folder.key,
    label: folder.label,
    relativePath: folder.relativePath,
    documentCount: documents.length,
    recentDocuments,
    staleDocuments,
    latestUpdate: latestDocument?.lastModified || null,
    averageAgeDays: documents.length > 0 ? Math.round(totalAge / documents.length) : 0,
    totalSize
  };
};

const listFolderDetails = (folders: RoleFolderConfig[]) => {
  return folders.map(folder => {
    const documents = listDocumentsForFolder(folder);

    return {
      folder,
      documents,
      analytics: analyzeFolderDocuments(folder, documents)
    };
  });
};

const getFolderOwnerLabel = (folder: RoleFolderConfig): string => {
  return folder.label.replace(/^Dossier\s+/i, '');
};

const getStatusFromAge = (ageInDays: number): { status: string; statusClass: 'success' | 'warning' | 'info' } => {
  if (ageInDays > REVIEW_WINDOW_DAYS) {
    return { status: 'Revue requise', statusClass: 'warning' };
  }

  if (ageInDays <= RECENT_WINDOW_DAYS) {
    return { status: 'A jour', statusClass: 'success' };
  }

  return { status: 'A surveiller', statusClass: 'info' };
};

const buildVersionLabel = (lastModified: string, index: number): string => {
  const date = new Date(lastModified);
  const year = date.getUTCFullYear();
  const month = `${date.getUTCMonth() + 1}`.padStart(2, '0');
  return `v${year}.${month}.${index + 1}`;
};

const computeGovernanceOverview = (folders: RoleFolderConfig[]) => {
  const folderDetails = listFolderDetails(folders);
  const analytics = folderDetails.map(item => item.analytics);
  const totalDocuments = analytics.reduce((sum, item) => sum + item.documentCount, 0);
  const populatedFolders = analytics.filter(item => item.documentCount > 0).length;
  const recentDocuments = analytics.reduce((sum, item) => sum + item.recentDocuments, 0);
  const staleDocuments = analytics.reduce((sum, item) => sum + item.staleDocuments, 0);
  const latestUpdate = folderDetails
    .flatMap(item => item.documents)
    .sort((left, right) => new Date(right.lastModified).getTime() - new Date(left.lastModified).getTime())[0]?.lastModified || null;

  return {
    summary: {
      totalFolders: folders.length,
      populatedFolders,
      totalDocuments,
      recentDocuments,
      staleDocuments,
      latestUpdate
    },
    folders: analytics
  };
};

const computeGovernanceHistory = (folders: RoleFolderConfig[]) => {
  const documents = listFolderDetails(folders)
    .flatMap(item => item.documents)
    .sort((left, right) => new Date(right.lastModified).getTime() - new Date(left.lastModified).getTime());

  const entries = documents.slice(0, 12).map((document, index) => {
    const ageInDays = getDocumentAgeInDays(document.lastModified);
    const status = getStatusFromAge(ageInDays);
    const action = ageInDays <= RECENT_WINDOW_DAYS ? 'Mise a jour documentaire' : ageInDays > REVIEW_WINDOW_DAYS ? 'Document a revalider' : 'Document diffuse';

    return {
      document: document.name,
      action,
      actor: document.folderLabel,
      date: document.lastModified,
      details: `${document.extension.toUpperCase()} - ${(document.size / 1024).toFixed(1)} Ko - dossier ${document.folderKey}`,
      status: status.status,
      statusClass: status.statusClass
    };
  });

  const snapshots = documents.slice(0, 6).map((document, index) => ({
    name: document.name,
    version: buildVersionLabel(document.lastModified, index),
    scope: document.folderLabel,
    reason: getDocumentAgeInDays(document.lastModified) > REVIEW_WINDOW_DAYS
      ? 'Document ancien a remettre en cycle de revue.'
      : 'Derniere version detectee dans le dossier documentaire.',
    owner: document.folderLabel,
    updatedAt: document.lastModified,
    extension: document.extension,
    size: document.size
  }));

  return { entries, snapshots };
};

const buildGovernanceHistoryFromEvents = (events: GovernanceAuditEvent[], folders: RoleFolderConfig[]) => {
  const fallbackHistory = computeGovernanceHistory(folders);

  const entries = events.slice(0, 80).map(event => ({
    document: event.target,
    action: event.action,
    actor: event.actorEmail,
    actorRole: event.actorRole,
    module: event.module,
    date: event.date,
    details: event.details,
    status: event.status,
    statusClass: event.statusClass,
    method: event.method,
    path: event.path
  }));

  return {
    entries: entries.length > 0 ? entries : fallbackHistory.entries,
    snapshots: fallbackHistory.snapshots,
    totalEvents: events.length
  };
};

const buildWorkflowStages = (folder: RoleFolderConfig) => {
  const owner = getFolderOwnerLabel(folder);

  return [
    { role: owner, rule: 'Soumission ou mise a jour du livrable avec motif et piece rattachee.', owner },
    { role: 'Responsable metier', rule: 'Revue de coherence, commentaire, retour correction ou avis favorable.', owner: 'Responsable du perimetre' },
    { role: 'Gouvernance / Super Admin', rule: 'Controle de tracabilite, conformite documentaire et diffusion ciblee.', owner: 'Super Admin' },
    { role: 'Top Management', rule: 'Approbation finale des politiques, chartes et decisions sensibles.', owner: 'Top Management' },
    { role: 'Archivage', rule: 'Publication, notification des parties prenantes et conservation de la piste d audit.', owner: 'Gouvernance' }
  ];
};

const addDays = (date: Date, days: number): Date => {
  const copy = new Date(date);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
};

const buildWorkflowActions = (analytics: GovernanceFolderAnalytics) => {
  if (analytics.documentCount === 0) {
    return [
      'Creer ou importer les documents de gouvernance du perimetre.',
      'Identifier le responsable metier et les validateurs.',
      'Lancer le premier cycle d approbation.'
    ];
  }

  if (analytics.staleDocuments > 0) {
    return [
      `Revalider ${analytics.staleDocuments} document(s) depassant le cycle de revue.`,
      'Demander un avis metier avant validation gouvernance.',
      'Notifier les parties prenantes apres approbation.'
    ];
  }

  return [
    'Maintenir le circuit de revue periodique.',
    'Conserver les commentaires et decisions dans la piste d audit.',
    'Verifier les delegations avant la prochaine echeance.'
  ];
};

const buildApprovers = (stages: GovernanceApprovalStageModel[]) =>
  stages
    .slice()
    .sort((left, right) => left.stageIndex - right.stageIndex)
    .map(stage => ({
      role: stage.role,
      name: stage.owner || stage.role,
      decision: stage.decision || (stage.status === 'done' ? 'Valide' : stage.status === 'current' ? 'En attente' : 'A venir')
    }));

const buildApproversFromStages = (stages: GovernanceStagePayload[]) =>
  stages.map(stage => ({
    role: stage.role,
    name: stage.owner || stage.role,
    decision: stage.status === 'done' ? 'Valide' : stage.status === 'current' ? 'En attente' : stage.status === 'rejected' ? 'Rejete' : 'A venir'
  }));

const getWorkflowUiStatus = (workflow: GovernanceApprovalWorkflowModel): 'a_initialiser' | 'en_retard' | 'approuve' | 'en_cours' | 'rejete' => {
  if (workflow.status === 'approved') {
    return 'approuve';
  }

  if (workflow.status === 'rejected' || workflow.status === 'changes_requested') {
    return 'rejete';
  }

  if (workflow.dueDate && new Date(workflow.dueDate).getTime() < Date.now()) {
    return 'en_retard';
  }

  if (workflow.status === 'draft') {
    return 'a_initialiser';
  }

  return 'en_cours';
};

const getWorkflowAlert = (status: string) => {
  switch (status) {
    case 'approuve':
      return { alert: 'Approuve', alertClass: 'success' as const };
    case 'en_retard':
      return { alert: 'Revue requise', alertClass: 'warning' as const };
    case 'rejete':
      return { alert: 'Retour correction', alertClass: 'warning' as const };
    case 'a_initialiser':
      return { alert: 'A initialiser', alertClass: 'warning' as const };
    default:
      return { alert: 'En cours', alertClass: 'success' as const };
  }
};

const hasWorkflowRight = async (
  actor: AuthenticatedUser,
  module: string | undefined,
  process: string | null | undefined,
  right: WorkflowRight
): Promise<boolean> => {
  if (isWorkflowConfigAdmin(actor)) {
    return true;
  }

  const normalizedModule = normalizeWorkflowModule(module);
  if (!normalizedModule) {
    return right === 'canView';
  }

  const rules = await GovernanceWorkflowAccessRuleModel.findAll({
    where: {
      module: normalizedModule,
      [Op.and]: [
        {
          [Op.or]: [
            { process: process || null },
            { process: null }
          ]
        },
        {
          [Op.or]: [
            { principalType: 'role', principalRole: actor.role },
            { principalType: 'user', principalUserId: actor.id }
          ]
        }
      ]
    } as any
  });

  if (!rules.length) {
    return right === 'canView';
  }

  return rules.some(rule => Boolean((rule as any)[right]));
};

const attachWorkflowRights = async (workflow: GovernanceWorkflowPayload, actor: AuthenticatedUser): Promise<GovernanceWorkflowPayload | null> => {
  const module = workflow.module;
  const process = workflow.process || null;
  const canView = await hasWorkflowRight(actor, module, process, 'canView');

  if (!canView) {
    return null;
  }

  const canEditWorkflow = await hasWorkflowRight(actor, module, process, 'canEdit');
  const canApproveWorkflow = await hasWorkflowRight(actor, module, process, 'canApprove');
  const canAdminWorkflow = await hasWorkflowRight(actor, module, process, 'canAdmin');

  return {
    ...workflow,
    actionable: workflow.actionable !== false && canApproveWorkflow,
    canEditWorkflow,
    canApproveWorkflow,
    canAdminWorkflow
  };
};

const getStageSeed = (folder: RoleFolderConfig) => buildWorkflowStages(folder).map((stage, index) => ({
  stageIndex: index,
  role: stage.role,
  owner: stage.owner,
  rule: stage.rule,
  status: index === 0 ? 'current' : 'todo',
  decision: null,
  actorUserId: null,
  comment: null,
  decidedAt: null
}));

const ensureWorkflowForDocument = async (
  folder: RoleFolderConfig,
  document: GovernanceDocumentPayload,
  actor?: AuthRequest['user']
) => {
  const dueDate = addDays(new Date(document.lastModified), REVIEW_WINDOW_DAYS);
  const priority = getDocumentAgeInDays(document.lastModified) > REVIEW_WINDOW_DAYS ? 'Haute' : 'Normale';
  const documentPath = `${folder.relativePath}/${document.name}`;

  const [workflow] = await GovernanceApprovalWorkflowModel.findOrCreate({
    where: {
      folderKey: folder.key,
      documentName: document.name
    },
    defaults: {
      title: `Approbation - ${document.name}`,
      scope: folder.relativePath,
      folderKey: folder.key,
      folderLabel: folder.label,
      documentName: document.name,
      documentPath,
      targetType: 'document',
      targetId: document.name,
      status: 'submitted',
      priority,
      requestedById: actor?.id || null,
      departmentId: actor?.departementId || null,
      dueDate,
      submittedAt: new Date(),
      currentStageIndex: 0,
      description: `Cycle d approbation documentaire pour ${folder.label}.`
    }
  });

  const stagesCount = await GovernanceApprovalStageModel.count({ where: { workflowId: workflow.id } });
  if (stagesCount === 0) {
    await GovernanceApprovalStageModel.bulkCreate(
      getStageSeed(folder).map(stage => ({
        ...stage,
        workflowId: workflow.id
      }))
    );
  }

  if (workflow.priority !== priority || !workflow.dueDate) {
    await workflow.update({ priority, dueDate });
  }

  return workflow;
};

const synchronizeDocumentWorkflows = async (folders: RoleFolderConfig[]) => {
  const details = listFolderDetails(folders);

  for (const item of details) {
    for (const document of item.documents) {
      await ensureWorkflowForDocument(item.folder, document);
    }
  }

  return details;
};

const buildWorkflowPayload = (workflow: GovernanceApprovalWorkflowModel & { stages?: GovernanceApprovalStageModel[] }, folderAnalytics?: GovernanceFolderAnalytics) => {
  const stages = (workflow.stages || [])
    .slice()
    .sort((left, right) => left.stageIndex - right.stageIndex);
  const completedApprovals = stages.filter(stage => stage.status === 'done').length;
  const requiredApprovals = Math.max(stages.length, 1);
  const progress = Math.round((completedApprovals / requiredApprovals) * 100);
  const uiStatus = getWorkflowUiStatus(workflow);
  const alert = getWorkflowAlert(uiStatus);
  const pending = uiStatus === 'approuve' ? 0 : 1;

  return {
    id: `${workflow.id}`,
    name: workflow.title,
    scope: workflow.scope,
    pending,
    recentDocuments: folderAnalytics?.recentDocuments || 0,
    totalDocuments: folderAnalytics?.documentCount || (workflow.documentName ? 1 : 0),
    sla: workflow.dueDate ? `Echeance ${new Date(workflow.dueDate).toLocaleDateString('fr-FR')}` : `Cycle ${REVIEW_WINDOW_DAYS} jours`,
    channel: workflow.folderLabel,
    alert: alert.alert,
    alertClass: alert.alertClass,
    lastUpdate: workflow.updatedAt?.toISOString() || null,
    dueDate: workflow.dueDate?.toISOString() || null,
    status: uiStatus,
    priority: workflow.priority,
    progress,
    completedApprovals,
    requiredApprovals,
    nextAction: stages.find(stage => stage.status === 'current')?.rule || 'Workflow termine.',
    actionsRequired: [
      stages.find(stage => stage.status === 'current')?.rule || 'Conserver la decision et archiver la preuve.',
      workflow.documentName ? `Verifier le document: ${workflow.documentName}` : 'Verifier le livrable rattache.',
      'Ajouter un commentaire de decision avant validation ou rejet.'
    ],
    approvers: buildApprovers(stages),
    type: workflow.status === 'changes_requested' ? 'Correction puis nouvelle approbation' : 'Approbation sequentielle dynamique',
    escalation: uiStatus === 'en_retard'
      ? 'Escalade vers Super Admin puis Top Management car l echeance est depassee.'
      : 'Rappel automatique avant echeance, escalade seulement en cas de blocage.',
    decisionRules: [
      'Chaque decision est persistée en base avec acteur, date, commentaire et statut.',
      'Une approbation fait avancer l etape courante vers le prochain approbateur.',
      'Un rejet ou une demande de correction bloque le workflow jusqu a relance.'
    ],
    module: 'Gouvernance Documentaire',
    process: workflow.documentName || workflow.folderLabel,
    macroProcess: workflow.folderLabel,
    sourceType: 'document',
    sourceId: workflow.documentName || workflow.id,
    owner: workflow.folderLabel,
    assignedTo: stages.find(stage => stage.status === 'current')?.owner || workflow.folderLabel,
    actionable: true,
    stages: stages.map(stage => ({
      role: stage.role,
      owner: stage.owner || stage.role,
      rule: stage.rule,
      status: stage.status
    }))
  };
};

const computeFolderGovernanceWorkflows = (folders: RoleFolderConfig[]) => {
  return listFolderDetails(folders).map(item => {
    const latestUpdate = item.analytics.latestUpdate;
    const hasReviewDebt = item.analytics.staleDocuments > 0;
    const hasDocuments = item.analytics.documentCount > 0;
    const completedApprovals = hasReviewDebt ? 2 : hasDocuments ? 5 : 0;
    const requiredApprovals = 5;
    const progress = Math.round((completedApprovals / requiredApprovals) * 100);
    const referenceDate = latestUpdate ? new Date(latestUpdate) : new Date();
    const dueDate = addDays(referenceDate, REVIEW_WINDOW_DAYS).toISOString();
    const status = !hasDocuments ? 'a_initialiser' : hasReviewDebt ? 'en_retard' : 'approuve';
    const priority = hasReviewDebt ? 'Haute' : !hasDocuments ? 'Moyenne' : 'Normale';
    const stages = buildWorkflowStages(item.folder).map((stage, index) => ({
      ...stage,
      status: index < completedApprovals ? 'done' : index === completedApprovals ? 'current' : 'todo'
    }));

    return {
      id: item.folder.key,
      name: `Workflow ${getFolderOwnerLabel(item.folder)}`,
      scope: item.folder.relativePath,
      pending: item.analytics.staleDocuments,
      recentDocuments: item.analytics.recentDocuments,
      totalDocuments: item.analytics.documentCount,
      sla: hasReviewDebt ? `${REVIEW_WINDOW_DAYS} jours depasses` : `Cycle ${REVIEW_WINDOW_DAYS} jours`,
      channel: item.folder.label,
      alert: hasReviewDebt ? 'Revue requise' : 'Sous controle',
      alertClass: hasReviewDebt ? 'warning' : 'success',
      lastUpdate: latestUpdate,
      dueDate,
      status,
      priority,
      progress,
      completedApprovals,
      requiredApprovals,
      nextAction: buildWorkflowActions(item.analytics)[0],
      actionsRequired: buildWorkflowActions(item.analytics),
      approvers: stages.map((stage, index) => ({
        role: stage.role,
        name: stage.owner || stage.role,
        decision: index < completedApprovals ? 'Valide' : index === completedApprovals ? 'En attente' : 'A venir'
      })),
      type: hasReviewDebt ? 'Correction puis approbation sequentielle' : 'Approbation sequentielle standard',
      escalation: hasReviewDebt
        ? 'Escalade vers Super Admin puis Top Management si le retard persiste.'
        : 'Rappel automatique avant echeance, escalade seulement en cas de blocage.',
      decisionRules: [
        'Toute action est tracee avec acteur, role, date, module et statut.',
        'Une validation sensible requiert une revue metier puis une decision gouvernance.',
        'Les retours correction relancent le cycle sans effacer les traces precedentes.'
      ],
      module: 'Gouvernance Documentaire',
      process: item.folder.label,
      macroProcess: 'Documents par role',
      sourceType: 'document',
      sourceId: item.folder.key,
      owner: item.folder.label,
      assignedTo: stages.find(stage => stage.status === 'current')?.owner || item.folder.label,
      actionable: true,
      stages
    };
  });
};

const computeGovernanceWorkflows = async (folders: RoleFolderConfig[]) => {
  try {
    const folderDetails = await synchronizeDocumentWorkflows(folders);
    const analyticsByFolderKey = new Map(folderDetails.map(item => [item.folder.key, item.analytics]));
    const folderKeys = folders.map(folder => folder.key);
    const workflows = await GovernanceApprovalWorkflowModel.findAll({
      where: { folderKey: folderKeys },
      include: [{ model: GovernanceApprovalStageModel, as: 'stages' }],
      order: [['updatedAt', 'DESC']]
    }) as Array<GovernanceApprovalWorkflowModel & { stages?: GovernanceApprovalStageModel[] }>;

    return workflows.map(workflow => buildWorkflowPayload(workflow, analyticsByFolderKey.get(workflow.folderKey)));
  } catch (_error) {
    return computeFolderGovernanceWorkflows(folders);
  }
};

const formatUserName = (user?: User | null): string => {
  if (!user) {
    return 'Non assigne';
  }

  return `${user.prenom || ''} ${user.nom || ''}`.trim() || user.mail;
};

const normalizeWorkflowValue = (value: unknown): string => {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s-]+/g, '_');
};

const clampPercent = (value: number): number => Math.max(0, Math.min(100, Math.round(value)));

const roleLabel = (role: UserRole): string => {
  const labels: Record<string, string> = {
    [UserRole.RISK_MANAGER]: 'Risk Manager',
    [UserRole.RISK_AGENT]: 'Risk Agent',
    [UserRole.AUDIT_DIRECTEUR]: 'Directeur Audit',
    [UserRole.AUDIT_RESPONSABLE]: 'Responsable Audit',
    [UserRole.CHEF_MISSION]: 'Chef de Mission',
    [UserRole.AUDITEUR]: 'Auditeur',
    [UserRole.TOP_MANAGEMENT]: 'Top Management',
    [UserRole.SUPER_ADMIN]: 'Super Admin',
    [UserRole.CONTROLLER]: 'Controleur Interne',
    [UserRole.ADMIN_SI]: 'Administrateur SI'
  };

  return labels[role] || role;
};

const getRolePairsForActor = (role: UserRole): GovernanceRolePair[] => {
  const allPairs: GovernanceRolePair[] = [
    {
      supervisorRole: UserRole.RISK_MANAGER,
      supervisorLabel: 'Risk Manager',
      subordinateRoles: [UserRole.RISK_AGENT],
      subordinateLabel: 'Risk Agents',
      module: 'Risques'
    },
    {
      supervisorRole: UserRole.AUDIT_DIRECTEUR,
      supervisorLabel: 'Directeur Audit',
      subordinateRoles: [UserRole.AUDIT_RESPONSABLE, UserRole.CHEF_MISSION, UserRole.AUDITEUR],
      subordinateLabel: 'Responsables, chefs de mission et auditeurs',
      module: 'Audit'
    },
    {
      supervisorRole: UserRole.AUDIT_RESPONSABLE,
      supervisorLabel: 'Responsable Audit',
      subordinateRoles: [UserRole.CHEF_MISSION, UserRole.AUDITEUR],
      subordinateLabel: 'Chefs de mission et auditeurs',
      module: 'Audit'
    },
    {
      supervisorRole: UserRole.CHEF_MISSION,
      supervisorLabel: 'Chef de Mission',
      subordinateRoles: [UserRole.AUDITEUR],
      subordinateLabel: 'Auditeurs',
      module: 'Audit'
    }
  ];

  if (role === UserRole.SUPER_ADMIN || role === UserRole.TOP_MANAGEMENT) {
    return allPairs;
  }

  return allPairs.filter(pair => pair.supervisorRole === role);
};

const getUserInclude = () => [
  { model: Department, as: 'departement', required: false }
];

const getRoleIds = (roles: UserRole[]): number[] =>
  roles
    .map(role => LookupResolutionService.getStaticValue('user.role', role)?.id)
    .filter((id): id is number => typeof id === 'number');

const getLookupIds = (lookupKey: string, codes: string[]): number[] =>
  codes
    .map(code => LookupResolutionService.getStaticValue(lookupKey, code)?.id)
    .filter((id): id is number => typeof id === 'number');

const getRiskOpenStatusWhere = () => {
  const completedStatusIds = getLookupIds('risk.statut', [RiskStatus.TREATED, RiskStatus.CLOSED]);
  return completedStatusIds.length > 0 ? { statutId: { [Op.notIn]: completedStatusIds } } : {};
};

const getAuditOpenStatusWhere = () => {
  const completedStatusIds = getLookupIds('auditMission.statut', [AuditMissionStatus.TERMINE]);
  return completedStatusIds.length > 0 ? { statutId: { [Op.notIn]: completedStatusIds } } : {};
};

const findScopedUsers = async (roles: UserRole[], actor: AuthenticatedUser, supervisor?: User) => {
  const roleIds = getRoleIds(roles);
  const where: any = roleIds.length > 0 ? { roleId: { [Op.in]: roleIds } } : { id: -1 };

  if (actor.role !== UserRole.SUPER_ADMIN && actor.role !== UserRole.TOP_MANAGEMENT) {
    const departmentId = supervisor?.departementId || actor.departementId;
    if (departmentId) {
      where.departementId = departmentId;
    }
  }

  return User.findAll({
    where,
    include: getUserInclude(),
    order: [['nom', 'ASC'], ['prenom', 'ASC']]
  }) as Promise<Array<User & { departement?: Department }>>;
};

const buildRoleTraceability = async (actor: AuthenticatedUser) => {
  const pairs = getRolePairsForActor(actor.role);
  const cards = [];

  for (const pair of pairs) {
    const supervisorRoleIds = getRoleIds([pair.supervisorRole]);
    const supervisorWhere: any = supervisorRoleIds.length > 0 ? { roleId: supervisorRoleIds[0] } : { id: -1 };

    if (actor.role === pair.supervisorRole) {
      supervisorWhere.id = actor.id;
    } else if (actor.role !== UserRole.SUPER_ADMIN && actor.role !== UserRole.TOP_MANAGEMENT && actor.departementId) {
      supervisorWhere.departementId = actor.departementId;
    }

    const supervisors = await User.findAll({
      where: supervisorWhere,
      include: getUserInclude(),
      order: [['nom', 'ASC'], ['prenom', 'ASC']]
    }) as Array<User & { departement?: Department }>;

    for (const supervisor of supervisors) {
      const members = await findScopedUsers(pair.subordinateRoles, actor, supervisor);
      const memberIds = members.map(member => member.id);
      const riskWhere = pair.module === 'Risques'
        ? {
            riskManagerId: supervisor.id,
            ...(memberIds.length > 0 ? { riskAgentId: { [Op.in]: memberIds } } : {})
          }
        : null;
      const auditWhere = pair.module === 'Audit'
        ? {
            [Op.or]: [
              { auditSeniorId: supervisor.id },
              { chefMissionId: supervisor.id }
            ],
            ...(memberIds.length > 0
              ? {
                  [Op.and]: [{
                    [Op.or]: [
                      { chefMissionId: { [Op.in]: memberIds } },
                      { auditeurId: { [Op.in]: memberIds } }
                    ]
                  }]
                }
              : {})
          }
        : null;

      const [assignmentCount, openItems, lateItems] = await Promise.all([
        riskWhere ? Risk.count({ where: riskWhere }) : auditWhere ? AuditMission.count({ where: auditWhere }) : Promise.resolve(0),
        riskWhere
          ? Risk.count({ where: { ...riskWhere, ...getRiskOpenStatusWhere() } })
          : auditWhere
            ? AuditMission.count({ where: { ...auditWhere, ...getAuditOpenStatusWhere() } })
            : Promise.resolve(0),
        riskWhere
          ? Risk.count({ where: { ...riskWhere, dateEcheance: { [Op.lt]: new Date() }, ...getRiskOpenStatusWhere() } })
          : auditWhere
            ? AuditMission.count({ where: { ...auditWhere, delai: { [Op.lt]: new Date() }, ...getAuditOpenStatusWhere() } })
            : Promise.resolve(0)
      ]);

      cards.push({
        module: pair.module,
        supervisorRole: pair.supervisorRole,
        supervisorLabel: pair.supervisorLabel,
        supervisor: {
          id: supervisor.id,
          name: formatUserName(supervisor),
          mail: supervisor.mail,
          poste: supervisor.poste,
          departement: supervisor.departement?.nom || null
        },
        subordinateLabel: pair.subordinateLabel,
        members: members.map(member => ({
          id: member.id,
          name: formatUserName(member),
          mail: member.mail,
          role: member.role,
          roleLabel: roleLabel(member.role),
          poste: member.poste,
          departement: member.departement?.nom || null
        })),
        stats: {
          members: members.length,
          assignments: assignmentCount,
          openItems,
          lateItems
        }
      });
    }
  }

  return cards;
};

const getScopedRiskWhere = (actor: AuthenticatedUser) => {
  if (actor.role === UserRole.SUPER_ADMIN || actor.role === UserRole.TOP_MANAGEMENT) {
    return {};
  }

  if (actor.role === UserRole.RISK_MANAGER) {
    return { riskManagerId: actor.id };
  }

  if (actor.role === UserRole.RISK_AGENT) {
    return { riskAgentId: actor.id };
  }

  if (actor.departementId) {
    return { departementId: actor.departementId };
  }

  return { id: -1 };
};

const getScopedAuditWhere = (actor: AuthenticatedUser) => {
  if (actor.role === UserRole.SUPER_ADMIN || actor.role === UserRole.TOP_MANAGEMENT || actor.role === UserRole.AUDIT_DIRECTEUR) {
    return {};
  }

  if (actor.role === UserRole.AUDIT_RESPONSABLE) {
    return { auditSeniorId: actor.id };
  }

  if (actor.role === UserRole.CHEF_MISSION) {
    return { chefMissionId: actor.id };
  }

  if (actor.role === UserRole.AUDITEUR) {
    return { auditeurId: actor.id };
  }

  return { id: -1 };
};

const getScopedIncidentWhere = (actor: AuthenticatedUser) => {
  if (actor.role === UserRole.SUPER_ADMIN || actor.role === UserRole.TOP_MANAGEMENT) {
    return {};
  }

  const scopedConditions: any[] = [
    { userId: actor.id },
    { assigneeId: actor.id }
  ];

  if (actor.departementId) {
    scopedConditions.push({ departementId: actor.departementId });
  }

  return { [Op.or]: scopedConditions };
};

const isRiskCompleted = (risk: Risk): boolean => {
  const status = normalizeWorkflowValue(risk.statut);
  return status === RiskStatus.TREATED || status === RiskStatus.CLOSED;
};

const isAuditCompleted = (mission: AuditMission): boolean =>
  normalizeWorkflowValue(mission.statut) === AuditMissionStatus.TERMINE;

const isIncidentCompleted = (incident: Incident): boolean => {
  const status = normalizeWorkflowValue(incident.statut);
  return status === IncidentStatus.TRAITE || status === IncidentStatus.CLOS;
};

const isPastDate = (date?: Date | string | null): boolean =>
  !!date && new Date(date).getTime() < Date.now();

const cleanWorkflowText = (value: unknown): string => String(value || '').replace(/\s+/g, ' ').trim();

const getOperationalStatus = (rawStatus: unknown, dueDate?: Date | string | null): 'a_initialiser' | 'en_retard' | 'approuve' | 'en_cours' | 'rejete' => {
  const status = normalizeWorkflowValue(rawStatus);

  if (['closed', 'clos', 'treated', 'traite', 'ok', 'termine', 'completed', 'mitigated', 'active'].includes(status)) {
    return 'approuve';
  }

  if (['rejected', 'cancelled', 'annule', 'retired', 'archived'].includes(status)) {
    return 'rejete';
  }

  if (isPastDate(dueDate)) {
    return 'en_retard';
  }

  if (['draft', 'cree', 'nouveau', 'open'].includes(status)) {
    return 'a_initialiser';
  }

  return 'en_cours';
};

const getProgressFromStatus = (status: 'a_initialiser' | 'en_retard' | 'approuve' | 'en_cours' | 'rejete', fallback = 50): number => {
  switch (status) {
    case 'approuve':
      return 100;
    case 'rejete':
      return 0;
    case 'a_initialiser':
      return 15;
    case 'en_retard':
      return Math.min(fallback, 45);
    default:
      return fallback;
  }
};

const deriveConfiguredStageStatuses = (
  stages: Array<{ role: string; rule: string; owner?: string; slaDays?: number | null; escalationTo?: string; escalationRule?: string }>,
  status: GovernanceWorkflowPayload['status'],
  progress = 0
): GovernanceStagePayload[] => {
  if (status === 'approuve') {
    return stages.map(stage => ({ ...stage, status: 'done' }));
  }

  if (status === 'rejete') {
    return stages.map((stage, index) => ({ ...stage, status: index === 0 ? 'rejected' : 'todo' }));
  }

  const stageCount = Math.max(stages.length, 1);
  const completedCount = Math.min(Math.floor((Math.max(0, progress) / 100) * stageCount), stageCount - 1);

  return stages.map((stage, index) => ({
    ...stage,
    status: index < completedCount ? 'done' : index === completedCount ? 'current' : 'todo'
  }));
};

const parseOverrideStages = (override: GovernanceWorkflowInstanceOverrideModel): GovernanceStagePayload[] => {
  try {
    const stages = JSON.parse(override.stagesJson);
    return normalizeWorkflowStages(stages).map(stage => ({
      role: stage.role,
      owner: stage.owner,
      rule: stage.rule,
      slaDays: stage.slaDays,
      escalationTo: stage.escalationTo,
      escalationRule: stage.escalationRule
    }));
  } catch (_error) {
    return [];
  }
};

const getTemplateStages = (template: GovernanceWorkflowTemplateModel & { stages?: GovernanceWorkflowTemplateStageModel[] }) =>
  (template.stages || [])
    .slice()
    .sort((left, right) => left.stageIndex - right.stageIndex)
    .map(stage => ({
      role: stage.role,
      owner: stage.owner || undefined,
      rule: stage.rule,
      slaDays: stage.slaDays,
      escalationTo: stage.escalationTo || undefined,
      escalationRule: stage.escalationRule || undefined
    }));

const findWorkflowTemplate = async (module: GovernanceWorkflowModule, process?: string | null) => {
  const templates = await GovernanceWorkflowTemplateModel.findAll({
    where: {
      module,
      isActive: true,
      [Op.or]: [
        { process: process || null },
        { process: null }
      ]
    } as any,
    include: [{ model: GovernanceWorkflowTemplateStageModel, as: 'stages' }],
    order: [
      ['process', 'DESC'],
      ['version', 'DESC'],
      ['updatedAt', 'DESC']
    ]
  }) as Array<GovernanceWorkflowTemplateModel & { stages?: GovernanceWorkflowTemplateStageModel[] }>;

  return templates.find(template => (template.process || null) === (process || null)) || templates[0] || null;
};

const applyWorkflowConfiguration = async (workflow: GovernanceWorkflowPayload): Promise<GovernanceWorkflowPayload> => {
  const module = sourceTypeToWorkflowModule(workflow.sourceType);
  if (!module || !workflow.sourceId) {
    return workflow;
  }

  const override = await GovernanceWorkflowInstanceOverrideModel.findOne({
    where: { workflowKey: workflow.id }
  });

  if (override) {
    const overrideStages = deriveConfiguredStageStatuses(parseOverrideStages(override), workflow.status, workflow.progress);
    if (overrideStages.length > 0) {
      return {
        ...workflow,
        name: override.title || workflow.name,
        scope: override.description || workflow.scope,
        process: override.process || workflow.process,
        stages: overrideStages,
        approvers: buildApproversFromStages(overrideStages),
        completedApprovals: overrideStages.filter(stage => stage.status === 'done').length,
        requiredApprovals: overrideStages.length,
        nextAction: overrideStages.find(stage => stage.status === 'current')?.rule || workflow.nextAction,
        configured: true,
        overridden: true
      };
    }
  }

  const template = await findWorkflowTemplate(module, workflow.process || null);
  if (!template) {
    return workflow;
  }

  const templateStages = deriveConfiguredStageStatuses(getTemplateStages(template), workflow.status, workflow.progress);
  if (!templateStages.length) {
    return workflow;
  }

  return {
    ...workflow,
    type: `Modele configure v${template.version}`,
    escalation: template.description || workflow.escalation,
    stages: templateStages,
    approvers: buildApproversFromStages(templateStages),
    completedApprovals: templateStages.filter(stage => stage.status === 'done').length,
    requiredApprovals: templateStages.length,
    nextAction: templateStages.find(stage => stage.status === 'current')?.rule || workflow.nextAction,
    configured: true,
    overridden: false
  };
};

const buildOperationalWorkflow = (payload: {
  id: string;
  name: string;
  module: string;
  process?: string | null;
  macroProcess?: string | null;
  sourceType: Exclude<GovernanceWorkflowSourceType, 'document'>;
  sourceId: number;
  status: 'a_initialiser' | 'en_retard' | 'approuve' | 'en_cours' | 'rejete';
  priority: string;
  progress: number;
  dueDate?: Date | string | null;
  lastUpdate?: Date | string | null;
  owner?: string;
  assignedTo?: string;
  stages: GovernanceStagePayload[];
  nextAction: string;
  scopeFallback: string;
}): GovernanceWorkflowPayload => {
  const completedApprovals = payload.stages.filter(stage => stage.status === 'done').length;
  const requiredApprovals = Math.max(payload.stages.length, 1);
  const pending = payload.status === 'approuve' ? 0 : Math.max(1, requiredApprovals - completedApprovals);

  return {
    id: payload.id,
    name: payload.name,
    scope: payload.process || payload.macroProcess || payload.scopeFallback,
    pending,
    recentDocuments: 0,
    totalDocuments: 1,
    sla: payload.dueDate ? `Echeance ${new Date(payload.dueDate).toLocaleDateString('fr-FR')}` : 'Echeance non definie',
    channel: payload.module,
    alert: payload.status === 'en_retard' ? 'En retard' : payload.status === 'approuve' ? 'Termine' : 'En cours',
    alertClass: payload.status === 'en_retard' ? 'warning' : 'success',
    lastUpdate: payload.lastUpdate ? new Date(payload.lastUpdate).toISOString() : null,
    dueDate: payload.dueDate ? new Date(payload.dueDate).toISOString() : null,
    status: payload.status,
    priority: payload.priority,
    progress: clampPercent(payload.progress),
    completedApprovals,
    requiredApprovals,
    nextAction: payload.nextAction,
    actionsRequired: [
      payload.nextAction,
      payload.assignedTo ? `Suivre l execution avec ${payload.assignedTo}.` : 'Affecter un responsable operationnel.',
      'Conserver la trace des decisions et changements de statut.'
    ],
    approvers: payload.stages.map(stage => ({
      role: stage.role,
      name: stage.owner || stage.role,
      decision: stage.status === 'done' ? 'Realise' : stage.status === 'current' ? 'En attente' : 'A venir'
    })),
    type: `Workflow operationnel ${payload.module}`,
    escalation: payload.status === 'en_retard'
      ? 'Escalade vers le responsable du perimetre car l echeance est depassee.'
      : 'Suivi par le responsable hierarchique avec tracabilite des changements.',
    decisionRules: [
      'Le processus et l avancement sont calcules depuis l objet metier rattache.',
      'Les profils responsables voient les objets de leur perimetre et les utilisateurs rattaches.',
      'Les actions operationnelles restent executees dans le module metier source.'
    ],
    stages: payload.stages,
    module: payload.module,
    process: payload.process || null,
    macroProcess: payload.macroProcess || null,
    sourceType: payload.sourceType,
    sourceId: payload.sourceId,
    owner: payload.owner,
    assignedTo: payload.assignedTo,
    actionable: false
  };
};

const buildRiskWorkflow = (risk: Risk): GovernanceWorkflowPayload => {
  const completed = isRiskCompleted(risk);
  const treated = normalizeWorkflowValue(risk.statut) === RiskStatus.TREATED;
  const status = completed ? 'approuve' : isPastDate(risk.dateEcheance) ? 'en_retard' : 'en_cours';
  const isEvaluated = Boolean(
    risk.probabilite ||
    risk.impact ||
    risk.cotationProbabilite ||
    risk.cotationImpact ||
    risk.niveauCotationRisqueBrut ||
    risk.niveauCotationRisqueNet
  );
  const hasTreatmentPlan = Boolean(cleanWorkflowText(risk.planActionTraitement));
  const hasTreatmentTrace = Boolean(risk.dernierTraitement || risk.pieceJustificative || treated || completed);
  const stages: GovernanceStagePayload[] = [
    {
      role: 'Identification',
      owner: formatUserName(risk.riskManager),
      rule: `Risque cree dans ${risk.domaine || 'un domaine non renseigne'}; macro-processus: ${risk.macroProcessus || 'non renseigne'}; processus: ${risk.processus || 'non renseigne'}.`,
      status: 'done'
    },
    {
      role: 'Evaluation',
      owner: formatUserName(risk.riskManager),
      rule: `Cotation reelle: probabilite ${risk.probabilite || 'N/A'}, impact ${risk.impact || 'N/A'}, brut ${risk.niveauCotationRisqueBrut || 'N/A'}, net ${risk.niveauCotationRisqueNet || 'N/A'}, niveau ${risk.niveauRisque || 'N/A'}.`,
      status: isEvaluated ? 'done' : 'current'
    },
    {
      role: 'Affectation',
      owner: formatUserName(risk.riskAgent),
      rule: `Risk Agent charge du traitement: ${formatUserName(risk.riskAgent)}; responsable de traitement: ${risk.responsableTraitement?.nom || 'non renseigne'}.`,
      status: risk.riskAgentId ? 'done' : isEvaluated ? 'current' : 'todo'
    },
    {
      role: 'Plan de traitement',
      owner: formatUserName(risk.riskAgent),
      rule: hasTreatmentPlan ? risk.planActionTraitement! : 'Plan d action de traitement a formaliser dans le registre des risques.',
      status: completed || treated || hasTreatmentTrace ? 'done' : risk.riskAgentId ? 'current' : 'todo'
    },
    {
      role: 'Suivi echeance',
      owner: formatUserName(risk.riskAgent || risk.riskManager),
      rule: `Echeance initiale ${risk.dateEcheance ? new Date(risk.dateEcheance).toLocaleDateString('fr-FR') : 'N/A'}; prochaine echeance ${risk.prochaineEcheance ? new Date(risk.prochaineEcheance).toLocaleDateString('fr-FR') : 'N/A'}; dernier traitement ${risk.dernierTraitement ? new Date(risk.dernierTraitement).toLocaleDateString('fr-FR') : 'N/A'}.`,
      status: completed || treated ? 'done' : hasTreatmentTrace ? 'current' : 'todo'
    },
    {
      role: 'Validation manager',
      owner: formatUserName(risk.riskManager),
      rule: 'Le Risk Manager controle le traitement, demande correction si necessaire puis cloture le risque.',
      status: completed ? 'done' : treated ? 'current' : 'todo'
    },
    {
      role: 'Tracabilite',
      owner: 'Gouvernance',
      rule: `Statut actuel: ${risk.statut || 'N/A'}; justificatif: ${risk.pieceJustificative ? 'present' : 'absent'}; source incident: ${risk.incidentId || 'aucune'}.`,
      status: completed ? 'done' : 'todo'
    }
  ];

  return buildOperationalWorkflow({
    id: `risk-${risk.id}`,
    name: `Risque #${risk.id} - ${risk.titre}`,
    module: 'Risques',
    process: risk.processus,
    macroProcess: risk.macroProcessus,
    sourceType: 'risk',
    sourceId: risk.id,
    status,
    priority: normalizeWorkflowValue(risk.niveauRisque).includes('critical') || normalizeWorkflowValue(risk.niveauRisque).includes('high') ? 'Haute' : 'Normale',
    progress: completed ? 100 : treated ? 85 : hasTreatmentTrace ? 70 : hasTreatmentPlan ? 55 : risk.riskAgentId ? 40 : isEvaluated ? 25 : 10,
    dueDate: risk.prochaineEcheance || risk.dateEcheance,
    lastUpdate: risk.updatedAt,
    owner: formatUserName(risk.riskManager),
    assignedTo: formatUserName(risk.riskAgent),
    stages,
    nextAction: stages.find(stage => stage.status === 'current')?.rule || 'Workflow risque termine.',
    scopeFallback: risk.domaine || 'Gestion des risques'
  });
};

const buildAuditWorkflow = (mission: AuditMission): GovernanceWorkflowPayload => {
  const completed = isAuditCompleted(mission);
  const progress = mission.progressPercent == null ? (completed ? 100 : 35) : mission.progressPercent;
  const status = completed ? 'approuve' : isPastDate(mission.delai || mission.datePrevueFin) ? 'en_retard' : 'en_cours';
  const hasPlanningDates = Boolean(mission.datePrevueDebut || mission.datePrevueFin || mission.delai);
  const hasWorkProgram = Boolean(
    mission.workProgramSubmittedAt ||
    mission.workProgramValidatedAt ||
    mission.workProgramApprovedAt ||
    normalizeWorkflowValue(mission.workProgramStatus) !== 'draft'
  );
  const hasRealExecution = Boolean(mission.dateReelleDebut || mission.dateReelleFin || (mission.progressPercent || 0) > 0);
  const hasReport = Boolean(mission.rapport || mission.reportSubmittedAt || normalizeWorkflowValue(mission.reportStatus) !== 'draft');
  const hasRecommendationFollowUp = Boolean(
    mission.recommandations ||
    mission.recommendationPlanAction ||
    mission.recommendationPlanSubmittedAt ||
    mission.recommendationProgressSubmittedAt ||
    mission.recommendationClosedAt
  );
  const stages: GovernanceStagePayload[] = [
    {
      role: 'Cadrage mission',
      owner: formatUserName((mission as any).auditSenior),
      rule: `Mission ${mission.code || mission.id}; type ${mission.type || 'mission_audit'}; axe ${mission.axe || 'non renseigne'}; objectif: ${cleanWorkflowText(mission.objectifs) || 'non renseigne'}.`,
      status: 'done'
    },
    {
      role: 'Planification',
      owner: formatUserName((mission as any).auditSenior),
      rule: `Debut prevu ${mission.datePrevueDebut ? new Date(mission.datePrevueDebut).toLocaleDateString('fr-FR') : 'N/A'}; fin prevue ${mission.datePrevueFin ? new Date(mission.datePrevueFin).toLocaleDateString('fr-FR') : 'N/A'}; delai ${mission.delai ? new Date(mission.delai).toLocaleDateString('fr-FR') : 'N/A'}.`,
      status: hasPlanningDates ? 'done' : 'current'
    },
    {
      role: 'Affectation equipe',
      owner: formatUserName((mission as any).chefMission || (mission as any).auditeur),
      rule: `Chef de mission: ${formatUserName((mission as any).chefMission)}; auditeur: ${formatUserName((mission as any).auditeur)}; audite principal: ${formatUserName((mission as any).auditedPrincipal)}.`,
      status: mission.chefMissionId || mission.auditeurId ? 'done' : hasPlanningDates ? 'current' : 'todo'
    },
    {
      role: 'Programme de travail',
      owner: formatUserName((mission as any).workProgramPreparedBy || (mission as any).chefMission),
      rule: `Statut programme: ${mission.workProgramStatus || 'draft'}; soumis ${mission.workProgramSubmittedAt ? new Date(mission.workProgramSubmittedAt).toLocaleDateString('fr-FR') : 'N/A'}; valide ${mission.workProgramValidatedAt ? new Date(mission.workProgramValidatedAt).toLocaleDateString('fr-FR') : 'N/A'}; approuve ${mission.workProgramApprovedAt ? new Date(mission.workProgramApprovedAt).toLocaleDateString('fr-FR') : 'N/A'}.`,
      status: hasWorkProgram ? 'done' : mission.chefMissionId || mission.auditeurId ? 'current' : 'todo'
    },
    {
      role: 'Execution terrain',
      owner: formatUserName((mission as any).auditeur),
      rule: `Progression reelle ${progress}%; debut reel ${mission.dateReelleDebut ? new Date(mission.dateReelleDebut).toLocaleDateString('fr-FR') : 'N/A'}; fin reelle ${mission.dateReelleFin ? new Date(mission.dateReelleFin).toLocaleDateString('fr-FR') : 'N/A'}.`,
      status: completed || progress >= 80 ? 'done' : hasRealExecution || hasWorkProgram ? 'current' : 'todo'
    },
    {
      role: 'Rapport audit',
      owner: formatUserName((mission as any).reportPreparedBy || (mission as any).auditeur),
      rule: `Statut rapport: ${mission.reportStatus || 'draft'}; soumis ${mission.reportSubmittedAt ? new Date(mission.reportSubmittedAt).toLocaleDateString('fr-FR') : 'N/A'}; valide ${mission.reportValidatedAt ? new Date(mission.reportValidatedAt).toLocaleDateString('fr-FR') : 'N/A'}; approuve ${mission.reportApprovedAt ? new Date(mission.reportApprovedAt).toLocaleDateString('fr-FR') : 'N/A'}.`,
      status: completed || mission.reportApprovedAt ? 'done' : hasReport ? 'current' : 'todo'
    },
    {
      role: 'Recommandations',
      owner: formatUserName((mission as any).auditSenior),
      rule: `Workflow recommandations: ${mission.recommendationWorkflowStatus || 'cree'}; plan soumis ${mission.recommendationPlanSubmittedAt ? new Date(mission.recommendationPlanSubmittedAt).toLocaleDateString('fr-FR') : 'N/A'}; avancement soumis ${mission.recommendationProgressSubmittedAt ? new Date(mission.recommendationProgressSubmittedAt).toLocaleDateString('fr-FR') : 'N/A'}; cloture ${mission.recommendationClosedAt ? new Date(mission.recommendationClosedAt).toLocaleDateString('fr-FR') : 'N/A'}.`,
      status: completed || mission.recommendationFinalClosedAt ? 'done' : hasRecommendationFollowUp ? 'current' : 'todo'
    }
  ];

  return buildOperationalWorkflow({
    id: `audit-${mission.id}`,
    name: `Audit #${mission.id} - ${mission.titre}`,
    module: 'Audit',
    process: mission.axe || (mission as any).category || mission.objectifs || null,
    macroProcess: mission.type,
    sourceType: 'audit',
    sourceId: mission.id,
    status,
    priority: mission.priorite && mission.priorite <= 2 ? 'Haute' : 'Normale',
    progress: completed ? 100 : Math.max(progress, hasReport ? 80 : hasRealExecution ? 60 : hasWorkProgram ? 40 : hasPlanningDates ? 20 : 10),
    dueDate: mission.delai || mission.datePrevueFin,
    lastUpdate: mission.updatedAt,
    owner: formatUserName((mission as any).auditSenior),
    assignedTo: formatUserName((mission as any).auditeur || (mission as any).chefMission),
    stages,
    nextAction: stages.find(stage => stage.status === 'current')?.rule || 'Workflow audit termine.',
    scopeFallback: mission.objectifs || 'Mission audit'
  });
};

const buildIncidentWorkflow = (incident: Incident): GovernanceWorkflowPayload => {
  const completed = isIncidentCompleted(incident);
  const linkedRisk = !!incident.riskId;
  const status = completed ? 'approuve' : isPastDate(incident.dateEcheance) ? 'en_retard' : 'en_cours';
  const hasQualification = Boolean(incident.domaine || incident.macroProcessus || incident.processus || incident.niveauRisque);
  const hasAssignment = Boolean(incident.assigneeId);
  const hasTreatmentPlan = Boolean(cleanWorkflowText(incident.planActionTraitement));
  const stages: GovernanceStagePayload[] = [
    {
      role: 'Declaration',
      owner: formatUserName(incident.declareur),
      rule: `Incident declare le ${incident.dateSurvenance ? new Date(incident.dateSurvenance).toLocaleDateString('fr-FR') : 'N/A'}; piece jointe: ${incident.pieceJointe ? 'presente' : 'absente'}; description: ${cleanWorkflowText(incident.description) || 'non renseignee'}.`,
      status: 'done'
    },
    {
      role: 'Qualification',
      owner: formatUserName(incident.declareur || incident.assignee),
      rule: `Domaine ${incident.domaine || 'non renseigne'}; macro-processus ${incident.macroProcessus || 'non renseigne'}; processus ${incident.processus || 'non renseigne'}; niveau risque ${incident.niveauRisque || 'N/A'}.`,
      status: hasQualification ? 'done' : 'current'
    },
    {
      role: 'Affectation',
      owner: formatUserName(incident.assignee),
      rule: `Responsable de traitement assigne: ${formatUserName(incident.assignee)}.`,
      status: hasAssignment ? 'done' : hasQualification ? 'current' : 'todo'
    },
    {
      role: 'Analyse et traitement',
      owner: formatUserName(incident.assignee),
      rule: hasTreatmentPlan ? incident.planActionTraitement! : 'Plan d action de traitement a definir dans le workflow incident.',
      status: completed ? 'done' : hasTreatmentPlan ? 'current' : hasAssignment ? 'current' : 'todo'
    },
    {
      role: 'Lien risque',
      owner: 'Risk Manager',
      rule: `Risque associe/genere: ${incident.riskId || 'aucun'}; echeance de traitement: ${incident.dateEcheance ? new Date(incident.dateEcheance).toLocaleDateString('fr-FR') : 'N/A'}.`,
      status: linkedRisk ? 'done' : completed ? 'todo' : hasTreatmentPlan ? 'current' : 'todo'
    },
    {
      role: 'Cloture et retour experience',
      owner: formatUserName(incident.assignee || incident.declareur),
      rule: `Statut actuel: ${incident.statut || 'N/A'}; la cloture conserve la trace declaration, analyse, traitement et lien risque.`,
      status: completed ? 'done' : 'todo'
    }
  ];

  return buildOperationalWorkflow({
    id: `incident-${incident.id}`,
    name: `Incident #${incident.id} - ${incident.titre}`,
    module: 'Incidents',
    process: incident.processus,
    macroProcess: incident.macroProcessus,
    sourceType: 'incident',
    sourceId: incident.id,
    status,
    priority: normalizeWorkflowValue(incident.niveauRisque).includes('critical') || normalizeWorkflowValue(incident.niveauRisque).includes('high') ? 'Haute' : 'Normale',
    progress: completed ? 100 : linkedRisk ? 80 : hasTreatmentPlan ? 60 : hasAssignment ? 40 : hasQualification ? 25 : 10,
    dueDate: incident.dateEcheance,
    lastUpdate: incident.updatedAt,
    owner: formatUserName(incident.declareur),
    assignedTo: formatUserName(incident.assignee),
    stages,
    nextAction: stages.find(stage => stage.status === 'current')?.rule || 'Workflow incident termine.',
    scopeFallback: incident.domaine || 'Gestion des incidents'
  });
};

const computeOperationalWorkflows = async (actor: AuthenticatedUser): Promise<GovernanceWorkflowPayload[]> => {
  const [risks, missions, incidents] = await Promise.all([
    Risk.findAll({
      where: getScopedRiskWhere(actor),
      include: [
        { model: User, as: 'riskManager', required: false },
        { model: User, as: 'riskAgent', required: false },
        { model: Organigramme, as: 'responsableTraitement', required: false },
        { model: Department, as: 'departement', required: false }
      ],
      order: [['updatedAt', 'DESC']],
      limit: 80
    }) as Promise<Array<Risk>>,
    AuditMission.findAll({
      where: getScopedAuditWhere(actor),
      include: [
        { model: User, as: 'auditSenior', required: false },
        { model: User, as: 'chefMission', required: false },
        { model: User, as: 'auditeur', required: false },
        { model: User, as: 'auditedPrincipal', required: false },
        { model: User, as: 'workProgramPreparedBy', required: false },
        { model: User, as: 'reportPreparedBy', required: false }
      ],
      order: [['updatedAt', 'DESC']],
      limit: 80
    }) as Promise<Array<AuditMission>>,
    Incident.findAll({
      where: getScopedIncidentWhere(actor),
      include: [
        { model: User, as: 'declareur', required: false },
        { model: User, as: 'assignee', required: false }
      ],
      order: [['updatedAt', 'DESC']],
      limit: 80
    }) as Promise<Array<Incident>>
  ]);

  const configuredWorkflows = await Promise.all([
    ...risks.map(buildRiskWorkflow),
    ...missions.map(buildAuditWorkflow),
    ...incidents.map(buildIncidentWorkflow)
  ].map(workflow => applyWorkflowConfiguration(workflow)));

  const visibleWorkflows = (await Promise.all(
    configuredWorkflows.map(workflow => attachWorkflowRights(workflow, actor))
  )).filter((workflow): workflow is GovernanceWorkflowPayload => Boolean(workflow));

  return visibleWorkflows.sort((left, right) => {
    const priorityScore = (workflow: GovernanceWorkflowPayload) =>
      workflow.status === 'en_retard' ? 0 : workflow.status === 'en_cours' ? 1 : workflow.status === 'a_initialiser' ? 2 : 3;
    const statusDelta = priorityScore(left) - priorityScore(right);
    if (statusDelta !== 0) {
      return statusDelta;
    }

    return new Date(right.lastUpdate || 0).getTime() - new Date(left.lastUpdate || 0).getTime();
  });
};

const clampScore = (score: number): number => {
  return Math.max(0, Math.min(5, Number(score.toFixed(1))));
};

const computeGovernanceMaturity = (folders: RoleFolderConfig[]) => {
  const overview = computeGovernanceOverview(folders);
  const totalFolders = Math.max(overview.summary.totalFolders, 1);
  const totalDocuments = Math.max(overview.summary.totalDocuments, 1);
  const documentationScore = clampScore((overview.summary.populatedFolders / totalFolders) * 5);
  const freshnessScore = clampScore((overview.summary.recentDocuments / totalDocuments) * 5);
  const traceabilityScore = clampScore((overview.summary.totalDocuments > 0 ? 2 : 0) + (overview.summary.populatedFolders / totalFolders) * 1.5 + (overview.summary.recentDocuments / totalDocuments) * 1.5);
  const diffusionScore = clampScore((overview.summary.populatedFolders / totalFolders) * 2.5 + ((overview.summary.totalDocuments - overview.summary.staleDocuments) / totalDocuments) * 2.5);

  return [
    {
      name: 'Couverture documentaire',
      framework: 'Documents par role',
      score: documentationScore,
      summary: `${overview.summary.populatedFolders} dossier(s) alimente(s) sur ${overview.summary.totalFolders}.`,
      recommendation: overview.summary.populatedFolders < overview.summary.totalFolders
        ? 'Completer les dossiers role sans contenu pour homogeniser la gouvernance.'
        : 'La couverture documentaire est assuree sur les dossiers visibles.'
    },
    {
      name: 'Fraicheur des contenus',
      framework: 'Cycle de revue',
      score: freshnessScore,
      summary: `${overview.summary.recentDocuments} document(s) mis a jour sur les ${RECENT_WINDOW_DAYS} derniers jours.`,
      recommendation: overview.summary.staleDocuments > 0
        ? `${overview.summary.staleDocuments} document(s) depassent ${REVIEW_WINDOW_DAYS} jours et doivent etre revalide(s).`
        : 'Le stock documentaire recent soutient bien les cycles de revue.'
    },
    {
      name: 'Tracabilite',
      framework: 'Metadonnees fichiers',
      score: traceabilityScore,
      summary: `Les journaux reposent sur les dates de modification, tailles et dossiers de rattachement des ${overview.summary.totalDocuments} document(s).`,
      recommendation: overview.summary.totalDocuments > 0
        ? 'Conserver cette discipline et renforcer l historisation des versions critiques.'
        : 'Aucun document n est disponible pour etablir une piste de tracabilite.'
    },
    {
      name: 'Diffusion et application',
      framework: 'Disponibilite par population',
      score: diffusionScore,
      summary: `La diffusion visible couvre ${overview.summary.populatedFolders}/${overview.summary.totalFolders} populations documentaires.`,
      recommendation: overview.summary.populatedFolders < overview.summary.totalFolders
        ? 'Diffuser les documents minimaux dans chaque espace role pour renforcer l appropriation.'
        : 'La diffusion est etablie; prioriser maintenant les revues echeancees.'
    }
  ];
};

const computeGovernanceAdoption = (folders: RoleFolderConfig[]) => {
  const details = listFolderDetails(folders);

  return details.map(item => {
    const coverage = item.analytics.documentCount > 0
      ? Math.round((item.analytics.recentDocuments / item.analytics.documentCount) * 100)
      : 0;

    return {
      title: item.folder.label,
      target: getFolderOwnerLabel(item.folder),
      coverage,
      documentCount: item.analytics.documentCount,
      recentDocuments: item.analytics.recentDocuments,
      staleDocuments: item.analytics.staleDocuments,
      latestUpdate: item.analytics.latestUpdate,
      nextStep: item.analytics.staleDocuments > 0
        ? `Revoir ${item.analytics.staleDocuments} document(s) ancien(s) avant la prochaine diffusion.`
        : 'Maintenir le rythme de mise a jour documentaire sur ce perimetre.'
    };
  });
};

const resolveFilePath = (folder: RoleFolderConfig, requestedFileName: string): string | null => {
  const safeFileName = sanitizeFileName(requestedFileName);

  if (safeFileName !== requestedFileName) {
    return null;
  }

  const absoluteFolderPath = ensureFolderExists(folder);
  const absoluteFilePath = path.join(absoluteFolderPath, safeFileName);

  if (!fs.existsSync(absoluteFilePath) || !fs.statSync(absoluteFilePath).isFile()) {
    return null;
  }

  return absoluteFilePath;
};

const serializeTemplate = (template: GovernanceWorkflowTemplateModel & { stages?: GovernanceWorkflowTemplateStageModel[] }) => ({
  id: template.id,
  module: template.module,
  process: template.process,
  title: template.title,
  description: template.description,
  isActive: template.isActive,
  version: template.version,
  stages: (template.stages || [])
    .slice()
    .sort((left, right) => left.stageIndex - right.stageIndex)
    .map(stage => ({
      id: stage.id,
      stageIndex: stage.stageIndex,
      role: stage.role,
      owner: stage.owner,
      rule: stage.rule,
      slaDays: stage.slaDays,
      escalationTo: stage.escalationTo,
      escalationRule: stage.escalationRule
    }))
});

const loadTemplate = async (id: number) => GovernanceWorkflowTemplateModel.findByPk(id, {
  include: [{ model: GovernanceWorkflowTemplateStageModel, as: 'stages' }]
}) as Promise<(GovernanceWorkflowTemplateModel & { stages?: GovernanceWorkflowTemplateStageModel[] }) | null>;

const replaceTemplateStages = async (templateId: number, stages: NormalizedWorkflowStage[]) => {
  await GovernanceWorkflowTemplateStageModel.destroy({ where: { templateId } });
  await GovernanceWorkflowTemplateStageModel.bulkCreate(stages.map((stage, index) => ({
    templateId,
    stageIndex: index,
    role: stage.role,
    owner: stage.owner || null,
    rule: stage.rule,
    slaDays: stage.slaDays,
    escalationTo: stage.escalationTo || null,
    escalationRule: stage.escalationRule || null
  })));
};

router.use(authenticateToken);

router.get('/', (req: AuthRequest, res) => {
  const folders = getAccessibleFolders(req.user!.role);

  res.json({
    message: 'Governance documents ready',
    role: req.user!.role,
    canEdit: req.user!.role === UserRole.SUPER_ADMIN,
    assignedFolderKey: ROLE_DOCUMENT_FOLDERS[req.user!.role]?.key || null,
    folders: folders.map(folder => ({
      key: folder.key,
      label: folder.label,
      relativePath: folder.relativePath,
      documents: listDocumentsForFolder(folder)
    }))
  });
});

router.get('/documents', (req: AuthRequest, res) => {
  const folders = getAccessibleFolders(req.user!.role);

  res.json({
    role: req.user!.role,
    canEdit: req.user!.role === UserRole.SUPER_ADMIN,
    assignedFolderKey: ROLE_DOCUMENT_FOLDERS[req.user!.role]?.key || null,
    folders: folders.map(folder => ({
      key: folder.key,
      label: folder.label,
      relativePath: folder.relativePath,
      documents: listDocumentsForFolder(folder)
    }))
  });
});

router.get('/overview', (req: AuthRequest, res) => {
  const folders = getAccessibleFolders(req.user!.role);
  const overview = computeGovernanceOverview(folders);

  res.json({
    role: req.user!.role,
    canEdit: req.user!.role === UserRole.SUPER_ADMIN,
    assignedFolderKey: ROLE_DOCUMENT_FOLDERS[req.user!.role]?.key || null,
    ...overview
  });
});

router.get('/history', async (req: AuthRequest, res) => {
  const folders = getAccessibleFolders(req.user!.role);
  const events = await getGovernanceAuditEventsForActor(req.user!);
  res.json(buildGovernanceHistoryFromEvents(events, folders));
});

router.get('/role-traceability', async (req: AuthRequest, res) => {
  res.json({
    role: req.user!.role,
    profiles: await buildRoleTraceability(req.user!)
  });
});

router.get('/workflow-config/options', authorizeRoles(...WORKFLOW_CONFIG_ADMIN_ROLES), (_req: AuthRequest, res) => {
  res.json({
    modules: CONFIGURABLE_WORKFLOW_MODULES,
    rights: ['canView', 'canEdit', 'canApprove', 'canAdmin']
  });
});

router.get('/workflow-templates', authorizeRoles(...WORKFLOW_CONFIG_ADMIN_ROLES), async (_req: AuthRequest, res) => {
  try {
    const templates = await GovernanceWorkflowTemplateModel.findAll({
      include: [{ model: GovernanceWorkflowTemplateStageModel, as: 'stages' }],
      order: [['module', 'ASC'], ['process', 'ASC'], ['updatedAt', 'DESC']]
    }) as Array<GovernanceWorkflowTemplateModel & { stages?: GovernanceWorkflowTemplateStageModel[] }>;

    res.json({ templates: templates.map(serializeTemplate) });
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors du chargement des modeles workflow.', detail: error.message });
  }
});

router.post('/workflow-templates', authorizeRoles(...WORKFLOW_CONFIG_ADMIN_ROLES), async (req: AuthRequest, res) => {
  const module = normalizeWorkflowModule(req.body?.module);
  const title = cleanConfigText(req.body?.title, 255);
  const process = normalizeWorkflowProcess(req.body?.process);
  const stages = normalizeWorkflowStages(req.body?.stages);

  if (!module || !title || stages.length === 0) {
    return res.status(400).json({ message: 'Module, titre et au moins une etape sont obligatoires.' });
  }

  const template = await GovernanceWorkflowTemplateModel.create({
    module,
    process,
    title,
    description: cleanConfigText(req.body?.description, 2000) || null,
    isActive: toBoolean(req.body?.isActive, true),
    version: 1
  });

  await replaceTemplateStages(template.id, stages);

  const created = await loadTemplate(template.id);
  return res.status(201).json({ template: created ? serializeTemplate(created) : null });
});

router.put('/workflow-templates/:id', authorizeRoles(...WORKFLOW_CONFIG_ADMIN_ROLES), async (req: AuthRequest, res) => {
  const templateId = Number(req.params.id);
  const template = await GovernanceWorkflowTemplateModel.findByPk(templateId);
  if (!template) {
    return res.status(404).json({ message: 'Modele workflow introuvable.' });
  }

  const module = normalizeWorkflowModule(req.body?.module);
  const title = cleanConfigText(req.body?.title, 255);
  const process = normalizeWorkflowProcess(req.body?.process);
  const stages = normalizeWorkflowStages(req.body?.stages);

  if (!module || !title || stages.length === 0) {
    return res.status(400).json({ message: 'Module, titre et au moins une etape sont obligatoires.' });
  }

  await template.update({
    module,
    process,
    title,
    description: cleanConfigText(req.body?.description, 2000) || null,
    isActive: toBoolean(req.body?.isActive, true),
    version: template.version + 1
  });

  await replaceTemplateStages(template.id, stages);

  const updated = await loadTemplate(template.id);
  return res.json({ template: updated ? serializeTemplate(updated) : null });
});

router.get('/workflow-access-rules', authorizeRoles(...WORKFLOW_CONFIG_ADMIN_ROLES), async (_req: AuthRequest, res) => {
  try {
    const rules = await GovernanceWorkflowAccessRuleModel.findAll({
      include: [{ model: User, as: 'principalUser', required: false, attributes: ['id', 'nom', 'prenom', 'mail'] }],
      order: [['module', 'ASC'], ['process', 'ASC'], ['principalType', 'ASC']]
    });

    res.json({ rules });
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors du chargement des regles d acces.', detail: error.message });
  }
});

router.put('/workflow-access-rules', authorizeRoles(...WORKFLOW_CONFIG_ADMIN_ROLES), async (req: AuthRequest, res) => {
  const rules = Array.isArray(req.body?.rules) ? req.body.rules : [];
  const validRules = rules
    .map((rule: any) => {
      const module = normalizeWorkflowModule(rule.module);
      const process = normalizeWorkflowProcess(rule.process);
      const principalType = rule.principalType === 'user' ? 'user' : 'role';
      const principalRole = principalType === 'role' ? cleanConfigText(rule.principalRole, 80) : null;
      const rawPrincipalUserId = Number(rule.principalUserId);
      const principalUserIdValue = Number.isInteger(rawPrincipalUserId) && rawPrincipalUserId > 0 ? rawPrincipalUserId : null;

      if (!module || (principalType === 'role' && !principalRole) || (principalType === 'user' && !principalUserIdValue)) {
        return null;
      }

      return {
        module,
        process,
        principalType,
        principalRole,
        principalUserId: principalType === 'user' ? principalUserIdValue : null,
        canView: toBoolean(rule.canView, true),
        canEdit: toBoolean(rule.canEdit),
        canApprove: toBoolean(rule.canApprove),
        canAdmin: toBoolean(rule.canAdmin)
      };
    })
    .filter(Boolean);

  await GovernanceWorkflowAccessRuleModel.destroy({ where: {} });
  if (validRules.length > 0) {
    await GovernanceWorkflowAccessRuleModel.bulkCreate(validRules as any[]);
  }

  const savedRules = await GovernanceWorkflowAccessRuleModel.findAll({
    include: [{ model: User, as: 'principalUser', required: false, attributes: ['id', 'nom', 'prenom', 'mail'] }],
    order: [['module', 'ASC'], ['process', 'ASC'], ['principalType', 'ASC']]
  });
  return res.json({ rules: savedRules });
});

router.put('/approval-workflows/:workflowKey/config', authorizeRoles(...WORKFLOW_CONFIG_ADMIN_ROLES), async (req: AuthRequest, res) => {
  const workflowKey = cleanConfigText(req.params.workflowKey, 120);
  const sourceType = getSingleValue(req.body?.sourceType) as ConfigurableWorkflowSourceType | null;
  const module = sourceTypeToWorkflowModule(sourceType || undefined);
  const sourceId = normalizeWorkflowSourceId(req.body?.sourceId);
  const stages = normalizeWorkflowStages(req.body?.stages);

  if (!workflowKey || !module || !sourceId || stages.length === 0) {
    return res.status(400).json({ message: 'Workflow, module operationnel et etapes sont obligatoires.' });
  }

  const [override] = await GovernanceWorkflowInstanceOverrideModel.findOrCreate({
    where: { workflowKey },
    defaults: {
      workflowKey,
      sourceType: sourceType as ConfigurableWorkflowSourceType,
      sourceId,
      module,
      process: normalizeWorkflowProcess(req.body?.process),
      title: cleanConfigText(req.body?.title, 255) || null,
      description: cleanConfigText(req.body?.description, 2000) || null,
      stagesJson: JSON.stringify(stages),
      updatedById: req.user!.id
    }
  });

  await override.update({
    sourceType: sourceType as ConfigurableWorkflowSourceType,
    sourceId,
    module,
    process: normalizeWorkflowProcess(req.body?.process),
    title: cleanConfigText(req.body?.title, 255) || null,
    description: cleanConfigText(req.body?.description, 2000) || null,
    stagesJson: JSON.stringify(stages),
    updatedById: req.user!.id
  });

  return res.json({ override });
});

router.delete('/approval-workflows/:workflowKey/config', authorizeRoles(...WORKFLOW_CONFIG_ADMIN_ROLES), async (req: AuthRequest, res) => {
  const workflowKey = cleanConfigText(req.params.workflowKey, 120);
  await GovernanceWorkflowInstanceOverrideModel.destroy({ where: { workflowKey } });
  return res.json({ message: 'Surcharge workflow supprimee.' });
});

router.get('/approval-workflows', async (req: AuthRequest, res) => {
  const workflows = await computeOperationalWorkflows(req.user!).catch(() => []);
  res.json({ workflows });
});

router.post('/approval-workflows', async (req: AuthRequest, res) => {
  const folderKey = getSingleValue(req.body?.folderKey);
  const title = getSingleValue(req.body?.title);
  const description = getSingleValue(req.body?.description);

  if (!folderKey || !title) {
    return res.status(400).json({ message: 'Workflow et dossier obligatoires' });
  }

  const folder = getFolderByKey(folderKey);
  if (!folder || !canAccessFolder(req.user!.role, folder.key)) {
    return res.status(403).json({ message: 'Acces refuse a ce dossier' });
  }

  const workflow = await GovernanceApprovalWorkflowModel.create({
    title,
    scope: folder.relativePath,
    folderKey: folder.key,
    folderLabel: folder.label,
    documentName: getSingleValue(req.body?.documentName),
    documentPath: null,
    targetType: getSingleValue(req.body?.targetType) || 'manuel',
    targetId: getSingleValue(req.body?.targetId),
    status: 'submitted',
    priority: getSingleValue(req.body?.priority) || 'Normale',
    requestedById: req.user!.id,
    departmentId: req.user!.departementId || null,
    dueDate: addDays(new Date(), REVIEW_WINDOW_DAYS),
    submittedAt: new Date(),
    currentStageIndex: 0,
    description
  });

  await GovernanceApprovalStageModel.bulkCreate(
    getStageSeed(folder).map(stage => ({
      ...stage,
      workflowId: workflow.id
    }))
  );

  const createdWorkflow = await GovernanceApprovalWorkflowModel.findByPk(workflow.id, {
    include: [{ model: GovernanceApprovalStageModel, as: 'stages' }]
  }) as GovernanceApprovalWorkflowModel & { stages?: GovernanceApprovalStageModel[] };

  return res.status(201).json({ workflow: buildWorkflowPayload(createdWorkflow) });
});

router.post('/approval-workflows/:id/actions', async (req: AuthRequest, res) => {
  const workflowId = Number(req.params.id);
  const action = getSingleValue(req.body?.action);
  const comment = getSingleValue(req.body?.comment);

  if (!workflowId || !action) {
    return res.status(400).json({ message: 'Action workflow invalide' });
  }

  const workflow = await GovernanceApprovalWorkflowModel.findByPk(workflowId, {
    include: [{ model: GovernanceApprovalStageModel, as: 'stages' }]
  }) as GovernanceApprovalWorkflowModel & { stages?: GovernanceApprovalStageModel[] };

  if (!workflow) {
    return res.status(404).json({ message: 'Workflow introuvable' });
  }

  if (!canAccessFolder(req.user!.role, workflow.folderKey)) {
    return res.status(403).json({ message: 'Acces refuse a ce workflow' });
  }

  const stages = (workflow.stages || []).slice().sort((left, right) => left.stageIndex - right.stageIndex);
  const currentStage = stages.find(stage => stage.status === 'current') || stages.find(stage => stage.status === 'todo');

  if (!currentStage && action !== 'restart') {
    return res.status(400).json({ message: 'Aucune etape active' });
  }

  if (action === 'approve' && currentStage) {
    await currentStage.update({
      status: 'done',
      decision: 'Valide',
      actorUserId: req.user!.id,
      comment,
      decidedAt: new Date()
    });

    const nextStage = stages.find(stage => stage.stageIndex === currentStage.stageIndex + 1);
    if (nextStage) {
      await nextStage.update({ status: 'current' });
      await workflow.update({ status: 'in_review', currentStageIndex: nextStage.stageIndex });
    } else {
      await workflow.update({ status: 'approved', completedAt: new Date(), currentStageIndex: currentStage.stageIndex });
    }
  } else if ((action === 'reject' || action === 'request_changes') && currentStage) {
    await currentStage.update({
      status: action === 'reject' ? 'rejected' : 'changes_requested',
      decision: action === 'reject' ? 'Rejete' : 'Correction demandee',
      actorUserId: req.user!.id,
      comment,
      decidedAt: new Date()
    });
    await workflow.update({ status: action === 'reject' ? 'rejected' : 'changes_requested', currentStageIndex: currentStage.stageIndex });
  } else if (action === 'restart') {
    await GovernanceApprovalStageModel.update(
      { status: 'todo', decision: null, actorUserId: null, comment: null, decidedAt: null },
      { where: { workflowId: workflow.id } }
    );
    const firstStage = stages[0];
    if (firstStage) {
      await firstStage.update({ status: 'current' });
    }
    await workflow.update({ status: 'submitted', completedAt: null, currentStageIndex: 0 });
  } else {
    return res.status(400).json({ message: 'Action non supportee' });
  }

  const updatedWorkflow = await GovernanceApprovalWorkflowModel.findByPk(workflow.id, {
    include: [{ model: GovernanceApprovalStageModel, as: 'stages' }]
  }) as GovernanceApprovalWorkflowModel & { stages?: GovernanceApprovalStageModel[] };

  return res.json({ workflow: buildWorkflowPayload(updatedWorkflow) });
});

router.get('/maturity', (req: AuthRequest, res) => {
  const folders = getAccessibleFolders(req.user!.role);
  res.json({ areas: computeGovernanceMaturity(folders) });
});

router.get('/adoption', (req: AuthRequest, res) => {
  const folders = getAccessibleFolders(req.user!.role);
  res.json({ campaigns: computeGovernanceAdoption(folders) });
});

router.get('/documents/file/:folderKey/:fileName', (req: AuthRequest, res) => {
  const folderKey = getSingleValue(req.params.folderKey);
  const fileName = getSingleValue(req.params.fileName);

  if (!folderKey || !fileName) {
    return res.status(400).json({ message: 'Parametres de document invalides' });
  }

  const folder = getFolderByKey(folderKey);

  if (!folder) {
    return res.status(404).json({ message: 'Dossier introuvable' });
  }

  if (!canAccessFolder(req.user!.role, folder.key)) {
    return res.status(403).json({ message: 'Acces refuse a ce dossier' });
  }

  const decodedFileName = decodeURIComponent(fileName);
  const absoluteFilePath = resolveFilePath(folder, decodedFileName);

  if (!absoluteFilePath) {
    return res.status(404).json({ message: 'Document introuvable' });
  }

  const download = req.query.download === '1';

  if (download) {
    return res.download(absoluteFilePath, decodedFileName);
  }

  return res.sendFile(absoluteFilePath);
});

router.post(
  '/documents',
  authorizeRoles(UserRole.SUPER_ADMIN),
  uploadSecureDocument,
  async (req: AuthRequest, res) => {
    const roleKey = getSingleValue(req.body?.roleKey);

    if (!roleKey) {
      return res.status(400).json({ message: 'Dossier cible invalide' });
    }

    const folder = getFolderByKey(roleKey);

    if (!folder) {
      return res.status(400).json({ message: 'Dossier cible invalide' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Aucun document recu' });
    }

    const safeOriginalName = sanitizeFileName(req.file.originalname);
    const storedFileName = `${Date.now()}-${safeOriginalName}`;
    const absoluteFolderPath = ensureFolderExists(folder);
    const absoluteFilePath = path.join(absoluteFolderPath, storedFileName);

    fs.writeFileSync(absoluteFilePath, req.file.buffer);
    const document = buildDocumentPayload(folder, storedFileName);

    try {
      await ensureWorkflowForDocument(folder, document, req.user);
    } catch (_error) {}

    return res.status(201).json({
      message: 'Document ajoute avec succes',
      document
    });
  }
);

router.delete(
  '/documents/:folderKey/:fileName',
  authorizeRoles(UserRole.SUPER_ADMIN),
  (req: AuthRequest, res) => {
    const folderKey = getSingleValue(req.params.folderKey);
    const fileName = getSingleValue(req.params.fileName);

    if (!folderKey || !fileName) {
      return res.status(400).json({ message: 'Parametres de document invalides' });
    }

    const folder = getFolderByKey(folderKey);

    if (!folder) {
      return res.status(404).json({ message: 'Dossier introuvable' });
    }

    const decodedFileName = decodeURIComponent(fileName);
    const absoluteFilePath = resolveFilePath(folder, decodedFileName);

    if (!absoluteFilePath) {
      return res.status(404).json({ message: 'Document introuvable' });
    }

    fs.unlinkSync(absoluteFilePath);

    return res.json({ message: 'Document supprime avec succes' });
  }
);

export default router;
