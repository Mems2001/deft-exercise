"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const LoginPage = () => {
    const component = ComponentFactory.createComponent('LoginPage', 'div');
    const loginContainer = component.addContainerHtml(component, 'div')
        .setClassName("login-container")
        .build();
    component.addTitleHtml(loginContainer, "h1")
        .setText("Log In")
        .setClassName("login-title");
    const loginForm = component.addForm(loginContainer)
        .setClassName("login-form")
        .build();
    const usernameInput = component.addInput(loginForm)
        .setClassName("login-input")
        .setPlaceHolder("Type your username")
        .setName("username").build(loginForm);
    const passwordInput = component.addInput(loginForm)
        .setClassName("login-input")
        .setPlaceHolder("Type your password")
        .setType("password")
        .setName("password")
        .build(loginForm);
    const submitButton = component.addButtonHtml(loginForm)
        .setType("submit")
        .setClassName("login-submit-btn")
        .setText("Login")
        .build();
    loginForm.onSubmit((values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield AuthServices.login(values);
            console.log(result);
        }
        catch (error) {
            throw new Error("Login call failed");
        }
    }));
    return component;
};
window.LoginPage = LoginPage;
