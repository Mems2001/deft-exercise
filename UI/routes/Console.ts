import { ComponentFactory, ComponentFunction, Router, ButtonFunction } from "../models/index"

export const Console:ComponentFunction = () => {
    const component = ComponentFactory.createComponent('Console', 'div')

    const consoleContainer = component.addContainerHtml(component.component, "div")
        .setClassName("console-container")
        .build()

    const goToCartInit:ButtonFunction = (e) => {
        e.preventDefault()
        Router.navigate('/init-cart')
    }
    const initCartButton = component.addButtonHtml(component.component)
        .setType("button")
        .setText("Start Cart")
        .setClassName("console-button")
        .setClickAction(goToCartInit)
        .build()

    return component
}