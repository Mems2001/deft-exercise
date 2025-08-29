import { ComponentFactory } from "../models/componentFactory.models.js";
export const LoginPage = () => {
    const component = ComponentFactory.createComponent('LoginPage', 'div');
    component.addContainerHtml(component.component, 'p', 'LoginPage');
    return component;
};
