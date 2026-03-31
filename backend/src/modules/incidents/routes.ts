import { Router, Response } from 'express';
import path from 'path';
import fs from 'fs';
import * as xlsx from 'xlsx';
import { Incident } from './incident.model';
import { authenticateToken, AuthRequest, authorizeRoles } from '../../middleware/auth.middleware';
import { secureUpload } from '../../middleware/file.middleware';
import { AIService } from '../ai/ai.service';
import { User } from '../users/user.model';
import { UserRole } from '../users/user.roles';
import { Department } from '../departments/department.model';
import { appLogger } from '../../utils/app-logger';

const router = Router();

type IncidentImportSourceType = 'excel' | 'document' | 'image-scan';

/**
 * Middleware d'upload sécurisé pour les pièces jointes des incidents
 */
const uploadSecurePiece = secureUpload(['pdf', 'docx', 'jpg', 'jpeg', 'png', 'xlsx', 'xlsm', 'xls'], 'pieceJointe', 10 * 1024 * 1024);
const uploadIncidentImport = secureUpload(['pdf', 'jpg', 'jpeg', 'png', 'xlsx', 'xlsm', 'xls'], 'sourceFile', 10 * 1024 * 1024);

/**
 * Helper to save buffer to storage
 */
const saveToStorage = (file: Express.Multer.File, subDir: string): string => {
    const fileName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    const fullPath = path.join('src/storage', subDir, fileName);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, file.buffer);
    return fullPath;
};

// Appliquer l'authentification et l'autorisation par défaut à toutes les routes de ce module
router.use(authenticateToken);

const EXCEL_CELL_MAPPING: Record<string, string> = {
    titre: 'B9',
    description: 'B10',
    dateSurvenance: 'B11',
    domaine: 'B13',
    macroProcessus: 'B14',
    processus: 'B15',
    departement: 'B4',
    planActionTraitement: 'B76',
    niveauRisque: 'G66'
};

const normalizeText = (value: any): string | null => {
    if (value === null || value === undefined) return null;
    const text = String(value).trim();
    return text ? text : null;
};

const normalizeComparableText = (value: string): string =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();

const hasEnoughAlphaChars = (value: string | null, min: number): boolean => {
    if (!value) return false;
    return (value.match(/[a-zA-ZÀ-ÿ]/g) || []).length >= min;
};

const sanitizeImportedText = (
    value: any,
    options?: { minAlpha?: number; maxLength?: number; rejectPatterns?: string[] }
): string | null => {
    const text = normalizeText(value);
    if (!text) return null;

    const normalized = normalizeComparableText(text);
    const rejectPatterns = [
        'a definir',
        'a confirmer',
        'n/a',
        'non renseigne',
        'non defini',
        'undefined',
        'null',
        'fiche incident',
        'description de l incident'
    ];

    if (rejectPatterns.some(pattern => normalized === pattern || normalized.includes(pattern))) {
        return null;
    }

    if (options?.rejectPatterns?.some(pattern => normalized.includes(pattern))) {
        return null;
    }

    if (options?.minAlpha && !hasEnoughAlphaChars(text, options.minAlpha)) {
        return null;
    }

    if (options?.maxLength && text.length > options.maxLength) {
        return text.substring(0, options.maxLength).trim();
    }

    return text;
};

const normalizeDate = (value: any): string | null => {
    if (!value) return null;
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value.toISOString().split('T')[0];
    }

    if (typeof value === 'number') {
        const parsed = xlsx.SSF.parse_date_code(value);
        if (parsed) {
            const date = new Date(parsed.y, parsed.m - 1, parsed.d);
            return !Number.isNaN(date.getTime()) ? date.toISOString().split('T')[0] : null;
        }
    }

    const text = String(value).trim();
    if (!text) return null;

    const directDate = new Date(text);
    if (!Number.isNaN(directDate.getTime())) {
        return directDate.toISOString().split('T')[0];
    }

    const frMatch = text.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if (frMatch) {
        const day = parseInt(frMatch[1], 10);
        const month = parseInt(frMatch[2], 10) - 1;
        const year = parseInt(frMatch[3], 10);
        const fullYear = year < 100 ? 2000 + year : year;
        const parsed = new Date(fullYear, month, day);
        return !Number.isNaN(parsed.getTime()) ? parsed.toISOString().split('T')[0] : null;
    }

    return null;
};

