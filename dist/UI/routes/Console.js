"use strict";
const Console = () => {
    const component = ComponentFactory.createComponent('Console', 'div');
    const goToCartInit = (e) => {
        e.preventDefault();
        Router.navigate('/init-cart');
    };
    const goToInventory = (e) => {
        e.preventDefault();
        Router.navigate('/inventory');
    };
    const consoleContainer = component.addContainerHtml(component, "div")
        .setClassName("console-container")
        .build();
    const consoleTitle = component.addTitleHtml(consoleContainer, 'h2')
        .setClassName("console-title")
        .setText("Main Console")
        .build();
    const buttonsContainer = component.addContainerHtml(consoleContainer, "div")
        .setClassName("buttons-container")
        .build();
    const addInventory = component.addButtonHtml(buttonsContainer)
        .setType("button")
        .setText("Inventory")
        .setClassName("console-button")
        .setClickAction(goToInventory)
        .build();
    const initCartButton = component.addButtonHtml(buttonsContainer)
        .setType("button")
        .setText("Start Transaction")
        .setClassName("console-button")
        .setClickAction(goToCartInit)
        .build();
    return component;
};
window.Console = Console;
