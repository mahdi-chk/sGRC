export const CONTROL_EVALUATION_LOOKUP_KEYS = {
    CAMPAIGN_STATUS: 'controlEvaluationCampaign.status',
    OBJECTIVE_TYPE: 'controlEvaluationCampaign.objectiveType',
    SCOPE_TYPE: 'controlEvaluationCampaign.scopeType',
    IMPLEMENTATION_ANSWER: 'controlPrincipleAssessment.implementationAnswer',
    OPERATING_ANSWER: 'controlPrincipleAssessment.operatingAnswer',
    ASSESSMENT_RESULT: 'controlPrincipleAssessment.result',
    DEFICIENCY_SEVERITY: 'controlDeficiency.severity',
    DEFICIENCY_STATUS: 'controlDeficiency.status',
    MEASURE_STATUS: 'controlCompensatingMeasure.status',
    EVIDENCE_SOURCE_TYPE: 'controlEvaluationEvidence.sourceType',
    CONCLUSION_RESULT: 'controlEvaluationConclusion.result',
} as const;

export const ControlEvaluationCampaignStatus = {
    DRAFT: 'draft',
    IN_PROGRESS: 'in_progress',
    SUBMITTED: 'submitted',
    VALIDATED: 'validated',
    CLOSED: 'closed',
    CANCELLED: 'cancelled',
} as const;

export const ControlAssessmentAnswer = {
    YES: 'yes',
    PARTIAL: 'partial',
    NO: 'no',
    NOT_APPLICABLE: 'not_applicable',
} as const;

export const ControlAssessmentResult = {
    EFFECTIVE: 'effective',
    PARTIALLY_EFFECTIVE: 'partially_effective',
    INEFFECTIVE: 'ineffective',
    NOT_ASSESSED: 'not_assessed',
} as const;

export const ControlDeficiencySeverity = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
    MAJOR: 'major',
} as const;

export const ControlDeficiencyStatus = {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    REMEDIATED: 'remediated',
    ACCEPTED: 'accepted',
    CLOSED: 'closed',
} as const;

export const ControlConclusionResult = {
    EFFECTIVE: 'effective',
    EFFECTIVE_WITH_RESERVATIONS: 'effective_with_reservations',
    PARTIALLY_EFFECTIVE: 'partially_effective',
    INEFFECTIVE: 'ineffective',
} as const;
