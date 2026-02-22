import nodemailer from 'nodemailer';

class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.ethereal.email',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            // Force IPv4 if IPv6 is unreachable
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
            family: 4, // Force IPv4
        } as any);
    }

    async sendWelcomeEmail(user: { mail: string; nom: string; prenom: string }) {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn('Email notification skipped: SMTP credentials (SMTP_USER, SMTP_PASS) are not configured in .env');
            return null;
        }

        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: user.mail,
            subject: 'Bienvenue sur la plateforme GRC',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bienvenue, ${user.prenom} ${user.nom} !</h2>
                    <p>Votre compte a été créé avec succès sur la plateforme GRC.</p>
                    <p>Vous pouvez désormais vous connecter en utilisant votre adresse e-mail : <strong>${user.mail}</strong>.</p>
                    <p>Si vous ne connaissez pas votre mot de passe, veuillez contacter votre administrateur.</p>
                    <br>
                    <p>Cordialement,<br>L'équipe GRC</p>
                </div>
            `,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent: %s', info.messageId);
            // If using ethereal
            if (info.messageId && process.env.SMTP_HOST === 'smtp.ethereal.email') {
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info as any));
            }
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            // We don't want to block user creation if email fails
            return null;
        }
    }

    async sendRiskAssignedEmail(agent: { mail: string; nom: string; prenom: string }, risk: { titre: string; id: number }) {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;

        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: agent.mail,
            subject: `Nouveau risque assigné : ${risk.titre}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bonjour ${agent.prenom},</h2>
                    <p>Un nouveau risque vous a été assigné sur la plateforme GRC.</p>
                    <p><strong>Risque :</strong> ${risk.titre} (ID: ${risk.id})</p>
                    <p>Veuillez vous connecter pour consulter les détails et commencer le traitement.</p>
                    <br>
                    <p>Cordialement,<br>L'équipe GRC</p>
                </div>
            `,
        };

        try {
            return await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending risk assigned email:', error);
            return null;
        }
    }

    async sendRiskStatusUpdateEmail(manager: { mail: string; nom: string; prenom: string }, risk: { titre: string; statut: string }) {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;

        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: manager.mail,
            subject: `Mise à jour du statut : ${risk.titre}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bonjour ${manager.prenom},</h2>
                    <p>Le statut du risque suivant a été mis à jour :</p>
                    <p><strong>Risque :</strong> ${risk.titre}</p>
                    <p><strong>Nouveau statut :</strong> ${risk.statut}</p>
                    <br>
                    <p>Cordialement,<br>L'équipe GRC</p>
                </div>
            `,
        };

        try {
            return await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending risk status update email:', error);
            return null;
        }
    }

    async sendRiskClosedEmail(agent: { mail: string; nom: string; prenom: string }, risk: { titre: string }) {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;

        const mailOptions = {
            from: process.env.SMTP_FROM || '"GRC Platform" <noreply@example.com>',
            to: agent.mail,
            subject: `Risque clôturé : ${risk.titre}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2c3e50;">Bonjour ${agent.prenom},</h2>
                    <p>Le risque suivant sur lequel vous avez travaillé a été clôturé par le Risk Manager :</p>
                    <p><strong>Risque :</strong> ${risk.titre}</p>
                    <br>
                    <p>Félicitations pour le traitement !</p>
                    <p>Cordialement,<br>L'équipe GRC</p>
                </div>
            `,
        };

        try {
            return await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending risk closed email:', error);
            return null;
        }
    }
}

export const emailService = new EmailService();

