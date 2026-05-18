import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
    CANONICAL_PERIODIC_FREQUENCIES,
    PERIODIC_FREQUENCY_LABELS,
    PeriodicFrequency,
    Risk,
    RiskService,
    RiskStatus,
} from '../../core/services/risk.service';
import { UserRole } from '../../core/models/user-role.enum';

@Component({
    selector: 'app-treatment-plans',
    templateUrl: './treatment-plans.component.html',
    styleUrls: ['./treatment-plans.component.scss'],
})
export class TreatmentPlansComponent implements OnInit {
    plans: any[] = [];
    metrics = { total: 0, enCours: 0, enRetard: 0, termines: 0 };
    completionRate = 0;
    overdueRate = 0;

    selectedPlan: any = null;
    editDraft: any = {};
    showDetailPanel = false;
    isEditing = false;
    isSaving = false;
    actionError = '';
    actionSuccess = '';

    searchText = '';
    statusFilter = '';
    ownerFilter = '';
    sortMode = 'priority';
    periodicFrequencies = CANONICAL_PERIODIC_FREQUENCIES;

    currentPage = 1;
    itemsPerPage = 10;

    constructor(private riskService: RiskService, private router: Router) {}

    ngOnInit(): void {
        this.loadPlans();
    }

    get isRiskManager(): boolean {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return user.role === UserRole.RISK_MANAGER || user.role === UserRole.SUPER_ADMIN;
    }

    canTreatPlan(plan: any): boolean {
        const user = JSON.parse(sessionStorage.getItem('sgrc_user') || '{}');
        return this.isRiskManager || Number(plan?.risk?.riskAgentId) === Number(user.id);
    }

    get filteredPlans(): any[] {
        const search = this.normalize(this.searchText);
        const owner = this.normalize(this.ownerFilter);

        const filtered = this.plans.filter((plan) => {
            const matchesSearch = !search ||
                this.normalize(plan.name).includes(search) ||
                this.normalize(plan.riskTitle).includes(search) ||
                this.normalize(plan.domaine).includes(search);
            const matchesStatus = !this.statusFilter || plan.status === this.statusFilter;
            const matchesOwner = !owner || this.normalize(plan.owner).includes(owner);

            return matchesSearch && matchesStatus && matchesOwner;
        });

        return filtered.sort((first, second) => {
            if (this.sortMode === 'deadline') {
                return new Date(first.dateEcheance).getTime() - new Date(second.dateEcheance).getTime();
            }
            if (this.sortMode === 'progress') {
                return first.progress - second.progress;
            }
            return second.priorityScore - first.priorityScore;
        });
    }

    get paginatedPlans(): any[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredPlans.slice(startIndex, startIndex + this.itemsPerPage);
    }

    onPageChanged(event: {page: number, pageSize: number}) {
        this.currentPage = event.page;
        this.itemsPerPage = event.pageSize;
    }

    onFilterChange() {
        this.currentPage = 1;
    }

    clearFilters() {
        this.searchText = '';
        this.statusFilter = '';
        this.ownerFilter = '';
        this.sortMode = 'priority';
        this.onFilterChange();
    }

    loadPlans() {
        this.actionError = '';
        this.actionSuccess = '';

        this.riskService.getRisks().subscribe((risks) => {
            const today = this.startOfDay(new Date());

            this.plans = risks.map((risk) => {
                const normalizedStatus = this.normalizeRiskStatus((risk as any).statutCode || risk.statut);
                const dueDate = this.startOfDay(new Date(risk.dateEcheance));
                const daysRemaining = Math.ceil((dueDate.getTime() - today.getTime()) / 86400000);
                let status = 'En cours';
                let progress = 0;

                if (normalizedStatus === RiskStatus.TREATED || normalizedStatus === RiskStatus.CLOSED) {
                    status = 'Termine';
                    progress = 100;
                } else if (dueDate < today) {
                    status = 'En retard';
                    progress = 25;
                } else if (normalizedStatus === RiskStatus.IN_PROGRESS) {
                    status = 'En cours';
                    progress = 50;
                } else {
                    status = 'A planifier';
                    progress = risk.planActionTraitement ? 20 : 5;
                }

                const owner = risk.responsableTraitement
                    ? `${risk.responsableTraitement.prenom || ''} ${risk.responsableTraitement.nom || ''}`.trim()
                    : 'Non assigne';
                const assignee = risk.riskAgent
                    ? `${risk.riskAgent.prenom || ''} ${risk.riskAgent.nom || ''}`.trim()
                    : 'Non assigne';

                return {
                    id: risk.id,
                    risk,
                    name: risk.planActionTraitement || `Traitement: ${risk.titre}`,
                    riskTitle: risk.titre,
                    description: risk.explication,
                    domaine: risk.domaine,
                    dateEcheance: risk.dateEcheance,
                    progress,
                    status,
                    owner,
                    assignee,
                    riskStatus: normalizedStatus,
                    frequency: risk.frequenceTraitement || PeriodicFrequency.NONE,
                    nextDeadline: risk.prochaineEcheance,
                    daysRemaining,
                    priorityScore: this.getPriorityScore(status, daysRemaining, risk),
                };
            });

            this.recalcMetrics();
            this.currentPage = 1;
        });
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }

    viewDetails(plan: any) {
        this.selectedPlan = plan;
        this.editDraft = this.buildDraft(plan);
        this.showDetailPanel = true;
        this.isEditing = false;
        this.actionError = '';
        this.actionSuccess = '';
    }

    editPlan(plan: any) {
        if (!this.isRiskManager) {
            this.viewDetails(plan);
            return;
        }

        this.selectedPlan = plan;
        this.editDraft = this.buildDraft(plan);
        this.showDetailPanel = true;
        this.isEditing = true;
        this.actionError = '';
        this.actionSuccess = '';
    }

