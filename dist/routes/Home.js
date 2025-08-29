import { ComponentFactory } from "../models/componentFactory.models.js";
import { Router } from "../models/router.model.js";
export const Home = () => {
    const component = ComponentFactory.createComponent('Home', 'div');
    const navigateToConsole = (e) => {
        // e.preventDefault()
        Router.navigate('/login');
    };
    component.addTitleHtml(component.component, 'h1', "Hello pal", "main-title");
    const loginButton = component.addButtonHtml(component.component, "button", "Log In", navigateToConsole, false, 'login-btn');
    return component;
};
