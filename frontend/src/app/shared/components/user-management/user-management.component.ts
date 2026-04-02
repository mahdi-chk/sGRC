import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { UserRole } from '../../../core/models/user-role.enum';
import { environment } from '../../../../environments/environment';

export interface User {
    id?: number;
    nom: string;
    prenom: string;
    mail: string;
    telephone: string;
    role: { id?: number; code: string; label: string };
    departementId: number;
    departement?: { id: number; nom: string };
    password?: string;
    confirmPassword?: string;
    poste?: string;
}



@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
    modalVisible = false;
    userSearchTerm = '';
    editingUser: User | null = null;
    userForm: User = this.emptyUser();
    users: User[] = [];
    validationErrors: any = {};
    status: string | null = null;
    messageType: 'success' | 'error' | null = null;
    showExportMenu = false;


    showPassword = false;
    showConfirmPassword = false;
    isSaving = false;
    roleStats: Record<string, number> = {};
    postes: any[] = [];
    departements: any[] = [];
    UserRole = UserRole;

    filters = {
        search: '',
        role: '',
        department: 0
    };

    filteredUsers: User[] = [];

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }


    ngOnInit() {
        this.loadUsers();
        this.loadDepartments();
        this.loadRoles();
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }

    private extractErrorMessage(prefix: string, err: any): string {
        const apiMessage = err?.error?.message;
        return apiMessage ? `${prefix}: ${apiMessage}` : `${prefix}: ${err.status || err.message}`;
    }

    private emptyUser(): User {
        return {
            nom: '',
            prenom: '',
            mail: '',
            telephone: '',
            role: { code: '', label: '' },
            departementId: 0,
            password: '',
            confirmPassword: ''
        };
    }



    loadUsers() {
        this.http.get<any[]>(`${environment.apiUrl}/users`).subscribe(
            (data: any[]) => {
                this.users = data.map(u => ({
                    ...u,
                    role: { 
                        code: u.roleCode || (typeof u.role === 'string' ? u.role : u.role?.code) || 'unknown', 
                        label: u.roleLabel || (typeof u.role === 'string' ? u.role : u.role?.label) || 'Inconnu' 
                    }
                }));
                this.applyFilters();
            },
            (err: any) => {
                this.status = 'Error loading users: ' + (err.status || err.message);
                this.messageType = 'error';
            }
        );
    }


    calculateStats() {
        this.roleStats = {};
        this.filteredUsers.forEach(u => {
            const roleKey = u.role?.code || 'unknown';
            this.roleStats[roleKey] = (this.roleStats[roleKey] || 0) + 1;
        });
    }



    loadDepartments() {
        this.http.get<any[]>(`${environment.apiUrl}/departments`).subscribe(
            (data: any[]) => this.departements = data,
            (err: any) => this.status = 'Error loading departments: ' + (err.status || err.message)
        );
    }

    loadRoles() {
        this.http.get<any[]>(`${environment.apiUrl}/users/roles`).subscribe(
            (data: any[]) => this.postes = data,
            (err: any) => this.status = 'Error loading roles: ' + (err.status || err.message)
        );
    }


    openUserModal(user?: User) {
        this.modalVisible = true;
        this.isSaving = false;
        if (user) {
            this.editingUser = user;
            this.userForm = { ...user, role: (user.role?.code || '') as any, password: '', confirmPassword: '' };
        } else {
            this.editingUser = null;
            this.userForm = this.emptyUser();
            // Ensure role is a string for fresh forms if emptyUser doesn't set it nicely
            if (typeof this.userForm.role === 'object') {
                this.userForm.role = '' as any;
            }
        }
        this.showPassword = false;
        this.showConfirmPassword = false;
    }

    closeUserModal() {
        this.modalVisible = false;
        this.isSaving = false;
        this.userSearchTerm = '';
        this.validationErrors = {};
    }

    validateUser(): boolean {
        this.validationErrors = {};
        let isValid = true;
        const nom = this.userForm.nom?.trim();
        const prenom = this.userForm.prenom?.trim();
        const mail = this.userForm.mail?.trim();
        const telephone = this.userForm.telephone?.trim();

        if (!nom) { this.validationErrors.nom = 'Le nom est obligatoire'; isValid = false; }
        if (!prenom) { this.validationErrors.prenom = 'Le prenom est obligatoire'; isValid = false; }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!mail) {
            this.validationErrors.mail = 'L\'email est obligatoire';
            isValid = false;
        } else if (!emailRegex.test(mail)) {
            this.validationErrors.mail = 'Format d\'email invalide';
            isValid = false;
        }

        const phoneRegex = /^[0-9+\s-]{8,}$/;
        if (!telephone) {
            this.validationErrors.telephone = 'Le telephone est obligatoire';
            isValid = false;
        } else if (!phoneRegex.test(telephone)) {
            this.validationErrors.telephone = 'Format de telephone invalide (min 8 chiffres)';
            isValid = false;
        }

        if (!this.editingUser && !this.userForm.password) {
            this.validationErrors.password = 'Le mot de passe est obligatoire pour un nouvel utilisateur';
            isValid = false;
        } else if (this.userForm.password && this.userForm.password.length < 6) {
            this.validationErrors.password = 'Le mot de passe doit faire au moins 6 caracteres';
            isValid = false;
        }

        if (this.userForm.password !== this.userForm.confirmPassword) {
            this.validationErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
            isValid = false;
        }

        if (!this.userForm.role) { this.validationErrors.role = 'Le role est obligatoire'; isValid = false; }
        if (!this.userForm.departementId || Number(this.userForm.departementId) === 0) {
            this.validationErrors.departementId = 'Le departement est obligatoire';
            isValid = false;
        }

        return isValid;
    }

    saveUser() {
        if (this.isSaving) return;
        if (!this.validateUser()) return;
        this.isSaving = true;

        const roleCode = typeof this.userForm.role === 'string' ? this.userForm.role : this.userForm.role?.code;

        const payload: any = {
            ...this.userForm,
            nom: this.userForm.nom.trim(),
            prenom: this.userForm.prenom.trim(),
            mail: this.userForm.mail.trim().toLowerCase(),
            telephone: this.userForm.telephone.trim(),
            departementId: Number(this.userForm.departementId),
            role: roleCode,
            poste: (this.userForm.poste || roleCode || '').trim()
        };

        if (!payload.poste) {
            payload.poste = roleCode;
        }

        if (!payload.password) {
            delete payload.password;
        }
        delete payload.confirmPassword;


        if (this.editingUser) {
            this.http.put(`${environment.apiUrl}/users/${this.editingUser.id}`, payload).subscribe(
                () => {
                    this.isSaving = false;
                    this.status = 'Utilisateur modifié avec succès !';
                    this.messageType = 'success';
                    this.loadUsers();
                    this.closeUserModal();
                    setTimeout(() => { this.status = null; this.messageType = null; }, 5000);
                },
                (err: any) => {
                    this.isSaving = false;
                    this.status = this.extractErrorMessage('Erreur lors de la mise à jour', err);
                    this.messageType = 'error';
                }

            );
        } else {
            this.http.post(`${environment.apiUrl}/users`, payload).subscribe(
                () => {
                    this.isSaving = false;
                    this.status = 'Utilisateur créé avec succès !';
                    this.messageType = 'success';
                    this.loadUsers();
                    this.closeUserModal();
                    setTimeout(() => { this.status = null; this.messageType = null; }, 5000);
                },
                (err: any) => {
                    this.isSaving = false;
                    this.status = this.extractErrorMessage('Erreur lors de la création', err);
                    this.messageType = 'error';
                }

            );
        }
    }

    resetPassword(user: User) {
        this.openUserModal(user);
        this.status = 'Pour reinitialiser le mot de passe, modifiez l\'utilisateur et entrez un nouveau mot de passe.';
    }

    deleteUser(event: Event, user: User) {
        event.stopPropagation();
        if (confirm(`Etes-vous sur de vouloir supprimer l'utilisateur ${user.prenom} ${user.nom} ?`)) {
            this.http.delete(`${environment.apiUrl}/users/${user.id}`).subscribe(
                () => {
                    this.status = 'Utilisateur supprimé avec succès !';
                    this.messageType = 'success';
                    this.loadUsers();
                    setTimeout(() => { this.status = null; this.messageType = null; }, 5000);
                },
                (err: any) => {
                    this.status = 'Error deleting user: ' + (err.status || err.message);
                    this.messageType = 'error';
                }

            );
        }
    }

    applyFilters() {
        this.filteredUsers = this.users.filter(u => {
            const normalizedSearch = (this.filters.search || '').toLowerCase().trim();
            const matchesSearch = !normalizedSearch ||
                `${u.nom} ${u.prenom} ${u.mail}`.toLowerCase().includes(normalizedSearch);

            const roleCode = (u.role?.code || '').toLowerCase().trim();
            const filterRole = (this.filters.role || '').toLowerCase().trim();
            const matchesRole = !filterRole || roleCode === filterRole;
            
            const matchesDept = !this.filters.department || Number(u.departementId) === Number(this.filters.department);

            return matchesSearch && matchesRole && matchesDept;
        });
        this.calculateStats();
    }



    resetFilters() {
        this.filters = {
            search: '',
            role: '',
            department: 0
        };
        this.applyFilters();
    }


    selectUser(user: User) {
        this.openUserModal(user);
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    exportToXLSX() {
        const dataToExport = this.filteredUsers.map(u => ({
            'Nom': u.nom,
            'Prenom': u.prenom,
            'Email': u.mail,
            'Telephone': u.telephone,
            'Role': u.role?.label || u.role?.code || 'N/A',
            'Departement': this.departements.find(d => d.id === u.departementId)?.nom || 'N/A'

        }));


        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Utilisateurs');
        XLSX.writeFile(wb, `Export_Utilisateurs_${new Date().getTime()}.xlsx`);
        this.showExportMenu = false;
    }

    exportToPDF() {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.setTextColor(0, 74, 153);
        doc.text('Rapport de Gestion des Utilisateurs', 14, 22);

        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Genere le : ${new Date().toLocaleString()}`, 14, 30);

        const columns = ['Nom', 'Prenom', 'Email', 'Telephone', 'Role', 'Departement'];
        const rows = this.filteredUsers.map(u => [
            u.nom,
            u.prenom,
            u.mail,
            u.telephone,
            u.role?.label || u.role?.code || 'N/A',
            this.departements.find(d => d.id === u.departementId)?.nom || 'N/A'

        ]);


        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 40,
            theme: 'striped',
            headStyles: { fillColor: [0, 74, 153], textColor: [255, 255, 255], fontStyle: 'bold' },
            styles: { fontSize: 9, cellPadding: 3 },
            alternateRowStyles: { fillColor: [245, 247, 250] }
        });

        doc.save(`Export_Utilisateurs_${new Date().getTime()}.pdf`);
        this.showExportMenu = false;
    }
}
