const Console:ComponentFunction = () => {
    const component = ComponentFactory.createComponent('Console', 'div')

    const goToCartInit:ButtonFunction = async(e) => {
        e.preventDefault()
        const articles = await ArticlesServices.getAllArticles()
        Router.navigate('/cart', {"articles": articles})
    }
    const goToInventory:ButtonFunction = async (e) => {
        e.preventDefault()
        const articles = await ArticlesServices.getAllArticles()
        Router.navigate('/inventory', {"articles": articles})
    }

    const consoleContainer = component.addContainerHtml(component, "div")
        .setClassName("console-container")
        .build()

    const consoleTitle = component.addTitleHtml(consoleContainer, 'h2')
        .setClassName("console-title")
        .setText("Main Console")
        .build()

    const buttonsContainer = component.addContainerHtml(consoleContainer, "div")
        .setClassName("buttons-container")
        .build()

    const addInventory = component.addButtonHtml(buttonsContainer)
        .setType("button")
        .setText("Inventory")
        .setClassName("console-button")
        .setClickAction(goToInventory)
        .build()
    const initCartButton = component.addButtonHtml(buttonsContainer)
        .setType("button")
        .setText("Start Transaction")
        .setClassName("console-button")
        .setClickAction(goToCartInit)
        .build()

    return component
}

window.Console = Console