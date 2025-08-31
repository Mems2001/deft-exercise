"use strict";
const Header = () => {
    const component = ComponentFactory.createComponent('Header', "header");
    const headerContainer = component.addContainerHtml(component, 'nav')
        .setClassName("header-nav")
        .build();
    const headerTitle = component.addTitleHtml(headerContainer, "h2")
        .setClassName('header-title')
        .setText("Jerry's Quick Mart")
        .build();
    return component;
};
window.Header = Header;
