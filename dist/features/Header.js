import { ComponentFactory } from "../models/componentFactory.models.js";
export const Header = () => {
    const component = ComponentFactory.createComponent('Header', "header");
    const headerContainer = component.addContainerHtml(component, 'nav');
    return component;
};
