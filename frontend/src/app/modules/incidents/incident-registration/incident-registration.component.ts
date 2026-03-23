import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentService, IncidentStatus } from '../../../core/services/incident.service';
import { OrganigrammeService } from '../../../core/services/organigramme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incident-registration',
  templateUrl: './incident-registration.component.html',
  styleUrls: ['./incident-registration.component.scss']
})
export class IncidentRegistrationComponent implements OnInit {
  incidentForm: FormGroup;
  departments: any[] = [];
  selectedFile: File | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private organigrammeService: OrganigrammeService,
    private router: Router
  ) {
    this.incidentForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      domaine: ['', Validators.required],
      departementId: [null, Validators.required],
      dateSurvenance: [new Date().toISOString().split('T')[0], Validators.required],
      statut: [IncidentStatus.NOUVEAU]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.organigrammeService.getAll().subscribe(d => this.departments = d);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitIncident() {
    if (this.incidentForm.invalid) return;

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
        alert('Incident déclaré avec succès !');
        this.router.navigate(['/dashboard/incident-workflow']);
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
        alert('Erreur lors de la déclaration.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
