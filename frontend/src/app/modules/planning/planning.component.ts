import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiskService, Risk } from '../../core/services/risk.service';
import { AuditingService, AuditMission } from '../../core/services/auditing.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface CalendarDay {
    date: Date | null;
    risks: Risk[];
    missions: AuditMission[];
    isToday: boolean;
    isCurrentMonth: boolean;
}

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
    currentDate: Date = new Date();
    days: CalendarDay[] = [];
    risks: Risk[] = [];
    missions: AuditMission[] = [];
    selectedDay: CalendarDay | null = null;
    monthNames = [
        'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'
    ];
    dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    constructor(
        private riskService: RiskService,
        private auditingService: AuditingService,
        private router: Router
    ) { }

    goBack(): void {
        this.router.navigate(['/dashboard']);
    }

    ngOnInit(): void {
        this.loadRisks();
    }

    loadRisks(): void {
        forkJoin({
            risks: this.riskService.getRisks().pipe(catchError(() => of([]))),
            missions: this.auditingService.getMissions().pipe(catchError(() => of([])))
        }).subscribe(({ risks, missions }) => {
            this.risks = risks || [];
            this.missions = missions || [];
            this.generateCalendar();
        });
    }

    generateCalendar(): void {
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

    prevMonth(): void {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
        this.generateCalendar();
        this.selectedDay = null;
    }

    nextMonth(): void {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
        this.generateCalendar();
        this.selectedDay = null;
    }

    goToToday(): void {
        const today = new Date();
        this.currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
        this.generateCalendar();
        this.selectedDay = this.days.find(day => day.date && this.isSameDay(day.date, today)) || null;
    }

    selectDay(day: CalendarDay): void {
        if (day.date) {
            this.selectedDay = day;
        }
    }

    getMissionStatusClass(status: string): string {
        return `status-${this.slugify(status)}`;
    }

    getRiskLevelClass(level: string): string {
        return `level-${this.slugify(level)}`;
    }

    getRiskStatusClass(status: string): string {
        return `status-${this.slugify(status)}`;
    }

    private slugify(value: string): string {
        return (value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    private isSameDay(first: Date, second: Date): boolean {
        return first.getFullYear() === second.getFullYear()
            && first.getMonth() === second.getMonth()
            && first.getDate() === second.getDate();
    }

    get currentMonthName(): string {
        return this.monthNames[this.currentDate.getMonth()];
    }

    get currentYear(): number {
        return this.currentDate.getFullYear();
    }
}
