/**
 * @file auditing.service.ts
 * @description Service de communication avec l'API pour le module d'audit.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/**
 * Énumération des statuts de mission d'audit (synchronisée avec le backend)
 */
export var AuditMissionStatus;
(function (AuditMissionStatus) {
    AuditMissionStatus["A_VENIR"] = "a_venir";
    AuditMissionStatus["EN_COURS"] = "en_cours";
    AuditMissionStatus["TERMINE"] = "termine";
    AuditMissionStatus["EN_RETARD"] = "en_retard";
    AuditMissionStatus["ANNULE"] = "annule";
})(AuditMissionStatus || (AuditMissionStatus = {}));
export class AuditingService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiUrl}/auditing`;
    }
    /**
     * Récupère la liste des missions d'audit.
     */
    getMissions() {
        return this.http.get(`${this.apiUrl}/missions`);
    }
    /**
     * Suggère un plan d'audit annuel via l'IA.
     */
    suggestPlan() {
        return this.http.post(`${this.apiUrl}/suggest-plan`, {});
    }
    /**
     * Crée des missions à partir d'un plan suggéré.
     */
    createMissionsFromPlan(missions) {
        return this.http.post(`${this.apiUrl}/create-missions`, { missions });
    }
    /**
     * Assigne une mission à un auditeur.
     */
    assignMission(missionId, auditeurId) {
        return this.http.put(`${this.apiUrl}/missions/${missionId}/assign`, { auditeurId });
    }
    /**
     * Met à jour les détails d'une mission d'audit.
     */
    updateMission(missionId, data) {
        return this.http.put(`${this.apiUrl}/missions/${missionId}`, data);
    }
    /**
     * Soumet un rapport d'audit.
     */
    submitReport(missionId, data) {
        return this.http.put(`${this.apiUrl}/missions/${missionId}/report`, data);
    }
    /**
     * Supprime une mission d'audit.
     */
    deleteMission(missionId) {
        return this.http.delete(`${this.apiUrl}/missions/${missionId}`);
    }
    /**
     * Réinitialise une mission d'audit.
     */
    resetMission(missionId) {
        return this.http.put(`${this.apiUrl}/missions/${missionId}/reset`, {});
    }
    /**
     * --- CHECKLISTS TEMPLATES ---
     */
    getChecklistTemplates() {
        return this.http.get(`${this.apiUrl}/checklists`);
    }
    createChecklistTemplate(data) {
        return this.http.post(`${this.apiUrl}/checklists`, data);
    }
    deleteChecklistTemplate(id) {
        return this.http.delete(`${this.apiUrl}/checklists/${id}`);
    }
    /**
     * --- MISSION CHECKLISTS ---
     */
    getMissionChecklistItems(missionId) {
        return this.http.get(`${this.apiUrl}/missions/${missionId}/checklists`);
    }
    assignTemplateToMission(missionId, templateId) {
        return this.http.post(`${this.apiUrl}/missions/${missionId}/checklists`, { templateId });
    }
    toggleMissionChecklistItem(missionId, itemId, estFait) {
        return this.http.put(`${this.apiUrl}/missions/${missionId}/checklists/${itemId}`, { estFait });
    }
    /**
     * --- TRAÇABILITÉ DES PREUVES ---
     */
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
    /**
     * Récupère TOUTES les preuves d'audit (Global Explorer).
     */
    getAllEvidence() {
        return this.http.get(`${this.apiUrl}/evidence`);
    }
    /**
     * Récupère les missions avec rapports soumis (Review Center).
     */
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