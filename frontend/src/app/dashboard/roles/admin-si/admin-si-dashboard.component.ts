import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../../core/services/settings.service';
import { AIService } from '../../../core/services/ai.service';

@Component({
    selector: 'app-admin-si-dashboard',
    templateUrl: './admin-si-dashboard.component.html'
})
export class AdminSiDashboardComponent implements OnInit {
    @Input() title: string = 'Dashboard Admin SI';
    @Input() description: string = 'Gérez les accès, supervisez la plateforme et assistez les utilisateurs.';
    @Input() filteredModules: any[] = [];
    @Output() openModule = new EventEmitter<any>();
    @Output() openUserManagement = new EventEmitter<void>();

    docsPath: string = '';
    isSaving: boolean = false;
    isIndexing: boolean = false;
    saveMessage: string = '';

    constructor(
        private router: Router,
        private settingsService: SettingsService,
        private aiService: AIService
    ) { }

    ngOnInit() {
        this.loadSettings();
    }

    loadSettings() {
        this.settingsService.getSettings().subscribe(settings => {
            this.docsPath = settings['DOCS_PATH'] || 'G:\\Téléchargement\\sGRC\\normes';
        });
    }

    saveDocsPath() {
        this.isSaving = true;
        this.saveMessage = '';
        this.settingsService.updateSetting('DOCS_PATH', this.docsPath).subscribe({
            next: () => {
                this.isSaving = false;
                this.saveMessage = 'Chemin mis à jour avec succès !';
                // Automatically ask for re-indexing or just notify
                setTimeout(() => this.saveMessage = '', 5000);
            },
            error: (err) => {
                this.isSaving = false;
                this.saveMessage = 'Erreur lors de la mise à jour.';
                console.error(err);
            }
        });
    }

    startIndexing() {
        this.isIndexing = true;
        this.saveMessage = 'Indexation en cours...';
        this.aiService.indexNormes().subscribe({
            next: (response) => {
                this.isIndexing = false;
                this.saveMessage = `Indexation réussie : ${response.count} fragments indexés.`;
                setTimeout(() => this.saveMessage = '', 7000);
            },
            error: (err) => {
                this.isIndexing = false;
                this.saveMessage = "Erreur pendant l'indexation.";
                console.error(err);
            }
        });
    }

    onOpenModule(m: any, s: any) {
        this.openModule.emit({ m, s });
    }

    onOpenUserManagement() {
        this.router.navigate(['/dashboard/users']);
    }
}
