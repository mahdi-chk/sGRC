import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
const FALLBACK_OVERVIEW = {
    generatedAt: new Date().toISOString(),
    summary: {
        healthScore: 72,
        status: 'Sous tension maitrisee',
        activeAlerts: 4,
        keyRecommendations: 5,
        monitoredDomains: 5,
        nextReview: 'Comite GRC hebdomadaire'
    },
    modules: {
        bestPractices: [
            {
                id: 'bp-iso-27001',
                title: 'Pilotage des revues de risques critiques',
                framework: 'ISO 27001',
                category: 'Risque',
                applicability: 'Top management et Risk Manager',
                summary: 'Formaliser une revue mensuelle des risques critiques avec arbitrages, proprietaires et delais engages.',
                linkedModule: 'Gestion des Risques',
                priority: 'haute',
                tags: ['revue', 'risque critique', 'gouvernance']
            },
            {
                id: 'bp-nist-detect',
                title: 'Canal unique de traitement des alertes',
                framework: 'NIST CSF',
                category: 'Supervision',
                applicability: 'Admin SI et pilotage transverse',
                summary: 'Centraliser les alertes prioritaires dans une file unique avec qualification, escalade et suivi.',
                linkedModule: 'Notifications',
                priority: 'haute',
                tags: ['alertes', 'escalade', 'workflow']
            },
            {
                id: 'bp-cobit-actions',
                title: 'Gouvernance des plans de remediations',
                framework: 'COBIT',
                category: 'Actions',
                applicability: 'Risk Manager et Audit Senior',
                summary: 'Suivre chaque action corrective avec proprietaire, evidence et date cible pour fermer les ecarts durablement.',
                linkedModule: 'Plans d Actions',
                priority: 'moyenne',
                tags: ['remediation', 'evidence', 'delais']
            }
        ],
        recommendations: [
            {
                id: 'rec-risk-overdue',
                title: 'Escalader les risques critiques en retard en comite de pilotage',
                priority: 'critique',
                status: 'a_lancer',
                rationale: 'Des risques critiques restent ouverts au-dela de leur echeance cible.',
                expectedImpact: 'Reduction de la tension sur le portefeuille de risques.',
                owner: 'Top Management',
                sourceModule: 'Risques',
                route: '/dashboard/risks'
            },
            {
                id: 'rec-audit-followup',
                title: 'Rendre visible le suivi des recommandations d audit',
                priority: 'haute',
                status: 'en_preparation',
                rationale: 'Les missions en retard indiquent un risque de perte de traction sur les remediations.',
                expectedImpact: 'Meilleure discipline d execution et reduction des retards.',
                owner: 'Audit Senior',
                sourceModule: 'Audit',
                route: '/dashboard/audit-statistics'
            }
        ],
        benchmarks: {
            sector: 'Services financiers et fonctions support',
            updatedAt: new Date().toISOString(),
            indicators: [
                {
                    id: 'bench-risk-treatment',
                    label: 'Traitement des risques dans les delais',
                    organizationValue: 68,
                    benchmarkValue: 79,
                    unit: '%',
                    gap: -11,
                    interpretation: 'Le dispositif est en dessous du repere sectoriel sur la cadence de traitement.'
                },
                {
                    id: 'bench-incident-closure',
                    label: 'Cloture des incidents majeurs sous 30 jours',
                    organizationValue: 74,
                    benchmarkValue: 81,
                    unit: '%',
                    gap: -7,
                    interpretation: 'La resolution est correcte mais doit etre plus reguliere sur les incidents critiques.'
                },
                {
                    id: 'bench-audit-followup',
                    label: 'Execution des recommandations d audit',
                    organizationValue: 63,
                    benchmarkValue: 76,
                    unit: '%',
                    gap: -13,
                    interpretation: 'Le principal effort attendu porte sur le suivi des plans d actions post-audit.'
                }
            ],
            maturity: [
                { domain: 'Risque', organizationScore: 71, benchmarkScore: 79 },
                { domain: 'Conformite', organizationScore: 67, benchmarkScore: 74 },
                { domain: 'Audit', organizationScore: 65, benchmarkScore: 77 },
                { domain: 'Incidents', organizationScore: 73, benchmarkScore: 78 }
            ]
        },
        assistance: {
            channels: [
                {
                    id: 'chan-ai',
                    title: 'Assistant sGRC',
                    responseTime: 'Immediate',
                    scope: 'Questions methodologiques, navigation et analyse rapide.',
                    actionLabel: 'Ouvrir l assistant'
                },
                {
                    id: 'chan-grc',
                    title: 'Support GRC',
                    responseTime: 'Sous 4h',
                    scope: 'Arbitrages de priorite, lectures de KPI et gouvernance.',
                    actionLabel: 'Creer un ticket'
                },
                {
                    id: 'chan-admin',
                    title: 'Escalade Admin SI',
                    responseTime: 'Sous 2h',
                    scope: 'Blocages techniques, alertes systeme et droits d acces.',
                    actionLabel: 'Escalader'
                }
            ],
            faqs: [
                {
                    id: 'faq-health-score',
                    question: 'Comment est calcule le health score GRC ?',
                    answer: 'Le score combine les signaux de risque critique, incidents ouverts, retards d audit, ecarts de conformite et volume d alertes non lues.'
                },
                {
                    id: 'faq-recommendation',
                    question: 'Quand une recommandation devient-elle prioritaire ?',
                    answer: 'La priorite augmente quand plusieurs signaux faibles convergent sur le meme domaine ou quand une echeance depassee persiste.'
                },
                {
                    id: 'faq-benchmark',
                    question: 'Comment lire les benchmarks sectoriels ?',
                    answer: 'Les benchmarks servent de repere de maturite. Ils ne remplacent pas les objectifs internes mais aident a calibrer l effort.'
                }
            ],
            playbooks: [
                {
                    id: 'playbook-1',
                    title: 'Revue express des risques critiques',
                    duration: '30 min',
                    outcome: 'Arbitrages de priorite et actions immediates.',
                    linkedModule: 'Gestion des Risques'
                },
                {
                    id: 'playbook-2',
                    title: 'Point de debouclage des alertes',
                    duration: '20 min',
                    outcome: 'Qualification, affectation et escalade des alertes ouvertes.',
                    linkedModule: 'Supervision Continue'
                },
                {
                    id: 'playbook-3',
                    title: 'Rattrapage des actions post-audit',
                    duration: '45 min',
                    outcome: 'Plan court terme pour les recommandations en retard.',
                    linkedModule: 'Audit'
                }
            ]
        },
        continuousMonitoring: {
            status: 'Sous surveillance renforcee',
            focus: 'Concentrer les efforts sur les risques critiques, le suivi post-audit et les ecarts ouverts.',
            alerts: [
                {
                    id: 'alert-1',
                    severity: 'critique',
                    title: 'Portefeuille de risques critiques a traiter',
                    detail: 'Plusieurs risques restent ouverts ou en retard au-dela du seuil cible.',
                    route: '/dashboard/risks',
                    owner: 'Risk Manager'
                },
                {
                    id: 'alert-2',
                    severity: 'haute',
                    title: 'Retards dans le suivi des recommandations d audit',
                    detail: 'Les missions ouvertes degradent la cadence de fermeture des remediations.',
                    route: '/dashboard/audit-report-review',
                    owner: 'Audit Senior'
                },
                {
                    id: 'alert-3',
                    severity: 'moyenne',
                    title: 'Ecarts de conformite encore ouverts',
                    detail: 'Des ecarts de severite moyenne et elevee meritent une trajectoire plus visible.',
                    route: '/dashboard/compliance-gaps',
                    owner: 'Pilotage conformite'
                }
            ],
            healthTrend: [
                { label: 'S-5', score: 61 },
                { label: 'S-4', score: 63 },
                { label: 'S-3', score: 66 },
                { label: 'S-2', score: 68 },
                { label: 'S-1', score: 70 },
                { label: 'Maint.', score: 72 }
            ],
            breakdown: [
                { label: 'Risque', score: 69, target: 85 },
                { label: 'Incidents', score: 74, target: 85 },
                { label: 'Audit', score: 64, target: 80 },
                { label: 'Conformite', score: 67, target: 80 },
                { label: 'Alertes', score: 78, target: 90 }
            ],
            watchlist: [
                {
                    id: 'watch-1',
                    title: 'Risque critique sans evidence recente',
                    detail: 'Verifiez les pieces justificatives et la derniere mise a jour des plans de traitement.',
                    tone: 'alert'
                },
                {
                    id: 'watch-2',
                    title: 'Audit a echeance proche',
                    detail: 'Confirmer les livrables attendus et les responsables avant depassement.',
                    tone: 'watch'
                },
                {
                    id: 'watch-3',
                    title: 'Ecarts ouverts a fort impact',
                    detail: 'Synchroniser la remediation conformite avec les actions deja ouvertes.',
                    tone: 'good'
                }
            ]
        }
    }
};
export class SupervisionService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiUrl}/supervision`;
    }
    getOverview() {
        if (!this.overview$) {
            this.overview$ = this.http.get(`${this.apiUrl}/overview`).pipe(catchError(() => of(FALLBACK_OVERVIEW)), shareReplay(1));
        }
        return this.overview$;
    }
}
SupervisionService.ɵfac = function SupervisionService_Factory(t) { return new (t || SupervisionService)(i0.ɵɵinject(i1.HttpClient)); };
SupervisionService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SupervisionService, factory: SupervisionService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupervisionService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=supervision.service.js.map