import { UserRole } from '../users/user.roles';

export type AuditRoleResponsibility = {
    role: string;
    label: string;
    profile: string;
    responsibilities: string[];
};

export const AUDIT_WORK_PROGRAM_MODEL = {
    code: 'work_program',
    label: 'Programme de travail',
    mappedEntity: 'checklist',
    description: 'Dans le module audit, le programme de travail d une mission est gere comme une checklist rattachee a la mission.',
};

export const AUDIT_ROLE_RESPONSIBILITY_MATRIX: AuditRoleResponsibility[] = [
    {
        role: UserRole.AUDIT_DIRECTEUR,
        label: 'Directeur d Audit',
        profile: 'Responsable hierarchique et strategique de la fonction audit',
        responsibilities: [
            'Approuve le plan d audit etabli par le chef de division',
            'Approuve ou refuse les programmes de travail prepares pour chaque mission',
            'Approuve les rapports d audit avant leur diffusion',
        ],
    },
    {
        role: UserRole.AUDIT_RESPONSABLE,
        label: 'Chef de la Division d Audit',
        profile: 'Responsable operationnel de la gestion du plan d audit',
        responsibilities: [
            'Cree le plan d audit en fonction des risques identifies',
            'Cree et planifie les missions d audit incluses dans le plan',
            'Affecte les auditeurs aux differentes missions',
            'Valide le plan avant sa soumission au directeur',
            'Cree et modifie les programmes de travail des missions',
            'Valide les programmes de travail prepares par les chefs de mission',
            'Valide les rapports d audit finalises',
            'Supervise l avancement des missions et valide les livrables',
        ],
    },
    {
        role: UserRole.CHEF_MISSION,
        label: 'Chef de Mission',
        profile: 'Responsable de l execution d une mission d audit specifique',
        responsibilities: [
            'Dirige et supervise l execution de sa mission',
            'Prepare le programme de travail de la mission sous forme de checklist',
            'Planifie et effectue les tests d audit necessaires',
            'Affecte les taches aux auditeurs de son equipe',
            'Valide les constats et recommandations emis par les auditeurs',
        ],
    },
    {
        role: UserRole.AUDITEUR,
        label: 'Auditeur',
        profile: 'Executant des activites d audit operationnelles',
        responsibilities: [
            'Execute les activites d audit selon le programme de travail',
            'Effectue les tests et verifications necessaires',
            'Remonte les constats identifies au chef de mission',
            'Emet et suit les recommandations et plans d actions',
        ],
    },
    {
        role: UserRole.CONTROLLER,
        label: 'Controleur Interne',
        profile: 'Representant local de la division d audit chez les audites',
        responsibilities: [
            'Supervise localement l avancement de la mise en place des recommandations',
            'Remonte les informations de suivi a la division d audit',
            'Saisit et valide les plans d action proposes par les audites',
        ],
    },
];
