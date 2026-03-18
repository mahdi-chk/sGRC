import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/services/settings.service';
import { AIService } from '../../../core/services/ai.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-rag-manager',
    templateUrl: './rag-manager.component.html',
    styles: [`
        .rag-manager-container {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        .header-section {
            background: linear-gradient(135deg, #6366f1, #4f46e5);
            padding: 2rem;
            border-radius: 16px;
            color: white;
            box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header-content h2 {
            margin: 0 0 0.5rem 0;
            font-size: 2rem;
            font-weight: 700;
        }
        .header-content p {
            margin: 0;
            opacity: 0.9;
            font-size: 1rem;
        }
        .header-icon i {
            font-size: 4rem;
            opacity: 0.8;
        }
        .controls-section {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
        }
        .form-group {
            flex: 1;
            min-width: 300px;
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
            padding: 12px 16px;
            border: 1.5px solid #e2e8f0;
            border-radius: 8px;
            font-family: inherit;
            font-size: 0.95rem;
            transition: all 0.2s ease;
            width: 100%;
        }
        .path-input:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .settings-actions {
            display: flex;
            gap: 15px;
            align-items: flex-end;
        }
        .settings-actions button {
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.95rem;
        }
        .btn-apply {
            background: #6366f1;
            color: white;
        }
        .btn-apply:hover:not(:disabled) {
            background: #4f46e5;
            box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);
            transform: translateY(-1px);
        }
        .btn-reindex {
            background: #f1f5f9;
            color: #475569;
            border: 1px solid #cbd5e1;
        }
        .btn-reindex:hover:not(:disabled) {
            background: #e2e8f0;
            color: #334155;
        }
        .save-feedback {
            width: 100%;
            font-size: 0.9rem;
            color: #10b981;
            font-weight: 600;
            margin-top: -0.5rem;
        }
        .save-feedback.error {
            color: #ef4444;
        }
        .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        @media (max-width: 900px) {
            .main-content {
                grid-template-columns: 1fr;
            }
        }
        .upload-card, .list-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
        }
        h3 {
            margin: 0 0 1.5rem 0;
            font-size: 1.25rem;
            color: #1e293b;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        h3 i {
            color: #6366f1;
        }
        .dropzone {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem 2rem;
            border: 2px dashed #a5b4fc;
            border-radius: 12px;
            background: rgba(238, 242, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            min-height: 250px;
        }
        .dropzone:hover, .dropzone.drag-over {
            border-color: #6366f1;
            background: #eef2ff;
            transform: translateY(-2px);
        }
        .dropzone i.main-icon {
            font-size: 3.5rem;
            color: #818cf8;
            margin-bottom: 1rem;
            transition: transform 0.3s ease;
        }
        .dropzone:hover i.main-icon, .dropzone.drag-over i.main-icon {
            transform: scale(1.1);
            color: #6366f1;
        }
        .dropzone-text {
            font-size: 1.1rem;
            font-weight: 600;
            color: #334155;
            margin-bottom: 0.5rem;
        }
        .dropzone-subtext {
            font-size: 0.85rem;
            color: #64748b;
        }
        .file-input {
            display: none;
        }
        .progress-bar-container {
            width: 100%;
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            margin-top: 2rem;
            overflow: hidden;
        }
        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #818cf8, #4f46e5);
            transition: width 0.3s ease;
        }
        .progress-text {
            font-size: 0.85rem;
            color: #4f46e5;
            font-weight: 600;
            margin-top: 0.75rem;
        }
        .docs-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-height: 500px;
            overflow-y: auto;
            padding-right: 5px;
        }
        .doc-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            transition: all 0.2s ease;
        }
        .doc-item:hover {
            background: white;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            border-color: #cbd5e1;
            transform: translateX(2px);
        }
        .doc-info {
            display: flex;
            align-items: center;
            gap: 15px;
            overflow: hidden;
        }
        .doc-icon {
            font-size: 2rem;
        }
        .doc-icon.pdf { color: #ef4444; }
        .doc-icon.docx { color: #2563eb; }
        .doc-details {
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        .doc-name {
            font-weight: 600;
            font-size: 1rem;
            color: #334155;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 250px;
        }
        .doc-meta {
            font-size: 0.8rem;
            color: #64748b;
            display: flex;
            gap: 10px;
            margin-top: 4px;
        }
        .btn-icon {
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            padding: 8px;
            border-radius: 6px;
            transition: all 0.2s ease;
            font-size: 1.1rem;
        }
        .btn-icon:hover {
            color: #ef4444;
            background: #fee2e2;
        }
        .empty-docs {
            text-align: center;
            padding: 3rem;
            color: #94a3b8;
            font-size: 1rem;
            background: #f8fafc;
            border-radius: 10px;
            border: 2px dashed #e2e8f0;
            margin: auto 0;
        }
        .badge {
            background: #e0e7ff;
            color: #4f46e5;
            padding: 2px 10px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 700;
            margin-left: auto;
        }
    `]
})
export class RagManagerComponent implements OnInit {
    docsPath: string = '';
    isSaving: boolean = false;
    isIndexing: boolean = false;
    saveMessage: string = '';