const isPlausibleIncidentDate = (value: string | null): boolean => {
    if (!value) return false;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return false;
    const year = date.getUTCFullYear();
    return year >= 2000 && year <= 2100;
};

const mapImportedDomain = (value: string | null): string | null => {
    if (!value) return null;
    const normalized = value.toLowerCase();
    const domainMap = [
        { match: ['it', 'informatique', 'systeme', 'reseau', 'cyber'], value: 'Informatique' },
        { match: ['rh', 'ressources humaines', 'personnel'], value: 'Ressources Humaines' },
        { match: ['operation', 'production', 'exploitation'], value: 'Opérations' },
        { match: ['logistique', 'infrastructure', 'batiment'], value: 'Logistique' },
        { match: ['juridique', 'compliance', 'conformite', 'legal'], value: 'Juridique' },
        { match: ['securite', 'surete', 'physique'], value: 'Sécurité' }
    ];

    const found = domainMap.find(item => item.match.some(token => normalized.includes(token)));
    return found ? found.value : value;
};

const INCIDENT_FORM_NOISE_PATTERNS = [
    'canada conseil groupe',
    'fiche incident',
    'systeme de management des risques',
    'description de l incident',
    'cause de l incident',
    'macro processus',
    'processus principal',
    'intitule du risque',
    'reference autres incidents',
    'consequences financieres',
    'piece jointe',
    'titre de l incident',
    'details de l incident',
    'date de survenance'
];

const countIncidentFormNoise = (text: string): number => {
    const normalized = normalizeComparableText(text);
    return INCIDENT_FORM_NOISE_PATTERNS.filter(pattern => normalized.includes(pattern)).length;
};

const buildImportPreviewText = (text: string, sourceType: IncidentImportSourceType): string | null => {
    if (!text) return null;
    if (sourceType !== 'image-scan') {
        return text.substring(0, 500);
    }

    const values = text
        .split(/[\n|]/)
        .map(item => item.replace(/\s+/g, ' ').trim())
        .filter(Boolean)
        .filter(item => item.length <= 60)
        .filter(item => {
            const normalized = normalizeComparableText(item);
            if (!normalized) return false;
            if (INCIDENT_FORM_NOISE_PATTERNS.some(pattern => normalized.includes(pattern))) return false;
            if (normalized.includes('a definir')) return false;
            if (normalized === 'direction' || normalized === 'departement' || normalized === 'service') return false;
            return /\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}/.test(item)
                || /\b(faible|moyen|eleve|critique|significatif|limite)\b/i.test(normalized)
                || (item.length >= 2 && (item.match(/[a-zA-ZÀ-ÿ]/g) || []).length >= 2);
        })
        .filter((item, index, all) => all.findIndex(existing => normalizeComparableText(existing) === normalizeComparableText(item)) === index)
        .slice(0, 8);

    return values.length ? values.join(' | ') : text.substring(0, 300);
};

const buildStructuredImportPreview = (draft: {
    titre: string | null;
    description: string | null;
    domaine: string | null;
    departement: string | null;
    dateSurvenance: string | null;
    niveauRisque: string | null;
}): string | null => {
    const previewParts = [
        draft.titre ? `Titre: ${draft.titre}` : null,
        draft.description ? `Description: ${draft.description}` : null,
        draft.departement ? `Departement: ${draft.departement}` : null,
        draft.domaine ? `Domaine: ${draft.domaine}` : null,
        draft.niveauRisque ? `Niveau: ${draft.niveauRisque}` : null,
        draft.dateSurvenance ? `Date: ${draft.dateSurvenance}` : null
    ].filter(Boolean);

    return previewParts.length ? previewParts.join(' | ') : null;
};

const extractDateFromRawOcr = (text: string): string | null => {
    const match = text.match(/\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/);
    const normalized = match ? normalizeDate(match[1]) : null;
    return isPlausibleIncidentDate(normalized) ? normalized : null;
};

