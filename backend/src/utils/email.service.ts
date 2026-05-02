import nodemailer from 'nodemailer';
import { appLogger } from './app-logger';
import { AuditPlanTransitionCode } from '../modules/auditing/audit-lookup-codes';
import { AuditEmailLog } from '../modules/auditing/audit-email-log.model';

type EmailRecipient = {
    mail: string;
    nom: string;
    prenom: string;
    userId?: number | null;
};

type MailDispatchResult = {
    status: 'sent' | 'skipped' | 'failed';
    messageId?: string | null;
    errorMessage?: string | null;
};

class EmailService {
    private transporter;
    private readonly smtpConfigured: boolean;
    private smtpConfigWarningLogged = false;
    private transportVerified = false;
    private verificationPromise: Promise<boolean> | null = null;
    private disabledUntil: number | null = null;
    private static readonly RETRY_DELAY_MS = 15 * 60 * 1000;

    constructor() {
        this.smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

        if (!this.smtpConfigured) {
            this.transporter = null;
            return;
        }

        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.ethereal.email',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
            family: 4,
        } as any);
    }

    private logMissingConfig() {
        if (this.smtpConfigWarningLogged) {
            return;
        }

        this.smtpConfigWarningLogged = true;
        appLogger.warn('Email', 'Email sending skipped because SMTP configuration is incomplete');
    }

    private markTransportUnavailable(error: any) {
        this.transportVerified = false;
        this.disabledUntil = Date.now() + EmailService.RETRY_DELAY_MS;
        appLogger.error('Email', 'SMTP transport unavailable; email delivery paused temporarily', {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            retryAt: new Date(this.disabledUntil).toISOString(),
            message: error?.message || 'Unknown error',
        });
    }

    private async ensureTransportAvailable() {
        if (!this.smtpConfigured || !this.transporter) {
            this.logMissingConfig();
            return false;
        }

        if (this.disabledUntil && Date.now() < this.disabledUntil) {
            return false;
        }

        if (this.transportVerified) {
            return true;
        }

        if (!this.verificationPromise) {
            this.verificationPromise = this.transporter.verify()
                .then(() => {
                    this.transportVerified = true;
                    this.disabledUntil = null;
                    appLogger.info('Email', 'SMTP transport verified', {
                        host: process.env.SMTP_HOST,
                        port: Number(process.env.SMTP_PORT) || 587,
                    });
                    return true;
                })
                .catch((error: any) => {
                    this.markTransportUnavailable(error);
                    return false;
                })
                .finally(() => {
                    this.verificationPromise = null;
                });
        }

        return this.verificationPromise;
    }

    private async sendMail(mailOptions: any, failureMessage: string, successContext?: Record<string, unknown>): Promise<MailDispatchResult> {
        const canSend = await this.ensureTransportAvailable();
        if (!canSend || !this.transporter) {
            return {
                status: 'skipped',
                messageId: null,
                errorMessage: this.smtpConfigured ? 'SMTP transport unavailable' : 'SMTP configuration is incomplete',
            };
        }

        try {
            const info = await this.transporter.sendMail(mailOptions);

            if (successContext) {
                appLogger.info('Email', 'Email sent', {
                    messageId: info.messageId,
                    ...successContext,
                });
            }

            if (info.messageId && process.env.SMTP_HOST === 'smtp.ethereal.email') {
                appLogger.debug('Email', 'Preview URL available', nodemailer.getTestMessageUrl(info as any));
            }

            return {
                status: 'sent',
                messageId: info.messageId || null,
                errorMessage: null,
            };
        } catch (error: any) {
            this.markTransportUnavailable(error);
            appLogger.error('Email', failureMessage, error);
            return {
                status: 'failed',
                messageId: null,
                errorMessage: error?.message || failureMessage,
            };
        }
    }

    private async recordAuditEmailLog(entry: {
        planId?: number | null;
        missionId?: number | null;
        scope: 'plan' | 'mission';
        templateCode: string;
        subject: string;
        recipient: EmailRecipient;
        actorName?: string | null;
        result: MailDispatchResult;
    }) {
        try {
            await AuditEmailLog.create({
                planId: entry.planId || null,
                missionId: entry.missionId || null,
                scope: entry.scope,
                templateCode: entry.templateCode,
                subject: entry.subject,
                recipientEmail: entry.recipient.mail,
                recipientName: `${entry.recipient.prenom || ''} ${entry.recipient.nom || ''}`.trim() || null,
                recipientUserId: entry.recipient.userId || null,
                actorName: entry.actorName || null,
                deliveryStatus: entry.result.status,
                errorMessage: entry.result.errorMessage || null,
                messageId: entry.result.messageId || null,
            });
        } catch (error: any) {
            appLogger.error('Email', 'Audit email log persistence failed', {
                templateCode: entry.templateCode,
                recipientEmail: entry.recipient.mail,
                message: error?.message || 'Unknown error',
            });
        }
    }

    async sendWelcomeEmail(user: { mail: string; nom: string; prenom: string }) {
        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: user.mail,
            subject: 'Bienvenue sur la plateforme GRC',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bienvenue, ${user.prenom} ${user.nom} !</h2>
                    <p>Votre compte a ete cree avec succes sur la plateforme GRC.</p>
                    <p>Vous pouvez desormais vous connecter en utilisant votre adresse e-mail : <strong>${user.mail}</strong>.</p>
                    <p>Si vous ne connaissez pas votre mot de passe, veuillez contacter votre administrateur.</p>
                    <br>
                    <p>Cordialement,<br>L'equipe GRC</p>
                </div>
            `,
        };

        return this.sendMail(mailOptions, 'Email sending failed', {
            to: user.mail,
            subject: mailOptions.subject,
        });
    }

    async sendRiskAssignedEmail(agent: { mail: string; nom: string; prenom: string }, risk: { titre: string; id: number }) {
        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: agent.mail,
            subject: `Nouveau risque assigne : ${risk.titre}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bonjour ${agent.prenom},</h2>
                    <p>Un nouveau risque vous a ete assigne sur la plateforme GRC.</p>
                    <p><strong>Risque :</strong> ${risk.titre} (ID: ${risk.id})</p>
                    <p>Veuillez vous connecter pour consulter les details et commencer le traitement.</p>
                    <br>
                    <p>Cordialement,<br>L'equipe GRC</p>
                </div>
            `,
        };

        return this.sendMail(mailOptions, 'Risk assigned email failed');
    }

    async sendRiskStatusUpdateEmail(manager: { mail: string; nom: string; prenom: string }, risk: { titre: string; statut: string }) {
        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: manager.mail,
            subject: `Mise a jour du statut : ${risk.titre}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bonjour ${manager.prenom},</h2>
                    <p>Le statut du risque suivant a ete mis a jour :</p>
                    <p><strong>Risque :</strong> ${risk.titre}</p>
                    <p><strong>Nouveau statut :</strong> ${risk.statut}</p>
                    <br>
                    <p>Cordialement,<br>L'equipe GRC</p>
                </div>
            `,
        };

        return this.sendMail(mailOptions, 'Risk status update email failed');
    }

    async sendRiskReminderEmail(
        recipient: { mail: string; nom: string; prenom: string },
        risk: { titre: string; prochaineEcheance?: Date | null },
        message: string
    ) {
        const deadline = risk.prochaineEcheance
            ? new Date(risk.prochaineEcheance).toLocaleDateString('fr-FR')
            : 'non definie';

        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: recipient.mail,
            subject: `Rappel risque : ${risk.titre}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bonjour ${recipient.prenom},</h2>
                    <p>${message}</p>
                    <p><strong>Risque :</strong> ${risk.titre}</p>
                    <p><strong>Prochaine echeance :</strong> ${deadline}</p>
                    <p>Veuillez vous connecter a la plateforme pour verifier le suivi du risque.</p>
                    <br>
                    <p>Cordialement,<br>L'equipe GRC</p>
                </div>
            `,
        };

        return this.sendMail(mailOptions, 'Risk reminder email failed');
    }

    async sendAuditMissionAssignedEmail(auditeur: EmailRecipient, mission: { titre: string; id: number }) {
        return this.sendAuditMissionWorkflowEmail(
            auditeur,
            {
                missionTitle: mission.titre,
                missionId: mission.id,
                transitionCode: 'mission_assigned',
            }
        );
    }

    async sendAuditReportSubmittedEmail(senior: EmailRecipient, mission: { titre: string; auditeurNom: string }) {
        return this.sendAuditMissionWorkflowEmail(
            senior,
            {
                missionTitle: mission.titre,
                transitionCode: 'report_submitted',
                actorName: mission.auditeurNom,
            }
        );
    }

    async sendRiskClosedEmail(agent: { mail: string; nom: string; prenom: string }, risk: { titre: string }) {
        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: agent.mail,
            subject: `Risque cloture : ${risk.titre}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bonjour ${agent.prenom},</h2>
                    <p>Le risque suivant sur lequel vous avez travaille a ete cloture par le Risk Manager :</p>
                    <p><strong>Risque :</strong> ${risk.titre}</p>
                    <br>
                    <p>Felicitations pour le traitement !</p>
                    <p>Cordialement,<br>L'equipe GRC</p>
                </div>
            `,
        };

        return this.sendMail(mailOptions, 'Risk closed email failed');
    }

    async sendAuditPlanValidationRequestedEmail(
        recipient: { mail: string; nom: string; prenom: string },
        plan: { nom: string; statusLabel: string }
    ) {
        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: recipient.mail,
            subject: `Validation requise du plan d'audit : ${plan.nom}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bonjour ${recipient.prenom},</h2>
                    <p>Le plan d'audit suivant a ete soumis pour validation :</p>
                    <p><strong>Plan :</strong> ${plan.nom}</p>
                    <p><strong>Statut courant :</strong> ${plan.statusLabel}</p>
                    <p>Veuillez vous connecter a la plateforme GRC pour traiter cette etape.</p>
                    <br>
                    <p>Cordialement,<br>L'equipe GRC</p>
                </div>
            `,
        };

        return this.sendMail(mailOptions, 'Audit plan validation request email failed');
    }

    async sendAuditPlanStatusChangedEmail(
        recipient: { mail: string; nom: string; prenom: string },
        plan: { nom: string; statusLabel: string; actorName: string }
    ) {
        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: recipient.mail,
            subject: `Mise a jour du plan d'audit : ${plan.nom}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bonjour ${recipient.prenom},</h2>
                    <p>Le statut du plan d'audit suivant a ete mis a jour :</p>
                    <p><strong>Plan :</strong> ${plan.nom}</p>
                    <p><strong>Nouveau statut :</strong> ${plan.statusLabel}</p>
                    <p><strong>Action realisee par :</strong> ${plan.actorName}</p>
                    <p>Connectez-vous a la plateforme pour consulter le detail du workflow.</p>
                    <br>
                    <p>Cordialement,<br>L'equipe GRC</p>
                </div>
            `,
        };

        return this.sendMail(mailOptions, 'Audit plan status changed email failed');
    }

    async sendAuditPlanWorkflowEmail(
        recipient: EmailRecipient,
        payload: { nom: string; transitionCode: string; planId?: number | null }
    ) {
        const templates: Record<string, { subject: string; body: string }> = {
            [AuditPlanTransitionCode.DEMANDER_VALIDATION]: {
                subject: `[Nom du plan d’audit] : Demande de validation du plan d’audit`,
                body: `Bonjour, Dans le cadre de la preparation du plan d’audit « [Nom du plan d’audit] », nous vous prions de bien vouloir proceder a sa validation. Merci d’acceder a l’application afin d’effectuer cette action. Cordialement,`,
            },
            [AuditPlanTransitionCode.DEMANDER_REVUE]: {
                subject: `[Nom du plan d’audit] : Demande de revue du plan d’audit`,
                body: `Bonjour, Dans le cadre de la preparation du plan d’audit « [Nom du plan d’audit] », nous vous invitons a effectuer la revue du document. Merci d’acceder a l’application pour realiser cette operation. Cordialement,`,
            },
            [AuditPlanTransitionCode.VALIDER_DIRECTION]: {
                subject: `[Nom du plan d’audit] : Validation du plan d’audit`,
                body: `Bonjour, Nous vous informons que le plan d’audit « [Nom du plan d’audit] » a ete valide par la Direction. Cordialement,`,
            },
            [AuditPlanTransitionCode.VALIDER_CONSEIL]: {
                subject: `[Nom du plan d’audit] : Validation par le Conseil d’Administration`,
                body: `Bonjour, Le plan d’audit « [Nom du plan d’audit] » a ete valide par le Conseil d’Administration. Cordialement,`,
            },
            [AuditPlanTransitionCode.VALIDER_COMITE]: {
                subject: `[Nom du plan d’audit] : Validation par le Comité d’Audit`,
                body: `Bonjour, Le plan d’audit « [Nom du plan d’audit] » a ete valide par le Comité d’Audit. Cordialement,`,
            },
            [AuditPlanTransitionCode.FERMER]: {
                subject: `[Nom du plan d’audit] : Fermeture du plan d’audit`,
                body: `Bonjour, Le plan d’audit « [Nom du plan d’audit] » a ete cloture. Cordialement,`,
            },
            [AuditPlanTransitionCode.REOUVRIR]: {
                subject: `[Nom du plan d’audit] : Réouverture du plan d’audit`,
                body: `Bonjour, Le plan d’audit « [Nom du plan d’audit] » a ete reouvert. Cordialement,`,
            },
            [AuditPlanTransitionCode.FERMER_DEFINITIVEMENT]: {
                subject: `[Nom du plan d’audit] : Fermeture définitive du plan d’audit`,
                body: `Bonjour, Le plan d’audit « [Nom du plan d’audit] » a ete definitivement cloture. Cordialement,`,
            },
            [AuditPlanTransitionCode.DEFINIR_MODELE]: {
                subject: `[Nom du plan d’audit] : Définition comme modèle`,
                body: `Bonjour, Le plan d’audit « [Nom du plan d’audit] » a ete defini comme modele. Cordialement,`,
            },
        };

        const template = templates[payload.transitionCode];
        if (!template) {
            return null;
        }

        const subject = template.subject.replace(/\[Nom du plan d’audit\]/g, payload.nom);
        const body = template.body.replace(/\[Nom du plan d’audit\]/g, payload.nom);

        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: recipient.mail,
            subject,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bonjour ${recipient.prenom},</h2>
                    <p>${body}</p>
                    <p>Cordialement,<br>L'equipe GRC</p>
                </div>
            `,
        };

        const result = await this.sendMail(mailOptions, 'Audit plan workflow email failed', {
            to: recipient.mail,
            subject,
            transitionCode: payload.transitionCode,
        });
        await this.recordAuditEmailLog({
            planId: payload.planId || null,
            scope: 'plan',
            templateCode: payload.transitionCode,
            subject,
            recipient,
            result,
        });
        return result;
    }

    async sendAuditMissionWorkflowEmail(
        recipient: EmailRecipient,
        payload: {
            missionTitle: string;
            missionId?: number;
            planId?: number | null;
            transitionCode: string;
            actorName?: string | null;
            comment?: string | null;
            reference?: string | null;
            dueDate?: string | null;
        }
    ) {
        const missionLabel = payload.missionTitle;
        const actorLine = payload.actorName ? `<p><strong>Declenche par :</strong> ${payload.actorName}</p>` : '';
        const commentLine = payload.comment ? `<p><strong>Commentaire :</strong> ${payload.comment}</p>` : '';
        const referenceLine = payload.reference ? `<p><strong>Reference :</strong> ${payload.reference}</p>` : '';
        const dueDateLine = payload.dueDate ? `<p><strong>Echeance :</strong> ${payload.dueDate}</p>` : '';
        const missionIdLine = payload.missionId ? `<p><strong>ID mission :</strong> ${payload.missionId}</p>` : '';

        const templates: Record<string, { subject: string; body: string }> = {
            mission_assigned: {
                subject: `[${missionLabel}] : Affectation de la mission d'audit`,
                body: `<p>La mission d'audit <strong>${missionLabel}</strong> vous a ete affectee.</p>${missionIdLine}<p>Veuillez vous connecter a l'application pour consulter vos responsabilites et demarrer les travaux.</p>`,
            },
            mission_order_sent: {
                subject: `[${missionLabel}] : Ordre de mission envoye`,
                body: `<p>L'ordre de mission relatif a <strong>${missionLabel}</strong> a ete envoye.</p>${referenceLine}${commentLine}<p>Merci de consulter l'application pour prendre connaissance des instructions.</p>`,
            },
            work_program_submitted: {
                subject: `[${missionLabel}] : Programme de travail soumis`,
                body: `<p>Le programme de travail de la mission <strong>${missionLabel}</strong> a ete soumis pour validation.</p>${actorLine}${commentLine}<p>Merci de vous connecter afin de traiter cette etape.</p>`,
            },
            work_program_validated: {
                subject: `[${missionLabel}] : Programme de travail valide`,
                body: `<p>Le programme de travail de la mission <strong>${missionLabel}</strong> a ete valide.</p>${actorLine}${commentLine}<p>Il peut maintenant poursuivre son circuit d'approbation.</p>`,
            },
            work_program_approved: {
                subject: `[${missionLabel}] : Programme de travail approuve`,
                body: `<p>Le programme de travail de la mission <strong>${missionLabel}</strong> a ete approuve.</p>${actorLine}${commentLine}<p>Les travaux d'audit peuvent se poursuivre selon ce programme.</p>`,
            },
            work_program_rework_requested: {
                subject: `[${missionLabel}] : Programme de travail retourne pour correction`,
                body: `<p>Le programme de travail de la mission <strong>${missionLabel}</strong> a ete retourne pour correction.</p>${actorLine}${commentLine}<p>Merci d'apporter les ajustements necessaires dans l'application.</p>`,
            },
            report_submitted: {
                subject: `[${missionLabel}] : Rapport d'audit soumis`,
                body: `<p>Le rapport d'audit de la mission <strong>${missionLabel}</strong> a ete soumis.</p>${actorLine}${commentLine}<p>Merci de vous connecter pour effectuer la validation.</p>`,
            },
            report_validated: {
                subject: `[${missionLabel}] : Rapport d'audit valide`,
                body: `<p>Le rapport d'audit de la mission <strong>${missionLabel}</strong> a ete valide.</p>${actorLine}${commentLine}<p>Le dossier est en attente d'approbation finale.</p>`,
            },
            report_approved: {
                subject: `[${missionLabel}] : Rapport d'audit approuve`,
                body: `<p>Le rapport d'audit de la mission <strong>${missionLabel}</strong> a ete approuve.</p>${actorLine}${commentLine}${dueDateLine}<p>La mission peut etre consideree comme cloturee dans l'application.</p>`,
            },
            report_rework_requested: {
                subject: `[${missionLabel}] : Rapport d'audit retourne pour correction`,
                body: `<p>Le rapport d'audit de la mission <strong>${missionLabel}</strong> a ete retourne pour correction.</p>${actorLine}${commentLine}<p>Merci de reviser le rapport dans l'application.</p>`,
            },
        };

        const template = templates[payload.transitionCode];
        if (!template) {
            return null;
        }

        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: recipient.mail,
            subject: template.subject,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bonjour ${recipient.prenom},</h2>
                    ${template.body}
                    <p>Cordialement,<br>L'equipe GRC</p>
                </div>
            `,
        };

        const result = await this.sendMail(mailOptions, 'Audit mission workflow email failed', {
            to: recipient.mail,
            subject: template.subject,
            transitionCode: payload.transitionCode,
        });
        await this.recordAuditEmailLog({
            planId: payload.planId || null,
            missionId: payload.missionId || null,
            scope: 'mission',
            templateCode: payload.transitionCode,
            subject: template.subject,
            recipient,
            actorName: payload.actorName || null,
            result,
        });
        return result;
    }
}

export const emailService = new EmailService();
