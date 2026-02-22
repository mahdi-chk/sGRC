import { Component, OnInit } from '@angular/core';
import { RiskService, Risk } from '../../core/services/risk.service';

interface CalendarDay {
    date: Date | null;
    risks: Risk[];
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
    selectedDay: CalendarDay | null = null;
    monthNames = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    constructor(private riskService: RiskService) { }

    ngOnInit(): void {
        this.loadRisks();
    }

    loadRisks(): void {
        this.riskService.getRisks().subscribe(risks => {
            this.risks = risks;
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
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startDay - 1; i >= 0; i--) {
            this.days.push({
                date: null, // Or actual date if we want to show it dimmed
                risks: [],
                isToday: false,
                isCurrentMonth: false
            });
        }

        // Current month days
        const today = new Date();
        for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
            const date = new Date(year, month, d);
            const dayRisks = this.risks.filter(r => {
                const riskDate = new Date(r.dateEcheance);
                return riskDate.getDate() === d &&
                    riskDate.getMonth() === month &&
                    riskDate.getFullYear() === year;
            });

            this.days.push({
                date,
                risks: dayRisks,
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

    selectDay(day: CalendarDay): void {
        if (day.date) {
            this.selectedDay = day;
        }
    }

    get currentMonthName(): string {
        return this.monthNames[this.currentDate.getMonth()];
    }

    get currentYear(): number {
        return this.currentDate.getFullYear();
    }
}
