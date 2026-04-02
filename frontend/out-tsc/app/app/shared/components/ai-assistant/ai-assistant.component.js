var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { Component } from '@angular/core';
import { AIService } from '../../../core/services/ai.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/ai.service";
import * as i2 from "../../../core/services/dashboard.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
function AiAssistantComponent_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelementStart(1, "div", 16);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵelement(3, "i", 17);
    i0.ɵɵtext(4, " Base de connaissances non initialis\u00E9e.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 18);
    i0.ɵɵlistener("click", function AiAssistantComponent_div_5_div_1_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.startIndexing(); });
    i0.ɵɵelement(6, "i", 2);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r1.isIndexing);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r1.isIndexing ? "fa-spinner fa-spin" : "fa-sync");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isIndexing ? "Initialisation..." : "Initialiser", " ");
} }
function AiAssistantComponent_div_5_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵelement(1, "i", 20);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Besoin d'aide avec les normes ou les risques ?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 21);
    i0.ɵɵelementStart(5, "button", 22);
    i0.ɵɵlistener("click", function AiAssistantComponent_div_5_div_4_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.prompt = "Quelles sont les \u00E9tapes cl\u00E9s de l'ISO 27001 ?"; });
    i0.ɵɵtext(6, "ISO 27001 ?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 22);
    i0.ɵɵlistener("click", function AiAssistantComponent_div_5_div_4_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r11); const ctx_r12 = i0.ɵɵnextContext(2); return ctx_r12.prompt = "Comment \u00E9valuer la criticit\u00E9 d'un risque ?"; });
    i0.ɵɵtext(8, "\u00C9valuation risque ?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AiAssistantComponent_div_5_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵelement(1, "i", 27);
    i0.ɵɵelementEnd();
} }
function AiAssistantComponent_div_5_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtemplate(1, AiAssistantComponent_div_5_div_5_div_1_Template, 2, 0, "div", 24);
    i0.ɵɵelementStart(2, "div", 25);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const msg_r13 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", msg_r13.role);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", msg_r13.role === "ai");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", msg_r13.content, " ");
} }
function AiAssistantComponent_div_5_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵelementStart(1, "div", 26);
    i0.ɵɵelement(2, "i", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 29);
    i0.ɵɵelement(4, "span");
    i0.ɵɵelement(5, "span");
    i0.ɵɵelement(6, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function AiAssistantComponent_div_5_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function AiAssistantComponent_div_5_button_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r15 = i0.ɵɵnextContext(2); return ctx_r15.stopGeneration(); });
    i0.ɵɵelement(1, "i", 31);
    i0.ɵɵelementEnd();
} }
function AiAssistantComponent_div_5_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 32);
    i0.ɵɵlistener("click", function AiAssistantComponent_div_5_button_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r18); const ctx_r17 = i0.ɵɵnextContext(2); return ctx_r17.sendMessage(); });
    i0.ɵɵelement(1, "i", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", !ctx_r7.prompt.trim());
} }
function AiAssistantComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtemplate(1, AiAssistantComponent_div_5_div_1_Template, 8, 3, "div", 5);
    i0.ɵɵelementStart(2, "div", 6, 7);
    i0.ɵɵtemplate(4, AiAssistantComponent_div_5_div_4_Template, 9, 0, "div", 8);
    i0.ɵɵtemplate(5, AiAssistantComponent_div_5_div_5_Template, 4, 3, "div", 9);
    i0.ɵɵtemplate(6, AiAssistantComponent_div_5_div_6_Template, 7, 0, "div", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 11);
    i0.ɵɵelementStart(8, "textarea", 12);
    i0.ɵɵlistener("ngModelChange", function AiAssistantComponent_div_5_Template_textarea_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r19 = i0.ɵɵnextContext(); return ctx_r19.prompt = $event; })("keyup.enter", function AiAssistantComponent_div_5_Template_textarea_keyup_enter_8_listener() { i0.ɵɵrestoreView(_r20); const ctx_r21 = i0.ɵɵnextContext(); return ctx_r21.sendMessage(); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, AiAssistantComponent_div_5_button_9_Template, 2, 0, "button", 13);
    i0.ɵɵtemplate(10, AiAssistantComponent_div_5_button_10_Template, 2, 1, "button", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const _r2 = i0.ɵɵreference(3);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.isIndexed);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("scrollTop", _r2.scrollHeight);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.messages.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.messages);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isLoading);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngModel", ctx_r0.prompt)("disabled", ctx_r0.isLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.isLoading);
} }
export class AiAssistantComponent {
    constructor(aiService, dashboardService) {
        this.aiService = aiService;
        this.dashboardService = dashboardService;
        this.isOpen = false;
        this.prompt = '';
        this.messages = [];
        this.isLoading = false;
        this.isIndexed = false;
        this.isIndexing = false;
        this.sessionId = '';
        this.abortController = null;
    }
    ngOnInit() {
        this.checkIndexStatus();
        // Always generate a unique sessionId per tab instance to prevent
        // cross-tab session conflicts (e.g. when duplicating a tab)
        this.sessionId = this.generateSessionId();
        sessionStorage.setItem('ai_session_id', this.sessionId);
        this.dashboardService.toggleAiAssistant$.subscribe(() => {
            this.isOpen = true; // Auto open when triggered
        });
    }
    generateSessionId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    checkIndexStatus() {
        this.aiService.getStatus().subscribe({
            next: (res) => this.isIndexed = res.isInitialized,
            error: (err) => console.error('Error checking index status:', err)
        });
    }
    toggleChat() {
        this.isOpen = !this.isOpen;
    }
    stopGeneration() {
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
            this.isLoading = false;
        }
    }
    startIndexing() {
        this.isIndexing = true;
        this.aiService.indexNormes().subscribe({
            next: (res) => {
                if (res.success) {
                    this.isIndexed = true;
                    this.messages.push({ role: 'ai', content: `Indexation terminée ! ${res.count} fragments de documents ont été indexés.` });
                }
                this.isIndexing = false;
            },
            error: (err) => {
                console.error('Indexing error:', err);
                this.messages.push({ role: 'ai', content: 'Erreur lors de l\'indexation des documents.' });
                this.isIndexing = false;
            }
        });
    }
    sendMessage() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.prompt.trim())
                return;
            const userMsg = this.prompt;
            this.messages.push({ role: 'user', content: userMsg });
            this.prompt = '';
            this.isLoading = true;
            // Add empty AI message for streaming
            const aiMsgIndex = this.messages.push({ role: 'ai', content: '' }) - 1;
            this.abortController = new AbortController();
            try {
                const stream = this.aiService.chatStream(userMsg, this.sessionId, this.abortController.signal);
                try {
                    for (var stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield stream_1.next(), !stream_1_1.done;) {
                        const chunk = stream_1_1.value;
                        this.messages[aiMsgIndex].content += chunk;
                        this.isLoading = false; // Stop spinner once first chunk arrives
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (stream_1_1 && !stream_1_1.done && (_a = stream_1.return)) yield _a.call(stream_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            catch (err) {
                if (err.name === 'AbortError') {
                    this.messages[aiMsgIndex].content += ' [Génération interrompue]';
                }
                else {
                    console.error('AI Error:', err);
                    this.messages[aiMsgIndex].content = 'Désolé, une erreur est survenue lors de la communication avec l\'IA.';
                }
            }
            finally {
                this.isLoading = false;
                this.abortController = null;
            }
        });
    }
}
AiAssistantComponent.ɵfac = function AiAssistantComponent_Factory(t) { return new (t || AiAssistantComponent)(i0.ɵɵdirectiveInject(i1.AIService), i0.ɵɵdirectiveInject(i2.DashboardService)); };
AiAssistantComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AiAssistantComponent, selectors: [["app-ai-assistant"]], decls: 6, vars: 4, consts: [[1, "ai-assistant"], [1, "chat-header", 3, "click"], [1, "fas", 3, "ngClass"], ["class", "chat-body", 4, "ngIf"], [1, "chat-body"], ["class", "rag-container", 4, "ngIf"], [1, "messages", 3, "scrollTop"], ["scrollMe", ""], ["class", "empty-state", 4, "ngIf"], ["class", "message", 3, "ngClass", 4, "ngFor", "ngForOf"], ["class", "message ai", 4, "ngIf"], [1, "chat-input-area"], ["placeholder", "Votre question...", "rows", "1", 3, "ngModel", "disabled", "ngModelChange", "keyup.enter"], ["class", "stop-btn", "title", "Arr\u00EAter la g\u00E9n\u00E9ration", 3, "click", 4, "ngIf"], ["class", "send-btn", 3, "disabled", "click", 4, "ngIf"], [1, "rag-container"], [1, "rag-warning"], [1, "fas", "fa-database"], [1, "index-btn", 3, "disabled", "click"], [1, "empty-state"], [1, "fas", "fa-comments"], [1, "quick-suggestions"], [3, "click"], [1, "message", 3, "ngClass"], ["class", "avatar", 4, "ngIf"], [1, "bubble"], [1, "avatar"], [1, "fas", "fa-robot"], [1, "message", "ai"], [1, "bubble", "loading"], ["title", "Arr\u00EAter la g\u00E9n\u00E9ration", 1, "stop-btn", 3, "click"], [1, "fas", "fa-stop"], [1, "send-btn", 3, "disabled", "click"], [1, "fas", "fa-paper-plane"]], template: function AiAssistantComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵlistener("click", function AiAssistantComponent_Template_div_click_1_listener() { return ctx.toggleChat(); });
        i0.ɵɵelement(2, "i", 2);
        i0.ɵɵelementStart(3, "span");
        i0.ɵɵtext(4, "Assistant GRC");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(5, AiAssistantComponent_div_5_Template, 11, 9, "div", 3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassProp("open", ctx.isOpen);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngClass", ctx.isOpen ? "fa-chevron-down" : "fa-robot");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.isOpen);
    } }, directives: [i3.NgClass, i3.NgIf, i3.NgForOf, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel], styles: ["@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans:wght@400;600&display=swap');\r\n\r\n.ai-assistant[_ngcontent-%COMP%] {\r\n    position: fixed;\r\n    bottom: 25px;\r\n    right: 25px;\r\n    width: 380px;\r\n    max-width: 90vw;\r\n    background: #1e1e2d;\r\n    \r\n    border-radius: 20px;\r\n    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);\r\n    display: flex;\r\n    flex-direction: column;\r\n    z-index: 2000;\r\n    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);\r\n    overflow: hidden;\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    font-family: 'Open Sans', sans-serif;\r\n}\r\n\r\n.ai-assistant[_ngcontent-%COMP%]:not(.open) {\r\n    width: 200px;\r\n    cursor: pointer;\r\n    background: linear-gradient(135deg, #3f51b5, #5c6bc0);\r\n    color: white;\r\n    border: none;\r\n    box-shadow: 0 5px 20px rgba(63, 81, 181, 0.4);\r\n}\r\n\r\n.ai-assistant[_ngcontent-%COMP%]:not(.open):hover {\r\n    transform: translateY(-5px) scale(1.02);\r\n}\r\n\r\n.chat-header[_ngcontent-%COMP%] {\r\n    background: linear-gradient(135deg, #3f51b5, #5c6bc0);\r\n    color: white;\r\n    padding: 15px 20px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    cursor: pointer;\r\n    font-family: 'Montserrat', sans-serif;\r\n    font-weight: 700;\r\n    letter-spacing: 0.5px;\r\n}\r\n\r\n.chat-header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n    font-size: 1.2rem;\r\n}\r\n\r\n.chat-body[_ngcontent-%COMP%] {\r\n    height: 500px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    background: #1e1e2d;\r\n}\r\n\r\n.messages[_ngcontent-%COMP%] {\r\n    flex: 1;\r\n    overflow-y: auto;\r\n    padding: 20px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 15px;\r\n    scrollbar-width: thin;\r\n    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;\r\n}\r\n\r\n.messages[_ngcontent-%COMP%]::-webkit-scrollbar {\r\n    width: 4px;\r\n}\r\n\r\n.messages[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\r\n    background: rgba(255, 255, 255, 0.1);\r\n    border-radius: 4px;\r\n}\r\n\r\n.empty-state[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n    height: 100%;\r\n    text-align: center;\r\n    color: rgba(255, 255, 255, 0.5);\r\n    gap: 15px;\r\n}\r\n\r\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n    font-size: 3rem;\r\n    color: #3f51b5;\r\n}\r\n\r\n.quick-suggestions[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n    width: 100%;\r\n    margin-top: 10px;\r\n}\r\n\r\n.quick-suggestions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n    background: rgba(255, 255, 255, 0.05);\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    color: rgba(255, 255, 255, 0.8);\r\n    padding: 8px 12px;\r\n    border-radius: 10px;\r\n    font-size: 0.8rem;\r\n    cursor: pointer;\r\n    text-align: left;\r\n    transition: all 0.2s;\r\n}\r\n\r\n.quick-suggestions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\r\n    background: rgba(63, 81, 181, 0.2);\r\n    border-color: #3f51b5;\r\n    color: white;\r\n}\r\n\r\n.message[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    gap: 12px;\r\n    max-width: 90%;\r\n}\r\n\r\n.message.user[_ngcontent-%COMP%] {\r\n    align-self: flex-end;\r\n    flex-direction: row-reverse;\r\n}\r\n\r\n.message.ai[_ngcontent-%COMP%] {\r\n    align-self: flex-start;\r\n}\r\n\r\n.avatar[_ngcontent-%COMP%] {\r\n    width: 30px;\r\n    height: 30px;\r\n    border-radius: 50%;\r\n    background: #3f51b5;\r\n    color: white;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 0.8rem;\r\n    flex-shrink: 0;\r\n}\r\n\r\n.bubble[_ngcontent-%COMP%] {\r\n    padding: 12px 16px;\r\n    border-radius: 15px;\r\n    font-size: 0.9rem;\r\n    line-height: 1.5;\r\n    white-space: pre-wrap;\r\n    position: relative;\r\n    color: rgba(255, 255, 255, 0.9);\r\n}\r\n\r\n.user[_ngcontent-%COMP%]   .bubble[_ngcontent-%COMP%] {\r\n    background: #3f51b5;\r\n    border-top-right-radius: 0;\r\n}\r\n\r\n.ai[_ngcontent-%COMP%]   .bubble[_ngcontent-%COMP%] {\r\n    background: #2c2c3e;\r\n    border-top-left-radius: 0;\r\n    border: 1px solid rgba(255, 255, 255, 0.05);\r\n}\r\n\r\n.bubble.loading[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    gap: 4px;\r\n    padding: 15px 20px;\r\n}\r\n\r\n.bubble.loading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    width: 6px;\r\n    height: 6px;\r\n    background: #5c6bc0;\r\n    border-radius: 50%;\r\n    animation: bounce 1.4s infinite ease-in-out both;\r\n}\r\n\r\n.bubble.loading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) {\r\n    animation-delay: -0.32s;\r\n}\r\n\r\n.bubble.loading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\r\n    animation-delay: -0.16s;\r\n}\r\n\r\n@keyframes bounce {\r\n\r\n    0%,\r\n    80%,\r\n    100% {\r\n        transform: scale(0);\r\n    }\r\n\r\n    40% {\r\n        transform: scale(1.0);\r\n    }\r\n}\r\n\r\n.chat-input-area[_ngcontent-%COMP%] {\r\n    padding: 15px 20px;\r\n    background: rgba(0, 0, 0, 0.2);\r\n    border-top: 1px solid rgba(255, 255, 255, 0.1);\r\n    display: flex;\r\n    gap: 10px;\r\n    align-items: flex-end;\r\n}\r\n\r\n.chat-input-area[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\r\n    flex: 1;\r\n    background: #2c2c3e;\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    border-radius: 12px;\r\n    color: white;\r\n    padding: 10px 15px;\r\n    font-size: 0.9rem;\r\n    resize: none;\r\n    outline: none;\r\n    max-height: 100px;\r\n}\r\n\r\n.send-btn[_ngcontent-%COMP%] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 50%;\r\n    background: #3f51b5;\r\n    color: white;\r\n    border: none;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    transition: transform 0.2s, background 0.2s;\r\n}\r\n\r\n.send-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n    background: #5c6bc0;\r\n    transform: scale(1.1);\r\n}\r\n\r\n.send-btn[_ngcontent-%COMP%]:disabled {\r\n    opacity: 0.3;\r\n}\r\n\r\n.stop-btn[_ngcontent-%COMP%] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 50%;\r\n    background: #ef4444;\r\n    \r\n    color: white;\r\n    border: none;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    transition: transform 0.2s, background 0.2s;\r\n    animation: pulse-red 2s infinite;\r\n}\r\n\r\n.stop-btn[_ngcontent-%COMP%]:hover {\r\n    background: #dc2626;\r\n    transform: scale(1.1);\r\n}\r\n\r\n@keyframes pulse-red {\r\n    0% {\r\n        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);\r\n    }\r\n\r\n    70% {\r\n        box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);\r\n    }\r\n\r\n    100% {\r\n        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);\r\n    }\r\n}\r\n\r\n\r\n.rag-container[_ngcontent-%COMP%] {\r\n    padding: 10px 20px;\r\n}\r\n\r\n.rag-warning[_ngcontent-%COMP%] {\r\n    background: rgba(255, 193, 7, 0.1);\r\n    border: 1px solid rgba(255, 193, 7, 0.2);\r\n    padding: 12px;\r\n    border-radius: 12px;\r\n    text-align: center;\r\n}\r\n\r\n.rag-warning[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin: 0 0 10px 0;\r\n    font-size: 0.8rem;\r\n    color: #ffd54f;\r\n    font-weight: 600;\r\n}\r\n\r\n.index-btn[_ngcontent-%COMP%] {\r\n    background: #ffa000;\r\n    color: #1e1e2d;\r\n    border: none;\r\n    padding: 6px 15px;\r\n    border-radius: 20px;\r\n    font-size: 0.8rem;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    margin: 0 auto;\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AiAssistantComponent, [{
        type: Component,
        args: [{
                selector: 'app-ai-assistant',
                templateUrl: './ai-assistant.component.html',
                styleUrls: ['./ai-assistant.component.css']
            }]
    }], function () { return [{ type: i1.AIService }, { type: i2.DashboardService }]; }, null); })();
//# sourceMappingURL=ai-assistant.component.js.map