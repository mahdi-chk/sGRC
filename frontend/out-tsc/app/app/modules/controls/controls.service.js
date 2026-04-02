import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ControlsService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiUrl}/controls`;
    }
    getOverview() {
        return this.http.get(`${this.apiUrl}/overview`);
    }
}
ControlsService.ɵfac = function ControlsService_Factory(t) { return new (t || ControlsService)(i0.ɵɵinject(i1.HttpClient)); };
ControlsService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ControlsService, factory: ControlsService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ControlsService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=controls.service.js.map