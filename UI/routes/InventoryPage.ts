const InventoryPage:ComponentFunction = (props) => {
    const component = ComponentFactory.createComponent("Inventory-page", 'div', props)

    const backToConsole:ButtonFunction = (e) => {
        e.preventDefault()
        Router.navigate("/console")
    }
    const downloadInventory:ButtonFunction = async (e) => {
        e.preventDefault()
        const file = await ArticlesServices.downloadInventory()
    }

    const navButtons = component.addContainerHtml(component, "div")
        .setClassName("page-nav")
        .build()
    const backToConsoleButton = component.addButtonHtml(navButtons)
        .setType("button")
        .setClassName("back-button")
        .setText("Back")
        .setClickAction(backToConsole)
        .build()

    const title = component.addTitleHtml(component, 'h1')
        .setText("Inventory")
        .build()

    const statusContainer = component.addContainerHtml(component, "div")
        .setClassName("status-container")
        .build()
    const status = component.addTitleHtml(statusContainer, 'h2')
        .setText(props?.articles.length > 0 ? `${props?.articles.length} articles` : "Your inventory is empty, upload an inventory file.")
        .build()
    if (props?.articles.length > 0) {
        component.addButtonHtml(statusContainer)
                .setType("button")
                .setClassName("download-button")
                .setText("Download Inventory")
                .setClickAction(downloadInventory)
                .build()
    }

    // Contitionally display wether the inventory table or upload indications
    if (props && props.articles.length > 0) {
        const articlesContainer = component.addContainerHtml(component, "div")
            .setClassName("articles-container")
            .build()
        ArticleComponent({"article": {item: "item", quantity: "quantity", regular_price: "regular price", member_price: "member price", tax_status: "tax status"}}).mount(articlesContainer.element)
        for (let article of props.articles as Article[]) {
            ArticleComponent({"article": article as Article}).mount(articlesContainer.element)
        }
    } else {
        const addInventoryForm = component.addForm(component)
            .setClassName("inventory-form")
            .build()
        component.addInput(addInventoryForm)
            .setType("file")
            .setName("filer")
            .build(addInventoryForm)
        component.addButtonHtml(addInventoryForm)
            .setType("submit")
            .setText("Upload")
            .setClassName("upload-button")
            .build()
        
        addInventoryForm.onSubmit(async (values) => {
            console.log(values)

            const res = await ArticlesServices.postInventory(values.filer)
            if (!res) return
            
            const newArticles = await ArticlesServices.getAllArticles()
            if (!newArticles) return

            component.update({"articles":newArticles})       
        })
    }

    return component
}