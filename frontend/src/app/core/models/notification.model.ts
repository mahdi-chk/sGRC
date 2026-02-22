export enum NotificationType {
    RISK_ASSIGNED = 'RISK_ASSIGNED',
    STATUS_CHANGED = 'STATUS_CHANGED',
    COMMENT_ADDED = 'COMMENT_ADDED',
}

export interface Notification {
    id: number;
    userId: number;
    type: NotificationType;
    content: string;
    isRead: boolean;
    riskId: number | null;
    createdAt: string;
    updatedAt: string;
}
