/**
 * @file routes.ts
 * @description Définition des points de terminaison (endpoints) pour la gestion des risques.
 * Gère la création, l'assignation, le suivi du statut et les commentaires.
 */

import { Router } from 'express';
import { Op } from 'sequelize';
import multer from 'multer';
import path from 'path';
import { Risk, RiskLevel, RiskStatus } from './risk.model';
import { Comment } from './comment.model';
import { User } from '../users/user.model';
import { Department } from '../departments/department.model';
import { Incident, IncidentStatus } from '../incidents/incident.model';
import { Organigramme } from '../organigramme/organigramme.model';
import { authenticateToken, authorizeRoles, AuthRequest } from '../../middleware/auth.middleware';
import { UserRole } from '../users/user.roles';
import { emailService } from '../../utils/email.service';
import { Notification, NotificationType } from '../notifications/notification.model';
import { AIService } from '../ai/ai.service';
// @ts-ignore
import XlsxPopulate from 'xlsx-populate';
import fs from 'fs';
import { getRestoreValues, getSoftDeleteValues, restoreSoftDeletedInstance, softDeleteInstance } from '../../utils/soft-delete';
import { appLogger } from '../../utils/app-logger';
import { LookupResolutionService } from '../../database/lookups/lookup.service';

const router = Router();

import { secureUpload } from '../../middleware/file.middleware';

/**
 * Middleware d'upload sécurisé pour les pièces justificatives
 */
const uploadSecurePiece = secureUpload(['pdf', 'jpg', 'jpeg', 'png'], 'pieceJustificative', 5 * 1024 * 1024);

/**
 * Middleware d'upload sécurisé pour les commentaires (pièces jointes)
 */
const uploadSecureComment = secureUpload(['pdf', 'jpg', 'jpeg', 'png'], 'pieceJointe', 5 * 1024 * 1024);

const resolveRiskPayload = (payload: Record<string, unknown>) =>
    LookupResolutionService.resolveEntityPayload('risk', payload);

const createNotification = async (payload: Record<string, unknown>) =>
    Notification.create(await LookupResolutionService.resolveEntityPayload('notification', payload));

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

const riskListIncludes = [
    { model: User, as: 'riskManager', required: false },
    { model: User, as: 'riskAgent', required: false },
    { model: Organigramme, as: 'responsableTraitement', required: false },
    { model: Department, as: 'departement', required: false },
];

const sortRisksForDisplay = (risks: Risk[]) =>
    [...risks].sort((first, second) => {
        const assignmentDelta = Number(Boolean(first.riskAgentId)) - Number(Boolean(second.riskAgentId));
        if (assignmentDelta !== 0) {
            return assignmentDelta;
        }

        return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime();
    });

// Appliquer l'authentification à toutes les routes de ce module
router.use(authenticateToken);

/**
 * --- ROUTES DE GESTION DES RISQUES ---
 */

/**
 * CRÉER UN RISQUE
 * Accessible par : Risk Manager, Super Admin
 */
router.post('/', authorizeRoles(UserRole.RISK_MANAGER, UserRole.SUPER_ADMIN), uploadSecurePiece, async (req: AuthRequest, res) => {
    try {
        // Nettoyage des données : conversion des chaînes vides en null
        const cleanedBody = { ...req.body };
        for (const key in cleanedBody) {
            if (cleanedBody[key] === '' || cleanedBody[key] === 'null' || cleanedBody[key] === 'undefined') {
                cleanedBody[key] = null;
            }
        }

        const riskData = {
            ...cleanedBody,
            riskManagerId: req.user!.id,
            pieceJustificative: req.file ? saveToStorage(req.file, 'risks') : null,
            statut: RiskStatus.OPEN,
            is_deleted: false,
            deleted_at: null,
        };

        const risk = await Risk.create(await resolveRiskPayload(riskData));
        res.status(201).json(risk);
    } catch (error: any) {
        appLogger.error('Risks', 'Risk creation failed', error);
        res.status(400).json({
            message: 'Erreur lors de la création du risque',
            error: error.message,
            validationErrors: error.errors ? error.errors.map((e: any) => e.message) : undefined
        });
    }
});

