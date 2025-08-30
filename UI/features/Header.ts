import { ComponentFactory } from "../models/componentFactory.models";
import { ComponentFunction } from "../models/components.models";

export const Header:ComponentFunction = () => {
    const component = ComponentFactory.createComponent('Header', "header")

    const headerContainer = component.addContainerHtml(component, 'nav')

    return component
}