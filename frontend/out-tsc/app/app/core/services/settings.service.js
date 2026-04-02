import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class SettingsService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiUrl}/settings`;
    }
    getSettings() {
        return this.http.get(this.apiUrl);
    }
    updateSetting(key, value) {
        return this.http.post(this.apiUrl, { key, value });
    }
}
SettingsService.ɵfac = function SettingsService_Factory(t) { return new (t || SettingsService)(i0.ɵɵinject(i1.HttpClient)); };
SettingsService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SettingsService, factory: SettingsService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SettingsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=settings.service.js.map