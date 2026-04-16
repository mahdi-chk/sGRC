import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserRole } from '../models/user-role.enum';
import { AuthService } from './auth.service';
import { getControlsDashboardSubmodules } from '../../modules/controls/controls-navigation';
import { getActionsDashboardSubmodules } from '../../modules/actions/actions-navigation';
import { getComplianceDashboardSubmodules } from '../../modules/compliance/compliance-navigation';
import { getSupervisionDashboardSubmodules } from '../../modules/supervision/supervision-navigation';

export interface Submodule {
    title: string;
    desc?: string;
}

export interface ModuleItem {
    key: string;
    title: string;
    desc?: string;
    submodules: Submodule[];
    roles: UserRole[];
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private openModalSource = new Subject<{ m: any, s: any }>();
    private toggleAiAssistantSource = new Subject<void>();

    openModal$ = this.openModalSource.asObservable();
    toggleAiAssistant$ = this.toggleAiAssistantSource.asObservable();

    private modules: ModuleItem[] = [
        {
            key: 'gouvernance',
            title: 'Gouvernance',
            desc: 'Structurer l organisation, les politiques, les workflows et la tracabilite.',
            submodules: [
                { title: 'Gestion Documentaire', desc: 'Cycle de vie des documents, signatures et archivage.' },
                { title: 'Tracabilite et Historique', desc: 'Versions, audit trails et recherches avancees.' },
                { title: 'Workflows d Approbation', desc: 'Circuits multi-niveaux et notifications.' },
                { title: 'Indicateurs de Maturite', desc: 'Scoring base sur COBIT et ISO.' },
                { title: 'Adhesion et Application', desc: 'Preuves d adhesion et suivi d application.' }
            ],
            roles: [UserRole.SUPER_ADMIN]
        },
        {
            key: 'risques',
            title: 'Gestion des Risques',
            desc: 'Identifier, evaluer et traiter les risques.',
            submodules: [
                { title: 'Registre des Risques' },
                { title: 'Evaluation Parametrable' },
                { title: 'Cartographie Dynamique' },
                { title: 'Plans de Traitement' },
                { title: 'Alertes et Monitoring' }
            ],
            roles: [UserRole.RISK_MANAGER, UserRole.RISK_AGENT]
        },
        {
            key: 'controls',
            title: 'Controles Internes',
            desc: 'Definir, planifier et verifier les controles.',
            submodules: [
                { title: 'Referentiel des Controles' },
                { title: 'Planification Automatisee' },
                { title: 'Collecte de Preuves' },
                { title: 'Evaluation d Efficacite' },
                { title: 'Suivi des Non-Conformites' }
            ],
            roles: [UserRole.RISK_MANAGER, UserRole.RISK_AGENT]
        },
        {
            key: 'conformite',
            title: 'Conformite',
            desc: 'Mapper exigences reglementaires et preuves.',
            submodules: [
                { title: 'Referentiels Integres' },
                { title: 'Mapping et Liens' },
                { title: 'Auto-Evaluations' },
                { title: 'Suivi des Ecarts' },
                { title: 'Mises a Jour et Preuves' }
            ],
            roles: [UserRole.AUDIT_SENIOR, UserRole.AUDITEUR]
        },
        {
            key: 'audit',
            title: 'Audit',
            desc: 'Planifier et executer les audits avec tracabilite.',
            submodules: [
                { title: 'Planification Pluriannuelle' },
                { title: 'Gestion des Missions' },
                { title: 'Tracabilite des Preuves' },
                { title: 'Rapports et Suivi' }
            ],
            roles: [UserRole.AUDIT_SENIOR, UserRole.SUPER_ADMIN]
        },
        {
            key: 'audit-auditeur',
            title: 'Audit',
            desc: 'Realisez vos missions, remplissez les checklists et soumettez vos rapports.',
            submodules: [
                { title: 'Mes Missions' },
                { title: 'Mes Preuves' },
                { title: 'Soumettre Rapport' }
            ],
            roles: [UserRole.AUDITEUR, UserRole.SUPER_ADMIN]
        },
        {
            key: 'incidents',
            title: 'Gestion des Incidents',
            desc: 'Declarer, analyser et traiter les incidents.',
            submodules: [
                { title: 'Enregistrement Structure' },
                { title: 'Workflow de Traitement' },
                { title: 'Liens et Analyse' },
                { title: 'Reporting Consolide' }
            ],
            roles: [UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR]
        },
        {
            key: 'plans-actions',
            title: 'Plans d Actions',
            desc: 'Gerer les actions correctives et preventives.',
            submodules: [
                { title: 'Gestion Centralisee' },
                { title: 'Suivi des Echeances' },
                { title: 'Notifications' },
                { title: 'Indicateurs' }
            ],
            roles: [
                UserRole.SUPER_ADMIN,
                UserRole.RISK_MANAGER,
                UserRole.RISK_AGENT,
                UserRole.AUDIT_SENIOR,
                UserRole.TOP_MANAGEMENT
            ]
        },
        {
            key: 'reporting',
            title: 'Reporting & Dashboards',
            desc: 'Synthese, KPI et exports pour la direction.',
            submodules: [
                { title: 'Tableaux de Bord' },
                { title: 'KPI Personnalisables' },
                { title: 'Matrice de Risque' },
                { title: 'Vision Multi-Entites' },
                { title: 'Exports' }
            ],
            roles: [UserRole.TOP_MANAGEMENT]
        },
        {
            key: 'supervision',
            title: 'Supervision sGRC',
            desc: 'Accompagnement methodologique et recommandations.',
            submodules: [
                { title: 'Bibliotheque de Bonnes Pratiques' },
                { title: 'Recommandations Contextualisees' },
                { title: 'Benchmarks Sectoriels' },
                { title: 'Assistance Experte' },
                { title: 'Supervision Continue' }
            ],
            roles: [UserRole.TOP_MANAGEMENT, UserRole.ADMIN_SI]
        }
    ];

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    getModules(): ModuleItem[] {
        return this.modules;
    }

