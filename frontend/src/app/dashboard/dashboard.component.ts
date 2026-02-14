import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/services/auth.service';
import { UserRole } from '../core/models/user-role.enum';
import { CPS_MODULES, SubmoduleDetail } from '../shared/data/cps-data';

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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  modules: ModuleItem[] = [
    {
      key: 'gouvernance',
      title: 'Gouvernance',
      desc: 'Structurer l’organisation, politiques, workflows et traçabilité.',
      submodules: [
        { title: 'Gestion Documentaire', desc: 'Cycle de vie des documents, signatures, archivage.' },
        { title: 'Traçabilité et Historique', desc: 'Versions, audit trails et recherches avancées.' },
        { title: 'Workflows d’Approbation', desc: 'Circuits multi-niveaux et notifications.' },
        { title: 'Indicateurs de Maturité', desc: 'Scoring basé sur COBIT/ISO.' },
        { title: 'Adhésion et Application', desc: 'Preuves d’adhésion et suivi d’application.' }
      ],
      roles: [UserRole.TOP_MANAGEMENT]
    },
    {
      key: 'risques',
      title: 'Gestion des Risques',
      desc: 'Identifier, évaluer et traiter les risques.',
      submodules: [
        { title: 'Registre des Risques' },
        { title: 'Évaluation Paramétrable' },
        { title: 'Cartographie Dynamique' },
        { title: 'Plans de Traitement' },
        { title: 'Alertes et Monitoring' }
      ],
      roles: [UserRole.RISK_MANAGER, UserRole.RISK_AGENT]
    },
    {
      key: 'controls',
      title: 'Contrôles Internes',
      desc: 'Définir, planifier et vérifier les contrôles.',
      submodules: [
        { title: 'Référentiel des Contrôles' },
        { title: 'Planification Automatisée' },
        { title: 'Collecte de Preuves' },
        { title: 'Évaluation d’Efficacité' },
        { title: 'Suivi des Non-Conformités' }
      ],
      roles: [UserRole.RISK_MANAGER, UserRole.RISK_AGENT]
    },
    {
      key: 'conformite',
      title: 'Conformité',
      desc: 'Mapper exigences réglementaires et preuves.',
      submodules: [
        { title: 'Référentiels Intégrés' },
        { title: 'Mapping et Liens' },
        { title: 'Auto-Évaluations' },
        { title: 'Suivi des Écarts' },
        { title: 'Mises à Jour et Preuves' }
      ],
      roles: [UserRole.AUDIT_SENIOR, UserRole.AUDITEUR]
    },
    {
      key: 'audit',
      title: 'Audit',
      desc: 'Planifier et exécuter les audits avec traçabilité.',
      submodules: [
        { title: 'Planification Pluriannuelle' },
        { title: 'Gestion des Missions' },
        { title: 'Check-Lists Paramétrables' },
        { title: 'Traçabilité des Preuves' },
        { title: 'Rapports et Suivi' }
      ],
      roles: [UserRole.AUDIT_SENIOR, UserRole.AUDITEUR]
    },
    {
      key: 'incidents',
      title: 'Gestion des Incidents',
      desc: 'Déclarer, analyser et traiter les incidents.',
      submodules: [
        { title: 'Enregistrement Structuré' },
        { title: 'Workflow de Traitement' },
        { title: 'Liens et Analyse' },
        { title: 'Reporting Consolidé' }
      ],
      roles: [UserRole.AUDIT_SENIOR, UserRole.AUDITEUR]
    },
    {
      key: 'plans-actions',
      title: 'Plans d’Actions',
      desc: 'Gérer les actions correctives et préventives.',
      submodules: [
        { title: 'Gestion Centralisée' },
        { title: 'Suivi des Échéances' },
        { title: 'Notifications' },
        { title: 'Indicateurs' }
      ],
      roles: [UserRole.AUDIT_SENIOR]
    },
    {
      key: 'reporting',
      title: 'Reporting & Dashboards',
      desc: 'Synthèse, KPI et exports pour la direction.',
      submodules: [
        { title: 'Tableaux de Bord' },
        { title: 'KPI Personnalisables' },
        { title: 'Vision Multi-Entités' },
        { title: 'Exports' }
      ],
      roles: [UserRole.TOP_MANAGEMENT]
    },
    {
      key: 'supervision',
      title: 'Supervision sGRC',
      desc: 'Accompagnement méthodologique et recommandations.',
      submodules: [
        { title: 'Bibliothèque de Bonnes Pratiques' },
        { title: 'Recommandations Contextualisées' },
        { title: 'Benchmarks Sectoriels' },
        { title: 'Assistance Experte' },
        { title: 'Supervision Continue' }
      ],
      roles: [UserRole.TOP_MANAGEMENT]
    }
  ];

  currentUserRole: UserRole | null = null;
  UserRole = UserRole; // Make enum available to template

  get filteredModules() {
    return this.modules.filter(m => this.currentUserRole && m.roles.includes(this.currentUserRole));
  }

  expanded = new Set<string>();
  status: string | null = null;

  // Modal state
  modalVisible = false;
  modalTitle = '';
  modalBody = '';
  creating = false;
  currentModuleKey = '';
  currentSubmoduleTitle = '';

  form: any = { name: '', description: '', config: '{}' };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUserRole = user?.role;
    });
  }

  logout() {
    this.authService.logout();
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
    this.http.get('http://localhost:3000/api/governance').subscribe(
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
