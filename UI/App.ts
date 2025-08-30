/**
 * The only component to be rendered directly in the index.html. It will allow us to handle other component renders as a single page application, rendering them inside it with a router function.
 * @returns 
 */
const App:ComponentFunction = () => {
    const component = ComponentFactory.createComponent('App', 'div')
    Header().mount(component.element)

    Router.init(component.element, routes)

    return component
}

window.App = App