"use strict";
const InventoryPage = (props) => {
    const component = ComponentFactory.createComponent("Inventory-page", 'div');
    console.log(props);
    const x = component.addTitleHtml(component, 'h1')
        .setText("Inventory")
        .build();
    const y = component.addTitleHtml(component, 'h2')
        .setText((props === null || props === void 0 ? void 0 : props.articles.lenght) > 0 ? "Yes" : "Empty Inventory")
        .build();
    if (props && props.articles) {
    }
    else {
    }
    return component;
};
