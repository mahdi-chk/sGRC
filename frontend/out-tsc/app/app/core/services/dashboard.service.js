import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserRole } from '../models/user-role.enum';
import { AuthService } from './auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./auth.service";
export class DashboardService {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
        this.openModalSource = new Subject();
        this.toggleAiAssistantSource = new Subject();
        this.openModal$ = this.openModalSource.asObservable();
        this.toggleAiAssistant$ = this.toggleAiAssistantSource.asObservable();
        this.modules = [
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
                roles: [UserRole.RISK_MANAGER, UserRole.RISK_AGENT, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT]
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
                roles: [UserRole.RISK_MANAGER, UserRole.RISK_AGENT, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT]
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
                    { title: 'Check-Lists Parametrables' },
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
                    { title: 'Ma Checklist' },
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
                roles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.TOP_MANAGEMENT]
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
                roles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR]
            },
            {
                key: 'reporting',
                title: 'Reporting & Dashboards',
                desc: 'Synthese, KPI et exports pour la direction.',
                submodules: [
                    { title: 'Tableaux de Bord' },
                    { title: 'KPI Personnalisables' },
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
                roles: [UserRole.TOP_MANAGEMENT]
            }
        ];
    }
    getModules() {
        return this.modules;
    }
    getFilteredModules(role) {
        if (!role)
            return [];
        const roleStr = typeof role === 'string' ? role : role.toString();
        if (roleStr === UserRole.SUPER_ADMIN)
            return this.modules;
        const filteredModules = this.modules.filter(m => m.roles && m.roles.some(r => r.toString() === roleStr)).map(module => (Object.assign(Object.assign({}, module), { submodules: [...module.submodules] })));
        if (roleStr === UserRole.TOP_MANAGEMENT) {
            return filteredModules.map(module => {
                if (module.key !== 'incidents') {
                    return module;
                }
                return Object.assign(Object.assign({}, module), { submodules: module.submodules.filter(submodule => submodule.title === 'Liens et Analyse' || submodule.title === 'Reporting Consolide') });
            });
        }
        return filteredModules;
    }
    openSubmoduleModal(m, s) {
        const currentUser = this.authService.getCurrentUser();
        const isRiskAgent = (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === UserRole.RISK_AGENT;
        const title = ((s === null || s === void 0 ? void 0 : s.title) || '').toLowerCase();
        if (m.key === 'gouvernance' && title.includes('gestion') && title.includes('document')) {
            this.router.navigate(['/dashboard/governance-documents']);
        }
        else if (m.key === 'gouvernance' && title.includes('historique')) {
            this.router.navigate(['/dashboard/governance-history']);
        }
        else if (m.key === 'gouvernance' && title.includes('workflow')) {
            this.router.navigate(['/dashboard/governance-workflows']);
        }
        else if (m.key === 'gouvernance' && title.includes('maturit')) {
            this.router.navigate(['/dashboard/governance-maturity']);
        }
        else if (m.key === 'gouvernance' && title.includes('application')) {
            this.router.navigate(['/dashboard/governance-adoption']);
        }
        else if (s.title === 'Registre des Risques') {
            if (isRiskAgent) {
                this.router.navigate(['/dashboard/assigned-risks']);
            }
            else {
                this.router.navigate(['/dashboard/risks']);
            }
        }
        else if (title.includes('evaluation parametrable')) {
            this.router.navigate(['/dashboard/strategic-evaluation']);
        }
        else if (s.title === 'Cartographie Dynamique') {
            this.router.navigate(['/dashboard/statistics']);
        }
        else if (s.title === 'Check-Lists Parametrables' ||
            s.title === 'Tracabilite des Preuves' ||
            s.title === 'Gestion des Missions' ||
            s.title === 'Rapports et Suivi' ||
            s.title === 'Planification Pluriannuelle') {
            const isSenior = (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === UserRole.AUDIT_SENIOR || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === UserRole.SUPER_ADMIN;
            if (s.title === 'Check-Lists Parametrables' && isSenior) {
                this.router.navigate(['/dashboard/audit-checklists']);
            }
            else if (s.title === 'Planification Pluriannuelle' && isSenior) {
                this.router.navigate(['/dashboard/audit-planning']);
            }
            else if (s.title === 'Tracabilite des Preuves' && isSenior) {
                this.router.navigate(['/dashboard/audit-evidence-explorer']);
            }
            else if (s.title === 'Rapports et Suivi' && isSenior) {
                this.router.navigate(['/dashboard/audit-report-review']);
            }
            else {
                this.router.navigate(isSenior ? ['/dashboard/auditing'] : ['/dashboard/auditor-missions']);
            }
        }
        else if (s.title === 'Mes Missions') {
            this.router.navigate(['/dashboard/auditor-missions']);
        }
        else if (s.title === 'Ma Checklist') {
            this.router.navigate(['/dashboard/auditor-checklist']);
        }
        else if (s.title === 'Mes Preuves') {
            this.router.navigate(['/dashboard/auditor-evidence']);
        }
        else if (s.title === 'Soumettre Rapport') {
            this.router.navigate(['/dashboard/auditor-report']);
        }
        else if (s.title === 'Alertes et Monitoring') {
            this.router.navigate(['/dashboard/alertes-monitoring']);
        }
        else if (s.title === 'Plans de Traitement') {
            this.router.navigate(['/dashboard/treatment-plans']);
        }
        else if (m.key === 'controls') {
            this.router.navigate(['/dashboard/controls']);
        }
        else if (title.includes('enregistrement structure')) {
            this.router.navigate(['/dashboard/incident-registration']);
        }
        else if (s.title === 'Workflow de Traitement') {
            this.router.navigate(['/dashboard/incident-workflow']);
        }
        else if (s.title === 'Liens et Analyse') {
            this.router.navigate(['/dashboard/incident-analysis']);
        }
        else if (title.includes('reporting consolide')) {
            this.router.navigate(['/dashboard/incident-reporting']);
        }
        else if (s.title === 'Tableaux de Bord') {
            this.router.navigate(['/dashboard/reporting/dashboard']);
        }
        else if (s.title === 'KPI Personnalisables') {
            this.router.navigate(['/dashboard/reporting/kpis']);
        }
        else if (s.title === 'Vision Multi-Entites') {
            this.router.navigate(['/dashboard/reporting/multi-entity']);
        }
        else if (s.title === 'Exports') {
            this.router.navigate(['/dashboard/reporting/exports']);
        }
        else {
            this.openModalSource.next({ m, s });
        }
    }
    toggleAiAssistant() {
        this.toggleAiAssistantSource.next();
    }
}
DashboardService.ɵfac = function DashboardService_Factory(t) { return new (t || DashboardService)(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.AuthService)); };
DashboardService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DashboardService, factory: DashboardService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.AuthService }]; }, null); })();
//# sourceMappingURL=dashboard.service.js.map