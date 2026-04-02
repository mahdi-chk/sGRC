import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ReportingService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiUrl}/reporting`;
    }
    getStats() {
        return this.http.get(`${this.apiUrl}/stats`);
    }
    getKpis() {
        return this.http.get(`${this.apiUrl}/kpis`);
    }
    getMultiEntityData() {
        return this.http.get(`${this.apiUrl}/multi-entity`);
    }
    exportData(params) {
        return this.http.post(`${this.apiUrl}/export`, params);
    }
}
ReportingService.ɵfac = function ReportingService_Factory(t) { return new (t || ReportingService)(i0.ɵɵinject(i1.HttpClient)); };
ReportingService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ReportingService, factory: ReportingService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportingService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=reporting.service.js.map