    closePanel() {
        this.showDetailPanel = false;
        this.selectedPlan = null;
        this.editDraft = {};
        this.isEditing = false;
        this.isSaving = false;
        this.actionError = '';
        this.actionSuccess = '';
    }

    savePlanEdits() {
        if (!this.selectedPlan || !this.isRiskManager || this.isSaving) return;

        this.isSaving = true;
        this.actionError = '';
        this.actionSuccess = '';

        const formData = this.buildUpdateFormData(this.selectedPlan.risk, {
            planActionTraitement: this.editDraft.planActionTraitement,
            dateEcheance: this.editDraft.dateEcheance,
            frequenceTraitement: this.editDraft.frequenceTraitement,
            prochaineEcheance: this.editDraft.prochaineEcheance
        });

        this.riskService.updateRisk(this.selectedPlan.id, formData).subscribe({
            next: () => {
                this.isSaving = false;
                this.actionSuccess = 'Plan mis a jour.';
                this.loadPlans();
                this.isEditing = false;
                this.showDetailPanel = false;
            },
            error: (error: any) => {
                this.isSaving = false;
                this.actionError = error.error?.message || 'Erreur lors de la mise a jour du plan.';
            }
        });
    }

    markAsCompleted(plan: any) {
        if (this.isSaving) return;

        this.isSaving = true;
        this.actionError = '';
        this.riskService.updateStatus(plan.id, RiskStatus.TREATED).subscribe({
            next: () => {
                this.isSaving = false;
                plan.status = 'Termine';
                plan.progress = 100;
                this.actionSuccess = 'Plan marque comme termine.';
                this.recalcMetrics();
            },
            error: (error: any) => {
                this.isSaving = false;
                this.actionError = error.error?.message || 'Erreur lors de la mise a jour du statut.';
            },
        });
    }

    exportIncident(plan: any) {
        this.riskService.exportIncident(plan.id).subscribe({
            next: (blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Fiche_Incident_Risque_${plan.id}.xlsm`;
                link.click();
                window.URL.revokeObjectURL(url);
            },
            error: (error: any) => {
                this.actionError = error.error?.message || 'Erreur lors de l export incident.';
            }
        });
    }

    recalcMetrics() {
        this.metrics.total = this.plans.length;
        this.metrics.enCours = this.plans.filter((plan) => plan.status === 'En cours' || plan.status === 'A planifier').length;
        this.metrics.enRetard = this.plans.filter((plan) => plan.status === 'En retard').length;
        this.metrics.termines = this.plans.filter((plan) => plan.status === 'Termine').length;
        this.completionRate = this.metrics.total > 0
            ? Math.round((this.metrics.termines / this.metrics.total) * 100)
            : 0;
        this.overdueRate = this.metrics.total > 0
            ? Math.round((this.metrics.enRetard / this.metrics.total) * 100)
            : 0;
    }

    getFrequencyLabel(value: string | null | undefined): string {
        const normalized = this.normalize(value);
        return PERIODIC_FREQUENCY_LABELS[normalized] || value || 'Aucun';
    }

    private buildDraft(plan: any) {
        return {
            planActionTraitement: plan.risk.planActionTraitement || '',
            dateEcheance: this.toDateInputValue(plan.risk.dateEcheance),
            frequenceTraitement: plan.frequency || PeriodicFrequency.NONE,
            prochaineEcheance: plan.nextDeadline ? this.toDateInputValue(plan.nextDeadline) : ''
        };
    }

    private buildUpdateFormData(risk: Risk, overrides: Record<string, any>): FormData {
        const formData = new FormData();
        const payload: Record<string, any> = {
            titre: risk.titre,
            explication: risk.explication,
            domaine: risk.domaine,
            macroProcessus: risk.macroProcessus,
            processus: risk.processus,
            departementId: risk.departementId,
            dateEcheance: risk.dateEcheance,
            niveauRisque: (risk as any).niveauRisqueCode || risk.niveauRisque,
            probabilite: risk.probabilite,
            impact: risk.impact,
            niveauMaitrise: risk.niveauMaitrise,
            dmrExistant: risk.dmrExistant,
            planActionTraitement: risk.planActionTraitement,
            responsableTraitementId: risk.responsableTraitementId,
            frequenceTraitement: risk.frequenceTraitement || PeriodicFrequency.NONE,
            prochaineEcheance: risk.prochaineEcheance,
            ...overrides,
        };

        Object.keys(payload).forEach((key) => {
            const value = payload[key];
            formData.append(key, value === null || value === undefined ? '' : String(value));
        });

        return formData;
    }

    private getPriorityScore(status: string, daysRemaining: number, risk: Risk): number {
        const level = this.normalize((risk as any).niveauRisqueCode || risk.niveauRisque);
        const levelScore: Record<string, number> = { critical: 40, high: 30, medium: 20, limited: 10, low: 5 };
        const statusScore = status === 'En retard' ? 60 : status === 'A planifier' ? 25 : 10;
        const deadlineScore = daysRemaining <= 3 ? 20 : daysRemaining <= 7 ? 12 : daysRemaining <= 30 ? 5 : 0;
        return statusScore + deadlineScore + (levelScore[level] || 0);
    }

    private toDateInputValue(value: Date | string | null | undefined): string {
        if (!value) return '';
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
    }

    private startOfDay(date: Date): Date {
        const copy = new Date(date);
        copy.setHours(0, 0, 0, 0);
        return copy;
    }

    private normalizeRiskStatus(status?: string | null): string {
        return this.normalize(status);
    }

    private normalize(value?: string | null): string {
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[\s-]+/g, '_');
    }
}
