"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Console = () => {
    const component = ComponentFactory.createComponent('Console', 'div');
    const goToCartInit = (e) => {
        e.preventDefault();
        Router.navigate('/init-cart');
    };
    const goToInventory = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const articles = yield ArticlesServices.getAllArticles();
        Router.navigate('/inventory', { "articles": articles });
    });
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
