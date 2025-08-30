var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ComponentFactory, Router } from "../models/index.js";
import { UsersServices } from "../services/usersServices.js";
export const RegisterPage = () => {
    const component = ComponentFactory.createComponent("Register-page", "div");
    const RegisterContainer = component.addContainerHtml(component, 'div')
        .setClassName("register-container")
        .build();
    component.addTitleHtml(RegisterContainer, "h1")
        .setText("User Registration")
        .setClassName("register-title");
    const RegisterForm = component.addForm(RegisterContainer)
        .setClassName("register-form")
        .build();
    const usernameInput = component.addInput(RegisterForm)
        .setClassName("register-input")
        .setPlaceHolder("Type your username")
        .setName("username").build(RegisterForm);
    const passwordInput = component.addInput(RegisterForm)
        .setClassName("register-input")
        .setPlaceHolder("Type your password")
        .setType("password")
        .setName("password")
        .build(RegisterForm);
    const submitButton = component.addButtonHtml(RegisterForm)
        .setType("submit")
        .setClassName("register-submit-btn")
        .setText("Registration")
        .build();
    RegisterForm.onSubmit((values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield UsersServices.createUser(values);
            // console.log(result)
            if (result)
                window.alert("User created");
            Router.navigate('/login');
        }
        catch (error) {
            throw new Error("Registration call failed");
        }
    }));
    return component;
};
