const CheckoutPage:ComponentFunction = (props?: Props) => {
    const component = ComponentFactory.createComponent("check-out-page", "div")
    console.log(props)

    const backToCart:ButtonFunction = (e) => {
            e.preventDefault()
            Router.navigate('/cart', {"cartArticles": props!.cartArticles, "articles": props!.articles})
        }

    const checkoutNav = component.addContainerHtml(component, "div")
        .setClassName("page-nav")
        .build()
    component.addButtonHtml(checkoutNav)
        .setType("button")
        .setText("Back")
        .setClickAction(backToCart)
        .build()

    const totalContainer = component.addContainerHtml(component, "div")
        .setClassName("total-container")
        .build()
    TotalsComponent({"cartArticles": props!.cartArticles}).mount(totalContainer.element)

    return component
}

window.CheckoutPage = CheckoutPage