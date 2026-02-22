import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRole } from '../../../core/models/user-role.enum';

export interface User {
    id?: number;
    nom: string;
    prenom: string;
    mail: string;
    telephone: string;
    role: UserRole;
    departementId: number;
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
    // Modal state
    modalVisible = false;
    userSearchTerm = '';
    editingUser: User | null = null;
    userForm: User = this.emptyUser();
    users: User[] = [];
    validationErrors: any = {};
    status: string | null = null;

    showPassword = false;
    showConfirmPassword = false;

    postes: string[] = [];
    departements: any[] = [];
    UserRole = UserRole;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.loadUsers();
        this.loadDepartments();
        this.loadRoles();
    }

    private emptyUser(): User {
        return {
            nom: '',
            prenom: '',
            mail: '',
            telephone: '',
            role: UserRole.RISK_AGENT,
            departementId: 0,
            password: '',
            confirmPassword: ''
        };
    }

    loadUsers() {
        this.http.get<User[]>('http://localhost:3000/api/users').subscribe(
            (data: User[]) => this.users = data,
            (err: any) => this.status = 'Error loading users: ' + (err.status || err.message)
        );
    }

    loadDepartments() {
        this.http.get<any[]>('http://localhost:3000/api/departments').subscribe(
            (data: any[]) => this.departements = data,
            (err: any) => this.status = 'Error loading departments: ' + (err.status || err.message)
        );
    }

    loadRoles() {
        this.http.get<string[]>('http://localhost:3000/api/users/roles').subscribe(
            (data: string[]) => this.postes = data,
            (err: any) => this.status = 'Error loading roles: ' + (err.status || err.message)
        );
    }

    openUserModal(user?: User) {
        this.modalVisible = true;
        if (user) {
            this.editingUser = user;
            this.userForm = { ...user };
        } else {
            this.editingUser = null;
            this.userForm = this.emptyUser();
        }
        this.showPassword = false;
        this.showConfirmPassword = false;
    }

    closeUserModal() {
        this.modalVisible = false;
        this.userSearchTerm = '';
        this.validationErrors = {};
    }

    validateUser(): boolean {
        this.validationErrors = {};
        let isValid = true;

        if (!this.userForm.nom) { this.validationErrors.nom = 'Le nom est obligatoire'; isValid = false; }
        if (!this.userForm.prenom) { this.validationErrors.prenom = 'Le prénom est obligatoire'; isValid = false; }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.userForm.mail) {
            this.validationErrors.mail = 'L\'email est obligatoire';
            isValid = false;
        } else if (!emailRegex.test(this.userForm.mail)) {
            this.validationErrors.mail = 'Format d\'email invalide';
            isValid = false;
        }

        const phoneRegex = /^[0-9+\s-]{8,}$/;
        if (!this.userForm.telephone) {
            this.validationErrors.telephone = 'Le téléphone est obligatoire';
            isValid = false;
        } else if (!phoneRegex.test(this.userForm.telephone)) {
            this.validationErrors.telephone = 'Format de téléphone invalide (min 8 chiffres)';
            isValid = false;
        }

        // Password validation: mandatory for creation, optional for edit
        if (!this.editingUser && !this.userForm.password) {
            this.validationErrors.password = 'Le mot de passe est obligatoire pour un nouvel utilisateur';
            isValid = false;
        } else if (this.userForm.password && this.userForm.password.length < 6) {
            this.validationErrors.password = 'Le mot de passe doit faire au moins 6 caractères';
            isValid = false;
        }

        if (this.userForm.password !== this.userForm.confirmPassword) {
            this.validationErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
            isValid = false;
        }

        if (!this.userForm.role) { this.validationErrors.role = 'Le rôle est obligatoire'; isValid = false; }
        if (!this.userForm.departementId || this.userForm.departementId === 0) {
            this.validationErrors.departementId = 'Le département est obligatoire';
            isValid = false;
        }

        return isValid;
    }

    saveUser() {
        if (!this.validateUser()) return;

        // Préparation du payload
        const payload = { ...this.userForm };

        // Assurer que departementId est un nombre (important pour MSSQL)
        payload.departementId = Number(payload.departementId);

        // Assurer que 'poste' est envoyé car requis par le modèle Sequelize
        if (!payload.poste) {
            payload.poste = payload.role;
        }

        // Retirer le mot de passe s'il est vide (cas d'une mise à jour sans changement de MDP)
        if (!payload.password) {
            delete payload.password;
        }
        delete payload.confirmPassword;

        if (this.editingUser) {
            this.http.put(`http://localhost:3000/api/users/${this.editingUser.id}`, payload).subscribe(
                () => {
                    this.status = 'Utilisateur modifié';
                    this.loadUsers();
                    this.closeUserModal();
                },
                (err: any) => this.status = 'Error updating user: ' + (err.status || err.message)
            );
        } else {
            this.http.post('http://localhost:3000/api/users', payload).subscribe(
                () => {
                    this.status = 'Utilisateur créé';
                    this.loadUsers();
                    this.closeUserModal();
                },
                (err: any) => this.status = 'Error creating user: ' + (err.status || err.message)
            );
        }
    }

    resetPassword(user: User) {
        // TODO: Implement explicit reset if backend supports it, for now edit works as reset
        this.openUserModal(user);
        this.status = "Pour réinitialiser le mot de passe, modifiez l'utilisateur et entrez un nouveau mot de passe.";
    }

    deleteUser(event: Event, user: User) {
        event.stopPropagation();
        if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.prenom} ${user.nom} ?`)) {
            this.http.delete(`http://localhost:3000/api/users/${user.id}`).subscribe(
                () => {
                    this.status = 'Utilisateur supprimé';
                    this.loadUsers();
                },
                (err: any) => this.status = 'Error deleting user: ' + (err.status || err.message)
            );
        }
    }

    selectedRoleFilter = '';
    selectedDeptFilter = 0;

    get filteredUsers() {
        return this.users.filter(u => {
            const matchesSearch = !this.userSearchTerm ||
                `${u.nom} ${u.prenom} ${u.mail}`.toLowerCase().includes(this.userSearchTerm.toLowerCase());

            const matchesRole = !this.selectedRoleFilter || u.role === this.selectedRoleFilter;

            const matchesDept = !this.selectedDeptFilter || u.departementId === Number(this.selectedDeptFilter);

            return matchesSearch && matchesRole && matchesDept;
        });
    }

    resetFilters() {
        this.userSearchTerm = '';
        this.selectedRoleFilter = '';
        this.selectedDeptFilter = 0;
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
}
