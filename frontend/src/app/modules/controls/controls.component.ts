import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ControlEffectivenessItem,
  ControlEvidenceItem,
  ControlNonConformityItem,
  ControlPlanningItem,
  ControlRegistryItem,
  ControlsOverview,
  ControlsService
} from './controls.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  overview: ControlsOverview | null = null;
  isLoading = false;
  errorMessage = '';

  readonly capabilities = [
    {
      title: 'Referentiel des controles',
      description: 'Catalogue des controles relies aux risques, aux responsables et au niveau de maturite.'
    },
    {
      title: 'Planification integree',
      description: 'Pilotage commun des audits et des controles, ponctuels comme periodiques.'
    },
    {
      title: 'Collecte de preuves',
      description: 'Centralisation des justificatifs avec auteur du depot et rattachement audit ou departement.'
    },
    {
      title: 'Evaluation d efficacite',
      description: 'Lecture de la recurrence des incidents apres mise en oeuvre du controle.'
    },
    {
      title: 'Suivi des non-conformites',
      description: 'Controle continu des ecarts detectes et des actions encore ouvertes.'
    }
  ];

  constructor(
    private router: Router,
    private controlsService: ControlsService
  ) {}

  ngOnInit(): void {
    this.loadOverview();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  loadOverview(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.controlsService.getOverview().subscribe({
      next: overview => {
        this.overview = overview;
        this.isLoading = false;
      },
      error: () => {
        this.overview = null;
        this.errorMessage = 'Impossible de charger la vue des controles internes pour le moment.';
        this.isLoading = false;
      }
    });
  }

  get registryPreview(): ControlRegistryItem[] {
    return (this.overview?.registry || []).slice(0, 8);
  }

  get planningPreview(): ControlPlanningItem[] {
    return (this.overview?.planning || []).slice(0, 8);
  }

  get evidencePreview(): ControlEvidenceItem[] {
    return (this.overview?.evidence || []).slice(0, 6);
  }

  get effectivenessPreview(): ControlEffectivenessItem[] {
    return (this.overview?.effectiveness || []).slice(0, 6);
  }

  get nonConformityPreview(): ControlNonConformityItem[] {
    return (this.overview?.nonConformities || []).slice(0, 6);
  }

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return 'Non planifie';
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return 'Date indisponible';
    }

    return parsed.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  getStatusClass(value: string | null | undefined): string {
    return `state-${this.slugify(value)}`;
  }

  getToneClass(score: number): string {
    if (score >= 80) {
      return 'tone-strong';
    }

    if (score >= 60) {
      return 'tone-watch';
    }

    return 'tone-alert';
  }

  getTrendLabel(value: string): string {
    if (value === 'en_baisse') {
      return 'En baisse';
    }

    if (value === 'en_hausse') {
      return 'En hausse';
    }

    return 'Stable';
  }

  getTrendClass(value: string): string {
    return `trend-${this.slugify(value)}`;
  }

  private slugify(value: string | null | undefined): string {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