const extractRiskLevelFromRawOcr = (text: string): string | null => {
    const normalized = normalizeComparableText(text);
    if (/\bfaible\b/.test(normalized)) return 'Faible';
    if (/\bmoyen\b|\bmodere\b/.test(normalized)) return 'Moyen';
    if (/\beleve\b/.test(normalized)) return 'Ã‰levÃ©';
    if (/\bcritique\b/.test(normalized)) return 'Critique';
    if (/\bsignificatif\b/.test(normalized)) return 'Significatif';
    if (/\blimite\b/.test(normalized)) return 'LimitÃ©';
    return null;
};

const extractShortHandwrittenNote = (text: string): string | null => {
    const candidates = text
        .split(/[\n|]/)
        .map(item => item.replace(/\s+/g, ' ').trim())
        .filter(Boolean)
        .filter(item => item.length >= 2 && item.length <= 20)
        .filter(item => (item.match(/[a-zA-ZÀ-ÿ]/g) || []).length >= 2)
        .filter(item => !/\d/.test(item))
        .filter(item => {
            const normalized = normalizeComparableText(item);
            return !INCIDENT_FORM_NOISE_PATTERNS.some(pattern => normalized.includes(pattern))
                && normalized !== 'direction'
                && normalized !== 'departement'
                && normalized !== 'service'
                && normalized !== 'cree par'
                && normalized !== 'valide par'
                && normalized !== 'clos par'
                && normalized !== 'a definir';
        });

    const preferred = candidates.find(item => !['roro', 'testa', 'idea'].includes(normalizeComparableText(item)));
    return preferred || candidates[0] || null;
};

const normalizeImportedRiskLevel = (value: any): string | null => {
    const text = sanitizeImportedText(value, { minAlpha: 3, maxLength: 30 });
    if (!text) return null;

    const normalized = normalizeComparableText(text);
    if (normalized.includes('critique')) return 'Critique';
    if (normalized.includes('significatif')) return 'Significatif';
    if (normalized.includes('eleve')) return 'Élevé';
    if (normalized.includes('modere') || normalized.includes('moyen')) return 'Moyen';
    if (normalized.includes('limite')) return 'Limité';
    if (normalized.includes('faible')) return 'Faible';
    return null;
};