    getFilteredModules(role: UserRole | string | null): ModuleItem[] {
        if (!role) return [];
        const roleStr = typeof role === 'string' ? role : (role as any).toString();

        if (roleStr === UserRole.SUPER_ADMIN) return this.modules;

        const filteredModules = this.modules.filter(m =>
            m.roles && m.roles.some(r => r.toString() === roleStr)
        ).map(module => ({
            ...module,
                submodules: module.key === 'controls'
                ? getControlsDashboardSubmodules(roleStr)
                : module.key === 'conformite'
                    ? getComplianceDashboardSubmodules(roleStr)
                : module.key === 'plans-actions'
                    ? getActionsDashboardSubmodules(roleStr)
                : module.key === 'supervision'
                    ? getSupervisionDashboardSubmodules(roleStr)
                    : [...module.submodules]
        }));

        if (roleStr === UserRole.TOP_MANAGEMENT) {
            return filteredModules.map(module => {
                if (module.key !== 'incidents') {
                    return module;
                }

                return {
                    ...module,
                    submodules: module.submodules.filter(submodule =>
                        submodule.title === 'Liens et Analyse' || submodule.title === 'Reporting Consolide'
                    )
                };
            });
        }

        return filteredModules;
    }

    openSubmoduleModal(m: any, s: any) {
        const currentUser = this.authService.getCurrentUser();
        const isRiskAgent = currentUser?.role === UserRole.RISK_AGENT;
        const title = (s?.title || '').toLowerCase();

        if (m.key === 'gouvernance' && title.includes('gestion') && title.includes('document')) {
            this.router.navigate(['/dashboard/governance-documents']);
        } else if (m.key === 'gouvernance' && title.includes('historique')) {
            this.router.navigate(['/dashboard/governance-history']);
        } else if (m.key === 'gouvernance' && title.includes('workflow')) {
            this.router.navigate(['/dashboard/governance-workflows']);
        } else if (m.key === 'gouvernance' && title.includes('maturit')) {
            this.router.navigate(['/dashboard/governance-maturity']);
        } else if (m.key === 'gouvernance' && title.includes('application')) {
            this.router.navigate(['/dashboard/governance-adoption']);
        } else if (s.title === 'Registre des Risques') {
            if (isRiskAgent) {
                this.router.navigate(['/dashboard/assigned-risks']);
            } else {
                this.router.navigate(['/dashboard/risks']);
            }
        } else if (title.includes('evaluation parametrable')) {
            this.router.navigate(['/dashboard/strategic-evaluation']);
        } else if (s.title === 'Cartographie Dynamique') {
            this.router.navigate(['/dashboard/statistics']);
        } else if (
            s.title === 'Tracabilite des Preuves' ||
            s.title === 'Gestion des Missions' ||
            s.title === 'Rapports et Suivi' ||
            s.title === 'Planification Pluriannuelle'
        ) {
            const isSenior = currentUser?.role === UserRole.AUDIT_SENIOR || currentUser?.role === UserRole.SUPER_ADMIN;

            if (s.title === 'Planification Pluriannuelle' && isSenior) {
                this.router.navigate(['/dashboard/audit-planning']);
            } else if (s.title === 'Tracabilite des Preuves' && isSenior) {
                this.router.navigate(['/dashboard/audit-evidence-explorer']);
            } else if (s.title === 'Rapports et Suivi' && isSenior) {
                this.router.navigate(['/dashboard/audit-report-review']);
            } else {
                this.router.navigate(isSenior ? ['/dashboard/auditing'] : ['/dashboard/auditor-missions']);
            }
        } else if (s.title === 'Mes Missions') {
            this.router.navigate(['/dashboard/auditor-missions']);
        } else if (s.title === 'Mes Preuves') {
            this.router.navigate(['/dashboard/auditor-evidence']);
        } else if (s.title === 'Soumettre Rapport') {
            this.router.navigate(['/dashboard/auditor-report']);
        } else if (s.title === 'Alertes et Monitoring') {
            this.router.navigate(['/dashboard/alertes-monitoring']);
        } else if (s.title === 'Plans de Traitement') {
            this.router.navigate(['/dashboard/treatment-plans']);
        } else if (s.title === 'Referentiel des Controles') {
            this.router.navigate(['/dashboard/controls-referential']);
        } else if (s.title === 'Planification Automatisee') {
            this.router.navigate(['/dashboard/controls-planning']);
        } else if (s.title === 'Collecte de Preuves') {
            this.router.navigate(['/dashboard/controls-evidence']);
        } else if (s.title === 'Evaluation d Efficacite') {
            this.router.navigate(['/dashboard/controls-effectiveness']);
        } else if (s.title === 'Suivi des Non-Conformites') {
            this.router.navigate(['/dashboard/controls-non-conformities']);
        } else if (s.title === 'Referentiels Integres') {
            this.router.navigate(['/dashboard/compliance-frameworks']);
        } else if (s.title === 'KPI de Maturite') {
            this.router.navigate(['/dashboard/compliance-maturity']);
        } else if (s.title === 'Mapping et Liens') {
            this.router.navigate(['/dashboard/compliance-mappings']);
        } else if (s.title === 'Auto-Evaluations') {
            this.router.navigate(['/dashboard/compliance-assessments']);
        } else if (s.title === 'Suivi des Ecarts') {
            this.router.navigate(['/dashboard/compliance-gaps']);
        } else if (s.title === 'Mises a Jour et Preuves') {
            this.router.navigate(['/dashboard/compliance-updates']);
        } else if (m.key === 'conformite') {
            this.router.navigate(['/dashboard/compliance']);
        } else if (m.key === 'controls') {
            this.router.navigate(['/dashboard/controls-referential']);
        } else if (s.title === 'Gestion Centralisee') {
            this.router.navigate(['/dashboard/actions-centralized']);
        } else if (s.title === 'Suivi des Echeances') {
            this.router.navigate(['/dashboard/actions-deadlines']);
        } else if (s.title === 'Notifications' && m.key === 'plans-actions') {
            this.router.navigate(['/dashboard/actions-notifications']);
        } else if (s.title === 'Indicateurs' && m.key === 'plans-actions') {
            this.router.navigate(['/dashboard/actions-indicators']);
        } else if (m.key === 'plans-actions') {
            this.router.navigate(['/dashboard/actions']);
        } else if (title.includes('enregistrement structure')) {
            this.router.navigate(['/dashboard/incident-registration']);
        } else if (s.title === 'Workflow de Traitement') {
            this.router.navigate(['/dashboard/incident-workflow']);
        } else if (s.title === 'Liens et Analyse') {
            this.router.navigate(['/dashboard/incident-analysis']);
        } else if (title.includes('reporting consolide')) {
            this.router.navigate(['/dashboard/incident-reporting']);
        } else if (s.title === 'Tableaux de Bord') {
            this.router.navigate(['/dashboard/reporting/dashboard']);
        } else if (s.title === 'KPI Personnalisables') {
            this.router.navigate(['/dashboard/reporting/kpis']);
        } else if (s.title === 'Matrice de Risque') {
            this.router.navigate(['/dashboard/reporting/risk-matrix']);
        } else if (s.title === 'Vision Multi-Entites') {
            this.router.navigate(['/dashboard/reporting/multi-entity']);
        } else if (s.title === 'Exports') {
            this.router.navigate(['/dashboard/reporting/exports']);
        } else if (s.title === 'Bibliotheque de Bonnes Pratiques') {
            this.router.navigate(['/dashboard/supervision/best-practices']);
        } else if (s.title === 'Recommandations Contextualisees') {
            this.router.navigate(['/dashboard/supervision/recommendations']);
        } else if (s.title === 'Benchmarks Sectoriels') {
            this.router.navigate(['/dashboard/supervision/benchmarks']);
        } else if (s.title === 'Assistance Experte') {
            this.router.navigate(['/dashboard/supervision/expert-assistance']);
        } else if (s.title === 'Supervision Continue') {
            this.router.navigate(['/dashboard/supervision/continuous-monitoring']);
        } else {
            this.openModalSource.next({ m, s });
        }
    }

    toggleAiAssistant() {
        this.toggleAiAssistantSource.next();
    }
}
