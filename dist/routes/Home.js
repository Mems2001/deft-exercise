import { ComponentFactory } from "../models/componentFactory.models.js";
import { Router } from "../models/router.model.js";
export const Home = () => {
    const component = ComponentFactory.createComponent('Home', 'div');
    const navigateToConsole = (e) => {
        // e.preventDefault()
        Router.navigate('/login');
    };
    component.addTitleHtml(component.component, 'h1').setText('Hello Hello').setClassName('main-title').build();
    const loginButton = component.addButtonHtml(component.component).setClickAction(navigateToConsole).setText('Sign in').build();
    const cont = component.addContainerHtml(component.component, "div");
    cont.setClassName('hola').build();
    return component;
};
