import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getControlsNavItems, getStoredControlsRole } from './controls-navigation';
import { ControlEvidenceItem, ControlsOverview, ControlsService } from './controls.service';

interface EvidenceGroup {
  key: string;
  auditLabel: string;
  department: string;
  items: ControlEvidenceItem[];
}

@Component({
  selector: 'app-controls-evidence',
  templateUrl: './controls-evidence.component.html',
  styleUrls: ['./controls-evidence.component.scss']
})
export class ControlsEvidenceComponent implements OnInit {
  readonly navItems = getControlsNavItems(getStoredControlsRole());
  overview: ControlsOverview | null = null;
  isLoading = false;

  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private router: Router,
    private controlsService: ControlsService
  ) {}

  ngOnInit(): void {
    this.loadOverview();
  }

  loadOverview(): void {
    this.isLoading = true;
    this.controlsService.getOverview().subscribe({
      next: overview => {
        this.overview = overview;
        this.isLoading = false;
      },
      error: () => {
        this.overview = null;
        this.isLoading = false;
      }
    });
    this.currentPage = 1;
  }

  goBack(): void {
    this.router.navigate(['/dashboard/controls']);
  }

  get evidence(): ControlEvidenceItem[] {
    return this.overview?.evidence || [];
  }

  get groupedEvidence(): EvidenceGroup[] {
    const groups = new Map<string, EvidenceGroup>();

    this.evidence.forEach(item => {
      const auditLabel = item.auditLabel || item.linkedAudit || 'Hors audit';
      const department = item.department || 'Non rattache';
      const key = `${auditLabel}__${department}`;
      const group = groups.get(key);

      if (group) {
        group.items.push(item);
      } else {
        groups.set(key, { key, auditLabel, department, items: [item] });
      }
    });

    return Array.from(groups.values());
  }

  get paginatedGroupedEvidence(): EvidenceGroup[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.groupedEvidence.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChanged(event: {page: number, pageSize: number}) {
    this.currentPage = event.page;
    this.itemsPerPage = event.pageSize;
  }

  get auditEvidenceCount(): number {
    return this.evidence.filter(item => item.sourceType === 'audit').length;
  }

  get riskEvidenceCount(): number {
    return this.evidence.filter(item => item.sourceType === 'risque').length;
  }

  get incidentEvidenceCount(): number {
    return this.evidence.filter(item => item.sourceType === 'incident').length;
  }

  get depositorCount(): number {
    return new Set(this.evidence.map(item => item.depositedBy || item.author).filter(Boolean)).size;
  }

  get auditGroupCount(): number {
    return new Set(this.evidence.map(item => item.auditLabel || item.linkedAudit || 'Hors audit')).size;
  }

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return 'Date indisponible';
    }

    return new Date(value).toLocaleDateString('fr-FR');
  }
}
