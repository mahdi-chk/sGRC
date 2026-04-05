import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./auth.service";
export var IncidentStatus;
(function (IncidentStatus) {
    IncidentStatus["NOUVEAU"] = "nouveau";
    IncidentStatus["EN_COURS"] = "en_cours";
    IncidentStatus["TRAITE"] = "traite";
    IncidentStatus["CLOS"] = "clos";
})(IncidentStatus || (IncidentStatus = {}));
export var IncidentNiveauRisque;
(function (IncidentNiveauRisque) {
    IncidentNiveauRisque["LOW"] = "low";
    IncidentNiveauRisque["LIMITED"] = "limited";
    IncidentNiveauRisque["MEDIUM"] = "medium";
    IncidentNiveauRisque["SIGNIFICANT"] = "significant";
    IncidentNiveauRisque["HIGH"] = "high";
    IncidentNiveauRisque["CRITICAL"] = "critical";
})(IncidentNiveauRisque || (IncidentNiveauRisque = {}));
export class IncidentService {
    constructor(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = `${environment.apiUrl}/incidents`;
    }
    trackLongRunningRequest(factory) {
        return defer(() => {
            this.authService.beginLongRunningTask();
            return factory().pipe(finalize(() => this.authService.endLongRunningTask()));
        });
    }
    getIncidents() {
        return this.http.get(this.apiUrl);
    }
    createIncident(formData) {
        return this.http.post(this.apiUrl, formData);
    }
    importIncidentDraft(file) {
        const formData = new FormData();
        formData.append('sourceFile', file);
        return this.trackLongRunningRequest(() => this.http.post(`${this.apiUrl}/import-draft`, formData));
    }
    updateIncident(id, data) {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }
    generateRisksFromIncident(incidentId) {
        return this.trackLongRunningRequest(() => this.http.post(`${this.apiUrl}/${incidentId}/generate-risks`, {}));
    }
}
IncidentService.ɵfac = function IncidentService_Factory(t) { return new (t || IncidentService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.AuthService)); };
IncidentService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: IncidentService, factory: IncidentService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IncidentService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.AuthService }]; }, null); })();
//# sourceMappingURL=incident.service.js.map