/**
 * RÉCUPÉRER TOUS LES RISQUES
 * Filtre les résultats en fonction du rôle de l'utilisateur.
 */
router.get('/', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.TOP_MANAGEMENT, UserRole.AUDIT_SENIOR, UserRole.RISK_MANAGER, UserRole.RISK_AGENT), async (req: AuthRequest, res) => {
    try {
        const { role, id } = req.user!;
        let risks;

        // Logique de filtrage par rôle
        if (role === UserRole.SUPER_ADMIN || role === UserRole.TOP_MANAGEMENT || role === UserRole.AUDIT_SENIOR) {
            // Accès total
            risks = await Risk.findAll({ include: riskListIncludes as any });
        } else if (role === UserRole.RISK_MANAGER) {
            // Risques créés par lui ou dont il est responsable
            risks = await Risk.findAll({
                where: { riskManagerId: id },
                include: riskListIncludes as any
            });
        } else if (role === UserRole.RISK_AGENT) {
            // Risques qui lui sont assignés pour traitement
            risks = await Risk.findAll({
                where: { riskAgentId: id },
                include: riskListIncludes as any
            });
        } else {
            // Autres rôles (ex: Responsable de département)
            risks = await Risk.findAll({
                where: { riskManagerId: id },
                include: riskListIncludes as any
            });
        }
        res.json(sortRisksForDisplay(risks));
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la récupération des risques', error: error.message });
    }
});

/**
 * ASSIGNER UN RISQUE À UN AGENT
 */
router.put('/:id/assign', authorizeRoles(UserRole.RISK_MANAGER, UserRole.SUPER_ADMIN), async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { riskAgentId } = req.body;

        const risk = await Risk.findByPk(parseInt(id as string));
        if (!risk) return res.status(404).json({ message: 'Risque non trouvé' });

        await risk.update(await resolveRiskPayload({
            riskAgentId: parseInt(riskAgentId as string),
            statut: RiskStatus.IN_PROGRESS
        }));

        // Notifications en arrière-plan (non-bloquant)
        (async () => {
            try {
                const agent = await User.findByPk(parseInt(riskAgentId as string));
                if (agent) {
                    // Envoi d'email
                    await emailService.sendRiskAssignedEmail(
                        { mail: agent.mail, nom: agent.nom, prenom: agent.prenom },
                        { titre: risk.titre, id: risk.id }
                    ).catch((emailError) => {
                        appLogger.error('Risks', 'Risk assignment email failed', emailError);
                    });

                    // Création de notification in-app
                    await createNotification({
                        userId: agent.id,
                        type: NotificationType.RISK_ASSIGNED,
                        content: `Un nouveau risque vous a été assigné : ${risk.titre}`,
                        riskId: risk.id
                    });
                }
            } catch (err) {
                appLogger.error('Risks', 'Risk assignment notification failed', err);
            }
        })();

        res.json(risk);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l\'assignation du risque', error: error.message });
    }
});

/**
 * METTRE À JOUR LES DÉTAILS D'UN RISQUE
 */
router.put('/:id', uploadSecurePiece, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        const { role } = req.user!;

        // Seuls le Risk Manager et le Super Admin peuvent modifier les détails
        if (role !== UserRole.RISK_MANAGER && role !== UserRole.SUPER_ADMIN) {
            return res.status(403).json({ message: 'Permissions insuffisantes' });
        }

        const risk = await Risk.findByPk(parseInt(id as string));
        if (!risk) return res.status(404).json({ message: 'Risque non trouvé' });

        if (req.file) {
            updateData.pieceJustificative = saveToStorage(req.file, 'risks');
        }

        await risk.update(await resolveRiskPayload(updateData));
        res.json(risk);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du risque', error: error.message });
    }
});

/**
 * METTRE À JOUR LE STATUT DU RISQUE
 */
