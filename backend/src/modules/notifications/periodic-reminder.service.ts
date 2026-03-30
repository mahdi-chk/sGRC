/**
 * @file periodic-reminder.service.ts
 * @description Service pour la gestion des rappels automatiques des risques periodiques.
 */

import { Risk, PeriodicFrequency } from '../risk/risk.model';
import { Notification, NotificationType } from './notification.model';
import { emailService } from '../../utils/email.service';
import { User } from '../users/user.model';
import { Op } from 'sequelize';

export class PeriodicReminderService {
    /**
     * Calcule la prochaine echeance en fonction de la frequence.
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
     * Verifie les risques periodiques et genere des notifications.
     */
    static async checkPeriodicRisks() {
        const now = new Date();
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(now.getDate() + 3);

        // 1. Risques dont l'echeance approche (3 jours avant)
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
            await this.notifyRecipient(
                risk,
                `Rappel : Le risque "${risk.titre}" arrive a echeance le ${risk.prochaineEcheance?.toLocaleDateString()}.`
            );
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
            await this.notifyRecipient(
                risk,
                `ALERTE : Le risque "${risk.titre}" est en RETARD ! Echeance etait le ${risk.prochaineEcheance?.toLocaleDateString()}.`
            );
        }
    }

    private static async notifyRecipient(risk: any, message: string) {
        const recipients = [risk.riskAgentId, risk.riskManagerId].filter((id): id is number => Boolean(id));
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        for (const userId of recipients) {
            const existingReminder = await Notification.findOne({
                where: {
                    userId,
                    riskId: risk.id,
                    type: NotificationType.REMINDER,
                    content: message,
                    createdAt: {
                        [Op.gte]: startOfDay
                    }
                }
            });

            if (existingReminder) {
                continue;
            }

            await Notification.create({
                userId,
                type: NotificationType.REMINDER,
                content: message,
                riskId: risk.id
            });

            const user = await User.findByPk(userId);
            if (user?.mail) {
                await emailService.sendRiskReminderEmail(
                    { mail: user.mail, nom: user.nom, prenom: user.prenom },
                    { titre: risk.titre, prochaineEcheance: risk.prochaineEcheance },
                    message
                );
            }
        }
    }
}
