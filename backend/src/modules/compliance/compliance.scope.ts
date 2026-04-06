import { Op, WhereOptions } from 'sequelize';
import { LookupResolutionService } from '../../database/lookups/lookup.service';
import { UserRole } from '../users/user.roles';
import { ComplianceFilters, ComplianceScope } from './compliance.types';

const mergeAnd = (items: any[]): WhereOptions => {
    const filtered = items.filter(Boolean);
    if (filtered.length === 0) {
        return {};
    }

    if (filtered.length === 1) {
        return filtered[0];
    }

    return { [Op.and]: filtered };
};

export const normalizeFilters = (query: any): ComplianceFilters => {
    const filters: ComplianceFilters = {};

    if (query.frameworkId && Number.isFinite(Number(query.frameworkId))) {
        filters.frameworkId = Number(query.frameworkId);
    }

    if (query.departmentId && Number.isFinite(Number(query.departmentId))) {
        filters.departmentId = Number(query.departmentId);
    }

    if (query.ownerUserId && Number.isFinite(Number(query.ownerUserId))) {
        filters.ownerUserId = Number(query.ownerUserId);
    }

    if (typeof query.entityKey === 'string' && query.entityKey.trim()) {
        filters.entityKey = query.entityKey.trim();
    }

    if (typeof query.status === 'string' && query.status.trim()) {
        filters.status = query.status.trim();
    }

    return filters;
};

export const buildFrameworkWhere = (scope: ComplianceScope, filters: ComplianceFilters): WhereOptions => {
    const clauses: any[] = [];

    if (filters.departmentId) {
        clauses.push({ departmentId: filters.departmentId });
    }

    if (filters.ownerUserId) {
        clauses.push({ ownerUserId: filters.ownerUserId });
    }

    if (filters.entityKey) {
        clauses.push({ entityKey: filters.entityKey });
    }

    if (filters.status) {
        const lookup = LookupResolutionService.getStaticValue('complianceFramework.status', filters.status);
        if (lookup) {
            clauses.push({ statusId: lookup.id });
        }
    }

    if (scope.role === UserRole.SUPER_ADMIN || scope.role === UserRole.TOP_MANAGEMENT) {
        return mergeAnd(clauses);
    }

    clauses.push({
        [Op.or]: [
            { ownerUserId: scope.userId },
            scope.departmentId ? { departmentId: scope.departmentId } : null,
        ].filter(Boolean),
    });

    return mergeAnd(clauses);
};

export const buildChildWhere = (scope: ComplianceScope, filters: ComplianceFilters): WhereOptions => {
    const clauses: any[] = [];

    if (filters.departmentId) {
        clauses.push({ departmentId: filters.departmentId });
    }

    if (filters.ownerUserId) {
        clauses.push({ ownerUserId: filters.ownerUserId });
    }

    if (filters.entityKey) {
        clauses.push({ entityKey: filters.entityKey });
    }

    if (scope.role === UserRole.SUPER_ADMIN || scope.role === UserRole.TOP_MANAGEMENT) {
        return mergeAnd(clauses);
    }

    clauses.push({
        [Op.or]: [
            { ownerUserId: scope.userId },
            scope.departmentId ? { departmentId: scope.departmentId } : null,
        ].filter(Boolean),
    });

    return mergeAnd(clauses);
};