router.put('/:id/status', async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;
        const { id: userId, role } = req.user!;

        const risk = await Risk.findByPk(parseInt(id as string));
        if (!risk) return res.status(404).json({ message: 'Risque non trouvé' });

        // Vérification des permissions (RBAC)
        if (role !== UserRole.SUPER_ADMIN && role !== UserRole.RISK_MANAGER && risk.riskAgentId !== userId) {
            return res.status(403).json({ message: 'Permissions insuffisantes' });
        }

        const requestedStatus = LookupResolutionService.getStaticValue('risk.statut', statut);
        if (!requestedStatus) {
            return res.status(400).json({ message: 'Le statut selectionne est invalide.' });
        }

        // Restriction : Seuls le Manager/Admin peuvent clôturer
        if (requestedStatus.code === RiskStatus.CLOSED && role !== UserRole.RISK_MANAGER && role !== UserRole.SUPER_ADMIN) {
            return res.status(403).json({ message: 'Seul le manager peut clôturer un risque' });
        }

        const oldStatut = risk.statut;
        const newStatut = requestedStatus.code as RiskStatus;
        const newStatutLabel = requestedStatus.label;
        await risk.update(await resolveRiskPayload({ statut: newStatut }));

        // Respond immediately
        res.json(risk);

        // Fire-and-forget: send notifications in background
        (async () => {
            try {
                if (newStatut === RiskStatus.TREATED) {
                    const manager = await User.findByPk(risk.riskManagerId);
                    if (manager) {
                        emailService.sendRiskStatusUpdateEmail(
                            { mail: manager.mail, nom: manager.nom, prenom: manager.prenom },
                            { titre: risk.titre, statut: newStatutLabel }
                        ).catch(e => appLogger.error('Risks', 'Risk status email failed', e));
                        await createNotification({
                            userId: manager.id,
                            type: NotificationType.STATUS_CHANGED,
                            content: `Le statut du risque "${risk.titre}" a été mis à jour par l'agent : ${newStatutLabel}`,
                            riskId: risk.id
                        });
                    }
                } else if (newStatut === RiskStatus.CLOSED) {
                    const agent = await User.findByPk(risk.riskAgentId!);
                    if (agent) {
                        emailService.sendRiskClosedEmail(
                            { mail: agent.mail, nom: agent.nom, prenom: agent.prenom },
                            { titre: risk.titre }
                        ).catch(e => appLogger.error('Risks', 'Risk closed email failed', e));
                        await createNotification({
                            userId: agent.id,
                            type: NotificationType.STATUS_CHANGED,
                            content: `Le risque "${risk.titre}" a été clôturé par le manager.`,
                            riskId: risk.id
                        });
                    }
                } else if (newStatut === RiskStatus.IN_PROGRESS && oldStatut === RiskStatus.TREATED && role === UserRole.RISK_MANAGER) {
                    const agent = await User.findByPk(risk.riskAgentId!);
                    if (agent) {
                        await createNotification({
                            userId: agent.id,
                            type: NotificationType.STATUS_CHANGED,
                            content: `Le risque "${risk.titre}" a été remis en cours de traitement par le manager car il n'a pas été traité correctement.`,
                            riskId: risk.id
                        });
                    }
                }
            } catch (err) {
                appLogger.error('Risks', 'Background notification failed', err);
            }
        })();
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du statut', error: error.message });
    }
});

/**
 * ÉVALUATION DES RISQUES PAR IA
 */
router.post('/evaluate', authorizeRoles(UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN, UserRole.TOP_MANAGEMENT, UserRole.RISK_MANAGER, UserRole.RISK_AGENT), async (req: AuthRequest, res) => {
    try {
        const { riskIds } = req.body;
        appLogger.info('Risks', 'Strategic AI evaluation request received', {
            userId: req.user!.id,
            role: req.user!.role,
            requestedRiskCount: Array.isArray(riskIds) ? riskIds.length : 0,
        });
        const risks = await Risk.findAll({ where: { id: riskIds } });
        const evaluation = await AIService.evaluateRisks(risks, req.user!.role);

        // Persist AI evaluation results to the database
        for (const result of evaluation) {
            await Risk.update({
                aiAnalysisScore: result.priorite,
                aiAnalysisImpact: result.impact,
                aiAnalysisTendance: result.tendance,
                aiAnalysisSuggestion: result.suggestion,
                aiAnalysisDate: new Date()
            }, {
                where: { id: result.riskId }
            });
        }

        appLogger.info('Risks', 'Strategic AI evaluation results persisted', {
            userId: req.user!.id,
            evaluatedRiskCount: risks.length,
            persistedResultCount: evaluation.length,
        });
        res.json(evaluation);
    } catch (error: any) {
        appLogger.error('Risks', 'Strategic AI evaluation request failed', error);
        res.status(500).json({ message: 'Erreur lors de l\'évaluation des risques', error: error.message });
    }
});

