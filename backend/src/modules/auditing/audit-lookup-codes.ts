export const AUDIT_LOOKUP_KEYS = {
    PLAN_STATUS: 'auditPlan.status',
    PLAN_NATURE: 'auditPlan.nature',
    PLAN_TRANSITION: 'auditPlanWorkflowEvent.transition',
    MISSION_CATEGORY: 'auditMission.category',
    MISSION_QUARTER: 'auditMission.quarter',
    RESOURCE_ASSIGNMENT_ROLE: 'auditMissionResource.assignmentRole',
} as const;

export const AuditPlanStatusCode = {
    CREE: 'cree',
    A_VALIDER: 'a_valider',
    VALIDE_DIRECTION: 'valide_direction',
    VALIDE_CONSEIL: 'valide_conseil',
    VALIDE_COMITE: 'valide_comite',
    FERME: 'ferme',
    FERME_DEFINITIVEMENT: 'ferme_definitivement',
} as const;

export const AuditPlanNatureCode = {
    ANNUEL: 'annuel',
    TRIMESTRIEL: 'trimestriel',
    SPECIFIQUE: 'specifique',
} as const;

export const AuditPlanTransitionCode = {
    DEMANDER_VALIDATION: 'demander_validation',
    VALIDER_DIRECTION: 'valider_direction',
    DEMANDER_REVUE: 'demander_revue',
    VALIDER_CONSEIL: 'valider_conseil',
    VALIDER_COMITE: 'valider_comite',
    FERMER: 'fermer',
    REOUVRIR: 'reouvrir',
    FERMER_DEFINITIVEMENT: 'fermer_definitivement',
    DEFINIR_MODELE: 'definir_modele',
} as const;

export const AuditMissionQuarterCode = {
    T1: 't1',
    T2: 't2',
    T3: 't3',
    T4: 't4',
} as const;

export const AuditMissionResourceRoleCode = {
    CHEF_MISSION: 'chef_mission',
    AUDITEUR: 'auditeur',
} as const;
