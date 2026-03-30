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

const buildDocumentPayload = (folder: RoleFolderConfig, fileName: string) => {
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