/**
 * AJOUTER UN COMMENTAIRE OU UNE PREUVE
 */
router.post('/:id/comments', uploadSecureComment, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const { id: userId } = req.user!;

        const comment = await Comment.create({
            content,
            riskId: parseInt(id as string),
            userId,
            pieceJointe: req.file ? saveToStorage(req.file, 'comments') : null
        });

        // Notifier l'autre partie (Agent <=> Manager)
        const risk = await Risk.findByPk(parseInt(id as string));
        if (risk) {
            const recipientId = userId === risk.riskManagerId ? risk.riskAgentId : risk.riskManagerId;
            if (recipientId) {
                await createNotification({
                    userId: recipientId,
                    type: NotificationType.COMMENT_ADDED,
                    content: `Un nouveau commentaire a ete ajoute au risque : ${risk.titre}`,
                    riskId: risk.id
                });
            }
        }

        res.status(201).json(comment);
    } catch (error: any) {
        res.status(400).json({ message: 'Erreur lors de l\'ajout du commentaire', error: error.message });
    }
});

/**
 * RÉCUPÉRER TOUS LES COMMENTAIRES D'UN RISQUE
 */
router.get('/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const risk = await Risk.findByPk(parseInt(id as string));
        if (!risk) {
            return res.status(404).json({ message: 'Risque non trouvé' });
        }

        const comments = await Comment.findAll({
            where: { riskId: id },
            include: ['user'],
            order: [['createdAt', 'ASC']]
        });
        res.json(comments);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commentaires', error: error.message });
    }
});

/**
 * SUPPRIMER UN RISQUE
 * Accessible par : Risk Manager, Super Admin
 */
router.delete('/:id', authorizeRoles(UserRole.RISK_MANAGER, UserRole.SUPER_ADMIN), async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const risk = await Risk.findByPk(parseInt(id as string));

        if (!risk) {
            return res.status(404).json({ message: 'Risque non trouvé' });
        }

        await softDeleteInstance(risk);
        await Comment.update(getSoftDeleteValues(), {
            where: {
                riskId: risk.id,
                is_deleted: false
            }
        });
        res.status(204).send();
    } catch (error: any) {
        appLogger.error('Risks', 'Risk deletion failed', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du risque', error: error.message });
    }
});

router.patch('/:id/restore', authorizeRoles(UserRole.RISK_MANAGER, UserRole.SUPER_ADMIN), async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const risk = await Risk.scope('withDeleted').findByPk(parseInt(id as string));

        if (!risk || !risk.is_deleted) {
            return res.status(404).json({ message: 'Risque non trouvé' });
        }

        await restoreSoftDeletedInstance(risk);
        await Comment.scope('withDeleted').update(getRestoreValues(), {
            where: {
                riskId: risk.id,
                is_deleted: true
            }
        });

        const restoredRisk = await Risk.findByPk(risk.id, {
            include: ['riskAgent', 'responsableTraitement', 'departement']
        });

        res.json(restoredRisk);
    } catch (error: any) {
        appLogger.error('Risks', 'Risk restore failed', error);
        res.status(500).json({ message: 'Erreur lors de la restauration du risque', error: error.message });
    }
});

/**
 * ENVOYER UNE NOTIFICATION EMAIL D'ALERTE POUR UN RISQUE
 */
