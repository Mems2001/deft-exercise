import { ComponentFactory } from "../models/componentFactory.models.js";
export const LoginPage = () => {
    const component = ComponentFactory.createComponent('LoginPage', 'div');
    const loginContainer = component.addContainerHtml(component.component, 'div').setClassName("login-container").build();
    component.addTitleHtml(loginContainer.element, "h1").setText("Log In").setClassName("login-title");
    const loginForm = component.addForm(loginContainer.element).setClassName("login-form").build();
    const usernameInput = component.addInput(loginForm).setClassName("login-input").setPlaceHolder("Type your username").setName("username").build(loginForm);
    const passwordInput = component.addInput(loginForm).setClassName("login-input").setPlaceHolder("Type your password").setType("password").setName("password").build(loginForm);
    const submitButton = component.addButtonHtml(loginForm.element).setType("submit").setClassName("login-submit-btn").setText("Login").build();
    loginForm.onSubmit((values) => {
        console.log(values);
    });
    return component;
};
