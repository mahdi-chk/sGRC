export enum NotificationType {
    RISK_ASSIGNED = 'RISK_ASSIGNED',
    STATUS_CHANGED = 'STATUS_CHANGED',
    COMMENT_ADDED = 'COMMENT_ADDED',
    AUDIT_MISSION_ASSIGNED = 'AUDIT_MISSION_ASSIGNED',
    AUDIT_REPORT_SUBMITTED = 'AUDIT_REPORT_SUBMITTED',
}

export interface Notification {
    id: number;
    userId: number;
    type: NotificationType;
    content: string;
    isRead: boolean;
    riskId: number | null;
    auditMissionId: number | null;
    createdAt: string;
    updatedAt: string;
}
