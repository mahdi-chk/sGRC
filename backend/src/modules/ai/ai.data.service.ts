import { Department } from '../departments/department.model';
import { Risk } from '../risk/risk.model';
import { AuditMission } from '../auditing/audit-mission.model';
import { UserRole } from '../users/user.roles';
import { Op } from 'sequelize';

export class AIDataService {
    private static metadataCache: any = null;
    private static cacheTimestamp: number = 0;
    private static readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes

    /**
     * Nettoie les données pour éviter l'injection de prompt ou l'envoi de données trop lourdes.
     */
    private static sanitize(text: string | null | undefined): string {
        if (!text) return '';
        // Supprime les balises HTML basiques et les caractères de contrôle suspects
        return text.replace(/<[^>]*>?/gm, '')
            .replace(/[\n\r\t]+/g, ' ')
            .replace(/["'{}[\]]/g, '') // Évite les structures JSON/objet injectées
            .trim()
            .substring(0, 500); // Limite la longueur par champ
    }

    /**
     * Récupère les métadonnées système (Départements, etc.) avec un cache.
     */
    static async fetchSystemMetadata(): Promise<string> {
        const now = Date.now();
        if (this.metadataCache && (now - this.cacheTimestamp < this.CACHE_TTL)) {
            return this.metadataCache;
        }

        try {
            const departments = await Department.findAll({ attributes: ['nom'] });
            const deptList = departments.map(d => d.nom).join(', ');

            this.metadataCache = `DÉPARTEMENTS DU SYSTÈME : ${deptList}`;
            this.cacheTimestamp = now;
            return this.metadataCache;
        } catch (error) {
            console.error('Error fetching system metadata:', error);
            return 'DÉPARTEMENTS : Information non disponible.';
        }
    }

    /**
     * Récupère les données contextuelles basées sur la requête et l'utilisateur.
     */
    static async fetchContextualData(query: string, userId: number, role: UserRole): Promise<string> {
        const lowerQuery = query.toLowerCase();
        let context = '\nDONNÉES OPÉRATIONNELLES ACTUELLES :\n';
        let foundData = false;

        try {
            // 1. Recherche de Risques
            if (lowerQuery.includes('risque') || lowerQuery.includes('risk')) {
                const risks = await Risk.findAll({
                    where: this.getSecurityFilter(userId, role),
                    limit: 10,
                    order: [['updatedAt', 'DESC']],
                    attributes: ['titre', 'explication', 'niveauRisque', 'statut']
                });

                if (risks.length > 0) {
                    foundData = true;
                    context += '--- RISQUES ---\n';
                    risks.forEach(r => {
                        context += `- ${r.titre} [${r.niveauRisque}] (Statut: ${r.statut}): ${this.sanitize(r.explication)}\n`;
                    });
                }
            }

            // 2. Recherche de Missions d'Audit
            if (foundData || lowerQuery.includes('audit') || lowerQuery.includes('mission')) {
                const missions = await AuditMission.findAll({
                    where: this.getSecurityFilter(userId, role, 'audit'),
                    limit: 10,
                    order: [['updatedAt', 'DESC']],
                    attributes: ['titre', 'objectifs', 'statut', 'delai']
                });

                if (missions.length > 0) {
                    foundData = true;
                    context += '\n--- MISSIONS D\'AUDIT ---\n';
                    missions.forEach(m => {
                        const date = m.delai ? new Date(m.delai).toLocaleDateString() : 'N/A';
                        context += `- ${m.titre} (Statut: ${m.statut}, Échéance: ${date}): ${this.sanitize(m.objectifs)}\n`;
                    });
                }
            }

            return foundData ? context : '';
        } catch (error) {
            console.error('Error fetching contextual data:', error);
            return '';
        }
    }

    /**
     * Génère les filtres Sequelize basés sur le rôle pour la sécurité (RBAC).
     */
    private static getSecurityFilter(userId: number, role: UserRole, type: 'risk' | 'audit' = 'risk'): any {
        // Super Admin voit tout
        if (role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN_SI || role === UserRole.TOP_MANAGEMENT) {
            return {};
        }

        // Filtres pour Risques
        if (type === 'risk') {
            if (role === UserRole.RISK_MANAGER) {
                return { riskManagerId: userId };
            }
            if (role === UserRole.RISK_AGENT) {
                return { riskAgentId: userId };
            }
            return { responsableTraitementId: userId };
        }

        // Filtres pour Audit
        if (type === 'audit') {
            if (role === UserRole.AUDIT_SENIOR) {
                return { auditSeniorId: userId };
            }
            if (role === UserRole.AUDITEUR) {
                return { auditeurId: userId };
            }
            // Fallback pour audit (voir les missions où il est impliqué)
            return { [Op.or]: [{ auditSeniorId: userId }, { auditeurId: userId }] };
        }

        // Par défaut (Risque), accès restreint aux rôles liés
        return { [Op.or]: [{ riskManagerId: userId }, { riskAgentId: userId }, { responsableTraitementId: userId }] };
    }
}
