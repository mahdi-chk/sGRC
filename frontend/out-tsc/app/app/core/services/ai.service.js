var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { defer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./auth.service";
export class AIService {
    constructor(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = `${environment.apiUrl}/assistant`;
    }
    trackLongRunningRequest(factory) {
        return defer(() => {
            this.authService.beginLongRunningTask();
            return factory().pipe(finalize(() => this.authService.endLongRunningTask()));
        });
    }
    chat(prompt, sessionId) {
        return this.http.post(`${this.apiUrl}/generate`, { prompt, sessionId });
    }
    chatStream(prompt, sessionId, signal) {
        var _a;
        return __asyncGenerator(this, arguments, function* chatStream_1() {
            this.authService.beginLongRunningTask();
            try {
                const token = this.authService.getToken();
                const response = yield __await(fetch(`${this.apiUrl}/generate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ prompt, sessionId }),
                    signal
                }));
                if (!response.ok)
                    throw new Error('AI Service Error');
                const reader = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
                if (!reader)
                    throw new Error('ReadableStream not supported');
                const decoder = new TextDecoder();
                while (true) {
                    const { done, value } = yield __await(reader.read());
                    if (done)
                        break;
                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]')
                                return yield __await(void 0);
                            try {
                                const parsed = JSON.parse(data);
                                yield yield __await(parsed.content);
                            }
                            catch (e) { }
                        }
                    }
                }
            }
            finally {
                this.authService.endLongRunningTask();
            }
        });
    }
    getStatus() {
        return this.http.get(`${this.apiUrl}/status`);
    }
    indexNormes() {
        return this.trackLongRunningRequest(() => this.http.post(`${this.apiUrl}/index`, {}));
    }
    getRagDocuments() {
        return this.http.get(`${this.apiUrl}/docs`);
    }
    uploadRagDocument(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.trackLongRunningRequest(() => {
            const req = new HttpRequest('POST', `${this.apiUrl}/docs/upload`, formData, {
                reportProgress: true
            });
            return this.http.request(req);
        });
    }
    deleteRagDocument(relativePath) {
        return this.trackLongRunningRequest(() => this.http.delete(`${this.apiUrl}/docs/file?path=${encodeURIComponent(relativePath)}`));
    }
}
AIService.ɵfac = function AIService_Factory(t) { return new (t || AIService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.AuthService)); };
AIService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AIService, factory: AIService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AIService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.AuthService }]; }, null); })();
//# sourceMappingURL=ai.service.js.map