router.post('/:id/notify', authorizeRoles(UserRole.RISK_MANAGER, UserRole.SUPER_ADMIN, UserRole.TOP_MANAGEMENT, UserRole.AUDIT_SENIOR, UserRole.RISK_AGENT), async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const risk = await Risk.findByPk(parseInt(id as string));
        if (!risk) return res.status(404).json({ message: 'Risque non trouvé' });

        // Respond immediately, send emails in background
        res.json({ message: 'Notifications en cours d\'envoi...', sentCount: 0, totalRecipients: 0 });

        // Fire-and-forget: send emails in background
        (async () => {
            try {
                const recipients: { mail: string; nom: string; prenom: string }[] = [];

                if (risk.riskAgentId) {
                    const agent = await User.findByPk(risk.riskAgentId);
                    if (agent) recipients.push({ mail: agent.mail, nom: agent.nom, prenom: agent.prenom });
                }
                if (risk.responsableTraitementId && risk.responsableTraitementId !== risk.riskAgentId) {
                    const responsable = await User.findByPk(risk.responsableTraitementId);
                    if (responsable) recipients.push({ mail: responsable.mail, nom: responsable.nom, prenom: responsable.prenom });
                }
                if (risk.riskManagerId && risk.riskManagerId !== req.user!.id) {
                    const manager = await User.findByPk(risk.riskManagerId);
                    if (manager) recipients.push({ mail: manager.mail, nom: manager.nom, prenom: manager.prenom });
                }

                for (const recipient of recipients) {
                    await emailService.sendRiskStatusUpdateEmail(
                        recipient,
                        {
                            titre: risk.titre,
                            statut: `ALERTE - Risque ${(risk as any).niveauRisqueLabel || risk.niveauRisque}: ${(risk as any).statutLabel || risk.statut}`
                        }
                    );
                    const user = await User.findOne({ where: { mail: recipient.mail } });
                    if (user) {
                        await createNotification({
                            userId: user.id,
                            type: NotificationType.STATUS_CHANGED,
                            content: `Alerte envoyee pour le risque "${risk.titre}"`,
                            riskId: risk.id
                        });
                    }
                }
                appLogger.info('Risks', 'Risk notifications sent', { riskId: risk.id });
            } catch (err) {
                appLogger.error('Risks', 'Background risk notification sending failed', err);
            }
        })();
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de l\'envoi de la notification', error: error.message });
    }
});

/**
 * EXPORTER UN RISQUE VERS LE TEMPLATE FICHE INCIDENT
 */
