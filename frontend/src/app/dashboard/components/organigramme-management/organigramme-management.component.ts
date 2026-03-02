import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../core/services/organigramme.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-organigramme-management',
    templateUrl: './organigramme-management.component.html',
    styleUrls: ['./organigramme-management.component.scss']
})
export class OrganigrammeManagementComponent implements OnInit {
    items: any[] = [];
    newNom: string = '';
    selectedFile: File | null = null;
    editingId: number | null = null;
    editNom: string = '';

    constructor(
        private organigrammeService: OrganigrammeService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.refreshList();
    }

    goBack(): void {
        this.router.navigate(['/dashboard']);
    }

    refreshList() {
        this.organigrammeService.getAll().subscribe(data => {
            this.items = data;
        });
    }

    addEntry() {
        if (!this.newNom) return;
        this.organigrammeService.create(this.newNom).subscribe(() => {
            this.newNom = '';
            this.refreshList();
            alert('Élément ajouté avec succès');
        }, err => alert(err.error.message || 'Erreur lors de l\'ajout'));
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    importExcel() {
        if (!this.selectedFile) return;
        this.organigrammeService.importExcel(this.selectedFile).subscribe(res => {
            alert(res.message);
            this.selectedFile = null;
            this.refreshList();
        }, err => alert(err.error.message || 'Erreur lors de l\'import'));
    }

    deleteEntry(id: number) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
        this.organigrammeService.delete(id).subscribe(() => {
            this.refreshList();
        });
    }

    startEdit(item: any) {
        this.editingId = item.id;
        this.editNom = item.nom;
    }

    saveEdit() {
        if (!this.editingId || !this.editNom) return;
        this.organigrammeService.update(this.editingId, this.editNom).subscribe(() => {
            this.editingId = null;
            this.refreshList();
        });
    }

    cancelEdit() {
        this.editingId = null;
    }
}
