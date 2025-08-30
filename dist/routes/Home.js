import { ComponentFactory, Router } from "../models/index.js";
export const Home = () => {
    const component = ComponentFactory.createComponent('Home', 'div');
    const navigateToConsole = (e) => {
        e.preventDefault();
        Router.navigate('/login');
    };
    component.addTitleHtml(component, 'h1').setText('Hello Hello').setClassName('main-title').build();
    const loginButton = component.addButtonHtml(component).setClickAction(navigateToConsole).setText('Sign in').build();
    const cont = component.addContainerHtml(component, "div");
    cont.setClassName('hola').build();
    return component;
};