    documents: any[] = [];
    isLoadingDocs: boolean = false;
    isDragging: boolean = false;
    isUploading: boolean = false;
    uploadProgress: number = 0;

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
                this.loadDocuments();
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
                this.saveMessage = 'Chemin appliqué et sauvegardé !';
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
        this.saveMessage = 'Indexation complète en cours...';
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

    loadDocuments() {
        this.isLoadingDocs = true;
        this.aiService.getRagDocuments().subscribe({
            next: (docs) => {
                this.documents = docs;
                this.isLoadingDocs = false;
            },
            error: (err) => {
                this.isLoadingDocs = false;
                console.error('Error loading docs:', err);
            }
        });
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.isUploading) {
            this.isDragging = true;
        }
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
        
        if (this.isUploading) return;

        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            this.handleSelectedFile(files[0]);
        }
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.handleSelectedFile(file);
        }
        event.target.value = '';
    }

    private handleSelectedFile(file: File) {
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (extension !== 'pdf' && extension !== 'docx') {
            this.saveMessage = 'Erreur : Seuls les fichiers PDF et DOCX sont autorisés.';
            setTimeout(() => this.saveMessage = '', 5000);
            return;
        }
        
        if (file.size > 15 * 1024 * 1024) {
             this.saveMessage = 'Erreur : Le fichier dépasse 15 Mo.';
             setTimeout(() => this.saveMessage = '', 5000);
             return;
        }

        this.uploadFile(file);
    }

    private uploadFile(file: File) {
        this.isUploading = true;
        this.uploadProgress = 0;
        this.saveMessage = '';

        this.aiService.uploadRagDocument(file).subscribe({
            next: (event: any) => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.uploadProgress = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    this.isUploading = false;
                    this.uploadProgress = 100;
                    this.saveMessage = `${file.name} uplaodé et indexé avec succès !`;
                    setTimeout(() => {
                        this.uploadProgress = 0;
                        this.saveMessage = '';
                    }, 5000);
                    this.loadDocuments();
                }
            },
            error: (err: any) => {
                this.isUploading = false;
                this.uploadProgress = 0;
                this.saveMessage = 'Erreur lors de l\'upload : ' + (err.error?.error || 'Erreur inconnue');
                setTimeout(() => this.saveMessage = '', 5000);
            }
        });
    }

    deleteDocument(doc: any) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer '${doc.name}' et de le retirer de l'index RAG ?`)) {
            this.saveMessage = 'Suppression et réindexation en cours...';
            this.aiService.deleteRagDocument(doc.relativePath || doc.name).subscribe({
                next: () => {
                    this.saveMessage = 'Document supprimé et index mis à jour.';
                    setTimeout(() => this.saveMessage = '', 5000);
                    this.loadDocuments();
                },
                error: (err) => {
                    this.saveMessage = 'Erreur lors de la suppression.';
                    setTimeout(() => this.saveMessage = '', 5000);
                    console.error('Delete error', err);
                }
            });
        }
    }

    formatSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
