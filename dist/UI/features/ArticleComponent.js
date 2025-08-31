"use strict";
const ArticleComponent = (props) => {
    const component = ComponentFactory.createComponent("Article", "article");
    const article = props.article;
    component.addContainerHtml(component, "p")
        .setText(article.item)
        .setClassName("article-item")
        .build();
    component.addContainerHtml(component, "p")
        .setText(article.quantity.toString())
        .setClassName("article-quantity")
        .build();
    component.addContainerHtml(component, "p")
        .setText(typeof article.regular_price === "number" ? `$ ${article.regular_price}` : article.regular_price)
        .setClassName("article-regular-price")
        .build();
    component.addContainerHtml(component, "p")
        .setText(typeof article.member_price === "number" ? `$ ${article.member_price}` : article.member_price)
        .setClassName("article-member-price")
        .build();
    component.addContainerHtml(component, "p")
        .setText(article.tax_stratus)
        .setClassName("article-tax-status")
        .build();
    return component;
};
window.ArticleComponent = ArticleComponent;
