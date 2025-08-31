"use strict";
const CheckoutPage = (props) => {
    const component = ComponentFactory.createComponent("check-out-page", "div");
    console.log(props);
    const backToCart = (e) => {
        e.preventDefault();
        Router.navigate('/cart', { "cartArticles": props.cartArticles, "articles": props.articles, "customer": props.customer });
    };
    const checkoutNav = component.addContainerHtml(component, "div")
        .setClassName("page-nav")
        .build();
    component.addButtonHtml(checkoutNav)
        .setType("button")
        .setText("Back")
        .setClickAction(backToCart)
        .build();
    component.addTitleHtml(checkoutNav, 'h4')
        .setClassName("customer-title")
        .setText(props.customer)
        .build();
    const cartContainer = component.addContainerHtml(component, 'div')
        .setClassName('cart-container')
        .build();
    if (props && props.cartArticles && props.cartArticles.length > 0) {
        ArticleComponent({ "article": { item: "item", quantity: "quantity", regular_price: "regular price", member_price: "member price", tax_status: "tax status" } }).mount(cartContainer.element);
        for (let c of props.cartArticles) {
            const cartArticleContainer = component.addContainerHtml(cartContainer, "div")
                .setClassName("cart-article-container")
                .build();
            ArticleComponent({ "article": c }).mount(cartArticleContainer.element);
        }
    }
    const totalContainer = component.addContainerHtml(component, "div")
        .setClassName("total-container")
        .build();
    TotalsComponent({ "cartArticles": props.cartArticles, "customer": props.customer, "change": props.change, "cash": props.cash }).mount(totalContainer.element);
    return component;
};
window.CheckoutPage = CheckoutPage;
