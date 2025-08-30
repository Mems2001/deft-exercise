import { ComponentFactory, ComponentFunction, Router, ButtonFunction } from "../models/index"

export const Console:ComponentFunction = () => {
    const component = ComponentFactory.createComponent('Console', 'div')

    const consoleContainer = component.addContainerHtml(component, "div")
        .setClassName("console-container")
        .build()

    const goToCartInit:ButtonFunction = (e) => {
        e.preventDefault()
        Router.navigate('/init-cart')
    }
    const goToAddInventory:ButtonFunction = (e) => {
        e.preventDefault()
        Router.navigate('/add-inventory')
    }
    const addInventory = component.addButtonHtml(consoleContainer)
        .setType("button")
        .setText("Add Inventory")
        .setClassName("console-button")
        .setClickAction(goToAddInventory)
        .build()
    const initCartButton = component.addButtonHtml(consoleContainer)
        .setType("button")
        .setText("Start Transaction")
        .setClassName("console-button")
        .setClickAction(goToCartInit)
        .build()

    return component
}