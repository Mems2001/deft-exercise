import { ComponentFactory } from "./models/index.js";
import { Router } from "./models/index.js";
import { routes } from "./routes/routes.js";
/**
 * The only component to be rendered directly in the index.html. It will allow us to handle other component renders as a single page application, rendering them inside it with a router function.
 * @returns
 */
export const App = () => {
    const component = ComponentFactory.createComponent('App', 'div');
    Router.init(component.component, routes);
    return component;
};
