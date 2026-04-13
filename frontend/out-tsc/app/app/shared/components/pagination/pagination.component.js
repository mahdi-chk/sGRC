import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function PaginationComponent_div_0_option_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(size_r3);
} }
function PaginationComponent_div_0_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 14);
    i0.ɵɵlistener("click", function PaginationComponent_div_0_button_12_Template_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r6); const page_r4 = restoredCtx.$implicit; const ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.goToPage(page_r4); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const page_r4 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r2.currentPage === page_r4)("ellipsis", page_r4 === "...");
    i0.ɵɵproperty("disabled", page_r4 === "...");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", page_r4, " ");
} }
function PaginationComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵelementStart(2, "label");
    i0.ɵɵtext(3, "Lignes par page:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 3);
    i0.ɵɵlistener("ngModelChange", function PaginationComponent_div_0_Template_select_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.pageSize = $event; })("change", function PaginationComponent_div_0_Template_select_change_4_listener() { i0.ɵɵrestoreView(_r8); const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.onPageSizeChange(); });
    i0.ɵɵtemplate(5, PaginationComponent_div_0_option_5_Template, 2, 2, "option", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 5);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 6);
    i0.ɵɵelementStart(9, "button", 7);
    i0.ɵɵlistener("click", function PaginationComponent_div_0_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r8); const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.goToPage(ctx_r10.currentPage - 1); });
    i0.ɵɵelement(10, "i", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 9);
    i0.ɵɵtemplate(12, PaginationComponent_div_0_button_12_Template, 2, 6, "button", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 11);
    i0.ɵɵlistener("click", function PaginationComponent_div_0_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r8); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.goToPage(ctx_r11.currentPage + 1); });
    i0.ɵɵelement(14, "i", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r0.pageSize);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.pageSizeOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" Affichage ", ctx_r0.startIndex + 1, " \u00E0 ", ctx_r0.endIndex, " sur ", ctx_r0.totalItems, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.currentPage === 1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r0.pages);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r0.currentPage === ctx_r0.totalPages);
} }
export class PaginationComponent {
    constructor() {
        this.totalItems = 0;
        this.currentPage = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 25, 50, 100];
        this.pageChanged = new EventEmitter();
    }
    get totalPages() {
        return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
    }
    get startIndex() {
        return (this.currentPage - 1) * this.pageSize;
    }
    get endIndex() {
        return Math.min(this.startIndex + this.pageSize, this.totalItems);
    }
    get pages() {
        const total = this.totalPages;
        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }
        if (this.currentPage <= 4) {
            return [1, 2, 3, 4, 5, '...', total];
        }
        if (this.currentPage >= total - 3) {
            return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
        }
        return [1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', total];
    }
    onPageSizeChange() {
        this.currentPage = 1;
        this.emitChange();
    }
    goToPage(page) {
        if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.emitChange();
        }
    }
    emitChange() {
        this.pageChanged.emit({ page: this.currentPage, pageSize: this.pageSize });
    }
}
PaginationComponent.ɵfac = function PaginationComponent_Factory(t) { return new (t || PaginationComponent)(); };
PaginationComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PaginationComponent, selectors: [["app-pagination"]], inputs: { totalItems: "totalItems", currentPage: "currentPage", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions" }, outputs: { pageChanged: "pageChanged" }, decls: 1, vars: 1, consts: [["class", "pagination-container", 4, "ngIf"], [1, "pagination-container"], [1, "page-size-selector"], [3, "ngModel", "ngModelChange", "change"], [3, "value", 4, "ngFor", "ngForOf"], [1, "pagination-info"], [1, "pagination-controls"], ["title", "Pr\u00E9c\u00E9dent", 1, "btn-page-nav", 3, "disabled", "click"], [1, "fas", "fa-chevron-left"], [1, "pages-list"], ["class", "btn-page", 3, "active", "ellipsis", "disabled", "click", 4, "ngFor", "ngForOf"], ["title", "Suivant", 1, "btn-page-nav", 3, "disabled", "click"], [1, "fas", "fa-chevron-right"], [3, "value"], [1, "btn-page", 3, "disabled", "click"]], template: function PaginationComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, PaginationComponent_div_0_Template, 15, 8, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.totalItems > 0);
    } }, directives: [i1.NgIf, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgModel, i1.NgForOf, i2.NgSelectOption, i2.ɵNgSelectMultipleOption], styles: [".pagination-container[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 12px 20px;\n      background: white;\n      border-top: 1px solid #e2e8f0;\n      border-bottom-left-radius: 12px;\n      border-bottom-right-radius: 12px;\n      font-size: 0.85rem;\n      color: #475569;\n      flex-wrap: wrap;\n      gap: 10px;\n    }\n\n    .page-size-selector[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n    }\n\n    .page-size-selector[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n      padding: 6px 12px;\n      border: 1px solid #cbd5e1;\n      border-radius: 6px;\n      outline: none;\n      background: white;\n      color: #334155;\n      font-size: 0.85rem;\n      cursor: pointer;\n      font-family: inherit;\n    }\n\n    .page-size-selector[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n      border-color: #0ea5e9;\n      box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);\n    }\n\n    .pagination-info[_ngcontent-%COMP%] {\n      font-weight: 500;\n    }\n\n    .pagination-controls[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n    }\n\n    .btn-page-nav[_ngcontent-%COMP%], .btn-page[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      min-width: 32px;\n      height: 32px;\n      padding: 0 8px;\n      border: 1px solid #cbd5e1;\n      background: white;\n      border-radius: 6px;\n      cursor: pointer;\n      color: #475569;\n      font-size: 0.85rem;\n      transition: all 0.2s;\n      font-family: inherit;\n      font-weight: 500;\n    }\n\n    .btn-page-nav[_ngcontent-%COMP%]:disabled {\n      opacity: 0.4;\n      cursor: not-allowed;\n      background: #f8fafc;\n    }\n\n    .btn-page-nav[_ngcontent-%COMP%]:not(:disabled):hover, .btn-page[_ngcontent-%COMP%]:not(:disabled):hover {\n      background: #f1f5f9;\n      border-color: #94a3b8;\n    }\n\n    .btn-page.active[_ngcontent-%COMP%] {\n      background: var(--primary-color, #004a99);\n      color: white;\n      border-color: var(--primary-color, #004a99);\n    }\n\n    .btn-page.ellipsis[_ngcontent-%COMP%] {\n      border: none;\n      background: transparent;\n      cursor: default;\n    }\n\n    .pages-list[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 4px;\n    }\n\n    @media (max-width: 768px) {\n      .pagination-container[_ngcontent-%COMP%] {\n        flex-direction: column;\n        justify-content: center;\n      }\n      .pagination-info[_ngcontent-%COMP%] {\n        order: -1;\n        margin-bottom: 5px;\n      }\n    }"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaginationComponent, [{
        type: Component,
        args: [{
                selector: 'app-pagination',
                template: `
    <div class="pagination-container" *ngIf="totalItems > 0">
      <div class="page-size-selector">
        <label>Lignes par page:</label>
        <select [(ngModel)]="pageSize" (change)="onPageSizeChange()">
          <option *ngFor="let size of pageSizeOptions" [value]="size">{{ size }}</option>
        </select>
      </div>

      <div class="pagination-info">
        Affichage {{ startIndex + 1 }} à {{ endIndex }} sur {{ totalItems }}
      </div>

      <div class="pagination-controls">
        <button [disabled]="currentPage === 1" (click)="goToPage(currentPage - 1)" class="btn-page-nav" title="Précédent">
          <i class="fas fa-chevron-left"></i>
        </button>

        <div class="pages-list">
          <button *ngFor="let page of pages" 
                  [class.active]="currentPage === page" 
                  [class.ellipsis]="page === '...'"
                  [disabled]="page === '...'"
                  (click)="goToPage(page)"
                  class="btn-page">
            {{ page }}
          </button>
        </div>

        <button [disabled]="currentPage === totalPages" (click)="goToPage(currentPage + 1)" class="btn-page-nav" title="Suivant">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `,
                styles: [`
    .pagination-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      background: white;
      border-top: 1px solid #e2e8f0;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      font-size: 0.85rem;
      color: #475569;
      flex-wrap: wrap;
      gap: 10px;
    }

    .page-size-selector {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .page-size-selector select {
      padding: 6px 12px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      outline: none;
      background: white;
      color: #334155;
      font-size: 0.85rem;
      cursor: pointer;
      font-family: inherit;
    }

    .page-size-selector select:focus {
      border-color: #0ea5e9;
      box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
    }

    .pagination-info {
      font-weight: 500;
    }

    .pagination-controls {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-page-nav, .btn-page {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      height: 32px;
      padding: 0 8px;
      border: 1px solid #cbd5e1;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      color: #475569;
      font-size: 0.85rem;
      transition: all 0.2s;
      font-family: inherit;
      font-weight: 500;
    }

    .btn-page-nav:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      background: #f8fafc;
    }

    .btn-page-nav:not(:disabled):hover, .btn-page:not(:disabled):hover {
      background: #f1f5f9;
      border-color: #94a3b8;
    }

    .btn-page.active {
      background: var(--primary-color, #004a99);
      color: white;
      border-color: var(--primary-color, #004a99);
    }

    .btn-page.ellipsis {
      border: none;
      background: transparent;
      cursor: default;
    }

    .pages-list {
      display: flex;
      gap: 4px;
    }

    @media (max-width: 768px) {
      .pagination-container {
        flex-direction: column;
        justify-content: center;
      }
      .pagination-info {
        order: -1;
        margin-bottom: 5px;
      }
    }
  `]
            }]
    }], null, { totalItems: [{
            type: Input
        }], currentPage: [{
            type: Input
        }], pageSize: [{
            type: Input
        }], pageSizeOptions: [{
            type: Input
        }], pageChanged: [{
            type: Output
        }] }); })();
//# sourceMappingURL=pagination.component.js.map