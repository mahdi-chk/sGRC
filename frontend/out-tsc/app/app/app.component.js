/**
 * @file app.component.ts
 * @description Composant racine de l'application.
 * Sert de conteneur principal pour le routage.
 */
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class AppComponent {
    constructor() {
        this.title = 'grc-platform';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "router-outlet");
    } }, directives: [i1.RouterOutlet], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppComponent, [{
        type: Component,
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html'
            }]
    }], null, null); })();
//# sourceMappingURL=app.component.js.map