import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { secureUpload } from '../../middleware/file.middleware';
import { UserRole } from '../users/user.roles';
import { GovernanceAuditEvent, getGovernanceAuditEventsForActor } from './audit-trail.service';
import { GovernanceApprovalWorkflowModel } from './governance-approval-workflow.model';
import { GovernanceApprovalStageModel } from './governance-approval-stage.model';

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

router.get('/approval-workflows', async (req: AuthRequest, res) => {
  const folders = getAccessibleFolders(req.user!.role);
  res.json({ workflows: await computeGovernanceWorkflows(folders) });
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
