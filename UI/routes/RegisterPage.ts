import { ButtonFunction, ComponentFactory, ComponentFunction, FormValues, LoginPayload, RegistrationFormValues, Router } from "../models/index";
import { AuthServices } from "../services/authServices";
import { UsersServices } from "../services/usersServices";

export const RegisterPage: ComponentFunction = () => {
    const component = ComponentFactory.createComponent("Register-page", "div")

    const RegisterContainer = component.addContainerHtml(component, 'div')
        .setClassName("register-container")
        .build()
    component.addTitleHtml(RegisterContainer, "h1")
        .setText("User Registration")
        .setClassName("register-title")

    const RegisterForm = component.addForm(RegisterContainer)
        .setClassName("register-form")
        .build()
    const usernameInput = component.addInput(RegisterForm)
        .setClassName("register-input")
        .setPlaceHolder("Type your username")
        .setName("username").build(RegisterForm)
    const passwordInput = component.addInput(RegisterForm)
        .setClassName("register-input")
        .setPlaceHolder("Type your password")
        .setType("password")
        .setName("password")
        .build(RegisterForm)
    const submitButton = component.addButtonHtml(RegisterForm)
        .setType("submit")
        .setClassName("register-submit-btn")
        .setText("Registration")
        .build()
    RegisterForm.onSubmit(async (values) => {
        try {
            const result = await UsersServices.createUser(values as RegistrationFormValues)
            // console.log(result)
            if (result) window.alert("User created")
            Router.navigate('/login')
        } catch (error) {
            throw new Error("Registration call failed")
        }
    })

    return component
}