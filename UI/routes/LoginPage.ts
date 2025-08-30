import { ComponentFactory, ComponentFunction, LoginPayload } from "../models/index";
import { AuthServices } from "../services/authServices";

export const LoginPage:ComponentFunction = () => {
    const component = ComponentFactory.createComponent('LoginPage', 'div')

    const loginContainer = component.addContainerHtml(component.component, 'div')
        .setClassName("login-container")
        .build()
    component.addTitleHtml(loginContainer.element, "h1")
        .setText("Log In")
        .setClassName("login-title")

    const loginForm = component.addForm(loginContainer.element)
        .setClassName("login-form")
        .build()
    const usernameInput = component.addInput(loginForm)
        .setClassName("login-input")
        .setPlaceHolder("Type your username")
        .setName("username").build(loginForm)
    const passwordInput = component.addInput(loginForm)
        .setClassName("login-input")
        .setPlaceHolder("Type your password")
        .setType("password")
        .setName("password")
        .build(loginForm)
    const submitButton = component.addButtonHtml(loginForm.element)
        .setType("submit")
        .setClassName("login-submit-btn")
        .setText("Login")
        .build()
    loginForm.onSubmit(async (values) => {
        try {
            const result = await AuthServices.login(values as LoginPayload)
            console.log(result)
        } catch (error) {
            throw new Error("Login call failed")
        }
    })

    return component
}