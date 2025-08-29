import { ComponentFactory } from "../models/componentFactory.models";
import { ComponentFunction } from "../models/components.models";

export const Console:ComponentFunction = () => {
    const component = ComponentFactory.createComponent('Console', 'div')

    component.addForm()

    return component
}