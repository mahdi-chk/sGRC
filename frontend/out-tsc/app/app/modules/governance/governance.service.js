import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../core/services/auth.service";
export class GovernanceService {
    constructor(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = `${environment.apiUrl}/governance`;
    }
    getDocuments() {
        return this.http.get(`${this.apiUrl}/documents`).pipe(map(response => (Object.assign(Object.assign({}, response), { folders: response.folders.map(folder => (Object.assign(Object.assign({}, folder), { documents: folder.documents.map(document => (Object.assign(Object.assign({}, document), { viewUrl: this.buildFileUrl(document.folderKey, document.name), downloadUrl: this.buildFileUrl(document.folderKey, document.name, true) }))) }))) }))));
    }
    getOverview() {
        return this.http.get(`${this.apiUrl}/overview`);
    }
    uploadDocument(roleKey, file) {
        const formData = new FormData();
        formData.append('roleKey', roleKey);
        formData.append('document', file);
        return this.http.post(`${this.apiUrl}/documents`, formData);
    }
    deleteDocument(folderKey, fileName) {
        return this.http.delete(`${this.apiUrl}/documents/${encodeURIComponent(folderKey)}/${encodeURIComponent(fileName)}`);
    }
    getAuditEntries() {
        return this.http.get(`${this.apiUrl}/history`).pipe(map(response => response.entries));
    }
    getVersionSnapshots() {
        return this.http.get(`${this.apiUrl}/history`).pipe(map(response => response.snapshots));
    }
    getApprovalWorkflows() {
        return this.http.get(`${this.apiUrl}/approval-workflows`).pipe(map(response => response.workflows));
    }
    getMaturityAreas() {
        return this.http.get(`${this.apiUrl}/maturity`).pipe(map(response => response.areas));
    }
    getAdoptionCampaigns() {
        return this.http.get(`${this.apiUrl}/adoption`).pipe(map(response => response.campaigns));
    }
    buildFileUrl(folderKey, fileName, download = false) {
        const token = this.authService.getToken();
        const params = [];
        if (token) {
            params.push(`token=${encodeURIComponent(token)}`);
        }
        if (download) {
            params.push('download=1');
        }
        const query = params.length > 0 ? `?${params.join('&')}` : '';
        return `${this.apiUrl}/documents/file/${encodeURIComponent(folderKey)}/${encodeURIComponent(fileName)}${query}`;
    }
}
GovernanceService.ɵfac = function GovernanceService_Factory(t) { return new (t || GovernanceService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.AuthService)); };
GovernanceService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: GovernanceService, factory: GovernanceService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GovernanceService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.AuthService }]; }, null); })();
//# sourceMappingURL=governance.service.js.map