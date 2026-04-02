import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/**
 * @file organigramme.service.ts
 * @description Service pour la gestion de la table organigramme.
 */
export class OrganigrammeService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiUrl}/organigramme`;
    }
    /**
     * Récupère tous les éléments de l'organigramme.
     */
    getAll() {
        return this.http.get(this.apiUrl);
    }
    /**
     * Crée un nouvel élément.
     */
    create(nom) {
        return this.http.post(this.apiUrl, { nom });
    }
    /**
     * Modifie un élément existant.
     */
    update(id, nom) {
        return this.http.put(`${this.apiUrl}/${id}`, { nom });
    }
    /**
     * Supprime un élément.
     */
    delete(id) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    /**
     * Importe des noms depuis un fichier Excel.
     */
    importExcel(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.apiUrl}/import`, formData);
    }
}
OrganigrammeService.ɵfac = function OrganigrammeService_Factory(t) { return new (t || OrganigrammeService)(i0.ɵɵinject(i1.HttpClient)); };
OrganigrammeService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OrganigrammeService, factory: OrganigrammeService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OrganigrammeService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=organigramme.service.js.map