const sanitizeImportedDraft = (
    importedDraft: any,
    extension: string,
    extractedText: string
) : {
    draft: {
        titre: string | null;
        description: string | null;
        domaine: string | null;
        departement: string | null;
        dateSurvenance: string | null;
        macroProcessus: string | null;
        processus: string | null;
        planActionTraitement: string | null;
        niveauRisque: string | null;
    };
    sourceType: IncidentImportSourceType;
    importReliability: 'high' | 'medium' | 'low';
    warnings: string[];
} => {
    const warnings: string[] = [];
    const sourceType: IncidentImportSourceType = ['xlsx', 'xlsm', 'xls'].includes(extension)
        ? 'excel'
        : ['jpg', 'jpeg', 'png'].includes(extension)
            ? 'image-scan'
            : 'document';

    if (sourceType === 'image-scan') {
        warnings.push('Scan manuscrit détecté: seuls les champs suffisamment lisibles ont été préremplis.');
    }

    if (sourceType === 'document' && extension === 'pdf' && extractedText.trim().length < 80) {
        warnings.push('Pour une fiche manuscrite, importez de préférence une image JPG ou PNG nette plutôt qu un PDF.');
    }

    const noiseScore = countIncidentFormNoise(extractedText);

    if (sourceType === 'image-scan' && noiseScore >= 3) {
        warnings.push('Le formulaire imprime domine encore l OCR. Les champs manuscrits ambigus ont ete ignores.');
    }

    let titre = sanitizeImportedText(importedDraft.titre, {
        minAlpha: 4,
        maxLength: 120,
        rejectPatterns: ['libelle', 'titre']
    });
    let description = sanitizeImportedText(importedDraft.description, {
        minAlpha: 8,
        maxLength: 1500,
        rejectPatterns: ['description']
    });
    let domaine = mapImportedDomain(sanitizeImportedText(importedDraft.domaine, { minAlpha: 4, maxLength: 80 }));
    const departement = sanitizeImportedText(importedDraft.departement, {
        minAlpha: 2,
        maxLength: 120,
        rejectPatterns: ['departement']
    });
    const macroProcessus = sanitizeImportedText(importedDraft.macroProcessus, { minAlpha: 3, maxLength: 160 });
    const processus = sanitizeImportedText(importedDraft.processus, { minAlpha: 3, maxLength: 160 });
    const planActionTraitement = sanitizeImportedText(importedDraft.planActionTraitement, { minAlpha: 6, maxLength: 1000 });
    let niveauRisque = normalizeImportedRiskLevel(importedDraft.niveauRisque);
    let dateSurvenance = normalizeDate(importedDraft.dateSurvenance);

    if (sourceType === 'image-scan') {
        if (!isPlausibleIncidentDate(dateSurvenance)) {
            dateSurvenance = null;
        }

        if (!niveauRisque) {
            niveauRisque = extractRiskLevelFromRawOcr(extractedText);
        }

        if (!dateSurvenance) {
            dateSurvenance = extractDateFromRawOcr(extractedText);
        }

        if (!titre) {
            const shortNote = extractShortHandwrittenNote(extractedText);
            if (shortNote) {
                titre = shortNote;
            }
        }

        if (!description && titre) {
            description = titre;
        }

        if (titre && titre.length < 4) {
            titre = null;
        }

        if (description && description.length < 4) {
            description = null;
        }

        domaine = null;
    }

    if (sourceType === 'image-scan' && noiseScore >= 3) {
        const normalizedTitle = titre ? normalizeComparableText(titre) : '';
        const normalizedDescription = description ? normalizeComparableText(description) : '';

        if (titre && (titre.split(/\s+/).length > 4 || INCIDENT_FORM_NOISE_PATTERNS.some(pattern => normalizedTitle.includes(pattern)))) {
            titre = null;
        }

        if (description && (description.split(/\s+/).length > 10 || INCIDENT_FORM_NOISE_PATTERNS.some(pattern => normalizedDescription.includes(pattern)))) {
            description = null;
        }

        domaine = null;
    }

    const populatedFieldCount = [
        titre,
        description,
        domaine,
        departement,
        macroProcessus,
        processus,
        planActionTraitement,
        niveauRisque,
        dateSurvenance
    ].filter(Boolean).length;

    let importReliability: 'high' | 'medium' | 'low' = 'medium';
    if (sourceType === 'excel') {
        importReliability = 'high';
    } else if (sourceType === 'image-scan' || populatedFieldCount <= 2 || extractedText.trim().length < 80 || noiseScore >= 3) {
        importReliability = 'low';
    }

    if (importReliability !== 'high') {
        warnings.push('Vérifiez les champs proposés avant validation.');
    }

    return {
        draft: {
            titre,
            description,
            domaine,
            departement,
            dateSurvenance,
            macroProcessus,
            processus,
            planActionTraitement,
            niveauRisque
        },
        sourceType,
        importReliability,
        warnings
    };
};

const extractExcelIncidentDraft = (fileBuffer: Buffer) => {
    const workbook = xlsx.read(fileBuffer, { type: 'buffer', cellDates: true });
    const sheet = workbook.Sheets['Incident1'] || workbook.Sheets[workbook.SheetNames[0]];
    if (!sheet) {
        throw new Error('Aucune feuille exploitable trouvee dans le fichier Excel.');
    }

    const getCellValue = (cellRef: string) => sheet[cellRef]?.v;

    let niveauRisque = normalizeText(getCellValue(EXCEL_CELL_MAPPING.niveauRisque));
    if (niveauRisque === 'X') {
        niveauRisque = 'Eleve';
    }

    const draft = {
        titre: normalizeText(getCellValue(EXCEL_CELL_MAPPING.titre)),
        description: normalizeText(getCellValue(EXCEL_CELL_MAPPING.description)),
        dateSurvenance: normalizeDate(getCellValue(EXCEL_CELL_MAPPING.dateSurvenance)),
        domaine: mapImportedDomain(normalizeText(getCellValue(EXCEL_CELL_MAPPING.domaine))),
        macroProcessus: normalizeText(getCellValue(EXCEL_CELL_MAPPING.macroProcessus)),
        processus: normalizeText(getCellValue(EXCEL_CELL_MAPPING.processus)),
        departement: normalizeText(getCellValue(EXCEL_CELL_MAPPING.departement)),
        planActionTraitement: normalizeText(getCellValue(EXCEL_CELL_MAPPING.planActionTraitement)),
        niveauRisque
    };

    const sheetText = xlsx.utils.sheet_to_json(sheet, { header: 1, raw: false })
        .flat()
        .map(value => normalizeText(value))
        .filter(Boolean)
        .join(' ');

    return { draft, sheetText };
};

