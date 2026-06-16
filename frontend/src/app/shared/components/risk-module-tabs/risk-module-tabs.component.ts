import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/models/user-role.enum';
import { AuthService } from '../../../core/services/auth.service';

interface RiskTab {
  label: string;
  route: string;
  icon: string;
  roles: UserRole[];
}

@Component({
  selector: 'app-risk-module-tabs',
  templateUrl: './risk-module-tabs.component.html',
  styleUrls: ['./risk-module-tabs.component.scss']
})
export class RiskModuleTabsComponent {
  private readonly allTabs: RiskTab[] = [
    {
      label: 'Registre des Risques',
      route: '/dashboard/risks',
      icon: 'fa-exclamation-triangle',
      roles: [
        UserRole.SUPER_ADMIN,
        UserRole.RISK_MANAGER,
        UserRole.RISK_AGENT,
        UserRole.AUDIT_DIRECTEUR,
        UserRole.AUDIT_RESPONSABLE,
        UserRole.CHEF_MISSION,
        UserRole.TOP_MANAGEMENT
      ]
    },
    {
      label: 'Evaluation Parametrable',
      route: '/dashboard/strategic-evaluation',
      icon: 'fa-sliders-h',
      roles: [
        UserRole.SUPER_ADMIN,
        UserRole.TOP_MANAGEMENT,
        UserRole.AUDIT_DIRECTEUR,
        UserRole.AUDIT_RESPONSABLE,
        UserRole.CHEF_MISSION,
        UserRole.RISK_MANAGER,
        UserRole.RISK_AGENT
      ]
    },
    {
      label: 'Cartographie Dynamique',
      route: '/dashboard/statistics',
      icon: 'fa-table-cells-large',
      roles: [
        UserRole.SUPER_ADMIN,
        UserRole.RISK_MANAGER,
        UserRole.TOP_MANAGEMENT,
        UserRole.RISK_AGENT
      ]
    },
    {
      label: 'Plans de Traitement',
      route: '/dashboard/treatment-plans',
      icon: 'fa-tasks',
      roles: [
        UserRole.SUPER_ADMIN,
        UserRole.RISK_MANAGER,
        UserRole.TOP_MANAGEMENT,
        UserRole.RISK_AGENT
      ]
    },
    {
      label: 'Alertes et Monitoring',
      route: '/dashboard/alertes-monitoring',
      icon: 'fa-shield-alt',
      roles: [
        UserRole.SUPER_ADMIN,
        UserRole.RISK_MANAGER,
        UserRole.TOP_MANAGEMENT,
        UserRole.RISK_AGENT
      ]
    }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  get tabs(): RiskTab[] {
    const currentRole = this.authService.getUserRole();

    if (!currentRole) {
      return [];
    }

    return this.allTabs.filter(tab => tab.roles.includes(currentRole));
  }

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}
