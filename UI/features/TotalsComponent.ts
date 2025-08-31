const TotalsComponent:ComponentFunction = (props?: Props) => {
    const component = ComponentFactory.createComponent("totals", "div")
    console.log(props)

    const totalsLine = component.addContainerHtml(component, "div")
        .setClassName("totals-line")
        .build()
    component.addContainerHtml(totalsLine, "p")
        .setClassName("totals-label")
        .setText("Subtotal")
        .build()
    component.addContainerHtml(totalsLine, "p")
        .setClassName("totals-label")
        .setText("value")
        .build()

    return component
}

window.TotalsComponent = TotalsComponent