import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserRole } from '../models/user-role.enum';
import { AuthService } from './auth.service';

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
            desc: 'Structurer l’organisation, politiques, workflows et traçabilité.',
            submodules: [
                { title: 'Gestion Documentaire', desc: 'Cycle de vie des documents, signatures, archivage.' },
                { title: 'Traçabilité et Historique', desc: 'Versions, audit trails et recherches avancées.' },
                { title: 'Workflows d’Approbation', desc: 'Circuits multi-niveaux et notifications.' },
                { title: 'Indicateurs de Maturité', desc: 'Scoring basé sur COBIT/ISO.' },
                { title: 'Adhésion et Application', desc: 'Preuves d’adhésion et suivi d’application.' }
            ],
            roles: [UserRole.SUPER_ADMIN]
        },
        {
            key: 'risques',
            title: 'Gestion des Risques',
            desc: 'Identifier, évaluer et traiter les risques.',
            submodules: [
                { title: 'Registre des Risques' },
                { title: 'Évaluation Paramétrable' },
                { title: 'Cartographie Dynamique' },
                { title: 'Plans de Traitement' },
                { title: 'Alertes et Monitoring' }
            ],
            roles: [UserRole.RISK_MANAGER, UserRole.RISK_AGENT]
        },
        {
            key: 'controls',
            title: 'Contrôles Internes',
            desc: 'Définir, planifier et vérifier les contrôles.',
            submodules: [
                { title: 'Référentiel des Contrôles' },
                { title: 'Planification Automatisée' },
                { title: 'Collecte de Preuves' },
                { title: 'Évaluation d’Efficacité' },
                { title: 'Suivi des Non-Conformités' }
            ],
            roles: [UserRole.RISK_MANAGER, UserRole.RISK_AGENT]
        },
        {
            key: 'conformite',
            title: 'Conformité',
            desc: 'Mapper exigences réglementaires et preuves.',
            submodules: [
                { title: 'Référentiels Intégrés' },
                { title: 'Mapping et Liens' },
                { title: 'Auto-Évaluations' },
                { title: 'Suivi des Écarts' },
                { title: 'Mises à Jour et Preuves' }
            ],
            roles: [UserRole.AUDIT_SENIOR, UserRole.AUDITEUR]
        },
        {
            key: 'audit',
            title: 'Audit',
            desc: 'Planifier et exécuter les audits avec traçabilité.',
            submodules: [
                { title: 'Planification Pluriannuelle' },
                { title: 'Gestion des Missions' },
                { title: 'Check-Lists Paramétrables' },
                { title: 'Traçabilité des Preuves' },
                { title: 'Rapports et Suivi' }
            ],
            roles: [UserRole.AUDIT_SENIOR, UserRole.AUDITEUR]
        },
        {
            key: 'incidents',
            title: 'Gestion des Incidents',
            desc: 'Déclarer, analyser et traiter les incidents.',
            submodules: [
                { title: 'Enregistrement Structuré' },
                { title: 'Workflow de Traitement' },
                { title: 'Liens et Analyse' },
                { title: 'Reporting Consolidé' }
            ],
            roles: [UserRole.AUDIT_SENIOR, UserRole.AUDITEUR]
        },
        {
            key: 'plans-actions',
            title: 'Plans d’Actions',
            desc: 'Gérer les actions correctives et préventives.',
            submodules: [
                { title: 'Gestion Centralisée' },
                { title: 'Suivi des Échéances' },
                { title: 'Notifications' },
                { title: 'Indicateurs' }
            ],
            roles: [UserRole.AUDIT_SENIOR]
        },
        {
            key: 'reporting',
            title: 'Reporting & Dashboards',
            desc: 'Synthèse, KPI et exports pour la direction.',
            submodules: [
                { title: 'Tableaux de Bord' },
                { title: 'KPI Personnalisables' },
                { title: 'Vision Multi-Entités' },
                { title: 'Exports' }
            ],
            roles: [UserRole.TOP_MANAGEMENT]
        },
        {
            key: 'supervision',
            title: 'Supervision sGRC',
            desc: 'Accompagnement méthodologique et recommandations.',
            submodules: [
                { title: 'Bibliothèque de Bonnes Pratiques' },
                { title: 'Recommandations Contextualisées' },
                { title: 'Benchmarks Sectoriels' },
                { title: 'Assistance Experte' },
                { title: 'Supervision Continue' }
            ],
            roles: [UserRole.TOP_MANAGEMENT]
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

        return this.modules.filter(m =>
            m.roles && m.roles.some(r => r.toString() === roleStr)
        );
    }

    openSubmoduleModal(m: any, s: any) {
        const currentUser = this.authService.getCurrentUser();
        const isRiskAgent = currentUser?.role === UserRole.RISK_AGENT;

        if (s.title === 'Registre des Risques') {
            if (isRiskAgent) {
                this.router.navigate(['/dashboard/assigned-risks']);
            } else {
                this.router.navigate(['/dashboard/risks']);
            }
        } else if (s.title === 'Évaluation Paramétrable') {
            this.router.navigate(['/dashboard/strategic-evaluation']);
        } else if (s.title === 'Cartographie Dynamique') {
            this.router.navigate(['/dashboard/statistics']);
        } else if (s.title === 'Alertes et Monitoring') {
            this.router.navigate(['/dashboard/alertes-monitoring']);
        } else if (s.title === 'Plans de Traitement') {
            this.router.navigate(['/dashboard/treatment-plans']);
        } else {
            this.openModalSource.next({ m, s });
        }
    }

    toggleAiAssistant() {
        this.toggleAiAssistantSource.next();
    }
}