const resolveDepartementId = async (departementName: string | null): Promise<number | null> => {
    if (!departementName) return null;
    const normalized = departementName.trim().toLowerCase();
    const items = await Department.findAll();
    const exactMatch = items.find(item => item.nom.trim().toLowerCase() === normalized);
    if (exactMatch) return exactMatch.id;

    const partialMatch = items.find(item =>
        item.nom.trim().toLowerCase().includes(normalized) || normalized.includes(item.nom.trim().toLowerCase())
    );
    return partialMatch ? partialMatch.id : null;
};

router.post('/import-draft', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR), uploadIncidentImport, async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Fichier requis pour l import.' });
        }

        const extension = path.extname(req.file.originalname).toLowerCase().substring(1);
        let importedDraft: any = {};
        let extractedText = '';

        if (['xlsx', 'xlsm', 'xls'].includes(extension)) {
            const { draft, sheetText } = extractExcelIncidentDraft(req.file.buffer);
            importedDraft = draft;
            extractedText = sheetText;

            if (!draft.titre || !draft.description) {
                const aiDraft = await AIService.generateIncidentDraftFromText(sheetText, req.user!.role);
                importedDraft = {
                    ...aiDraft,
                    ...draft,
                    titre: draft.titre || aiDraft.titre,
                    description: draft.description || aiDraft.description
                };
            }
        } else {
            extractedText = await AIService.extractTextFromFile(req.file);
            importedDraft = await AIService.generateIncidentDraftFromText(extractedText, req.user!.role);
        }

        const sanitizedImport = sanitizeImportedDraft(importedDraft, extension, extractedText);
        const departementNom = normalizeText(sanitizedImport.draft.departement);
        const departementId = await resolveDepartementId(departementNom);

        res.json({
            titre: sanitizedImport.draft.titre,
            description: sanitizedImport.draft.description,
            domaine: sanitizedImport.draft.domaine,
            departementId,
            departementNom,
            dateSurvenance: sanitizedImport.draft.dateSurvenance,
            macroProcessus: sanitizedImport.draft.macroProcessus,
            processus: sanitizedImport.draft.processus,
            planActionTraitement: sanitizedImport.draft.planActionTraitement,
            niveauRisque: sanitizedImport.draft.niveauRisque,
            extractedTextPreview: sanitizedImport.sourceType === 'image-scan'
                ? (buildStructuredImportPreview(sanitizedImport.draft) || buildImportPreviewText(extractedText, sanitizedImport.sourceType))
                : buildImportPreviewText(extractedText, sanitizedImport.sourceType),
            sourceType: sanitizedImport.sourceType,
            importReliability: sanitizedImport.importReliability,
            warnings: sanitizedImport.warnings
        });
    } catch (error: any) {
        appLogger.error('Incidents', 'Incident import draft failed', error);
        res.status(400).json({
            message: 'Impossible d importer le fichier pour preparer l incident.',
            error: error.message
        });
    }
});

/**
 * CRÉER UN INCIDENT
 */
