import { ComponentFactory } from "../models/componentFactory.models";
import { ComponentFunction } from "../models/components.models";

export const LoginPage:ComponentFunction = () => {
    const component = ComponentFactory.createComponent('LoginPage', 'div')

    component.addContainerHtml(component.component, 'p', 'LoginPage')

    return component
}