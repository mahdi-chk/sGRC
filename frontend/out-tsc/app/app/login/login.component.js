import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "../core/services/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
function LoginComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵelement(1, "i", 30);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.error, " ");
} }
function LoginComponent_span_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Se connecter");
    i0.ɵɵelementEnd();
} }
function LoginComponent_span_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 31);
    i0.ɵɵelement(1, "i", 32);
    i0.ɵɵtext(2, " Connexion... ");
    i0.ɵɵelementEnd();
} }
export class LoginComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.credentials = { mail: '', password: '' };
        this.error = '';
        this.loading = false;
        this.showPassword = false;
        if (this.authService.isLoggedIn()) {
            console.log('User already logged in, redirecting to dashboard');
            this.router.navigate(['/dashboard']);
        }
    }
    onSubmit() {
        this.loading = true;
        this.error = '';
        this.authService.login(this.credentials).subscribe({
            next: () => {
                // Roles are handled by the Dashboard component itself based on currentUser$
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                var _a;
                if (err.status === 429) {
                    this.error = ((_a = err.error) === null || _a === void 0 ? void 0 : _a.message) || 'Trop de tentatives de connexion. Veuillez réessayer plus tard.';
                }
                else {
                    this.error = 'Email ou mot de passe incorrect';
                }
                this.loading = false;
            }
        });
    }
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.Router)); };
LoginComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["app-login"]], decls: 40, vars: 8, consts: [[1, "login-wrapper"], [1, "bg-blob", "blob-1"], [1, "bg-blob", "blob-2"], [1, "bg-blob", "blob-3"], [1, "login-container"], [1, "login-card"], [1, "logo"], [1, "logo-icon"], [1, "fas", "fa-shield-alt"], [1, "login-form", 3, "ngSubmit"], ["loginForm", "ngForm"], [1, "form-header"], [1, "subtitle"], ["class", "error-message", 4, "ngIf"], [1, "form-body"], [1, "form-group"], ["for", "email"], [1, "input-wrapper"], [1, "fas", "fa-envelope", "input-icon"], ["type", "email", "id", "email", "name", "email", "required", "", "placeholder", "mail@gmail.com", 3, "ngModel", "ngModelChange"], ["for", "password"], [1, "fas", "fa-lock", "input-icon"], ["id", "password", "name", "password", "required", "", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 3, "type", "ngModel", "ngModelChange"], ["type", "button", "title", "Afficher/Masquer", 1, "btn-toggle", 3, "click"], [1, "fas", 3, "ngClass"], [1, "form-actions"], ["type", "submit", 1, "btn-submit", 3, "disabled"], [4, "ngIf"], ["class", "loading-spinner", 4, "ngIf"], [1, "error-message"], [1, "fas", "fa-exclamation-circle"], [1, "loading-spinner"], [1, "fas", "fa-circle-notch", "fa-spin"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "div", 1);
        i0.ɵɵelement(2, "div", 2);
        i0.ɵɵelement(3, "div", 3);
        i0.ɵɵelementStart(4, "div", 4);
        i0.ɵɵelementStart(5, "div", 5);
        i0.ɵɵelementStart(6, "div", 6);
        i0.ɵɵelementStart(7, "div", 7);
        i0.ɵɵelement(8, "i", 8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "h1");
        i0.ɵɵtext(10, "sGRC");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "p");
        i0.ɵɵtext(12, "Plateforme de Gouvernance, Risque et Conformit\u00E9");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "form", 9, 10);
        i0.ɵɵlistener("ngSubmit", function LoginComponent_Template_form_ngSubmit_13_listener() { return ctx.onSubmit(); });
        i0.ɵɵelementStart(15, "div", 11);
        i0.ɵɵelementStart(16, "h2");
        i0.ɵɵtext(17, "Connexion");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "p", 12);
        i0.ɵɵtext(19, "Entrez vos identifiants pour acc\u00E9der au dashboard");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(20, LoginComponent_div_20_Template, 3, 1, "div", 13);
        i0.ɵɵelementStart(21, "div", 14);
        i0.ɵɵelementStart(22, "div", 15);
        i0.ɵɵelementStart(23, "label", 16);
        i0.ɵɵtext(24, "Email");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 17);
        i0.ɵɵelement(26, "i", 18);
        i0.ɵɵelementStart(27, "input", 19);
        i0.ɵɵlistener("ngModelChange", function LoginComponent_Template_input_ngModelChange_27_listener($event) { return ctx.credentials.mail = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "div", 15);
        i0.ɵɵelementStart(29, "label", 20);
        i0.ɵɵtext(30, "Mot de passe");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "div", 17);
        i0.ɵɵelement(32, "i", 21);
        i0.ɵɵelementStart(33, "input", 22);
        i0.ɵɵlistener("ngModelChange", function LoginComponent_Template_input_ngModelChange_33_listener($event) { return ctx.credentials.password = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(34, "button", 23);
        i0.ɵɵlistener("click", function LoginComponent_Template_button_click_34_listener() { return ctx.togglePasswordVisibility(); });
        i0.ɵɵelement(35, "i", 24);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "div", 25);
        i0.ɵɵelementStart(37, "button", 26);
        i0.ɵɵtemplate(38, LoginComponent_span_38_Template, 2, 0, "span", 27);
        i0.ɵɵtemplate(39, LoginComponent_span_39_Template, 3, 0, "span", 28);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(14);
        i0.ɵɵadvance(20);
        i0.ɵɵproperty("ngIf", ctx.error);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngModel", ctx.credentials.mail);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("type", ctx.showPassword ? "text" : "password")("ngModel", ctx.credentials.password);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngClass", ctx.showPassword ? "fa-eye-slash" : "fa-eye");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", !_r0.form.valid || ctx.loading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.loading);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.loading);
    } }, directives: [i3.ɵNgNoValidate, i3.NgControlStatusGroup, i3.NgForm, i4.NgIf, i3.DefaultValueAccessor, i3.RequiredValidator, i3.NgControlStatus, i3.NgModel, i4.NgClass], styles: ["@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800&display=swap');\r\n\r\n$primary[_ngcontent-%COMP%]:   #004a99[_ngcontent-%COMP%];\r\n$primary-dark[_ngcontent-%COMP%]:   #003366[_ngcontent-%COMP%];\r\n$gold[_ngcontent-%COMP%]:   #c5a059[_ngcontent-%COMP%];\r\n$gold-light[_ngcontent-%COMP%]:   rgba(197[_ngcontent-%COMP%], 160[_ngcontent-%COMP%], 89[_ngcontent-%COMP%], 0.2)[_ngcontent-%COMP%];\r\n$glass-bg[_ngcontent-%COMP%]:   rgba(255[_ngcontent-%COMP%], 255[_ngcontent-%COMP%], 255[_ngcontent-%COMP%], 0.85)[_ngcontent-%COMP%];\r\n$text-dark[_ngcontent-%COMP%]:   #1a1a1a[_ngcontent-%COMP%];\r\n$text-muted[_ngcontent-%COMP%]:   #666[_ngcontent-%COMP%];\r\n\r\n.login-wrapper[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  min-height: 100vh;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%); // More distinct light blue gradient\r\n  font-family: 'Inter', sans-serif;\r\n  overflow: hidden;\r\n\r\n  // Background Blobs - Refined for light blue theme\r\n  .bg-blob {\r\n    position: absolute;\r\n    filter: blur(80px);\r\n    z-index: 1;\r\n    opacity: 0.4;\r\n    animation: blob-float 20s infinite alternate cubic-bezier(0.445, 0.05, 0.55, 0.95);\r\n  }\r\n\r\n  .blob-1 {\r\n    width: 750px;\r\n    height: 750px;\r\n    background: radial-gradient(circle, rgba(0, 74, 153, 0.18) 0%, transparent 70%);\r\n    top: -180px;\r\n    left: -180px;\r\n  }\r\n\r\n  .blob-2 {\r\n    width: 650px;\r\n    height: 650px;\r\n    background: radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, transparent 70%);\r\n    bottom: -120px;\r\n    right: -120px;\r\n    animation-delay: -5s;\r\n  }\r\n\r\n  .blob-3 {\r\n    width: 550px;\r\n    height: 550px;\r\n    background: radial-gradient(circle, rgba(30, 64, 175, 0.12) 0%, transparent 70%);\r\n    top: 50%;\r\n    right: 3%;\r\n    animation-delay: -10s;\r\n  }\r\n}\r\n\r\n.login-container[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  z-index: 10;\r\n  width: 100%;\r\n  max-width: 500px;\r\n  padding: 24px;\r\n  animation: slide-up 0.8s cubic-bezier(0.23, 1, 0.32, 1);\r\n}\r\n\r\n.login-card[_ngcontent-%COMP%] {\r\n  background: rgba(255, 255, 255, 0.85); // Adjusted opacity for clarity\r\n  backdrop-filter: blur(18px); // Slightly more blur\r\n  -webkit-backdrop-filter: blur(12px);\r\n  border-radius: 24px;\r\n  padding: 40px;\r\n  box-shadow:\r\n    0 25px 50px -12px rgba(0, 0, 0, 0.5),\r\n    inset 0 0 0 1px rgba(255, 255, 255, 0.2);\r\n  border: 1px solid rgba(255, 255, 255, 0.3);\r\n  transition: transform 0.3s ease;\r\n\r\n  &:hover {\r\n    transform: translateY(-5px);\r\n  }\r\n}\r\n\r\n.logo[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  margin-bottom: 32px;\r\n\r\n  .logo-icon {\r\n    width: 64px;\r\n    height: 64px;\r\n    background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);\r\n    border-radius: 16px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    margin: 0 auto 16px;\r\n    color: white;\r\n    font-size: 28px;\r\n    box-shadow: 0 8px 16px rgba(0, 74, 153, 0.3);\r\n    border: 2px solid $gold;\r\n  }\r\n\r\n  h1 {\r\n    margin: 0;\r\n    font-family: 'Montserrat', sans-serif;\r\n    font-size: 2.2rem;\r\n    font-weight: 800;\r\n    color: $primary-dark;\r\n    letter-spacing: -0.5px;\r\n  }\r\n\r\n  p {\r\n    margin: 4px 0 0;\r\n    font-size: 0.85rem;\r\n    color: $gold;\r\n    font-weight: 600;\r\n    text-transform: uppercase;\r\n    letter-spacing: 1px;\r\n  }\r\n}\r\n\r\n.login-form[_ngcontent-%COMP%] {\r\n  .form-header {\r\n    margin-bottom: 24px;\r\n\r\n    h2 {\r\n      margin: 0;\r\n      font-size: 1.5rem;\r\n      font-weight: 700;\r\n      color: $text-dark;\r\n    }\r\n\r\n    .subtitle {\r\n      margin: 4px 0 0;\r\n      font-size: 0.9rem;\r\n      color: $text-muted;\r\n    }\r\n  }\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n  margin-bottom: 20px;\r\n\r\n  label {\r\n    display: block;\r\n    font-size: 0.85rem;\r\n    font-weight: 600;\r\n    color: $text-dark;\r\n    margin-bottom: 8px;\r\n    padding-left: 2px;\r\n  }\r\n\r\n  .input-wrapper {\r\n    position: relative;\r\n    display: flex;\r\n    align-items: center;\r\n\r\n    .input-icon {\r\n      position: absolute;\r\n      left: 16px;\r\n      color: #94a3b8;\r\n      font-size: 1.1rem;\r\n      transition: color 0.3s;\r\n    }\r\n\r\n    input {\r\n      width: 100%;\r\n      padding: 14px 16px 14px 48px;\r\n      background: rgba(255, 255, 255, 0.6);\r\n      border: 1px solid #e2e8f0;\r\n      border-radius: 12px;\r\n      font-size: 0.95rem;\r\n      font-weight: 500;\r\n      color: $text-dark;\r\n      transition: all 0.3s;\r\n\r\n      &:focus {\r\n        outline: none;\r\n        border-color: $gold;\r\n        background: white;\r\n        box-shadow: 0 0 0 4px $gold-light;\r\n\r\n        &+.input-icon {\r\n          color: $primary;\r\n        }\r\n      }\r\n\r\n      &::placeholder {\r\n        color: #94a3b8;\r\n      }\r\n    }\r\n\r\n    .btn-toggle {\r\n      position: absolute;\r\n      right: 12px;\r\n      background: none;\r\n      border: none;\r\n      color: #94a3b8;\r\n      cursor: pointer;\r\n      padding: 8px;\r\n      display: flex;\r\n      align-items: center;\r\n      transition: color 0.2s;\r\n\r\n      &:hover {\r\n        color: $primary;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.btn-submit[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 16px;\r\n  background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);\r\n  color: white;\r\n  border: none;\r\n  border-radius: 12px;\r\n  font-size: 1rem;\r\n  font-weight: 700;\r\n  cursor: pointer;\r\n  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 10px;\r\n  box-shadow: 0 10px 15px -3px rgba(0, 74, 153, 0.3);\r\n\r\n  &:hover:not(:disabled) {\r\n    transform: scale(1.02);\r\n    box-shadow: 0 20px 25px -5px rgba(0, 74, 153, 0.4);\r\n    background: linear-gradient(135deg, lighten($primary, 5%) 0%, $primary-dark 100%);\r\n  }\r\n\r\n  &:active:not(:disabled) {\r\n    transform: scale(0.98);\r\n  }\r\n\r\n  &:disabled {\r\n    background: #cbd5e1;\r\n    cursor: not-allowed;\r\n    box-shadow: none;\r\n  }\r\n}\r\n\r\n.error-message[_ngcontent-%COMP%] {\r\n  background: #fef2f2;\r\n  color: #dc2626;\r\n  padding: 12px 16px;\r\n  border-radius: 12px;\r\n  margin-bottom: 24px;\r\n  font-size: 0.85rem;\r\n  font-weight: 600;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  border: 1px solid #fee2e2;\r\n  animation: shake 0.5s cubic-bezier(.36, .07, .19, .97) both;\r\n}\r\n\r\n//[_ngcontent-%COMP%]   Animations\r\n@keyframes[_ngcontent-%COMP%]   float[_ngcontent-%COMP%] {\r\n  0% {\r\n    transform: translateY(0px);\r\n  }\r\n\r\n  50% {\r\n    transform: translateY(-10px);\r\n  }\r\n\r\n  100% {\r\n    transform: translateY(0px);\r\n  }\r\n}\r\n\r\n@keyframes blob-float {\r\n  0% {\r\n    transform: translate(0, 0) scale(1);\r\n  }\r\n\r\n  33% {\r\n    transform: translate(100px, -50px) scale(1.1);\r\n  }\r\n\r\n  66% {\r\n    transform: translate(-50px, 100px) scale(0.9);\r\n  }\r\n\r\n  100% {\r\n    transform: translate(0, 0) scale(1);\r\n  }\r\n}\r\n\r\n@keyframes slide-up {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(30px);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n@keyframes shake {\r\n\r\n  10%,\r\n  90% {\r\n    transform: translate3d(-1px, 0, 0);\r\n  }\r\n\r\n  20%,\r\n  80% {\r\n    transform: translate3d(2px, 0, 0);\r\n  }\r\n\r\n  30%,\r\n  50%,\r\n  70% {\r\n    transform: translate3d(-4px, 0, 0);\r\n  }\r\n\r\n  40%,\r\n  60% {\r\n    transform: translate3d(4px, 0, 0);\r\n  }\r\n}\r\n\r\n.loading-spinner[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{
                selector: 'app-login',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.scss']
            }]
    }], function () { return [{ type: i1.AuthService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=login.component.js.map