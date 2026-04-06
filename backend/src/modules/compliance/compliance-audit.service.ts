import { ComplianceAuditTrail } from './compliance-audit-trail.model';

export class ComplianceAuditService {
    static async log(entry: {
        entityType: string;
        entityId: number;
        action: string;
        actorUserId?: number | null;
        departmentId?: number | null;
        entityKey?: string | null;
        payload?: unknown;
    }): Promise<void> {
        await ComplianceAuditTrail.create({
            entityType: entry.entityType,
            entityId: entry.entityId,
            action: entry.action,
            actorUserId: entry.actorUserId ?? null,
            departmentId: entry.departmentId ?? null,
            entityKey: entry.entityKey ?? null,
            payload: entry.payload ? JSON.stringify(entry.payload) : null,
        } as any);
    }
}
