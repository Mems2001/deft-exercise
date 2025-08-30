import { ComponentFactory, Router } from "../models/index.js";
export const Console = () => {
    const component = ComponentFactory.createComponent('Console', 'div');
    const consoleContainer = component.addContainerHtml(component, "div")
        .setClassName("console-container")
        .build();
    const goToCartInit = (e) => {
        e.preventDefault();
        Router.navigate('/init-cart');
    };
    const goToAddInventory = (e) => {
        e.preventDefault();
        Router.navigate('/add-inventory');
    };
    const initCartButton = component.addButtonHtml(consoleContainer)
        .setType("button")
        .setText("Start Cart")
        .setClassName("console-button")
        .setClickAction(goToCartInit)
        .build();
    const addInventory = component.addButtonHtml(consoleContainer)
        .setType("button")
        .setText("Add Inventory")
        .setClassName("console-button")
        .setClickAction(goToAddInventory)
        .build();
    return component;
};
