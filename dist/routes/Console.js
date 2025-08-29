import { ComponentFactory } from "../models/componentFactory.models.js";
export const Console = () => {
    const component = ComponentFactory.createComponent('Console', 'div');
    component.addForm();
    return component;
};
