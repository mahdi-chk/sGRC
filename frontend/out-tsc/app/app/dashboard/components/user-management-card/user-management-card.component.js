import { Component, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export class UserManagementCardComponent {
    constructor() {
        this.openUserManagement = new EventEmitter();
    }
    onAccess() {
        this.openUserManagement.emit();
    }
}
UserManagementCardComponent.ɵfac = function UserManagementCardComponent_Factory(t) { return new (t || UserManagementCardComponent)(); };
UserManagementCardComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserManagementCardComponent, selectors: [["app-user-management-card"]], outputs: { openUserManagement: "openUserManagement" }, decls: 10, vars: 0, consts: [[1, "module-card", "premium", "special-admin", 3, "click"], [1, "card-icon"], [1, "fas", "fa-users-cog"], [1, "desc"], [1, "card-footer"], [1, "btn-primary"]], template: function UserManagementCardComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("click", function UserManagementCardComponent_Template_div_click_0_listener() { return ctx.onAccess(); });
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelement(2, "i", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "h3");
        i0.ɵɵtext(4, "Gestion des Utilisateurs");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "p", 3);
        i0.ɵɵtext(6, "G\u00E9rer les comptes, initialiser et r\u00E9initialiser les mots de passe.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 4);
        i0.ɵɵelementStart(8, "button", 5);
        i0.ɵɵtext(9, "Acc\u00E9der");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserManagementCardComponent, [{
        type: Component,
        args: [{
                selector: 'app-user-management-card',
                templateUrl: './user-management-card.component.html'
            }]
    }], null, { openUserManagement: [{
            type: Output
        }] }); })();
//# sourceMappingURL=user-management-card.component.js.map