import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/services/auth.service';
import { DashboardService } from '../core/services/dashboard.service';
import { NotificationService } from '../core/services/notification.service';
import { Notification, NotificationType } from '../core/models/notification.model';
import { UserRole } from '../core/models/user-role.enum';
import { CPS_MODULES, SubmoduleDetail } from '../shared/data/cps-data';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface Submodule {
  title: string;
  desc?: string;
}

interface ModuleItem {
  key: string;
  title: string;
  desc?: string;
  submodules: Submodule[];
  roles: UserRole[];
}

interface NavItem {
  label: string;
  route?: string;
  roles?: UserRole[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild('notifContainer') notifContainer?: ElementRef<HTMLElement>;

  expanded = new Set<string>();
  status: string | null = null;

  // Modal state
  modalVisible = false;
  modalTitle = '';
  modalBody = '';
  creating = false;
  currentModuleKey = '';
  currentSubmoduleTitle = '';
  currentUserRole: UserRole | null = null;
  currentUserName: string = '';
  dashboardTitle: string = '';
  dashboardDesc: string = '';
  UserRole = UserRole; // Make enum available to template
  subNavItems: NavItem[] = [
    {
      label: 'Organisation',
      route: '/dashboard/organigramme',
      roles: [UserRole.ADMIN_SI, UserRole.SUPER_ADMIN]
    },
    { label: 'Ressource', route: '/dashboard/resources' },
    {
      label: 'Risque',
      route: '/dashboard/risks',
      roles: [
        UserRole.SUPER_ADMIN,
        UserRole.RISK_MANAGER,
        UserRole.RISK_AGENT,
        UserRole.AUDIT_SENIOR,
        UserRole.AUDITEUR,
        UserRole.TOP_MANAGEMENT
      ]
    },
    {
      label: 'Incident',
      route: '/dashboard/incidents',
      roles: [UserRole.SUPER_ADMIN, UserRole.RISK_MANAGER, UserRole.AUDIT_SENIOR, UserRole.AUDITEUR]
    },
    { label: 'Contrôle' },
    { label: 'Action' }
  ];


  form: any = { name: '', description: '', config: '{}' };

  notifications: Notification[] = [];
  unreadCount = 0;
  showNotifDropdown = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private dashboardService: DashboardService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUserRole = user?.role;
      this.currentUserName = user?.prenom && user?.nom ? `${user.prenom} ${user.nom}` : 'Utilisateur';
      this.setDashboardInfo();
    });

    this.dashboardService.openModal$.subscribe(data => {
      this.openSubmoduleModal(data.m, data.s);
    });

    this.notificationService.notifications$.subscribe(notifs => {
      this.notifications = this.getVisibleNotifications(notifs);
      this.unreadCount = this.notifications.filter(n => !n.isRead).length;
    });
  }

  toggleNotifDropdown() {
    this.showNotifDropdown = !this.showNotifDropdown;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.showNotifDropdown || !this.notifContainer) {
      return;
    }

    const target = event.target as Node | null;
    if (target && !this.notifContainer.nativeElement.contains(target)) {
      this.showNotifDropdown = false;
    }
  }

  markAsRead(n: Notification) {
    if (!n.isRead) {
      this.notificationService.markAsRead(n.id).subscribe();
    }
  }

  markAllAsRead() {
    const visibleUnreadIds = this.notifications
      .filter(n => !n.isRead)
      .map(n => n.id);

    if (visibleUnreadIds.length === 0) {
      return;
    }

    if (this.currentUserRole === UserRole.RISK_AGENT) {
      this.notificationService.markManyAsRead(visibleUnreadIds).subscribe();
      return;
    }

    this.notificationService.markAllAsRead().subscribe();
  }

  private getVisibleNotifications(notifs: Notification[]): Notification[] {
    if (this.currentUserRole === UserRole.RISK_AGENT) {
      return notifs.filter(n =>
        n.type === NotificationType.RISK_ASSIGNED ||
        n.type === NotificationType.STATUS_CHANGED ||
        n.type === NotificationType.COMMENT_ADDED ||
        n.type === NotificationType.REMINDER
      );
    }

    return notifs;
  }

  get visibleSubNavItems(): NavItem[] {
    return this.subNavItems.filter(item => this.canAccess(item.roles));
  }

  canAccess(roles?: UserRole[]): boolean {
    if (!roles || roles.length === 0) {
      return true;
    }

    return !!this.currentUserRole && roles.includes(this.currentUserRole);
  }

  setDashboardInfo() {
    switch (this.currentUserRole) {
      case UserRole.ADMIN_SI:
        this.dashboardTitle = 'Dashboard Admin SI';
        this.dashboardDesc = 'Gérez les accès, supervisez la plateforme et assistez les utilisateurs.';
        break;
      case UserRole.SUPER_ADMIN:
        this.dashboardTitle = 'Dashboard Super Admin';
        this.dashboardDesc = 'Accès complet à toutes les fonctionnalités et modules de la plateforme.';
        break;
      case UserRole.RISK_MANAGER:
        this.dashboardTitle = 'Dashboard Risk Manager';
        this.dashboardDesc = 'Gérez les risques, évaluez les impacts et suivez les plans de traitement.';
        break;
      case UserRole.RISK_AGENT:
        this.dashboardTitle = 'Dashboard Risk Agent';
        this.dashboardDesc = 'Gérez les risques, évaluez les impacts et suivez les plans de traitement.';
        break;
      case UserRole.AUDIT_SENIOR:
        this.dashboardTitle = 'Dashboard Audit Senior';
        this.dashboardDesc = 'Planifiez les missions, supervisez les audits et validez les recommandations.';
        break;
      case UserRole.AUDITEUR:
        this.dashboardTitle = 'Dashboard Auditeur';
        this.dashboardDesc = 'Planifiez les missions, supervisez les audits et validez les recommandations.';
        break;
      case UserRole.TOP_MANAGEMENT:
        this.dashboardTitle = 'Dashboard Top Management';
        this.dashboardDesc = 'Vision stratégique, indicateurs clés et aide à la décision.';
        break;
      default:
        this.dashboardTitle = 'Dashboard';
        this.dashboardDesc = 'Bienvenue sur votre plateforme GRC.';
    }
  }

  toggleAiAssistant() {
    this.dashboardService.toggleAiAssistant();
  }

  logout() {
    this.authService.logout();
  }

  resetToHome(): void {
    this.modalVisible = false;
    this.creating = false;
  }

  toggleModule(key: string) {
    if (this.expanded.has(key)) this.expanded.delete(key);
    else this.expanded.add(key);
  }

  isExpanded(key: string) {
    return this.expanded.has(key);
  }

  checkBackend() {
    this.status = 'Checking...';
    this.http.get(`${environment.apiUrl}/governance`).subscribe(
      () => this.status = 'Backend reachable (GET /api/governance)',
      (err: any) => this.status = 'Backend unreachable: ' + (err.status || err.message)
    );
  }

  openSubmoduleModal(m: ModuleItem, s: Submodule) {
    this.modalTitle = `${m.title} — ${s.title}`;
    this.currentModuleKey = m.key;
    this.currentSubmoduleTitle = s.title;

    // Fetch CPS data for this specific submodule
    const cpsModule = CPS_MODULES[this.currentModuleKey];
    const cpsSubmodule: SubmoduleDetail | undefined = cpsModule?.submodules[s.title];

    if (cpsSubmodule) {
      const featuresHtml = cpsSubmodule.features.map(f => `<li>${f}</li>`).join('');
      const requirementsHtml = cpsSubmodule.requirements.map(r => `<li>${r}</li>`).join('');
      const objectivesHtml = cpsSubmodule.objectives.map(o => `<li>${o}</li>`).join('');
      const integrationsHtml = cpsSubmodule.integrations ? cpsSubmodule.integrations.map(i => `<li>${i}</li>`).join('') : '';

      const details = `
        <p><strong>Description:</strong> ${cpsSubmodule.description}</p>
        
        <h5>Objectifs</h5>
        <ul>${objectivesHtml}</ul>
        
        <h5>Fonctionnalités attendues</h5>
        <ul>${featuresHtml}</ul>
        
        <h5>Exigences techniques</h5>
        <ul>${requirementsHtml}</ul>
        
        ${integrationsHtml ? `<h5>Intégrations requises</h5><ul>${integrationsHtml}</ul>` : ''}
      `;

      this.modalBody = details;
    } else {
      this.modalBody = '<p>Pas de détails CPS disponibles pour ce sous-module.</p>';
    }

    this.modalVisible = true;
    this.creating = false;
  }

  closeModal() {
    this.modalVisible = false;
    this.modalTitle = '';
    this.modalBody = '';
    this.creating = false;
  }

  startCreate() {
    this.creating = true;
    this.form = { name: this.currentSubmoduleTitle || '', description: '', config: '{}' };
  }

  submitForm() {
    // validate JSON
    let parsed = null;
    try {
      parsed = JSON.parse(this.form.config || '{}');
    } catch (e) {
      this.status = 'Configuration JSON invalide';
      return;
    }

    const record = {
      module: this.currentModuleKey,
      submodule: this.currentSubmoduleTitle,
      name: this.form.name,
      description: this.form.description,
      config: parsed,
      createdAt: new Date().toISOString()
    };

    const key = 'sgrc_submodule_configs';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(record);
    localStorage.setItem(key, JSON.stringify(existing));

    this.status = 'Configuration créée localement';
    this.creating = false;
    setTimeout(() => this.closeModal(), 900);
  }
}
