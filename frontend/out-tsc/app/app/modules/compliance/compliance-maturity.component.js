import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComplianceService } from './compliance.service';
import { getComplianceNavItems, getStoredComplianceRole } from './compliance-navigation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./compliance.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
const _c0 = function () { return { exact: true }; };
function ComplianceMaturityComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r7.route)("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r7.label, " ");
} }
function ComplianceMaturityComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelementStart(1, "p", 23);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function ComplianceMaturityComponent_option_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const framework_r8 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", framework_r8.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate3(" ", framework_r8.code, " - ", framework_r8.name, " v", framework_r8.version, " ");
} }
function ComplianceMaturityComponent_div_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelementStart(1, "div", 25);
    i0.ɵɵelementStart(2, "span", 26);
    i0.ɵɵtext(3, "Couverture mixte");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Exigences couvertes totalement ou partiellement.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 25);
    i0.ɵɵelementStart(9, "span", 26);
    i0.ɵɵtext(10, "Couverture totale");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "Exigences avec couverture complete.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 25);
    i0.ɵɵelementStart(16, "span", 26);
    i0.ɵɵtext(17, "Exigences sans couverture");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "h3");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, "Points encore non relies a des dispositifs.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.formatPercent(ctx_r3.frameworkCoverage));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r3.formatPercent(ctx_r3.frameworkFullCoverage));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r3.uncoveredRequirementsCount);
} }
function ComplianceMaturityComponent_div_38_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 42);
    i0.ɵɵelement(1, "i", 43);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r16 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("background", item_r16.color);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r16.label, " ");
} }
function ComplianceMaturityComponent_div_38__svg_polygon_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "polygon");
} if (rf & 2) {
    const polygon_r17 = ctx.$implicit;
    i0.ɵɵattribute("points", polygon_r17);
} }
function ComplianceMaturityComponent_div_38__svg_line_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "line", 44);
} if (rf & 2) {
    const axis_r18 = ctx.$implicit;
    i0.ɵɵattribute("x2", axis_r18.x)("y2", axis_r18.y);
} }
function ComplianceMaturityComponent_div_38__svg_text_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "text");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r19 = ctx.$implicit;
    i0.ɵɵattribute("x", level_r19.x)("y", level_r19.y);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", level_r19.value, "%");
} }
function ComplianceMaturityComponent_div_38__svg_circle_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "circle", 45);
} if (rf & 2) {
    const point_r20 = ctx.$implicit;
    i0.ɵɵattribute("cx", point_r20.x)("cy", point_r20.y);
} }
function ComplianceMaturityComponent_div_38__svg_circle_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "circle", 46);
} if (rf & 2) {
    const point_r21 = ctx.$implicit;
    i0.ɵɵattribute("cx", point_r21.x)("cy", point_r21.y);
} }
function ComplianceMaturityComponent_div_38__svg_text_15__svg_tspan_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "tspan");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const line_r25 = ctx.$implicit;
    const lineIndex_r26 = ctx.index;
    const axis_r22 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("x", axis_r22.labelX)("dy", lineIndex_r26 === 0 ? 0 : 14);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(line_r25);
} }
function ComplianceMaturityComponent_div_38__svg_text_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "text", 47);
    i0.ɵɵtemplate(1, ComplianceMaturityComponent_div_38__svg_text_15__svg_tspan_1_Template, 2, 3, "tspan", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const axis_r22 = ctx.$implicit;
    const i_r23 = ctx.index;
    const ctx_r15 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("x", axis_r22.labelX)("y", axis_r22.labelY);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r15.radarChartModel.labelLines[i_r23]);
} }
function ComplianceMaturityComponent_div_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵelementStart(1, "div", 28);
    i0.ɵɵtemplate(2, ComplianceMaturityComponent_div_38_span_2_Template, 3, 3, "span", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 30);
    i0.ɵɵelementStart(4, "g", 31);
    i0.ɵɵtemplate(5, ComplianceMaturityComponent_div_38__svg_polygon_5_Template, 1, 1, "polygon", 32);
    i0.ɵɵtemplate(6, ComplianceMaturityComponent_div_38__svg_line_6_Template, 1, 2, "line", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "g", 34);
    i0.ɵɵtemplate(8, ComplianceMaturityComponent_div_38__svg_text_8_Template, 2, 3, "text", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "polygon", 35);
    i0.ɵɵelement(10, "polygon", 36);
    i0.ɵɵelementStart(11, "g", 37);
    i0.ɵɵtemplate(12, ComplianceMaturityComponent_div_38__svg_circle_12_Template, 1, 2, "circle", 38);
    i0.ɵɵtemplate(13, ComplianceMaturityComponent_div_38__svg_circle_13_Template, 1, 2, "circle", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "g", 40);
    i0.ɵɵtemplate(15, ComplianceMaturityComponent_div_38__svg_text_15_Template, 2, 3, "text", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r4.radarSeriesLegend);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r4.radarChartModel.gridPolygons);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r4.radarChartModel.axes);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r4.radarChartModel.levelLabels);
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("points", ctx_r4.radarChartModel.partialPolygon);
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("points", ctx_r4.radarChartModel.totalPolygon);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r4.radarChartModel.partialPoints);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r4.radarChartModel.totalPoints);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r4.radarChartModel.axes);
} }
function ComplianceMaturityComponent_ng_template_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵelement(1, "i", 5);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Radar non disponible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Selectionnez un referentiel contenant des exigences pour afficher les KPI de maturite.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class ComplianceMaturityComponent {
    constructor(router, complianceService) {
        this.router = router;
        this.complianceService = complianceService;
        this.navItems = getComplianceNavItems(getStoredComplianceRole());
        this.radarGridLevels = [20, 40, 60, 80, 100];
        this.radarSeriesLegend = [
            { key: 'partial', label: 'Confo. totale et partielle', color: '#2c6fd6' },
            { key: 'total', label: 'Confo. totale', color: '#f08a24' }
        ];
        this.frameworks = [];
        this.requirements = [];
        this.mappings = [];
        this.selectedFrameworkId = null;
        this.isLoading = false;
        this.error = '';
        this.radarChartModel = this.createEmptyRadarChart();
    }
    ngOnInit() {
        this.loadFrameworks();
    }
    get selectedFramework() {
        return this.frameworks.find(item => item.id === this.selectedFrameworkId) || null;
    }
    get frameworkCoverage() {
        const chart = this.radarChartModel;
        if (!chart.labels.length) {
            return 0;
        }
        const total = chart.partialValues.reduce((sum, value) => sum + value, 0);
        return Math.round(total / chart.partialValues.length);
    }
    get frameworkFullCoverage() {
        const chart = this.radarChartModel;
        if (!chart.labels.length) {
            return 0;
        }
        const total = chart.totalValues.reduce((sum, value) => sum + value, 0);
        return Math.round(total / chart.totalValues.length);
    }
    get uncoveredRequirementsCount() {
        if (!this.requirements.length) {
            return 0;
        }
        const coveredIds = new Set(this.mappings
            .filter(item => ['partial', 'covered'].includes(String(item.coverageLevelCode || item.coverageLevel || '').toLowerCase()))
            .map(item => item.requirementId));
        return this.requirements.filter(item => !coveredIds.has(item.id)).length;
    }
    goBack() {
        this.router.navigate(['/dashboard/compliance']);
    }
    loadFrameworks() {
        this.isLoading = true;
        this.error = '';
        this.complianceService.getFrameworks().subscribe({
            next: frameworks => {
                this.frameworks = frameworks;
                if (this.selectedFrameworkId && !frameworks.some(item => item.id === this.selectedFrameworkId)) {
                    this.selectedFrameworkId = null;
                }
                if (!this.selectedFrameworkId && frameworks.length > 0) {
                    this.selectedFrameworkId = frameworks[0].id;
                }
                this.isLoading = false;
                this.loadRequirements();
            },
            error: err => {
                var _a;
                this.frameworks = [];
                this.requirements = [];
                this.mappings = [];
                this.radarChartModel = this.createEmptyRadarChart();
                this.isLoading = false;
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de charger les referentiels.';
            }
        });
    }
    selectFramework(frameworkId) {
        this.selectedFrameworkId = frameworkId;
        this.loadRequirements();
    }
    loadRequirements() {
        if (!this.selectedFrameworkId) {
            this.requirements = [];
            this.mappings = [];
            this.radarChartModel = this.createEmptyRadarChart();
            return;
        }
        this.complianceService.getRequirements(this.selectedFrameworkId).subscribe({
            next: items => {
                this.requirements = items;
                this.loadMappings();
            },
            error: err => {
                var _a;
                this.requirements = [];
                this.mappings = [];
                this.radarChartModel = this.createEmptyRadarChart();
                this.error = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Impossible de charger les exigences.';
            }
        });
    }
    loadMappings() {
        if (!this.selectedFrameworkId) {
            this.mappings = [];
            this.radarChartModel = this.createEmptyRadarChart();
            return;
        }
        this.complianceService.getMappings().subscribe({
            next: items => {
                const requirementIds = new Set(this.requirements.map(item => item.id));
                this.mappings = items.filter(item => requirementIds.has(item.requirementId));
                this.refreshRadarChart();
            },
            error: () => {
                this.mappings = [];
                this.refreshRadarChart();
            }
        });
    }
    formatPercent(value) {
        return `${Math.round(value)}%`;
    }
    buildRadarChart() {
        const centerX = 280;
        const centerY = 195;
        const radius = 132;
        const chapterMap = new Map();
        const mappingsByRequirement = new Map();
        this.mappings.forEach(item => {
            const key = item.requirementId;
            const current = mappingsByRequirement.get(key);
            const next = String(item.coverageLevelCode || item.coverageLevel || '').toLowerCase();
            if (!current || this.getCoveragePriority(next) > this.getCoveragePriority(current)) {
                mappingsByRequirement.set(key, next);
            }
        });
        this.requirements.forEach(requirement => {
            const chapter = this.resolveChapterLabel(requirement);
            const key = chapter.toLowerCase();
            const existing = chapterMap.get(key) || {
                key,
                label: chapter,
                order: this.resolveChapterOrder(requirement),
                totalWeight: 0,
                partialWeight: 0,
                coveredWeight: 0
            };
            const weight = Number(requirement.weight || 1);
            const coverage = mappingsByRequirement.get(requirement.id) || 'uncovered';
            existing.totalWeight += weight;
            if (coverage === 'covered') {
                existing.partialWeight += weight;
                existing.coveredWeight += weight;
            }
            else if (coverage === 'partial') {
                existing.partialWeight += weight;
            }
            chapterMap.set(key, existing);
        });
        const chapters = Array.from(chapterMap.values()).sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
        if (!chapters.length) {
            return this.createEmptyRadarChart();
        }
        const axes = chapters.map((item, index) => {
            const angle = this.toRadarAngle(index, chapters.length);
            const point = this.projectPoint(centerX, centerY, radius, angle);
            const labelPoint = this.projectPoint(centerX, centerY, radius + 38, angle);
            return {
                x: point.x,
                y: point.y,
                labelX: labelPoint.x,
                labelY: labelPoint.y
            };
        });
        const partialValues = chapters.map(item => item.totalWeight > 0 ? Math.round((item.partialWeight / item.totalWeight) * 100) : 0);
        const totalValues = chapters.map(item => item.totalWeight > 0 ? Math.round((item.coveredWeight / item.totalWeight) * 100) : 0);
        const partialPoints = partialValues.map((value, index) => this.projectPoint(centerX, centerY, radius * (Math.max(0, Math.min(100, value)) / 100), this.toRadarAngle(index, chapters.length)));
        const totalPoints = totalValues.map((value, index) => this.projectPoint(centerX, centerY, radius * (Math.max(0, Math.min(100, value)) / 100), this.toRadarAngle(index, chapters.length)));
        return {
            labels: chapters.map(item => item.label),
            labelLines: chapters.map(item => this.wrapRadarLabel(item.label)),
            partialValues,
            totalValues,
            partialPolygon: this.buildRadarPolygon(partialValues, centerX, centerY, radius),
            totalPolygon: this.buildRadarPolygon(totalValues, centerX, centerY, radius),
            partialPoints,
            totalPoints,
            axes,
            gridPolygons: this.radarGridLevels.map(level => this.buildRadarPolygon(new Array(chapters.length).fill(level), centerX, centerY, radius)),
            levelLabels: this.radarGridLevels.map(level => ({
                value: level,
                x: centerX + 8,
                y: centerY - (radius * level / 100) + 4
            }))
        };
    }
    refreshRadarChart() {
        this.radarChartModel = this.buildRadarChart();
    }
    createEmptyRadarChart() {
        return {
            labels: [],
            labelLines: [],
            partialValues: [],
            totalValues: [],
            partialPolygon: '',
            totalPolygon: '',
            partialPoints: [],
            totalPoints: [],
            axes: [],
            gridPolygons: [],
            levelLabels: []
        };
    }
    resolveChapterLabel(requirement) {
        const chapter = (requirement.chapter || '').trim();
        if (chapter) {
            return chapter;
        }
        const articleMatch = String(requirement.code || '').match(/^(Article\s+\d+)/i);
        if (articleMatch) {
            return articleMatch[1];
        }
        const codeMatch = String(requirement.code || '').match(/^((?:[A-Z]\.)?\d+(?:\.\d+)?)/);
        return codeMatch ? `Chapitre ${codeMatch[1]}` : 'Hors chapitre';
    }
    resolveChapterOrder(requirement) {
        const source = `${requirement.chapter || ''} ${requirement.code || ''}`;
        const numbers = source.match(/\d+/g);
        if (!(numbers === null || numbers === void 0 ? void 0 : numbers.length)) {
            return Number(requirement.orderIndex || 9999);
        }
        return numbers
            .slice(0, 3)
            .reduce((sum, value, index) => sum + Number(value) / Math.pow(100, index), 0);
    }
    getCoveragePriority(value) {
        if (value === 'covered') {
            return 3;
        }
        if (value === 'partial') {
            return 2;
        }
        return 1;
    }
    buildRadarPolygon(values, centerX, centerY, radius) {
        return values
            .map((value, index) => {
            const angle = this.toRadarAngle(index, values.length);
            const point = this.projectPoint(centerX, centerY, radius * (Math.max(0, Math.min(100, value)) / 100), angle);
            return `${point.x},${point.y}`;
        })
            .join(' ');
    }
    projectPoint(centerX, centerY, radius, angle) {
        return {
            x: Number((centerX + Math.cos(angle) * radius).toFixed(2)),
            y: Number((centerY + Math.sin(angle) * radius).toFixed(2))
        };
    }
    toRadarAngle(index, total) {
        return (-Math.PI / 2) + (Math.PI * 2 * index / total);
    }
    wrapRadarLabel(label) {
        const cleaned = label.replace(/\s+/g, ' ').trim();
        if (cleaned.length <= 24) {
            return [cleaned];
        }
        const words = cleaned.split(' ');
        const lines = [];
        let current = '';
        words.forEach(word => {
            const candidate = current ? `${current} ${word}` : word;
            if (candidate.length <= 24) {
                current = candidate;
            }
            else {
                if (current) {
                    lines.push(current);
                }
                current = word;
            }
        });
        if (current) {
            lines.push(current);
        }
        return lines.slice(0, 3);
    }
}
ComplianceMaturityComponent.ɵfac = function ComplianceMaturityComponent_Factory(t) { return new (t || ComplianceMaturityComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ComplianceService)); };
ComplianceMaturityComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ComplianceMaturityComponent, selectors: [["app-compliance-maturity"]], decls: 41, vars: 12, consts: [[1, "compliance-workspace"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-chart-line"], [1, "header-actions"], [1, "btn-refresh", 3, "disabled", "click"], [1, "fas", 3, "ngClass"], [1, "compliance-tabs"], ["routerLinkActive", "active", "class", "compliance-tab", 3, "routerLink", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["class", "content-card", 4, "ngIf"], [1, "content-card"], [1, "card-head"], [1, "filter-field"], [3, "ngModel", "disabled", "ngModelChange"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "content-card", "maturity-card"], ["class", "maturity-kpis", 4, "ngIf", "ngIfElse"], ["class", "radar-wrapper", 4, "ngIf", "ngIfElse"], ["emptyRadar", ""], ["routerLinkActive", "active", 1, "compliance-tab", 3, "routerLink", "routerLinkActiveOptions"], [1, "feedback-message", "error"], [1, "maturity-kpis"], [1, "summary-card"], [1, "eyebrow"], [1, "radar-wrapper"], [1, "radar-legend"], ["class", "legend-item", 4, "ngFor", "ngForOf"], ["viewBox", "0 0 560 420", "aria-label", "Graphe radar de maturite", 1, "radar-chart"], [1, "radar-grid"], [4, "ngFor", "ngForOf"], ["x1", "280", "y1", "195", 4, "ngFor", "ngForOf"], [1, "radar-level-labels"], [1, "radar-area", "partial"], [1, "radar-area", "total"], [1, "radar-points"], ["class", "point partial", "r", "4", 4, "ngFor", "ngForOf"], ["class", "point total", "r", "4", 4, "ngFor", "ngForOf"], [1, "radar-labels"], ["text-anchor", "middle", 4, "ngFor", "ngForOf"], [1, "legend-item"], [1, "legend-dot"], ["x1", "280", "y1", "195"], ["r", "4", 1, "point", "partial"], ["r", "4", 1, "point", "total"], ["text-anchor", "middle"], [1, "empty-state", "compact"]], template: function ComplianceMaturityComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function ComplianceMaturityComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " KPI de maturite");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Sous-module dedie au pilotage de la maturite par chapitre a partir de la couverture des exigences.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "button", 7);
        i0.ɵɵlistener("click", function ComplianceMaturityComponent_Template_button_click_12_listener() { return ctx.loadFrameworks(); });
        i0.ɵɵelement(13, "i", 8);
        i0.ɵɵtext(14, " Actualiser ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "nav", 9);
        i0.ɵɵtemplate(16, ComplianceMaturityComponent_a_16_Template, 2, 4, "a", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, ComplianceMaturityComponent_div_17_Template, 3, 1, "div", 11);
        i0.ɵɵelementStart(18, "section", 12);
        i0.ɵɵelementStart(19, "div", 13);
        i0.ɵɵelementStart(20, "h2");
        i0.ɵɵtext(21, "Referentiel analyse");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "p");
        i0.ɵɵtext(23, "Choisissez un referentiel pour afficher son niveau de couverture par chapitre.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "div", 14);
        i0.ɵɵelementStart(25, "label");
        i0.ɵɵtext(26, "Referentiel actif");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "select", 15);
        i0.ɵɵlistener("ngModelChange", function ComplianceMaturityComponent_Template_select_ngModelChange_27_listener($event) { return ctx.selectFramework($event); });
        i0.ɵɵelementStart(28, "option", 16);
        i0.ɵɵtext(29, "Choisir un referentiel");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(30, ComplianceMaturityComponent_option_30_Template, 2, 4, "option", 17);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "section", 18);
        i0.ɵɵelementStart(32, "div", 13);
        i0.ɵɵelementStart(33, "h2");
        i0.ɵɵtext(34, "Radar par chapitre");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "p");
        i0.ɵɵtext(36, "Le graphe compare la couverture totale+partielle et la couverture totale pour chaque chapitre du referentiel actif.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(37, ComplianceMaturityComponent_div_37_Template, 22, 3, "div", 19);
        i0.ɵɵtemplate(38, ComplianceMaturityComponent_div_38_Template, 16, 9, "div", 20);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(39, ComplianceMaturityComponent_ng_template_39_Template, 6, 0, "ng-template", null, 21, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r5 = i0.ɵɵreference(40);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("disabled", ctx.isLoading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.isLoading ? "fa-circle-notch fa-spin" : "fa-rotate-right");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.navItems);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.error);
        i0.ɵɵadvance(10);
        i0.ɵɵproperty("ngModel", ctx.selectedFrameworkId)("disabled", ctx.frameworks.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngValue", null);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.frameworks);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngIf", ctx.selectedFrameworkId && ctx.requirements.length > 0)("ngIfElse", _r5);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.selectedFrameworkId && ctx.requirements.length > 0 && ctx.radarChartModel.labels.length > 0)("ngIfElse", _r5);
    } }, directives: [i3.NgClass, i3.NgForOf, i3.NgIf, i4.SelectControlValueAccessor, i4.NgControlStatus, i4.NgModel, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i1.RouterLinkWithHref, i1.RouterLinkActive], styles: ["@import './compliance-shared';"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ComplianceMaturityComponent, [{
        type: Component,
        args: [{
                selector: 'app-compliance-maturity',
                templateUrl: './compliance-maturity.component.html',
                styleUrls: ['./compliance-maturity.component.scss']
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.ComplianceService }]; }, null); })();
//# sourceMappingURL=compliance-maturity.component.js.map