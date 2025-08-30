import { ButtonFunction, ComponentFunction, ComponentFactory, ContainerBuiler, Router } from "../models/index";

export const Home: ComponentFunction = () => {
    const component = ComponentFactory.createComponent('Home', 'div')

    const navigateToConsole:ButtonFunction = (e) => {
        e.preventDefault()
        Router.navigate('/login')
    }

    component.addTitleHtml(component.component, 'h1').setText('Hello Hello').setClassName('main-title').build()

    const loginButton = component.addButtonHtml(component.component).setClickAction(navigateToConsole).setText('Sign in').build()

    const cont:ContainerBuiler = component.addContainerHtml(component.component, "div")
    cont.setClassName('hola').build()
    

    return component
}