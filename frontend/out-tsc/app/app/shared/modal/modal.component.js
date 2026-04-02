import { Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["projected"];
function ModalComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 7);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r0.body, i0.ɵɵsanitizeHtml);
} }
const _c1 = [[["", "modal-body", ""]], [["", "modal-footer", ""]]];
const _c2 = ["[modal-body]", "[modal-footer]"];
export class ModalComponent {
    constructor() {
        this.title = '';
        this.body = '';
        this.close = new EventEmitter();
        this.projectedContent = null;
        this.hasProjectedContent = false;
        this.hasProjectedFooter = false;
    }
    ngAfterContentInit() {
        this.hasProjectedContent = !!this.projectedContent;
        // footer detection isn't strict here; it's fine to leave false when not projected
    }
    onClose() {
        this.close.emit();
    }
}
ModalComponent.ɵfac = function ModalComponent_Factory(t) { return new (t || ModalComponent)(); };
ModalComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ModalComponent, selectors: [["app-modal"]], contentQueries: function ModalComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, _c0, 5, ElementRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.projectedContent = _t.first);
    } }, inputs: { title: "title", body: "body" }, outputs: { close: "close" }, ngContentSelectors: _c2, decls: 12, vars: 2, consts: [[1, "overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], ["type", "button", 1, "close", 3, "click"], [1, "modal-body"], ["class", "fallback", 3, "innerHTML", 4, "ngIf"], [1, "modal-footer"], [1, "fallback", 3, "innerHTML"]], template: function ModalComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c1);
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("click", function ModalComponent_Template_div_click_0_listener() { return ctx.onClose(); });
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵlistener("click", function ModalComponent_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "h3");
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "button", 3);
        i0.ɵɵlistener("click", function ModalComponent_Template_button_click_5_listener() { return ctx.onClose(); });
        i0.ɵɵtext(6, "x");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 4);
        i0.ɵɵprojection(8);
        i0.ɵɵtemplate(9, ModalComponent_div_9_Template, 1, 1, "div", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(10, "div", 6);
        i0.ɵɵprojection(11, 1);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.title);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", !ctx.hasProjectedContent);
    } }, directives: [i1.NgIf], styles: [".overlay[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  inset: 0;\r\n  background: rgba(15, 23, 42, 0.4);\r\n  backdrop-filter: blur(8px);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  z-index: 1000;\r\n  animation: fadeIn 0.3s ease-out;\r\n}\r\n\r\n.modal[_ngcontent-%COMP%] {\r\n  width: 95%;\r\n  max-width: 800px;\r\n  background: #ffffff;\r\n  border-radius: 24px;\r\n  overflow: hidden;\r\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\r\n  border: 1px solid rgba(255, 255, 255, 0.1);\r\n  display: flex;\r\n  flex-direction: column;\r\n  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);\r\n  position: relative;\r\n\r\n  &::before {\r\n    content: '';\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    height: 6px;\r\n    background: linear-gradient(to right, #004a99, #c5a059);\r\n  }\r\n}\r\n\r\n.modal-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 24px 32px;\r\n  border-bottom: 1px solid #f1f5f9;\r\n  background: #ffffff;\r\n\r\n  h3 {\r\n    margin: 0;\r\n    font-size: 1.5rem;\r\n    font-weight: 800;\r\n    color: #003366;\r\n    font-family: 'Montserrat', sans-serif;\r\n  }\r\n}\r\n\r\n.modal-body[_ngcontent-%COMP%] {\r\n  max-height: 70vh;\r\n  overflow-y: auto;\r\n  padding: 32px;\r\n  background: #fdfdfd;\r\n\r\n  &::-webkit-scrollbar {\r\n    width: 6px;\r\n  }\r\n\r\n  &::-webkit-scrollbar-thumb {\r\n    background: #cbd5e1;\r\n    border-radius: 10px;\r\n  }\r\n}\r\n\r\n.modal-footer[_ngcontent-%COMP%] {\r\n  padding: 20px 32px;\r\n  border-top: 1px solid #f1f5f9;\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  gap: 12px;\r\n  background: #ffffff;\r\n}\r\n\r\n.close[_ngcontent-%COMP%] {\r\n  background: #f1f5f9;\r\n  border: 0;\r\n  width: 36px;\r\n  height: 36px;\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 18px;\r\n  cursor: pointer;\r\n  color: #64748b;\r\n  transition: all 0.2s;\r\n\r\n  &:hover {\r\n    background: #fee2e2;\r\n    color: #ef4444;\r\n    transform: rotate(90deg);\r\n  }\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes slideUp {\r\n  from {\r\n    transform: translateY(20px);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    transform: translateY(0);\r\n    opacity: 1;\r\n  }\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ModalComponent, [{
        type: Component,
        args: [{
                selector: 'app-modal',
                templateUrl: './modal.component.html',
                styleUrls: ['./modal.component.scss']
            }]
    }], null, { title: [{
            type: Input
        }], body: [{
            type: Input
        }], close: [{
            type: Output
        }], projectedContent: [{
            type: ContentChild,
            args: ['projected', { read: ElementRef }]
        }] }); })();
//# sourceMappingURL=modal.component.js.map