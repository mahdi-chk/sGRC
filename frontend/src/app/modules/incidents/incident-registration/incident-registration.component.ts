import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentImportDraft, IncidentService, IncidentStatus } from '../../../core/services/incident.service';
import { Department, DepartmentService } from '../../../core/services/department.service';
import { RiskService, Risk } from '../../../core/services/risk.service';
import { Router } from '@angular/router';
import { getIncidentNavItems, getStoredIncidentRole } from '../incident-navigation';

@Component({
  selector: 'app-incident-registration',
  templateUrl: './incident-registration.component.html',
  styleUrls: ['./incident-registration.component.scss']
})
export class IncidentRegistrationComponent implements OnInit {
  currentUserRole = getStoredIncidentRole();
  incidentForm: FormGroup;
  departments: Department[] = [];
  risks: Risk[] = [];
  selectedFile: File | null = null;
  isSubmitting = false;
  isImporting = false;
  importMessage = '';
  importWarnings: string[] = [];
  importPreview = '';

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private departmentService: DepartmentService,
    private riskService: RiskService,
    private router: Router
  ) {
    this.incidentForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      domaine: ['', Validators.required],
      niveauRisque: [''],
      departementId: [null, Validators.required],
      dateSurvenance: [new Date().toISOString().split('T')[0], Validators.required],
      statut: [IncidentStatus.NOUVEAU],
      riskId: [null]
    });
  }

  get navItems() {
    return getIncidentNavItems(this.currentUserRole);
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadRisks();
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe(d => this.departments = d);
  }

  loadRisks() {
    this.riskService.getRisks().subscribe(r => this.risks = r);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onImportFileSelected(event: any) {
    const file = event?.target?.files?.[0] as File | undefined;
    if (!file) {
      return;
    }

    this.isImporting = true;
    this.importMessage = '';
    this.importWarnings = [];
    this.importPreview = '';

    this.incidentService.importIncidentDraft(file).subscribe({
      next: (draft) => {
        this.applyImportedDraft(draft);
        this.selectedFile = file;
        this.isImporting = false;
        this.importWarnings = draft.warnings || [];
        this.importPreview = draft.extractedTextPreview || '';
        this.importMessage = this.buildImportMessage(draft);
      },
      error: (err) => {
        console.error(err);
        this.isImporting = false;
        this.importMessage = err?.error?.message || 'Import impossible pour ce fichier.';
      }
    });

    event.target.value = '';
  }

  private applyImportedDraft(draft: IncidentImportDraft) {
    const patch: Record<string, any> = {};

    if (draft.titre) patch['titre'] = draft.titre;
    if (draft.description) patch['description'] = draft.description;
    if (draft.domaine) patch['domaine'] = draft.domaine;
    if (draft.niveauRisque) patch['niveauRisque'] = this.normalizeLevel(draft.niveauRisque);
    if (draft.departementId !== undefined && draft.departementId !== null) patch['departementId'] = draft.departementId;
    if (draft.dateSurvenance) patch['dateSurvenance'] = draft.dateSurvenance;

    this.incidentForm.patchValue(patch);
    this.incidentForm.markAsDirty();
    this.incidentForm.markAllAsTouched();
  }

  private normalizeLevel(level?: string | null): string {
    if (!level) return '';
    const normalized = level.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    if (normalized.includes('critique')) return 'Critique';
    if (normalized.includes('significatif')) return 'Significatif';
    if (normalized.includes('eleve')) return 'Ã‰levÃ©';
    if (normalized.includes('moyen')) return 'Moyen';
    if (normalized.includes('limit')) return 'LimitÃ©';
    if (normalized.includes('faible')) return 'Faible';
    return level;
  }

  private buildImportMessage(draft: IncidentImportDraft): string {
    if (draft.sourceType === 'image-scan') {
      return draft.importReliability === 'low'
        ? 'Scan manuscrit analyse. Les champs peu fiables ont ete laisses vides pour verification.'
        : 'Scan manuscrit analyse et formulaire prerempli avec les champs reconnus.';
    }

    if (draft.importReliability === 'low') {
      return 'Document analyse avec prudence. Verifiez les champs proposes avant validation.';
    }

    return draft.departementId
      ? 'Le formulaire a ete prerempli a partir du document importe.'
      : `Le formulaire a ete prerempli. Departement a confirmer${draft.departementNom ? `: ${draft.departementNom}` : ''}.`;
  }

  submitIncident() {
    if (this.incidentForm.invalid) {
      this.incidentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    const rawValues = this.incidentForm.getRawValue();

    Object.keys(rawValues).forEach(key => {
      if (rawValues[key] !== null && rawValues[key] !== undefined) {
        formData.append(key, rawValues[key]);
      }
    });

    if (this.selectedFile) {
      formData.append('pieceJointe', this.selectedFile);
    }

    this.incidentService.createIncident(formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        alert('Incident declare avec succes !');
        this.router.navigate(['/dashboard/incident-workflow']);
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
        alert('Erreur lors de la declaration.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
