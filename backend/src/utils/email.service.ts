import nodemailer from 'nodemailer';
import { appLogger } from './app-logger';

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

    private async sendMail(mailOptions: any, failureMessage: string, successContext?: Record<string, unknown>) {
        const canSend = await this.ensureTransportAvailable();
        if (!canSend || !this.transporter) {
            return null;
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

            return info;
        } catch (error: any) {
            this.markTransportUnavailable(error);
            appLogger.error('Email', failureMessage, error);
            return null;
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

    async sendAuditMissionAssignedEmail(auditeur: { mail: string; nom: string; prenom: string }, mission: { titre: string; id: number }) {
        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: auditeur.mail,
            subject: `Nouvelle mission d'audit assignee : ${mission.titre}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bonjour ${auditeur.prenom},</h2>
                    <p>Une nouvelle mission d'audit vous a ete assignee sur la plateforme GRC.</p>
                    <p><strong>Mission :</strong> ${mission.titre} (ID: ${mission.id})</p>
                    <p>Veuillez vous connecter pour consulter les details et commencer l'audit.</p>
                    <br>
                    <p>Cordialement,<br>L'equipe GRC</p>
                </div>
            `,
        };

        return this.sendMail(mailOptions, 'Audit mission assigned email failed');
    }

    async sendAuditReportSubmittedEmail(senior: { mail: string; nom: string; prenom: string }, mission: { titre: string; auditeurNom: string }) {
        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: senior.mail,
            subject: `Rapport d'audit soumis : ${mission.titre}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bonjour ${senior.prenom},</h2>
                    <p>Un nouveau rapport d'audit a ete soumis pour la mission suivante :</p>
                    <p><strong>Mission :</strong> ${mission.titre}</p>
                    <p><strong>Auditeur :</strong> ${mission.auditeurNom}</p>
                    <p>Veuillez vous connecter pour valider les recommandations et clore la mission.</p>
                    <br>
                    <p>Cordialement,<br>L'equipe GRC</p>
                </div>
            `,
        };

        return this.sendMail(mailOptions, 'Audit report submitted email failed');
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
}

export const emailService = new EmailService();
