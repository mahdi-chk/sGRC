export enum NotificationType {
    RISK_ASSIGNED = 'risk_assigned',
    STATUS_CHANGED = 'status_changed',
    COMMENT_ADDED = 'comment_added',
    REMINDER = 'reminder',
    AUDIT_MISSION_ASSIGNED = 'audit_mission_assigned',
    AUDIT_REPORT_SUBMITTED = 'audit_report_submitted',
}


export interface Notification {
    id: number;
    userId: number;
    type: NotificationType | string;
    typeCode?: NotificationType | string | null;
    typeLabel?: string | null;
    content: string;
    isRead: boolean;
    riskId: number | null;
    auditMissionId: number | null;
    createdAt: string;
    updatedAt: string;
}
