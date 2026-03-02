/**
 * @file periodic-reminder.service.ts
 * @description Service pour la gestion des rappels automatiques des risques périodiques.
 */

import { Risk, PeriodicFrequency } from '../risk/risk.model';
import { Notification, NotificationType } from './notification.model';
import { emailService } from '../../utils/email.service';
import { User } from '../users/user.model';
import { Op } from 'sequelize';

export class PeriodicReminderService {
    /**
     * Calcule la prochaine échéance en fonction de la fréquence.
     */
    static calculateNextEcheance(lastEcheance: Date, frequency: PeriodicFrequency): Date {
        const next = new Date(lastEcheance);
        switch (frequency) {
            case PeriodicFrequency.BIMENSUEL:
                next.setDate(next.getDate() + 15);
                break;
            case PeriodicFrequency.TRIMESTRIEL:
                next.setMonth(next.getMonth() + 3);
                break;
            case PeriodicFrequency.SEMESTRIEL:
                next.setMonth(next.getMonth() + 6);
                break;
            case PeriodicFrequency.ANNUEL:
                next.setFullYear(next.getFullYear() + 1);
                break;
            default:
                break;
        }
        return next;
    }

    /**
     * Vérifie les risques périodiques et génère des notifications.
     */
    static async checkPeriodicRisks() {
        const now = new Date();
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(now.getDate() + 3);

        // 1. Risques dont l'échéance approche (3 jours avant)
        const upcomingRisks = await Risk.findAll({
            where: {
                frequenceTraitement: { [Op.ne]: PeriodicFrequency.NONE },
                prochaineEcheance: {
                    [Op.between]: [now, threeDaysFromNow]
                }
            },
            include: ['riskAgent', 'riskManager']
        });

        for (const risk of upcomingRisks) {
            await this.notifyRecipient(risk, `Rappel : Le risque "${risk.titre}" arrive à échéance le ${risk.prochaineEcheance?.toLocaleDateString()}.`);
        }

        // 2. Risques en retard
        const delayedRisks = await Risk.findAll({
            where: {
                frequenceTraitement: { [Op.ne]: PeriodicFrequency.NONE },
                prochaineEcheance: { [Op.lt]: now }
            },
            include: ['riskAgent', 'riskManager']
        });

        for (const risk of delayedRisks) {
            await this.notifyRecipient(risk, `ALERTE : Le risque "${risk.titre}" est en RETARD ! Échéance était le ${risk.prochaineEcheance?.toLocaleDateString()}.`);
        }
    }

    private static async notifyRecipient(risk: any, message: string) {
        const recipients = [risk.riskAgentId, risk.riskManagerId].filter(id => id);

        for (const userId of recipients) {
            // Notification In-App
            await Notification.create({
                userId,
                type: NotificationType.STATUS_CHANGED, // Reusing existing type or could add a REMINDER type
                content: message,
                riskId: risk.id
            });

            // Logique Email (Optionnelle selon config)
            const user = await User.findByPk(userId);
            if (user && user.mail) {
                // On pourrait ajouter une méthode spécifique dans emailService
                console.log(`Email de rappel envoyé à ${user.mail}: ${message}`);
            }
        }
    }
}
