import { buildLookupCodeList, buildLookupCodeMap } from '../../database/lookups/lookup-registry';

const userRoleMap = buildLookupCodeMap('user.role');
export const UserRole = {
    RISK_MANAGER: userRoleMap.RISK_MANAGER || 'risk_manager',
    RISK_AGENT: userRoleMap.RISK_AGENT || 'risk_agent',
    AUDIT_DIRECTEUR: userRoleMap.AUDIT_DIRECTEUR || 'audit_directeur',
    AUDIT_RESPONSABLE: userRoleMap.AUDIT_RESPONSABLE || 'audit_responsable',
    AUDIT_SENIOR: userRoleMap.AUDIT_DIRECTEUR || 'audit_directeur',
    AUDITEUR: userRoleMap.AUDITEUR || 'auditeur',
    TOP_MANAGEMENT: userRoleMap.TOP_MANAGEMENT || 'top_management',
    ADMIN_SI: userRoleMap.ADMIN_SI || 'admin_si',
    SUPER_ADMIN: userRoleMap.SUPER_ADMIN || 'super_admin',
    CONTROLLER: userRoleMap.CONTROLLER || 'controller',
} as const;
export type UserRole = string;
export const USER_ROLE_CODES = buildLookupCodeList('user.role');
