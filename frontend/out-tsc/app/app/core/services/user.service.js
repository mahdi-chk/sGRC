import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class UserService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiUrl}/users`;
    }
    getUsers() {
        return this.http.get(this.apiUrl);
    }
    getAssignableIncidentUsers() {
        return this.http.get(`${this.apiUrl}/assignable/incidents`);
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(i0.ɵɵinject(i1.HttpClient)); };
UserService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=user.service.js.map