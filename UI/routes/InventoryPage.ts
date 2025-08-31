const InventoryPage:ComponentFunction = (props) => {
    const component = ComponentFactory.createComponent("Inventory-page", 'div')

    const fileUpload:ButtonFunction = (e) => {
        e.preventDefault()

    }

    const title = component.addTitleHtml(component, 'h1')
        .setText("Inventory")
        .build()

    const status = component.addTitleHtml(component, 'h2')
        .setText(props?.articles.lenght > 0 ? `${props?.articles} articles` : "Your inventory is empty, upload an inventory file.")
        .build()

    if (props && props.articles.lenght > 0) {

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

            const text = await values["filer"][0].text()
           
            console.log(text)
        })
    }

    return component
}