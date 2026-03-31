import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { secureUpload } from '../../middleware/file.middleware';
import { UserRole } from '../users/user.roles';

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
  [UserRole.AUDIT_SENIOR]: {
    key: 'audit-senior',
    label: 'Dossier Audit Senior',
    relativePath: 'doc/ressources-par-role/audit-senior'
  },
  [UserRole.AUDITEUR]: {
    key: 'auditeur',
    label: 'Dossier Auditeur',
    relativePath: 'doc/ressources-par-role/auditeur'
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

const buildWorkflowStages = (folder: RoleFolderConfig) => {
  const owner = getFolderOwnerLabel(folder);

  return [
    { role: owner, rule: 'Preparation et depot dans le dossier documentaire.' },
    { role: 'Super Admin', rule: 'Controle de diffusion, cohherence et archivage.' },
    { role: 'Top Management', rule: 'Validation executive pour les documents sensibles.' }
  ];
};

const computeGovernanceWorkflows = (folders: RoleFolderConfig[]) => {
  return listFolderDetails(folders).map(item => {
    const latestUpdate = item.analytics.latestUpdate;
    const hasReviewDebt = item.analytics.staleDocuments > 0;

    return {
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
      stages: buildWorkflowStages(item.folder)
    };
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

router.get('/history', (req: AuthRequest, res) => {
  const folders = getAccessibleFolders(req.user!.role);
  res.json(computeGovernanceHistory(folders));
});

router.get('/approval-workflows', (req: AuthRequest, res) => {
  const folders = getAccessibleFolders(req.user!.role);
  res.json({ workflows: computeGovernanceWorkflows(folders) });
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
  (req: AuthRequest, res) => {
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

    return res.status(201).json({
      message: 'Document ajoute avec succes',
      document: buildDocumentPayload(folder, storedFileName)
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
