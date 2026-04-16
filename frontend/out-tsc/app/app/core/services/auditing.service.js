/**
 * @file auditing.service.ts
 * @description Service de communication avec l'API pour le module d'audit.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export var AuditMissionStatus;
(function (AuditMissionStatus) {
    AuditMissionStatus["NOK"] = "nok";
    AuditMissionStatus["A_VENIR"] = "nok";
    AuditMissionStatus["EN_COURS"] = "en_cours";
    AuditMissionStatus["OK"] = "ok";
    AuditMissionStatus["TERMINE"] = "ok";
    AuditMissionStatus["EN_RETARD"] = "nok";
    AuditMissionStatus["ANNULE"] = "nok";
})(AuditMissionStatus || (AuditMissionStatus = {}));
export var AuditMissionHorizon;
(function (AuditMissionHorizon) {
    AuditMissionHorizon["COURT_TERME"] = "court_terme";
    AuditMissionHorizon["MOYEN_TERME"] = "moyen_terme";
})(AuditMissionHorizon || (AuditMissionHorizon = {}));
export var AuditRecordType;
(function (AuditRecordType) {
    AuditRecordType["MISSION_AUDIT"] = "mission_audit";
    AuditRecordType["PLAN_ACTION_AUDIT"] = "plan_action_audit";
})(AuditRecordType || (AuditRecordType = {}));
export class AuditingService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiUrl}/auditing`;
    }
    getMissions(type = AuditRecordType.MISSION_AUDIT) {
        let params = new HttpParams();
        if (type !== 'all') {
            params = params.set('type', type);
        }
        return this.http.get(`${this.apiUrl}/missions`, { params });
    }
    suggestPlan(type = AuditRecordType.MISSION_AUDIT) {
        return this.http.post(`${this.apiUrl}/suggest-plan`, { type });
    }
    createMissionsFromPlan(missions, type = AuditRecordType.MISSION_AUDIT) {
        return this.http.post(`${this.apiUrl}/create-missions`, { missions, type });
    }
    createMission(data) {
        return this.http.post(`${this.apiUrl}/missions`, data);
    }
    assignMission(missionId, auditeurId) {
        return this.http.put(`${this.apiUrl}/missions/${missionId}/assign`, { auditeurId });
    }
    updateMission(missionId, data) {
        return this.http.put(`${this.apiUrl}/missions/${missionId}`, data);
    }
    submitReport(missionId, data) {
        return this.http.put(`${this.apiUrl}/missions/${missionId}/report`, data);
    }
    deleteMission(missionId) {
        return this.http.delete(`${this.apiUrl}/missions/${missionId}`);
    }
    resetMission(missionId) {
        return this.http.put(`${this.apiUrl}/missions/${missionId}/reset`, {});
    }
    getActionPlans() {
        return this.http.get(`${this.apiUrl}/action-plans`);
    }
    createActionPlan(payload) {
        return this.http.post(`${this.apiUrl}/action-plans`, payload);
    }
    updateActionPlan(actionPlanId, payload) {
        return this.http.put(`${this.apiUrl}/action-plans/${actionPlanId}`, payload);
    }
    deleteActionPlan(actionPlanId) {
        return this.http.delete(`${this.apiUrl}/action-plans/${actionPlanId}`);
    }
    importActionPlans(file, riskId) {
        const formData = new FormData();
        formData.append('file', file);
        if (riskId) {
            formData.append('riskId', String(riskId));
        }
        return this.http.post(`${this.apiUrl}/action-plans/import`, formData);
    }
    importMissions(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.apiUrl}/missions/import`, formData);
    }
    getChecklistTemplates() {
        return this.http.get(`${this.apiUrl}/checklists`);
    }
    createChecklistTemplate(data) {
        return this.http.post(`${this.apiUrl}/checklists`, data);
    }
    deleteChecklistTemplate(id) {
        return this.http.delete(`${this.apiUrl}/checklists/${id}`);
    }
    getMissionChecklistItems(missionId) {
        return this.http.get(`${this.apiUrl}/missions/${missionId}/checklists`);
    }
    assignTemplateToMission(missionId, templateId) {
        return this.http.post(`${this.apiUrl}/missions/${missionId}/checklists`, { templateId });
    }
    toggleMissionChecklistItem(missionId, itemId, estFait) {
        return this.http.put(`${this.apiUrl}/missions/${missionId}/checklists/${itemId}`, { estFait });
    }
    getMissionActionPlanItems(missionId) {
        return this.http.get(`${this.apiUrl}/missions/${missionId}/action-plans`);
    }
    createMissionActionPlanItem(missionId, payload) {
        return this.http.post(`${this.apiUrl}/missions/${missionId}/action-plans`, payload);
    }
    updateMissionActionPlanItem(missionId, itemId, payload) {
        return this.http.put(`${this.apiUrl}/missions/${missionId}/action-plans/${itemId}`, payload);
    }
    deleteMissionActionPlanItem(missionId, itemId) {
        return this.http.delete(`${this.apiUrl}/missions/${missionId}/action-plans/${itemId}`);
    }
    importMissionActionPlan(missionId, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.apiUrl}/missions/${missionId}/action-plans/import`, formData);
    }
    getMissionEvidence(missionId) {
        return this.http.get(`${this.apiUrl}/missions/${missionId}/evidence`);
    }
    addMissionEvidence(missionId, file) {
        const formData = new FormData();
        formData.append('evidenceFile', file);
        return this.http.post(`${this.apiUrl}/missions/${missionId}/evidence`, formData);
    }
    deleteMissionEvidence(missionId, evidenceId) {
        return this.http.delete(`${this.apiUrl}/missions/${missionId}/evidence/${evidenceId}`);
    }
    getAllEvidence() {
        return this.http.get(`${this.apiUrl}/evidence`);
    }
    getReportsToReview() {
        return this.http.get(`${this.apiUrl}/reports`);
    }
}
AuditingService.ɵfac = function AuditingService_Factory(t) { return new (t || AuditingService)(i0.ɵɵinject(i1.HttpClient)); };
AuditingService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuditingService, factory: AuditingService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditingService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=auditing.service.js.map