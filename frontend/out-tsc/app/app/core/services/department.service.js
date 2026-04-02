import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class DepartmentService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiUrl}/departments`;
    }
    getAll() {
        return this.http.get(this.apiUrl);
    }
}
DepartmentService.ɵfac = function DepartmentService_Factory(t) { return new (t || DepartmentService)(i0.ɵɵinject(i1.HttpClient)); };
DepartmentService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DepartmentService, factory: DepartmentService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DepartmentService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=department.service.js.map