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
    const component = ComponentFactory.createComponent("Inventory-page", 'div');
    const fileUpload = (e) => {
        e.preventDefault();
    };
    const title = component.addTitleHtml(component, 'h1')
        .setText("Inventory")
        .build();
    const status = component.addTitleHtml(component, 'h2')
        .setText((props === null || props === void 0 ? void 0 : props.articles.lenght) > 0 ? `${props === null || props === void 0 ? void 0 : props.articles} articles` : "Your inventory is empty, upload an inventory file.")
        .build();
    if (props && props.articles.lenght > 0) {
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
            const text = yield values["filer"][0].text();
            console.log(text);
        }));
    }
    return component;
};
