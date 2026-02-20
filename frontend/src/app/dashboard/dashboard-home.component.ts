import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/services/auth.service';
import { UserRole } from '../core/models/user-role.enum';
import { Router } from '@angular/router';
import { DashboardService } from '../core/services/dashboard.service';

interface Submodule {
    title: string;
    desc?: string;
}

interface ModuleItem {
    key: string;
    title: string;
    desc?: string;
    submodules: Submodule[];
    roles: UserRole[];
}

@Component({
    selector: 'app-dashboard-home',
    templateUrl: './dashboard-home.component.html'
})
export class DashboardHomeComponent implements OnInit {
    modules: ModuleItem[] = [
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
            roles: [UserRole.TOP_MANAGEMENT]
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

    currentUserRole: UserRole | null = null;
    UserRole = UserRole;

    constructor(private authService: AuthService, private router: Router, private dashboardService: DashboardService) { }

    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            this.currentUserRole = user?.role;
        });
    }

    get filteredModules() {
        if (this.currentUserRole === UserRole.SUPER_ADMIN) {
            return this.modules;
        }
        return this.modules.filter(m => this.currentUserRole && m.roles.includes(this.currentUserRole));
    }

    onOpenModule(event: { m: ModuleItem, s: Submodule }) {
        this.dashboardService.openSubmoduleModal(event.m, event.s);
    }

    showUserManagementView() {
        this.router.navigate(['/dashboard/users']);
    }
}
