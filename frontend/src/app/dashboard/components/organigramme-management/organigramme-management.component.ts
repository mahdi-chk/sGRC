import { Component, OnInit } from '@angular/core';
import { OrganigrammeService } from '../../../core/services/organigramme.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    showExportMenu = false;

    currentPage = 1;
    itemsPerPage = 10;

    get paginatedItems(): any[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.items.slice(startIndex, startIndex + this.itemsPerPage);
    }

    onPageChanged(event: {page: number, pageSize: number}) {
        this.currentPage = event.page;
        this.itemsPerPage = event.pageSize;
    }

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
            this.currentPage = 1;
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

    exportToXLSX() {
        const dataToExport = this.items.map(item => ({
            'ID': item.id,
            'Intitulé / Nom': item.nom
        }));

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Organigramme');
        XLSX.writeFile(wb, `Export_Organigramme_${new Date().getTime()}.xlsx`);
        this.showExportMenu = false;
    }

    exportToPDF() {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.setTextColor(0, 74, 153);
        doc.text("Rapport de l'Organigramme", 14, 22);

        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Généré le : ${new Date().toLocaleString()}`, 14, 30);

        const columns = ['ID', 'Intitulé / Nom'];
        const rows = this.items.map(item => [
            `#${item.id}`,
            item.nom
        ]);

        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 40,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153], textColor: [255, 255, 255], fontStyle: 'bold' },
            styles: { fontSize: 10, cellPadding: 4 },
            alternateRowStyles: { fillColor: [245, 247, 250] }
        });

        doc.save(`Export_Organigramme_${new Date().getTime()}.pdf`);
        this.showExportMenu = false;
    }
}
