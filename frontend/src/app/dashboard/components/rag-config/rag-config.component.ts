import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/services/settings.service';
import { AIService } from '../../../core/services/ai.service';

@Component({
    selector: 'app-rag-config',
    templateUrl: './rag-config.component.html',
    styles: [`
        .config-card {
            border-left: 5px solid #6366f1;
            background: linear-gradient(to bottom, #ffffff, #f5f3ff);
        }
        .config-form {
            margin: 1rem 0;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        label {
            font-size: 0.85rem;
            font-weight: 600;
            color: #64748b;
        }
        .path-input {
            padding: 10px 14px;
            border: 1.5px solid #e2e8f0;
            border-radius: 8px;
            font-family: inherit;
            font-size: 0.9rem;
            transition: all 0.2s ease;
            background: rgba(255, 255, 255, 0.8);
            width: 100%;
        }
        .path-input:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
            background: white;
        }
        .save-feedback {
            margin-top: 10px;
            font-size: 0.85rem;
            color: #10b981;
            font-weight: 600;
            height: 1.2rem;
        }
        .save-feedback.error {
            color: #ef4444;
        }
        .settings-actions {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }
        .settings-actions button {
            flex: 1;
            min-width: 160px;
        }
    `]
})
export class RagConfigComponent implements OnInit {
    docsPath: string = '';
    isSaving: boolean = false;
    isIndexing: boolean = false;
    saveMessage: string = '';

    constructor(
        private settingsService: SettingsService,
        private aiService: AIService
    ) { }

    ngOnInit() {
        this.loadSettings();
    }

    loadSettings() {
        this.settingsService.getSettings().subscribe({
            next: (settings: any) => {
                this.docsPath = settings['DOCS_PATH'] || 'G:\\Téléchargement\\sGRC\\normes';
            },
            error: (err: any) => {
                console.error('Erreur chargement paramètres:', err);
            }
        });
    }

    saveDocsPath() {
        this.isSaving = true;
        this.saveMessage = '';
        this.settingsService.updateSetting('DOCS_PATH', this.docsPath).subscribe({
            next: () => {
                this.isSaving = false;
                this.saveMessage = 'Chemin mis à jour avec succès !';
                setTimeout(() => this.saveMessage = '', 5000);
            },
            error: (err: any) => {
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
            next: (response: { success: boolean, count: number }) => {
                this.isIndexing = false;
                this.saveMessage = `Indexation réussie : ${response.count} fragments indexés.`;
                setTimeout(() => this.saveMessage = '', 7000);
            },
            error: (err: any) => {
                this.isIndexing = false;
                this.saveMessage = "Erreur pendant l'indexation.";
                console.error(err);
            }
        });
    }
}
