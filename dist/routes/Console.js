import { ComponentFactory, Router } from "../models/index.js";
export const Console = () => {
    const component = ComponentFactory.createComponent('Console', 'div');
    const consoleContainer = component.addContainerHtml(component.component, "div")
        .setClassName("console-container")
        .build();
    const goToCartInit = (e) => {
        e.preventDefault();
        Router.navigate('/init-cart');
    };
    const initCartButton = component.addButtonHtml(component.component)
        .setType("button")
        .setText("Start Cart")
        .setClassName("console-button")
        .setClickAction(goToCartInit)
        .build();
    return component;
};
