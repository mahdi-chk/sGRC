import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risk-module-tabs',
  templateUrl: './risk-module-tabs.component.html',
  styleUrls: ['./risk-module-tabs.component.scss']
})
export class RiskModuleTabsComponent {
  readonly tabs = [
    { label: 'Registre des Risques', route: '/dashboard/risks', icon: 'fa-exclamation-triangle' },
    { label: 'Evaluation Parametrable', route: '/dashboard/strategic-evaluation', icon: 'fa-sliders-h' },
    { label: 'Cartographie Dynamique', route: '/dashboard/statistics', icon: 'fa-table-cells-large' },
    { label: 'Plans de Traitement', route: '/dashboard/treatment-plans', icon: 'fa-tasks' },
    { label: 'Alertes et Monitoring', route: '/dashboard/alertes-monitoring', icon: 'fa-shield-alt' }
  ];

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}
