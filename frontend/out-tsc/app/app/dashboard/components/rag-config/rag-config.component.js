import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class RagConfigComponent {
    constructor(router) {
        this.router = router;
    }
    openManager() {
        this.router.navigate(['/dashboard/rag-manager']);
    }
}
RagConfigComponent.ɵfac = function RagConfigComponent_Factory(t) { return new (t || RagConfigComponent)(i0.ɵɵdirectiveInject(i1.Router)); };
RagConfigComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RagConfigComponent, selectors: [["app-rag-config"]], decls: 10, vars: 0, consts: [[1, "config-card"], [1, "header-icon"], [1, "fas", "fa-brain"], [1, "desc"], [1, "btn-launch", 3, "click"], [1, "fas", "fa-arrow-right"]], template: function RagConfigComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelement(2, "i", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "h3");
        i0.ɵɵtext(4, "Configuration RAG");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "p", 3);
        i0.ɵɵtext(6, "G\u00E9rez la base de connaissances documentaire de l'intelligence artificielle sGRC. Ajoutez, supprimez et indexez vos normes.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "button", 4);
        i0.ɵɵlistener("click", function RagConfigComponent_Template_button_click_7_listener() { return ctx.openManager(); });
        i0.ɵɵtext(8, " Ouvrir le Gestionnaire ");
        i0.ɵɵelement(9, "i", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } }, styles: [".config-card[_ngcontent-%COMP%] {\n            border-left: 5px solid #6366f1;\n            background: linear-gradient(to bottom, #ffffff, #f5f3ff);\n            display: flex;\n            flex-direction: column;\n            gap: 1rem;\n            padding: 1.5rem;\n            border-radius: 12px;\n            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);\n            text-align: center;\n        }\n        .header-icon[_ngcontent-%COMP%] {\n            font-size: 2.5rem;\n            color: #818cf8;\n            margin-bottom: 0.5rem;\n        }\n        h3[_ngcontent-%COMP%] {\n            margin: 0;\n            font-size: 1.25rem;\n            font-weight: 700;\n            color: #1e293b;\n        }\n        .desc[_ngcontent-%COMP%] {\n            font-size: 0.95rem;\n            color: #475569;\n            margin-bottom: 1rem;\n            line-height: 1.5;\n        }\n        .btn-launch[_ngcontent-%COMP%] {\n            background: #6366f1;\n            color: white;\n            padding: 12px 20px;\n            border-radius: 8px;\n            font-weight: 600;\n            font-size: 0.95rem;\n            border: none;\n            cursor: pointer;\n            display: inline-flex;\n            align-items: center;\n            justify-content: center;\n            gap: 8px;\n            transition: all 0.2s ease;\n            width: 100%;\n        }\n        .btn-launch[_ngcontent-%COMP%]:hover {\n            background: #4f46e5;\n            box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);\n            transform: translateY(-2px);\n        }"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RagConfigComponent, [{
        type: Component,
        args: [{
                selector: 'app-rag-config',
                templateUrl: './rag-config.component.html',
                styles: [`
        .config-card {
            border-left: 5px solid #6366f1;
            background: linear-gradient(to bottom, #ffffff, #f5f3ff);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            text-align: center;
        }
        .header-icon {
            font-size: 2.5rem;
            color: #818cf8;
            margin-bottom: 0.5rem;
        }
        h3 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 700;
            color: #1e293b;
        }
        .desc {
            font-size: 0.95rem;
            color: #475569;
            margin-bottom: 1rem;
            line-height: 1.5;
        }
        .btn-launch {
            background: #6366f1;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.2s ease;
            width: 100%;
        }
        .btn-launch:hover {
            background: #4f46e5;
            box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);
            transform: translateY(-2px);
        }
    `]
            }]
    }], function () { return [{ type: i1.Router }]; }, null); })();
//# sourceMappingURL=rag-config.component.js.map