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
}

export const emailService = new EmailService();
