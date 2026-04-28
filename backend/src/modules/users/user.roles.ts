import { buildLookupCodeList, buildLookupCodeMap } from '../../database/lookups/lookup-registry';

const userRoleMap = buildLookupCodeMap('user.role');
export const UserRole = {
    RISK_MANAGER: userRoleMap.RISK_MANAGER || 'risk_manager',
    RISK_AGENT: userRoleMap.RISK_AGENT || 'risk_agent',
    AUDIT_DIRECTEUR: userRoleMap.AUDIT_DIRECTEUR || 'audit_directeur',
    AUDIT_RESPONSABLE: userRoleMap.AUDIT_RESPONSABLE || 'audit_responsable',
    AUDITEUR: userRoleMap.AUDITEUR || 'auditeur',
    TOP_MANAGEMENT: userRoleMap.TOP_MANAGEMENT || 'top_management',
    ADMIN_SI: userRoleMap.ADMIN_SI || 'admin_si',
    SUPER_ADMIN: userRoleMap.SUPER_ADMIN || 'super_admin',
    CONTROLLER: userRoleMap.CONTROLLER || 'controller',
    CHEF_MISSION: userRoleMap.CHEF_MISSION || 'chef_mission',
} as const;
export type UserRole = string;
export const USER_ROLE_CODES = buildLookupCodeList('user.role');

export const AUDIT_COORDINATION_ROLES = [
    UserRole.AUDIT_DIRECTEUR,
    UserRole.AUDIT_RESPONSABLE,
    UserRole.CHEF_MISSION,
] as const;

export const AUDIT_ALL_ROLES = [
    ...AUDIT_COORDINATION_ROLES,
    UserRole.AUDITEUR,
] as const;

export const isAuditCoordinationRole = (role: string): boolean =>
    AUDIT_COORDINATION_ROLES.includes(role as (typeof AUDIT_COORDINATION_ROLES)[number]);

export const isAuditRole = (role: string): boolean =>
    AUDIT_ALL_ROLES.includes(role as (typeof AUDIT_ALL_ROLES)[number]);
