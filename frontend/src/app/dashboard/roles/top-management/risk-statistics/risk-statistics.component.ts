import { Component, OnInit } from '@angular/core';
import { RiskService, Risk, RiskLevel, RiskStatus } from '../../../../core/services/risk.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-risk-statistics',
    templateUrl: './risk-statistics.component.html',
    styleUrls: ['../../../dashboard.component.scss']
})
export class RiskStatisticsComponent implements OnInit {
    risks: Risk[] = [];

    // Stats for Charts
    levelStats: { [key: string]: number } = {};
    statusStats: { [key: string]: number } = {};
    domainStats: { [key: string]: number } = {};
    deptStats: { [key: string]: number } = {};

    totalRisks: number = 0;
    criticalRate: number = 0;
    treatmentRate: number = 0;
    avgMaturity: number = 0;

    constructor(private riskService: RiskService, private router: Router) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.riskService.getRisks().subscribe(risks => {
            this.risks = risks;
            this.totalRisks = risks.length;
            this.calculateStats();
        });
    }

    calculateStats() {
        this.levelStats = {
            'Faible': 0,
            'Moyen': 0,
            'Élevé': 0,
            'Critique': 0
        };

        this.statusStats = {
            'En cours': 0,
            'Traité': 0,
            'Clôturé': 0
        };

        this.domainStats = {};
        this.deptStats = {};

        this.risks.forEach(r => {
            if (this.levelStats[r.niveauRisque] !== undefined) this.levelStats[r.niveauRisque]++;
            if (this.statusStats[r.statut] !== undefined) this.statusStats[r.statut]++;

            const domain = r.domaine || 'Général';
            this.domainStats[domain] = (this.domainStats[domain] || 0) + 1;

            const dept = r.departement?.nom || 'Non spécifié';
            this.deptStats[dept] = (this.deptStats[dept] || 0) + 1;
        });

        const criticalCount = this.levelStats['Critique'] || 0;
        this.criticalRate = this.totalRisks > 0 ? Math.round((criticalCount / this.totalRisks) * 100) : 0;

        const treatedCount = (this.statusStats['Traité'] || 0) + (this.statusStats['Clôturé'] || 0);
        this.treatmentRate = this.totalRisks > 0 ? Math.round((treatedCount / this.totalRisks) * 100) : 0;

        // Dynamic maturity: base 2.0 + bonus for treated risks + bonus for low critical rate
        const maturityBonus = (this.treatmentRate / 100) * 2.0;
        const criticalPenalty = (this.criticalRate / 100) * 1.0;
        this.avgMaturity = Number((2.0 + maturityBonus - criticalPenalty + 1.0).toFixed(1));
        if (this.avgMaturity > 5) this.avgMaturity = 5;
    }

    // Helper for CSS Pie Charts
    getRotation(value: number, total: number): number {
        return total > 0 ? (value / total) * 360 : 0;
    }

    exportCSV() {
        const rows = [
            ['Categorie', 'Metrique', 'Valeur'],
            ['Overview', 'Total Risques', this.totalRisks],
            ['Overview', 'Taux de Traitement', this.treatmentRate + '%'],
            ['Overview', 'Niveau de Maturite', this.avgMaturity + '/5'],
            ['Overview', 'Taux de Risques Critiques', this.criticalRate + '%'],
            [''],
            ['Distribution par Sévérité', '', ''],
            ...Object.entries(this.levelStats).map(([k, v]) => ['Severite', k, v]),
            [''],
            ['État d\'Avancement', '', ''],
            ...Object.entries(this.statusStats).map(([k, v]) => ['Statut', k, v]),
            [''],
            ['Distribution par Domaine', '', ''],
            ...Object.entries(this.domainStats).map(([k, v]) => ['Domaine', k, v]),
            [''],
            ['Distribution par Département', '', ''],
            ...Object.entries(this.deptStats).map(([k, v]) => ['Departement', k, v])
        ];

        const csvContent = rows.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", `statistiques_risques_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }
}
