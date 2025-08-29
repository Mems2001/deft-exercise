import { ComponentFactory } from "../models/componentFactory.models";
import { ButtonFunction, ComponentFunction } from "../models/components.models";
import { ContainerBuiler } from "../models/index";
import { Router } from "../models/router.model";

export const Home: ComponentFunction = () => {
    const component = ComponentFactory.createComponent('Home', 'div')

    const navigateToConsole:ButtonFunction = (e) => {
        // e.preventDefault()
        Router.navigate('/login')
    }

    component.addTitleHtml(component.component, 'h1').setText('Hello Hello').setClassName('main-title').build()

    const loginButton = component.addButtonHtml(component.component).setClickAction(navigateToConsole).setText('Sign in').build()

    const cont:ContainerBuiler = component.addContainerHtml(component.component, "div")
    cont.setClassName('hola').build()
    

    return component
}