router.get('/:id/export-incident', async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const risk = await Risk.findByPk(parseInt(id as string), {
            include: ['riskManager', 'riskAgent', 'responsableTraitement', 'departement']
        });

        if (!risk) {
            return res.status(404).json({ message: 'Risque non trouvé' });
        }

        const templatePath = path.resolve(__dirname, '../../../assets/templates/Fiche_incident.xlsm');

        if (!fs.existsSync(templatePath)) {
            return res.status(404).json({ message: 'Template non trouvé sur le serveur' });
        }

        // Chargement du template
        const workbook = await XlsxPopulate.fromFileAsync(templatePath);
        const sheet = workbook.sheet("Incident1");

        if (!sheet) {
            return res.status(500).json({ message: 'Feuille "Incident1" non trouvée dans le template' });
        }

        // Population des champs (basé sur l'analyse visuelle et structurelle)

        // N° Incident (E2)
        sheet.cell("E2").value(risk.id);

        // --- SECTION 1: IDENTIFICATION ---
        // Top Left
        sheet.cell("B3").value("Direction Générale"); // *Direction
        if (risk.departement) {
            sheet.cell("B4").value(risk.departement.nom); // *Département
        }
        sheet.cell("B5").value("Audit des risques"); // Service (Approx based on user feedback)

        // Top Right / Status & Actors
        // C3: *Statut :, C4: *Créé par :, C5: *Créé le :
        // E4: *Validé par :, E5: *Validé le :
        // G4: Clos par :, G5: Clos le :

        sheet.cell("D3").value((risk as any).statutLabel || risk.statut); // Statut

        if (risk.riskManager) {
            sheet.cell("D4").value(`${risk.riskManager.prenom} ${risk.riskManager.nom}`); // Créé par
        }
        if (risk.riskAgent) {
            sheet.cell("F4").value(`${risk.riskAgent.prenom} ${risk.riskAgent.nom}`); // Validé par
        }

        // Clos par? If treated, we can put the agent or manager.
        if (risk.statut === RiskStatus.TREATED || risk.statut === RiskStatus.CLOSED) {
            const closer = risk.riskAgent || risk.riskManager;
            if (closer) sheet.cell("H4").value(`${closer.prenom} ${closer.nom}`);
        }

        const formatDate = (date: Date) => {
            if (!date) return "";
            return new Date(date).toLocaleDateString('fr-FR');
        };

        sheet.cell("D5").value(formatDate(risk.createdAt)); // Créé le
        sheet.cell("F5").value(formatDate(risk.updatedAt)); // Validé le
        if (risk.statut === RiskStatus.CLOSED) {
            sheet.cell("H5").value(formatDate(risk.updatedAt)); // Clos le
        }

        // --- SECTION 2: DESCRIPTION DE L'INCIDENT ---
        sheet.cell("B9").value(risk.titre); // *Libellé
        sheet.cell("B10").value(risk.explication); // *Description
        sheet.cell("B11").value(formatDate(risk.createdAt)); // *Survenu le
        sheet.cell("B12").value(formatDate(risk.createdAt)); // Détecté le

        // Classification
        if (risk.domaine) sheet.cell("B13").value(risk.domaine);
        if (risk.macroProcessus) sheet.cell("B14").value(risk.macroProcessus);
        if (risk.processus) sheet.cell("B15").value(risk.processus);

        sheet.cell("B16").value("Activité standard"); // Activité
        sheet.cell("B17").value(risk.titre); // Intitulé du risque opé

        // --- SECTION 3: CAUSE DE L'INCIDENT ---
        sheet.cell("B19").value("Cause à analyser"); // Cause
        sheet.cell("B20").value(risk.departement ? risk.departement.nom : "N/A"); // Entité responsable

        // --- SECTION 4: IMPACTS FINANCIERS ---
        // Put default 0s if nothing else
        sheet.cell("F47").value(0); // Perte sèche brute (A)
        sheet.cell("F55").value(0); // Récupérations (B)
        sheet.cell("F57").value(0); // Montant brut (A-C)
        sheet.cell("F58").value(0); // Montant net (A-B-C)

        // --- SECTION 5: IMPACTS QUALITATIFS ---
        if (risk.niveauRisque === RiskLevel.CRITICAL || risk.niveauRisque === RiskLevel.HIGH) {
            sheet.cell("G66").value("X"); // Risque d'image row index changed in analysis
            sheet.cell("G68").value("X"); // Interruption de processus
        }

        // --- SECTION 6: SUIVI DES ACTIONS ---
        if (risk.planActionTraitement) {
            sheet.cell("B75").value("Plan de traitement initial"); // Réf
            sheet.cell("B76").value(risk.planActionTraitement); // Description
            sheet.cell("B77").value(formatDate(risk.dateEcheance)); // Date cible
            sheet.cell("B78").value(risk.statut === RiskStatus.TREATED ? 'Réalisé' : 'En cours'); // État
        }

        // Génération du buffer
        const writeEnhanced = (cellRef: string, value: any) => {
            if (value !== null && value !== undefined && value !== '') {
                sheet.cell(cellRef).value(value);
            }
        };
        const markEnhanced = (cellRef: string, condition: boolean) => {
            if (condition) {
                sheet.cell(cellRef).value('X');
            }
        };
        const deptName = risk.departement?.nom || '';
        const ownerName = risk.responsableTraitement?.nom || deptName || 'A definir';
        const level = (risk as any).niveauRisqueLabel || risk.niveauRisque || '';
        const impact = (risk as any).impactLabel || level || '';
        const probability = (risk as any).probabiliteLabel || '';
        const appContext = [risk.domaine, risk.macroProcessus, risk.processus].filter(Boolean).join(' / ');
        const detailedSummary = [
            risk.explication ? `Description initiale: ${risk.explication}` : '',
            probability ? `Probabilite: ${probability}` : '',
            impact ? `Impact: ${impact}` : '',
            risk.dmrExistant ? `DMR existant: ${risk.dmrExistant}` : '',
            risk.aiAnalysisSuggestion ? `Suggestion IA: ${risk.aiAnalysisSuggestion}` : ''
        ].filter(Boolean).join('\n');
        const qualitativeContext = `${risk.domaine || ''} ${risk.explication || ''} ${risk.aiAnalysisImpact || ''} ${risk.processus || ''}`.toLowerCase();

        // Corrections de mapping: le template courant décale la section descriptive d'une ligne.
        sheet.cell("B8").value(risk.titre || '');
        sheet.cell("B9").value(risk.explication || '');
        sheet.cell("B10").value(formatDate(risk.createdAt));
        sheet.cell("B11").value(formatDate(risk.createdAt));
        sheet.cell("B12").value(risk.domaine || 'A definir');
        sheet.cell("B13").value(risk.macroProcessus || 'A definir');
        sheet.cell("B14").value(risk.processus || 'A definir');
        sheet.cell("B15").value(risk.processus || risk.macroProcessus || 'A definir');
        sheet.cell("B16").value(risk.titre || 'A definir');
        sheet.cell("B17").value(risk.incidentId ? `Incident source #${risk.incidentId}` : `Risque #${risk.id}`);
        sheet.cell("B18").value(impact ? `Evenement ${impact.toLowerCase()} a investiguer` : 'Cause a analyser');
        sheet.cell("B19").value(risk.responsableTraitement?.nom || risk.departement?.nom || 'A definir');
        sheet.cell("B20").value(detailedSummary || 'Causes principales a confirmer');
        sheet.cell("B21").value(appContext || 'A definir');
        sheet.cell("B22").value([level ? `Niveau: ${level}` : '', impact ? `Impact: ${impact}` : '', probability ? `Probabilite: ${probability}` : ''].filter(Boolean).join(' | '));

        // Nettoie les cellules qui polluaient les sections financieres / commentaires / actions.
        ["B23", "B24", "B25", "B26", "B27", "B33", "B45", "B46", "B60", "B73", "B75", "B76", "B77", "B78", "B79", "B80"].forEach((cellRef) => {
            sheet.cell(cellRef).value('');
        });

        writeEnhanced("B3", "Direction Générale");
        writeEnhanced("B4", deptName);
        writeEnhanced("B5", "Gestion des risques");
        writeEnhanced("D4", risk.riskManager ? `${risk.riskManager.prenom} ${risk.riskManager.nom}` : '');
        writeEnhanced("F4", risk.riskAgent ? `${risk.riskAgent.prenom} ${risk.riskAgent.nom}` : '');
        writeEnhanced("B13", risk.domaine || 'A definir');
        writeEnhanced("B14", risk.macroProcessus || 'A definir');
        writeEnhanced("B15", risk.processus || 'A definir');
        writeEnhanced("B16", risk.processus || risk.macroProcessus || 'A definir');
        writeEnhanced("B17", risk.titre || 'A definir');
        writeEnhanced("B18", risk.incidentId ? `Incident source #${risk.incidentId}` : `Risque #${risk.id}`);
        writeEnhanced("B19", impact ? `Evenement ${impact.toLowerCase()} a investiguer` : 'Cause a analyser');
        writeEnhanced("B20", ownerName);
        writeEnhanced("B21", detailedSummary || 'Causes principales a confirmer');
        writeEnhanced("B22", appContext || 'A definir');
        writeEnhanced("B23", [level ? `Niveau: ${level}` : '', impact ? `Impact: ${impact}` : '', probability ? `Probabilite: ${probability}` : ''].filter(Boolean).join(' | '));
        writeEnhanced("B24", risk.niveauCotationRisqueNet || risk.niveauCotationRisqueBrut || 0);
        writeEnhanced("B25", risk.cotationImpact || 0);
        writeEnhanced("B26", risk.cotationProbabilite || 0);
        writeEnhanced("B27", risk.niveauCotationRisqueNet || risk.niveauCotationRisqueBrut || 0);
        writeEnhanced("B33", risk.aiAnalysisImpact || impact || '');
        writeEnhanced("B45", risk.aiAnalysisSuggestion || risk.planActionTraitement || '');
        writeEnhanced("B46", risk.dmrExistant || '');
        writeEnhanced("B60", risk.aiAnalysisTendance || '');
        writeEnhanced("B73", risk.aiAnalysisSuggestion || risk.explication || '');
        markEnhanced("G63", /manque|gagner|perte/.test(qualitativeContext));
        markEnhanced("G64", /reglement|penalit|agr[eé]ment|conform/.test(qualitativeContext));
        markEnhanced("G65", /jurid|assign|civil|penal/.test(qualitativeContext));
        markEnhanced("G66", /humain|social|sante|securite/.test(qualitativeContext));
        markEnhanced("G67", /client|insatisf|service/.test(qualitativeContext));
        markEnhanced("G68", /critique|eleve|élevé|image|media/.test(`${level} ${qualitativeContext}`));
        markEnhanced("G69", /credit/.test(qualitativeContext));
        markEnhanced("G70", /interruption|process|indispo|arr[eê]t/.test(qualitativeContext));
        markEnhanced("G71", /marche|volatil/.test(qualitativeContext));
        markEnhanced("G72", !sheet.cell("G63").value() && !sheet.cell("G64").value() && !sheet.cell("G65").value() && !sheet.cell("G66").value() && !sheet.cell("G67").value() && !sheet.cell("G68").value() && !sheet.cell("G69").value() && !sheet.cell("G70").value() && !sheet.cell("G71").value());
        writeEnhanced("B75", `PA-${risk.id}`);
        writeEnhanced("B76", risk.planActionTraitement || risk.dmrExistant || 'A definir');
        writeEnhanced("B77", formatDate(risk.dateEcheance || risk.prochaineEcheance));
        writeEnhanced("B78", risk.statut === RiskStatus.TREATED || risk.statut === RiskStatus.CLOSED ? 'Realise' : 'En cours');
        writeEnhanced("B79", risk.aiAnalysisSuggestion || risk.aiAnalysisTendance || '');
        writeEnhanced("B80", risk.pieceJustificative ? path.basename(risk.pieceJustificative) : 'Aucun document');

        const buffer = await workbook.outputAsync();

        // --- AUTOMATISATION : CRÉATION DE L'INCIDENT ---
        try {
            await Incident.create(await LookupResolutionService.resolveEntityPayload('incident', {
                titre: risk.titre || 'Incident Mappé (Sans Titre)',
                description: risk.explication || 'Issu d\'une Fiche Incident',
                dateSurvenance: risk.createdAt,
                statut: IncidentStatus.NOUVEAU,
                pieceJointe: null,
                userId: req.user?.id || null, // Optional chaining in case auth is incomplete
                departementId: risk.departementId,
                domaine: risk.domaine,
                macroProcessus: risk.macroProcessus,
                processus: risk.processus,
                planActionTraitement: risk.planActionTraitement,
                dateEcheance: risk.dateEcheance,
                niveauRisque: risk.niveauRisque
            }));
            appLogger.info('Risks', 'Incident auto-created from risk export', { riskId: risk.id });
        } catch (incidentError) {
            appLogger.error('Risks', 'Incident auto-create from risk export failed', incidentError);
            // On ne bloque pas le retour du fichier Excel
        }

        // Envoi du fichier
        const fileName = `Fiche_Incident_${risk.id}_${Date.now()}.xlsm`;
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'application/vnd.ms-excel.sheet.macroEnabled.12');
        res.send(buffer);

    } catch (error: any) {
        appLogger.error('Risks', 'Incident export failed', error);
        res.status(500).json({ message: 'Erreur lors de la génération de la fiche incident', error: error.message });
    }
});

export { router };
