const CartPage: ComponentFunction = () => {
    const component = ComponentFactory.createComponent('Cart-page', 'div')

    const mainContainer = component.addContainerHtml(component, 'div')
        .setClassName('cart-container')
        .build()

    const addArticleForm = component.addForm(component)
        .setClassName('add-article-form')
        .build()

    return component
}

window.CartPage = CartPage