const Header:ComponentFunction = () => {
    const component = ComponentFactory.createComponent('Header', "header")

    const headerContainer = component.addContainerHtml(component, 'nav')

    return component
}

window.Header = Header