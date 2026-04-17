import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ComplianceService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiUrl}/compliance`;
    }
    getOverview(filters = {}) {
        return this.http.get(`${this.apiUrl}/overview`, {
            params: this.buildParams(filters)
        });
    }
    getFrameworks(filters = {}) {
        return this.http.get(`${this.apiUrl}/frameworks`, {
            params: this.buildParams(filters)
        });
    }
    createFramework(payload) {
        return this.http.post(`${this.apiUrl}/frameworks`, payload);
    }
    updateFramework(id, payload) {
        return this.http.put(`${this.apiUrl}/frameworks/${id}`, payload);
    }
    deleteFramework(id) {
        return this.http.delete(`${this.apiUrl}/frameworks/${id}`);
    }
    getRequirements(frameworkId) {
        const filters = frameworkId ? { frameworkId } : {};
        return this.http.get(`${this.apiUrl}/requirements`, {
            params: this.buildParams(filters)
        });
    }
    createRequirement(payload) {
        return this.http.post(`${this.apiUrl}/requirements`, payload);
    }
    importRequirements(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.apiUrl}/frameworks/import`, formData);
    }
    updateRequirement(id, payload) {
        return this.http.put(`${this.apiUrl}/requirements/${id}`, payload);
    }
    deleteRequirement(id) {
        return this.http.delete(`${this.apiUrl}/requirements/${id}`);
    }
    getCampaigns(filters = {}) {
        return this.http.get(`${this.apiUrl}/campaigns`, {
            params: this.buildParams(filters)
        });
    }
    getGaps(filters = {}) {
        return this.http.get(`${this.apiUrl}/gaps`, {
            params: this.buildParams(filters)
        });
    }
    getEvidence(filters = {}) {
        return this.http.get(`${this.apiUrl}/evidence`, {
            params: this.buildParams(filters)
        });
    }
    getMappings() {
        return this.http.get(`${this.apiUrl}/mappings`);
    }
    createMapping(payload) {
        return this.http.post(`${this.apiUrl}/mappings`, payload);
    }
    autoMapFramework(frameworkId) {
        return this.http.post(`${this.apiUrl}/mappings/auto-map`, { frameworkId });
    }
    updateMapping(id, payload) {
        return this.http.put(`${this.apiUrl}/mappings/${id}`, payload);
    }
    deleteMapping(id) {
        return this.http.delete(`${this.apiUrl}/mappings/${id}`);
    }
    getLinkableSources() {
        return this.http.get(`${this.apiUrl}/linkable-sources`);
    }
    buildParams(filters) {
        let params = new HttpParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params = params.set(key, String(value));
            }
        });
        return params;
    }
}
ComplianceService.ɵfac = function ComplianceService_Factory(t) { return new (t || ComplianceService)(i0.ɵɵinject(i1.HttpClient)); };
ComplianceService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ComplianceService, factory: ComplianceService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ComplianceService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=compliance.service.js.map