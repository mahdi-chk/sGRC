import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RiskService } from '../../core/services/risk.service';
import { AuditingService } from '../../core/services/auditing.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/risk.service";
import * as i2 from "../../core/services/auditing.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
function PlanningComponent_div_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const name_r5 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(name_r5);
} }
function PlanningComponent_div_26_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 29);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, day_r6.date, "d"));
} }
function PlanningComponent_div_26_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 30);
} }
function PlanningComponent_div_26_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 31);
} }
function PlanningComponent_div_26_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵlistener("click", function PlanningComponent_div_26_Template_div_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r12); const day_r6 = restoredCtx.$implicit; const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.selectDay(day_r6); });
    i0.ɵɵtemplate(1, PlanningComponent_div_26_span_1_Template, 3, 4, "span", 25);
    i0.ɵɵelementStart(2, "div", 26);
    i0.ɵɵtemplate(3, PlanningComponent_div_26_div_3_Template, 1, 0, "div", 27);
    i0.ɵɵtemplate(4, PlanningComponent_div_26_div_4_Template, 1, 0, "div", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("today", day_r6.isToday)("not-current", !day_r6.isCurrentMonth)("has-risks", day_r6.risks.length > 0)("has-missions", day_r6.missions.length > 0)("selected", ctx_r1.selectedDay === day_r6);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", day_r6.date);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", day_r6.risks.length > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", day_r6.missions.length > 0);
} }
function PlanningComponent_div_28_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 36);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r13.selectedDay.risks.length, " risque(s) ");
} }
function PlanningComponent_div_28_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 38);
    i0.ɵɵelement(1, "i", 39);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r14.selectedDay.missions.length, " mission(s) ");
} }
function PlanningComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵelementStart(1, "h3");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 33);
    i0.ɵɵtemplate(5, PlanningComponent_div_28_span_5_Template, 3, 1, "span", 34);
    i0.ɵɵtemplate(6, PlanningComponent_div_28_span_6_Template, 3, 1, "span", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 3, ctx_r2.selectedDay.date, "longDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.selectedDay.risks.length > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.selectedDay.missions.length > 0);
} }
function PlanningComponent_div_29_div_1_div_7_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 60);
    i0.ɵɵelement(1, "i", 61);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", mission_r18.risk.titre, " ");
} }
function PlanningComponent_div_29_div_1_div_7_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 62);
    i0.ɵɵelementStart(1, "span", 63);
    i0.ɵɵtext(2, "Objectifs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(mission_r18.objectifs);
} }
function PlanningComponent_div_29_div_1_div_7_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 63);
    i0.ɵɵtext(2, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(mission_r18.description);
} }
function PlanningComponent_div_29_div_1_div_7_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelementStart(1, "span", 63);
    i0.ɵɵtext(2, "Responsabilites");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(mission_r18.responsabilites);
} }
function PlanningComponent_div_29_div_1_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵelementStart(1, "div", 47);
    i0.ɵɵelementStart(2, "span", 48);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 49);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 50);
    i0.ɵɵelementStart(7, "span", 51);
    i0.ɵɵelement(8, "i", 52);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 53);
    i0.ɵɵelement(12, "i", 54);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, PlanningComponent_div_29_div_1_div_7_span_14_Template, 3, 1, "span", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, PlanningComponent_div_29_div_1_div_7_div_15_Template, 5, 1, "div", 56);
    i0.ɵɵtemplate(16, PlanningComponent_div_29_div_1_div_7_div_16_Template, 5, 1, "div", 57);
    i0.ɵɵtemplate(17, PlanningComponent_div_29_div_1_div_7_div_17_Template, 5, 1, "div", 57);
    i0.ɵɵelementStart(18, "div", 58);
    i0.ɵɵelementStart(19, "span", 59);
    i0.ɵɵtext(20, "Mission d'audit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mission_r18 = ctx.$implicit;
    const ctx_r17 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(mission_r18.titre);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r17.getMissionStatusClass(mission_r18.statut));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", mission_r18.statut, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" Echeance ", i0.ɵɵpipeBind2(10, 9, mission_r18.delai, "dd/MM/yyyy"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", mission_r18.auditeur ? mission_r18.auditeur.prenom + " " + mission_r18.auditeur.nom : "Auditeur a affecter", " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", mission_r18.risk == null ? null : mission_r18.risk.titre);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", mission_r18.objectifs);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", mission_r18.description && mission_r18.description !== mission_r18.objectifs);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !mission_r18.objectifs && !mission_r18.description && mission_r18.responsabilites);
} }
function PlanningComponent_div_29_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵelementStart(1, "div", 43);
    i0.ɵɵelementStart(2, "h4");
    i0.ɵɵelement(3, "i", 44);
    i0.ɵɵtext(4, " Missions programmees");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, PlanningComponent_div_29_div_1_div_7_Template, 21, 12, "div", 45);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r15.selectedDay.missions.length);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r15.selectedDay.missions);
} }
function PlanningComponent_div_29_div_2_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 66);
    i0.ɵɵelementStart(1, "div", 67);
    i0.ɵɵelementStart(2, "span", 68);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 69);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 70);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 71);
    i0.ɵɵelement(9, "span", 72);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const risk_r28 = ctx.$implicit;
    const ctx_r27 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(risk_r28.titre);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r27.getRiskLevelClass(risk_r28.niveauRisque));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", risk_r28.niveauRisque, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(risk_r28.explication);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r27.getRiskStatusClass(risk_r28.statut));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", risk_r28.statut, " ");
} }
function PlanningComponent_div_29_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵelementStart(1, "div", 43);
    i0.ɵɵelementStart(2, "h4");
    i0.ɵɵelement(3, "i", 37);
    i0.ɵɵtext(4, " Risques a echeance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, PlanningComponent_div_29_div_2_div_7_Template, 11, 6, "div", 65);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r16.selectedDay.risks.length);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r16.selectedDay.risks);
} }
function PlanningComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵtemplate(1, PlanningComponent_div_29_div_1_Template, 8, 2, "div", 41);
    i0.ɵɵtemplate(2, PlanningComponent_div_29_div_2_Template, 8, 2, "div", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.selectedDay.missions.length > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.selectedDay.risks.length > 0);
} }
function PlanningComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵelement(1, "i", 74);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(!ctx_r4.selectedDay ? "Selectionnez un jour" : "Rien de prevu pour ce jour");
} }
export class PlanningComponent {
    constructor(riskService, auditingService, router) {
        this.riskService = riskService;
        this.auditingService = auditingService;
        this.router = router;
        this.currentDate = new Date();
        this.days = [];
        this.risks = [];
        this.missions = [];
        this.selectedDay = null;
        this.monthNames = [
            'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'
        ];
        this.dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    }
    goBack() {
        this.router.navigate(['/dashboard']);
    }
    ngOnInit() {
        this.loadRisks();
    }
    loadRisks() {
        forkJoin({
            risks: this.riskService.getRisks().pipe(catchError(() => of([]))),
            missions: this.auditingService.getMissions().pipe(catchError(() => of([])))
        }).subscribe(({ risks, missions }) => {
            this.risks = risks || [];
            this.missions = missions || [];
            this.generateCalendar();
        });
    }
    generateCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        // Adjust to start with Monday (0: Sun, 1: Mon, ..., 6: Sat)
        let startDay = firstDayOfMonth.getDay() || 7;
        startDay = startDay - 1; // 0 for Monday
        this.days = [];
        // Previous month padding
        for (let i = startDay - 1; i >= 0; i--) {
            this.days.push({
                date: null,
                risks: [],
                missions: [],
                isToday: false,
                isCurrentMonth: false
            });
        }
        // Current month days
        const today = new Date();
        for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
            const date = new Date(year, month, d);
            const dayRisks = this.risks.filter(r => {
                const rDate = new Date(r.dateEcheance);
                return rDate.getFullYear() === year &&
                    rDate.getMonth() === month &&
                    rDate.getDate() === d;
            });
            const dayMissions = this.missions.filter(m => {
                const mDate = new Date(m.delai);
                return mDate.getFullYear() === year &&
                    mDate.getMonth() === month &&
                    mDate.getDate() === d;
            });
            this.days.push({
                date,
                risks: dayRisks,
                missions: dayMissions,
                isToday: date.toDateString() === today.toDateString(),
                isCurrentMonth: true
            });
        }
        // Next month padding to complete 6 weeks (42 days)
        const remainingDays = 42 - this.days.length;
        for (let i = 1; i <= remainingDays; i++) {
            this.days.push({
                date: null,
                risks: [],
                missions: [],
                isToday: false,
                isCurrentMonth: false
            });
        }
    }
    prevMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
        this.generateCalendar();
        this.selectedDay = null;
    }
    nextMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
        this.generateCalendar();
        this.selectedDay = null;
    }
    goToToday() {
        const today = new Date();
        this.currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
        this.generateCalendar();
        this.selectedDay = this.days.find(day => day.date && this.isSameDay(day.date, today)) || null;
    }
    selectDay(day) {
        if (day.date) {
            this.selectedDay = day;
        }
    }
    getMissionStatusClass(status) {
        return `status-${this.slugify(status)}`;
    }
    getRiskLevelClass(level) {
        return `level-${this.slugify(level)}`;
    }
    getRiskStatusClass(status) {
        return `status-${this.slugify(status)}`;
    }
    slugify(value) {
        return (value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    isSameDay(first, second) {
        return first.getFullYear() === second.getFullYear()
            && first.getMonth() === second.getMonth()
            && first.getDate() === second.getDate();
    }
    get currentMonthName() {
        return this.monthNames[this.currentDate.getMonth()];
    }
    get currentYear() {
        return this.currentDate.getFullYear();
    }
}
PlanningComponent.ɵfac = function PlanningComponent_Factory(t) { return new (t || PlanningComponent)(i0.ɵɵdirectiveInject(i1.RiskService), i0.ɵɵdirectiveInject(i2.AuditingService), i0.ɵɵdirectiveInject(i3.Router)); };
PlanningComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PlanningComponent, selectors: [["app-planning"]], decls: 31, vars: 7, consts: [[1, "planning-wrapper"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "fas", "fa-calendar-alt"], [1, "planning-content"], [1, "calendar-section"], [1, "calendar-header"], [1, "calendar-nav"], [1, "calendar-nav-main"], [1, "nav-btn", 3, "click"], [1, "fas", "fa-chevron-left"], [1, "current-period"], [1, "fas", "fa-chevron-right"], [1, "today-btn", 3, "click"], [1, "calendar-grid"], ["class", "day-name", 4, "ngFor", "ngForOf"], ["class", "calendar-day", 3, "today", "not-current", "has-risks", "has-missions", "selected", "click", 4, "ngFor", "ngForOf"], [1, "details-section"], ["class", "details-header", 4, "ngIf"], ["class", "details-content", 4, "ngIf"], ["class", "empty-details", 4, "ngIf"], [1, "day-name"], [1, "calendar-day", 3, "click"], ["class", "day-number", 4, "ngIf"], [1, "indicators"], ["class", "risk-indicator-dot", "title", "Risques", 4, "ngIf"], ["class", "mission-indicator-dot", "title", "Missions d'audit", 4, "ngIf"], [1, "day-number"], ["title", "Risques", 1, "risk-indicator-dot"], ["title", "Missions d'audit", 1, "mission-indicator-dot"], [1, "details-header"], [1, "stats-mini"], ["class", "risk-count", 4, "ngIf"], ["class", "mission-count", 4, "ngIf"], [1, "risk-count"], [1, "fas", "fa-exclamation-triangle"], [1, "mission-count"], [1, "fas", "fa-clipboard-check"], [1, "details-content"], ["class", "detail-block", 4, "ngIf"], [1, "detail-block"], [1, "detail-block-header"], [1, "fas", "fa-clipboard-list"], ["class", "mission-card", 4, "ngFor", "ngForOf"], [1, "mission-card"], [1, "mission-card-header"], [1, "mission-title"], [1, "status-badge", 3, "ngClass"], [1, "mission-highlights"], [1, "meta-chip"], [1, "fas", "fa-calendar-check"], [1, "meta-chip", "meta-chip-muted"], [1, "fas", "fa-user-check"], ["class", "meta-chip meta-chip-risk", 4, "ngIf"], ["class", "mission-detail", 4, "ngIf"], ["class", "mission-detail secondary", 4, "ngIf"], [1, "mission-meta"], [1, "tag"], [1, "meta-chip", "meta-chip-risk"], [1, "fas", "fa-shield-alt"], [1, "mission-detail"], [1, "detail-label"], [1, "mission-detail", "secondary"], ["class", "risk-card", 4, "ngFor", "ngForOf"], [1, "risk-card"], [1, "risk-card-header"], [1, "risk-title"], [1, "risk-badge", 3, "ngClass"], [1, "risk-detail"], [1, "risk-meta"], [1, "status-indicator", 3, "ngClass"], [1, "empty-details"], [1, "fas", "fa-calendar-day"]], template: function PlanningComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("click", function PlanningComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        i0.ɵɵelement(4, "i", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵelementStart(6, "h1");
        i0.ɵɵelement(7, "i", 5);
        i0.ɵɵtext(8, " Planning & Calendrier");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "p");
        i0.ɵɵtext(10, "Visualisez les echeances des risques et les missions d'audit programmees.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 6);
        i0.ɵɵelementStart(12, "div", 7);
        i0.ɵɵelementStart(13, "div", 8);
        i0.ɵɵelementStart(14, "div", 9);
        i0.ɵɵelementStart(15, "div", 10);
        i0.ɵɵelementStart(16, "button", 11);
        i0.ɵɵlistener("click", function PlanningComponent_Template_button_click_16_listener() { return ctx.prevMonth(); });
        i0.ɵɵelement(17, "i", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "span", 13);
        i0.ɵɵtext(19);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "button", 11);
        i0.ɵɵlistener("click", function PlanningComponent_Template_button_click_20_listener() { return ctx.nextMonth(); });
        i0.ɵɵelement(21, "i", 14);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "button", 15);
        i0.ɵɵlistener("click", function PlanningComponent_Template_button_click_22_listener() { return ctx.goToToday(); });
        i0.ɵɵtext(23, "Aujourd'hui");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "div", 16);
        i0.ɵɵtemplate(25, PlanningComponent_div_25_Template, 2, 1, "div", 17);
        i0.ɵɵtemplate(26, PlanningComponent_div_26_Template, 5, 13, "div", 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "div", 19);
        i0.ɵɵtemplate(28, PlanningComponent_div_28_Template, 7, 6, "div", 20);
        i0.ɵɵtemplate(29, PlanningComponent_div_29_Template, 3, 2, "div", 21);
        i0.ɵɵtemplate(30, PlanningComponent_div_30_Template, 4, 1, "div", 22);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(19);
        i0.ɵɵtextInterpolate2("", ctx.currentMonthName, " ", ctx.currentYear, "");
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngForOf", ctx.dayNames);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.days);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.selectedDay);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.selectedDay && (ctx.selectedDay.risks.length > 0 || ctx.selectedDay.missions.length > 0));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.selectedDay || ctx.selectedDay.risks.length === 0 && ctx.selectedDay.missions.length === 0);
    } }, directives: [i4.NgForOf, i4.NgIf, i4.NgClass], pipes: [i4.DatePipe], styles: [".planning-wrapper[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n    background: white;\n    border-radius: 18px;\n    box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);\n    padding: 24px;\n    margin: 20px;\n    min-height: 500px;\n    animation: fadeIn 0.4s ease-out;\n}\n\n@keyframes fadeIn {\n    from {\n        opacity: 0;\n        transform: scale(0.98);\n    }\n\n    to {\n        opacity: 1;\n        transform: scale(1);\n    }\n}\n\n.page-header[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 20px 22px;\n    border-radius: 16px;\n    background: linear-gradient(135deg, rgba(0, 74, 153, 0.08), rgba(0, 74, 153, 0.02));\n    border: 1px solid rgba(0, 74, 153, 0.1);\n}\n\n.header-left[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 16px;\n\n    h1 {\n        margin: 0 0 6px;\n        font-size: 1.45rem;\n        color: var(--micepp-blue-dark);\n        display: flex;\n        align-items: center;\n        gap: 10px;\n    }\n\n    p {\n        margin: 0;\n        color: var(--micepp-text-muted);\n        font-size: 0.98rem;\n        line-height: 1.5;\n    }\n}\n\n.back-btn[_ngcontent-%COMP%] {\n    width: 42px;\n    height: 42px;\n    border: none;\n    border-radius: 12px;\n    background: white;\n    color: var(--micepp-blue);\n    box-shadow: 0 8px 18px rgba(0, 74, 153, 0.12);\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n\n    &:hover {\n        transform: translateY(-1px);\n        box-shadow: 0 12px 22px rgba(0, 74, 153, 0.18);\n    }\n}\n\n.planning-content[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 24px;\n    min-height: 0;\n}\n\n.calendar-section[_ngcontent-%COMP%] {\n    flex: 0 0 370px;\n    padding: 20px;\n    border-radius: 16px;\n    background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);\n    border: 1px solid var(--micepp-border);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);\n}\n\n.calendar-header[_ngcontent-%COMP%] {\n    margin-bottom: 18px;\n}\n\n.calendar-nav[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 12px;\n    background: var(--micepp-gray-light);\n    padding: 10px 14px;\n    border-radius: 12px;\n    flex-wrap: wrap;\n\n    .calendar-nav-main {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 12px;\n        flex: 1;\n        min-width: 220px;\n    }\n\n    .nav-btn {\n        background: none;\n        border: none;\n        color: var(--micepp-blue);\n        width: 32px;\n        height: 32px;\n        border-radius: 50%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        transition: background 0.2s ease, transform 0.2s ease;\n        cursor: pointer;\n\n        &:hover {\n            background: rgba(0, 74, 153, 0.1);\n            transform: scale(1.04);\n        }\n    }\n\n    .current-period {\n        font-weight: 700;\n        font-size: 1rem;\n        color: var(--micepp-blue-dark);\n    }\n}\n\n.today-btn[_ngcontent-%COMP%] {\n    border: none;\n    border-radius: 999px;\n    padding: 8px 14px;\n    background: var(--micepp-blue);\n    color: white;\n    font-size: 0.8rem;\n    font-weight: 700;\n    cursor: pointer;\n    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;\n\n    &:hover {\n        background: var(--micepp-blue-dark);\n        transform: translateY(-1px);\n        box-shadow: 0 10px 18px rgba(0, 74, 153, 0.2);\n    }\n}\n\n.calendar-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(7, 1fr);\n    gap: 6px;\n}\n\n.day-name[_ngcontent-%COMP%] {\n    text-align: center;\n    font-weight: 700;\n    color: var(--micepp-text-muted);\n    font-size: 0.75rem;\n    padding-bottom: 8px;\n    text-transform: uppercase;\n}\n\n.calendar-day[_ngcontent-%COMP%] {\n    aspect-ratio: 1;\n    border: 1px solid transparent;\n    border-radius: 12px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    position: relative;\n    transition: all 0.2s ease;\n    font-size: 0.95rem;\n    background: white;\n\n    &:hover:not(.not-current) {\n        background: rgba(0, 74, 153, 0.06);\n        color: var(--micepp-blue);\n        border-color: rgba(0, 74, 153, 0.1);\n    }\n\n    &.today {\n        font-weight: 800;\n        color: var(--micepp-blue);\n        background: rgba(0, 74, 153, 0.08);\n\n        .day-number {\n            border-bottom: 2px solid var(--micepp-blue);\n        }\n    }\n\n    &.not-current {\n        color: #c9d1db;\n        cursor: default;\n        pointer-events: none;\n        background: #f8fafc;\n    }\n\n    &.has-risks,\n    &.has-missions {\n        font-weight: 700;\n    }\n\n    &.selected {\n        background: var(--micepp-blue) !important;\n        color: white !important;\n        box-shadow: 0 10px 22px rgba(0, 74, 153, 0.25);\n\n        .day-number {\n            border-bottom-color: white;\n        }\n\n        .risk-indicator-dot,\n        .mission-indicator-dot {\n            background: white;\n        }\n    }\n\n    .indicators {\n        display: flex;\n        gap: 4px;\n        position: absolute;\n        bottom: 7px;\n    }\n}\n\n.day-number[_ngcontent-%COMP%] {\n    line-height: 1;\n    padding-bottom: 2px;\n}\n\n.risk-indicator-dot[_ngcontent-%COMP%], .mission-indicator-dot[_ngcontent-%COMP%] {\n    width: 7px;\n    height: 7px;\n    border-radius: 50%;\n}\n\n.risk-indicator-dot[_ngcontent-%COMP%] {\n    background: var(--micepp-gold);\n}\n\n.mission-indicator-dot[_ngcontent-%COMP%] {\n    background: var(--micepp-blue);\n}\n\n.details-section[_ngcontent-%COMP%] {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    padding: 6px 2px 6px 0;\n    overflow-y: auto;\n    max-height: 580px;\n}\n\n.details-header[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n    padding-bottom: 14px;\n    border-bottom: 1px solid var(--micepp-border);\n\n    h3 {\n        margin: 0;\n        font-size: 1.2rem;\n        color: var(--micepp-blue-dark);\n    }\n}\n\n.stats-mini[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 12px;\n    margin-top: 10px;\n    flex-wrap: wrap;\n}\n\n.risk-count[_ngcontent-%COMP%], .mission-count[_ngcontent-%COMP%] {\n    font-size: 0.82rem;\n    color: var(--micepp-text-muted);\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 6px 10px;\n    border-radius: 999px;\n    background: #f8fafc;\n}\n\n.details-content[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 22px;\n}\n\n.detail-block[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 14px;\n}\n\n.detail-block-header[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n\n    h4 {\n        margin: 0;\n        display: flex;\n        align-items: center;\n        gap: 10px;\n        font-size: 1rem;\n        color: var(--micepp-blue-dark);\n    }\n\n    span {\n        min-width: 30px;\n        height: 30px;\n        padding: 0 10px;\n        border-radius: 999px;\n        background: rgba(0, 74, 153, 0.08);\n        color: var(--micepp-blue);\n        font-weight: 700;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n    }\n}\n\n.mission-card[_ngcontent-%COMP%], .risk-card[_ngcontent-%COMP%] {\n    border-radius: 16px;\n    padding: 18px;\n    margin-bottom: 0;\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n\n    &:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 12px 24px rgba(15, 23, 42, 0.07);\n    }\n}\n\n.mission-card[_ngcontent-%COMP%] {\n    background: linear-gradient(180deg, rgba(0, 74, 153, 0.05), rgba(0, 74, 153, 0.02));\n    border: 1px solid rgba(0, 74, 153, 0.12);\n    border-left: 4px solid var(--micepp-blue);\n}\n\n.mission-card-header[_ngcontent-%COMP%], .risk-card-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    margin-bottom: 12px;\n    gap: 12px;\n}\n\n.mission-title[_ngcontent-%COMP%], .risk-title[_ngcontent-%COMP%] {\n    font-weight: 700;\n    font-size: 1rem;\n    color: var(--micepp-blue-dark);\n    line-height: 1.4;\n}\n\n.mission-highlights[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n    margin-bottom: 14px;\n}\n\n.meta-chip[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 7px 10px;\n    border-radius: 999px;\n    font-size: 0.78rem;\n    font-weight: 600;\n    background: rgba(0, 74, 153, 0.09);\n    color: var(--micepp-blue-dark);\n}\n\n.meta-chip-muted[_ngcontent-%COMP%] {\n    background: rgba(100, 116, 139, 0.12);\n    color: #475569;\n}\n\n.meta-chip-risk[_ngcontent-%COMP%] {\n    background: rgba(217, 119, 6, 0.14);\n    color: #9a6700;\n}\n\n.mission-detail[_ngcontent-%COMP%], .risk-detail[_ngcontent-%COMP%] {\n    font-size: 0.88rem;\n    line-height: 1.6;\n    color: #475569;\n}\n\n.mission-detail[_ngcontent-%COMP%] {\n    margin-bottom: 12px;\n\n    p {\n        margin: 6px 0 0;\n    }\n\n    &.secondary {\n        padding-top: 10px;\n        border-top: 1px dashed rgba(0, 74, 153, 0.12);\n    }\n}\n\n.detail-label[_ngcontent-%COMP%] {\n    display: inline-block;\n    font-size: 0.72rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n    color: var(--micepp-blue);\n}\n\n.mission-meta[_ngcontent-%COMP%] {\n    margin-top: 14px;\n\n    .tag {\n        font-size: 0.72rem;\n        font-weight: 700;\n        background: var(--micepp-blue);\n        color: white;\n        padding: 5px 10px;\n        border-radius: 999px;\n    }\n}\n\n.status-badge[_ngcontent-%COMP%], .risk-badge[_ngcontent-%COMP%] {\n    padding: 5px 10px;\n    border-radius: 999px;\n    font-size: 0.74rem;\n    font-weight: 700;\n    color: white;\n    white-space: nowrap;\n}\n\n.status-badge[_ngcontent-%COMP%] {\n    &.status-a-venir {\n        background: #7c3aed;\n    }\n\n    &.status-en-cours {\n        background: #2563eb;\n    }\n\n    &.status-termine {\n        background: #16a34a;\n    }\n\n    &.status-en-retard {\n        background: #dc2626;\n    }\n\n    &.status-annule {\n        background: #64748b;\n    }\n}\n\n.risk-card[_ngcontent-%COMP%] {\n    background: white;\n    border: 1px solid var(--micepp-border);\n}\n\n.risk-badge[_ngcontent-%COMP%] {\n    &.level-faible {\n        background: #22c55e;\n    }\n\n    &.level-moyen {\n        background: #f59e0b;\n    }\n\n    &.level-eleve {\n        background: #ef4444;\n    }\n\n    &.level-critique {\n        background: #991b1b;\n    }\n\n    &.level-limite {\n        background: #0f766e;\n    }\n}\n\n.risk-detail[_ngcontent-%COMP%] {\n    margin-bottom: 12px;\n}\n\n.risk-meta[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: #64748b;\n}\n\n.status-indicator[_ngcontent-%COMP%] {\n    width: 8px;\n    height: 8px;\n    border-radius: 50%;\n\n    &.status-ouvert {\n        background: #2563eb;\n    }\n\n    &.status-en-cours {\n        background: #f59e0b;\n    }\n\n    &.status-traite {\n        background: #84cc16;\n    }\n\n    &.status-cloture {\n        background: #94a3b8;\n    }\n}\n\n.empty-details[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    flex: 1;\n    color: #94a3b8;\n    gap: 14px;\n    text-align: center;\n\n    i {\n        font-size: 3rem;\n        color: #cbd5e1;\n    }\n\n    p {\n        margin: 0;\n        font-weight: 600;\n    }\n}\n\n@media (max-width: 1100px) {\n    .planning-content[_ngcontent-%COMP%] {\n        flex-direction: column;\n    }\n\n    .calendar-section[_ngcontent-%COMP%] {\n        flex-basis: auto;\n    }\n\n    .details-section[_ngcontent-%COMP%] {\n        max-height: none;\n        padding-right: 0;\n    }\n}\n\n@media (max-width: 640px) {\n    .planning-wrapper[_ngcontent-%COMP%] {\n        margin: 12px;\n        padding: 16px;\n    }\n\n    .page-header[_ngcontent-%COMP%] {\n        padding: 16px;\n    }\n\n    .header-left[_ngcontent-%COMP%] {\n        gap: 12px;\n\n        h1 {\n            font-size: 1.2rem;\n        }\n    }\n\n    .calendar-section[_ngcontent-%COMP%] {\n        padding: 14px;\n    }\n\n    .calendar-nav[_ngcontent-%COMP%] {\n        align-items: stretch;\n\n        .calendar-nav-main {\n            min-width: 100%;\n        }\n    }\n\n    .today-btn[_ngcontent-%COMP%] {\n        width: 100%;\n        justify-content: center;\n    }\n\n    .calendar-grid[_ngcontent-%COMP%] {\n        gap: 4px;\n    }\n\n    .calendar-day[_ngcontent-%COMP%] {\n        border-radius: 10px;\n        font-size: 0.85rem;\n    }\n\n    .mission-card[_ngcontent-%COMP%], .risk-card[_ngcontent-%COMP%] {\n        padding: 14px;\n    }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PlanningComponent, [{
        type: Component,
        args: [{
                selector: 'app-planning',
                templateUrl: './planning.component.html',
                styleUrls: ['./planning.component.scss']
            }]
    }], function () { return [{ type: i1.RiskService }, { type: i2.AuditingService }, { type: i3.Router }]; }, null); })();
//# sourceMappingURL=planning.component.js.map