router.post('/', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR), uploadSecurePiece, async (req: AuthRequest, res: Response) => {
    try {
        const cleanedBody = { ...req.body };
        for (const key in cleanedBody) {
            if (cleanedBody[key] === '' || cleanedBody[key] === 'null' || cleanedBody[key] === 'undefined') {
                cleanedBody[key] = null;
            }
        }

        const incidentData = {
            ...cleanedBody,
            userId: req.user!.id,
            pieceJointe: req.file ? saveToStorage(req.file, 'incidents') : null,
            dateSurvenance: cleanedBody.dateSurvenance || new Date()
        };

        const incident = await Incident.create(incidentData);
        res.status(201).json(incident);
    } catch (error: any) {
        appLogger.error('Incidents', 'Incident creation failed', error);
        res.status(400).json({
            message: 'Erreur lors de la création de l\'incident',
            error: error.message,
            validationErrors: error.errors ? error.errors.map((e: any) => e.message) : undefined
        });
    }
});

/**
 * RÉCUPÉRER TOUS LES INCIDENTS
 */
router.get('/', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT), async (req: AuthRequest, res: Response) => {
    try {
        // Optionnellement: restriction par rôle, mais ici on expose tout pour l'historique
        const incidents = await Incident.findAll({
            include: [{ model: User, as: 'declareur', attributes: ['id', 'nom', 'prenom', 'mail'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(incidents);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la récupération des incidents', error: error.message });
    }
});

/**
 * GÉNÉRER DES RISQUES PAR IA À PARTIR D'UN INCIDENT
 */
router.post('/:id/generate-risks', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR), async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const incident = await Incident.findByPk(parseInt(id, 10));

        if (!incident) {
            return res.status(404).json({ message: 'Incident non trouvé' });
        }

        let pieceJointeTexte = '';

        // Si une pièce jointe existe, on extrait son texte
        if (incident.pieceJointe) {
            try {
                // On recrée un objet type Express.Multer.File pour réutiliser l'extracteur
                const fileBuffer = fs.readFileSync(path.resolve(incident.pieceJointe));
                const originalname = path.basename(incident.pieceJointe);
                
                const dummyFile: Express.Multer.File = {
                    buffer: fileBuffer,
                    originalname: originalname,
                    fieldname: 'pieceJointe',
                    encoding: '7bit',
                    mimetype: 'application/octet-stream', // Approximatif
                    size: fileBuffer.length,
                    destination: '',
                    filename: originalname,
                    path: incident.pieceJointe,
                    stream: null as any
                };

                pieceJointeTexte = await AIService.extractTextFromFile(dummyFile);
            } catch (fileErr) {
                appLogger.warn('Incidents', 'Attachment text extraction failed for incident risk generation', {
                    incidentId: id,
                    error: fileErr,
                });
            }
        }

        // Appel au service IA pour une analyse intelligente prenant en compte le nouvel incident et l'historique
        const risks = await AIService.generateRisksFromIncident(incident, pieceJointeTexte, req.user!.role);
        
        // On retourne la prévisualisation au frontend (non inséré en base pour laisser la validation humaine)
        res.json(risks);

    } catch (error: any) {
        appLogger.error('Incidents', 'Incident risk generation failed', error);
        res.status(500).json({ message: 'Erreur lors de la génération des risques', error: error.message });
    }
});

/**
 * METTRE À JOUR UN INCIDENT (ÉDITER)
 */
router.put('/:id', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR), async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const incident = await Incident.findByPk(parseInt(id, 10));

        if (!incident) {
            return res.status(404).json({ message: 'Incident non trouvé' });
        }

        const cleanedBody = { ...req.body };
        for (const key in cleanedBody) {
            if (cleanedBody[key] === '' || cleanedBody[key] === 'null' || cleanedBody[key] === 'undefined') {
                cleanedBody[key] = null;
            }
        }

        await incident.update(cleanedBody);
        
        // Récupérer l'incident mis à jour avec les associations pour le renvoyer
        const updatedIncident = await Incident.findByPk(parseInt(id, 10), {
            include: [{ model: User, as: 'declareur', attributes: ['id', 'nom', 'prenom', 'mail'] }]
        });

        res.json(updatedIncident);
    } catch (error: any) {
        appLogger.error('Incidents', 'Incident update failed', error);
        res.status(400).json({
            message: 'Erreur lors de la mise à jour de l\'incident',
            error: error.message
        });
    }
});

export default router;
