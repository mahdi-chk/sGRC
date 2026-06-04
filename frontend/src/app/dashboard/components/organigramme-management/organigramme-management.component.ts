import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Department, DepartmentService } from '../../../core/services/department.service';
import { OrganigrammeService } from '../../../core/services/organigramme.service';

@Component({
    selector: 'app-organigramme-management',
    templateUrl: './organigramme-management.component.html',
    styleUrls: ['./organigramme-management.component.scss']
})
export class OrganigrammeManagementComponent implements OnInit {
    items: any[] = [];
    departments: Department[] = [];

    newNom = '';
    newDepartmentNom = '';

    selectedFile: File | null = null;
    selectedDepartmentFile: File | null = null;

    editingId: number | null = null;
    editingDepartmentId: number | null = null;

    editNom = '';
    editDepartmentNom = '';

    currentPage = 1;
    itemsPerPage = 10;
    departmentCurrentPage = 1;
    departmentItemsPerPage = 10;

    constructor(
        private organigrammeService: OrganigrammeService,
        private departmentService: DepartmentService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.refreshList();
        this.refreshDepartments();
    }

    get paginatedItems(): any[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.items.slice(startIndex, startIndex + this.itemsPerPage);
    }

    get paginatedDepartments(): Department[] {
        const startIndex = (this.departmentCurrentPage - 1) * this.departmentItemsPerPage;
        return this.departments.slice(startIndex, startIndex + this.departmentItemsPerPage);
    }

    goBack(): void {
        this.router.navigate(['/dashboard']);
    }

    onPageChanged(event: {page: number, pageSize: number}) {
        this.currentPage = event.page;
        this.itemsPerPage = event.pageSize;
    }

    onDepartmentPageChanged(event: {page: number, pageSize: number}) {
        this.departmentCurrentPage = event.page;
        this.departmentItemsPerPage = event.pageSize;
    }

    refreshList() {
        this.organigrammeService.getAll().subscribe(data => {
            this.items = data;
            this.currentPage = 1;
        });
    }

    refreshDepartments() {
        this.departmentService.getAll().subscribe(data => {
            this.departments = data;
            this.departmentCurrentPage = 1;
        });
    }

    addEntry() {
        const nom = this.newNom.trim();
        if (!nom) return;

        this.organigrammeService.create(nom).subscribe(() => {
            this.newNom = '';
            this.refreshList();
            alert('Element ajoute avec succes');
        }, err => alert(err.error.message || 'Erreur lors de l\'ajout'));
    }

    addDepartment() {
        const nom = this.newDepartmentNom.trim();
        if (!nom) return;

        this.departmentService.create(nom).subscribe(() => {
            this.newDepartmentNom = '';
            this.refreshDepartments();
            alert('Departement ajoute avec succes');
        }, err => alert(err.error.message || 'Erreur lors de l\'ajout'));
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    onDepartmentFileSelected(event: any) {
        this.selectedDepartmentFile = event.target.files[0];
    }

    importExcel() {
        if (!this.selectedFile) return;

        this.organigrammeService.importExcel(this.selectedFile).subscribe(res => {
            alert(res.message);
            this.selectedFile = null;
            this.refreshList();
        }, err => alert(err.error.message || 'Erreur lors de l\'import'));
    }

    importDepartmentExcel() {
        if (!this.selectedDepartmentFile) return;

        this.departmentService.importExcel(this.selectedDepartmentFile).subscribe(res => {
            alert(res.message);
            this.selectedDepartmentFile = null;
            this.refreshDepartments();
        }, err => alert(err.error.message || 'Erreur lors de l\'import'));
    }

    deleteEntry(id: number) {
        if (!confirm('Etes-vous sur de vouloir supprimer cet element ?')) return;

        this.organigrammeService.delete(id).subscribe(() => {
            this.refreshList();
        });
    }

    deleteDepartment(id: number) {
        if (!confirm('Etes-vous sur de vouloir supprimer ce departement ?')) return;

        this.departmentService.delete(id).subscribe(() => {
            this.refreshDepartments();
        });
    }

    startEdit(item: any) {
        this.editingId = item.id;
        this.editNom = item.nom;
    }

    startDepartmentEdit(department: Department) {
        this.editingDepartmentId = department.id;
        this.editDepartmentNom = department.nom;
    }

    saveEdit() {
        const nom = this.editNom.trim();
        if (!this.editingId || !nom) return;

        this.organigrammeService.update(this.editingId, nom).subscribe(() => {
            this.editingId = null;
            this.refreshList();
        });
    }

    saveDepartmentEdit() {
        const nom = this.editDepartmentNom.trim();
        if (!this.editingDepartmentId || !nom) return;

        this.departmentService.update(this.editingDepartmentId, nom).subscribe(() => {
            this.editingDepartmentId = null;
            this.refreshDepartments();
        });
    }

    cancelEdit() {
        this.editingId = null;
    }

    cancelDepartmentEdit() {
        this.editingDepartmentId = null;
    }

    exportOrganigrammeToXLSX() {
        this.exportToXLSX(this.items, 'Organigramme', 'Export_Organigramme');
    }

    exportDepartmentsToXLSX() {
        this.exportToXLSX(this.departments, 'Departements', 'Export_Departements');
    }

    exportOrganigrammeToPDF() {
        this.exportToPDF(this.items, 'Rapport de l\'Organigramme', 'Export_Organigramme');
    }

    exportDepartmentsToPDF() {
        this.exportToPDF(this.departments, 'Rapport des departements', 'Export_Departements');
    }

    private exportToXLSX(items: any[], sheetName: string, filePrefix: string) {
        const dataToExport = items.map(item => ({
            'ID': item.id,
            'Intitule / Nom': item.nom
        }));

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        XLSX.writeFile(wb, `${filePrefix}_${new Date().getTime()}.xlsx`);
    }

    private exportToPDF(items: any[], title: string, filePrefix: string) {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.setTextColor(0, 74, 153);
        doc.text(title, 14, 22);

        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Genere le : ${new Date().toLocaleString()}`, 14, 30);

        const columns = ['ID', 'Intitule / Nom'];
        const rows = items.map(item => [
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

        doc.save(`${filePrefix}_${new Date().getTime()}.pdf`);
    }
}
