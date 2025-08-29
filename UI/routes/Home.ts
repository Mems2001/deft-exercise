import { ComponentFactory } from "../models/componentFactory.models";
import { ButtonFunction, ComponentFunction } from "../models/components.models";
import { Router } from "../models/router.model";

export const Home: ComponentFunction = () => {
    const component = ComponentFactory.createComponent('Home', 'div')

    const navigateToConsole:ButtonFunction = (e) => {
        // e.preventDefault()
        Router.navigate('/login')
    }

    component.addTitleHtml(component.component, 'h1', "Hello pal", "main-title")

    const loginButton = component.addButtonHtml(component.component, "button", "Log In", navigateToConsole, false, 'login-btn')

    return component
}