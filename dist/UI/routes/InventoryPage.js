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
const InventoryPage = (props) => {
    const component = ComponentFactory.createComponent("Inventory-page", 'div', props);
    const backToConsole = (e) => {
        e.preventDefault();
        Router.navigate("/console");
    };
    const downloadInventory = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const file = yield ArticlesServices.downloadInventory();
    });
    const navButtons = component.addContainerHtml(component, "div")
        .setClassName("page-nav")
        .build();
    const backToConsoleButton = component.addButtonHtml(navButtons)
        .setType("button")
        .setClassName("back-button")
        .setText("Back")
        .setClickAction(backToConsole)
        .build();
    const title = component.addTitleHtml(component, 'h1')
        .setText("Inventory")
        .build();
    const statusContainer = component.addContainerHtml(component, "div")
        .setClassName("status-container")
        .build();
    const status = component.addTitleHtml(statusContainer, 'h2')
        .setText((props === null || props === void 0 ? void 0 : props.articles.length) > 0 ? `${props === null || props === void 0 ? void 0 : props.articles.length} articles` : "Your inventory is empty, upload an inventory file.")
        .build();
    if ((props === null || props === void 0 ? void 0 : props.articles.length) > 0) {
        component.addButtonHtml(statusContainer)
            .setType("button")
            .setClassName("download-button")
            .setText("Download Inventory")
            .setClickAction(downloadInventory)
            .build();
    }
    // Contitionally display wether the inventory table or upload indications
    if (props && props.articles.length > 0) {
        const articlesContainer = component.addContainerHtml(component, "div")
            .setClassName("articles-container")
            .build();
        ArticleComponent({ "article": { item: "item", quantity: "quantity", regular_price: "regular price", member_price: "member price", tax_status: "tax status" } }).mount(articlesContainer.element);
        for (let article of props.articles) {
            ArticleComponent({ "article": article }).mount(articlesContainer.element);
        }
    }
    else {
        const addInventoryForm = component.addForm(component)
            .setClassName("inventory-form")
            .build();
        component.addInput(addInventoryForm)
            .setType("file")
            .setName("filer")
            .build(addInventoryForm);
        component.addButtonHtml(addInventoryForm)
            .setType("submit")
            .setText("Upload")
            .setClassName("upload-button")
            .build();
        addInventoryForm.onSubmit((values) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(values);
            const res = yield ArticlesServices.postInventory(values.filer);
            if (!res)
                return;
            const newArticles = yield ArticlesServices.getAllArticles();
            if (!newArticles)
                return;
            component.update({ "articles": newArticles });
        }));
    }
    return component;
};
