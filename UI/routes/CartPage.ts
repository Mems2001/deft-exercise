    const CartPage: ComponentFunction = (props?:Props) => {
        const component = ComponentFactory.createComponent('Cart-page', 'div')
        console.log(props)

        const backToConsole:ButtonFunction = (e) => {
            e.preventDefault()
            Router.navigate('/console')
        }
        const mapItems = (articles:Article[]):string[] => {
            return articles.map(a => a.item)
        }
        const removeItem = (article:Article) => {
            const newCartArticles:Article[] = props!.cartArticles.filter((a:Article) => a.item !== article.item)
            Router.navigate('/cart', {"articles": props!.articles, "cartArticles": newCartArticles})
        }
        const editItemQuantity = (article:Article) => {
            const inventoryArticle:Article = props!.articles.find((a:Article) => a.item === article.item)
            const quantity = window.prompt(`Type the quantity you need(max: ${inventoryArticle.quantity}):`)
            if (!quantity) window.alert("Must pick a quantity")
            else {
                const newItem:Article = {item: inventoryArticle.item, quantity:Number(quantity), member_price:(Number(quantity) * inventoryArticle.member_price), regular_price: (Number(quantity)*inventoryArticle.regular_price), tax_status: inventoryArticle.tax_status}
                console.log("newItem",newItem)
                const removedItem:Article[] = props!.cartArticles.filter((a:Article) => a.item !== article.item)
                const newCartArticles:Article[] = [...removedItem, newItem]
                Router.navigate("/cart", {"articles": props!.articles, "cartArticles": newCartArticles})
            }
        }

        const cartNav = component.addContainerHtml(component, "div")
            .setClassName("page-nav")
            .build()
        component.addButtonHtml(cartNav)
            .setType("button")
            .setText("Back")
            .setClickAction(backToConsole)
            .build()

        const cartContainer = component.addContainerHtml(component, 'div')
            .setClassName('cart-container')
            .build()
        if (props && props.cartArticles && props.cartArticles.length > 0) {

            ArticleComponent({"article": {item: "item", quantity: "quantity", regular_price: "regular price", member_price: "member price", tax_status: "tax status"}}).mount(cartContainer.element)
            for (let c of props.cartArticles) {
                const cartArticleContainer = component.addContainerHtml(cartContainer, "div")
                    .setClassName("cart-article-container")
                    .build()
                ArticleComponent({"article": c}).mount(cartArticleContainer.element)
                component.addButtonHtml(cartArticleContainer)
                    .setClassName("cart-article-button")
                    .setText("remove")
                    .setClickAction(() => removeItem(c))
                    .build()
                component.addButtonHtml(cartArticleContainer)
                    .setClassName("cart-article-button")
                    .setText("new quantity")
                    .setClickAction(() => editItemQuantity(c))
                    .build()
            }
        } else {
            component.addTitleHtml(cartContainer, "h3")
                .setText("The cart is empty")
                .build()
        }

        const addArticleForm = component.addForm(component)
            .setClassName('add-article-form')
            .build()
        component.addSelect(addArticleForm)
            .setName("item-select")
            .setOptions(mapItems(props?.articles as Article[]))
            .build(addArticleForm)

        component.addButtonHtml(addArticleForm)
            .setText("Add to cart")
            .setClassName("add-button")
            .setType("submit")
            .build()
        addArticleForm.onSubmit((values) => {
            console.log(values)
            const article:Article = props!.articles.find((a:Article) => a.item === values['item-select'])
            const quantity = window.prompt(`Type the quantity you need(max: ${article.quantity}):`)
            console.log(quantity)
            if (quantity && (Number(quantity) > article.quantity)) window.alert(`Can not add the item, the max ammount of ${article.item} is ${article.quantity}`)
            
            if (quantity && !(Number(quantity) > article.quantity)) Router.navigate('/cart', {"articles": props!.articles, "cartArticles": [ ...props?.cartArticles ?? [] ,{ ...article, quantity:Number(quantity), member_price:(Number(quantity) * article.member_price), regular_price: (Number(quantity)*article.regular_price) } as Article]})
            else window.alert("Must choose a quantity")
        })

        return component
    }

    window.CartPage = CartPage