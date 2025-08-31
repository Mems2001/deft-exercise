"use strict";
/**
 * A Singleton class that provides a Router service for the App routing. To initiate it call Router.init() and review its params. Initiate it inside the App component preferably.
 * @param {HTMLElement} root An html element where the routes will be rendered.
 * @param {Route[]} routes An array of route type objects that represents the components you need to be rendered inside the root.
 */
class Router {
    constructor(root, routes) {
        this.currentComponent = null;
        this.routes = null;
        this.simulatedPath = '/console';
        this.root = root;
        this.routes = routes;
        this.initRouter();
    }
    static get path() {
        var _a;
        return (_a = Router.instance) === null || _a === void 0 ? void 0 : _a.simulatedPath;
    }
    setSimulatedPath(path) {
        return this.simulatedPath = path;
    }
    /**
     * This method is required to initiate a Router service. It checks for the existance of previous instances, if there are any it returns that instance, creates a new instance otherwise (Singleton class behaviour)
     * @param {HTMLElement} root The html element which is the place where all the routes will be rendered.
     * @param {Route[]} routes An array of Route type objects that represents the routes you need to be rendered inside the root.
     * @returns
     */
    static init(root, routes) {
        if (!Router.instance)
            Router.instance = new Router(root, routes);
        return Router.instance;
    }
    /**
     * This method is in charge to actually render the route component inside the root component. Works both on the class constructor initialization and when navigating through routes.
     * @param path
     */
    updateRoute(path, props) {
        var _a;
        // First it unmounts the current component if there is any (Check components.model.ts for more information about the Component class methods)
        if (this.currentComponent) {
            this.currentComponent.unmount();
            this.currentComponent = null;
        }
        // Then, it updates the currentComponent prop acording to the url path.
        if (this.routes) {
            for (let route of this.routes) {
                if (route.path === path) {
                    this.currentComponent = route.component(props);
                    break;
                }
            }
        }
        // Finally, in renders the required component through its mount method (Check component.models.ts file for more information about the Component class methods).
        (_a = this.currentComponent) === null || _a === void 0 ? void 0 : _a.mount(this.root);
    }
    /**
     * This method is for internal initialization only. It is in charge to render the initial route ('/' if Router was initialized within the App component as sugested). It also keeps track of any pathname changes due to navigation.
     */
    initRouter() {
        this.updateRoute(this.simulatedPath);
        window.addEventListener('popstate', () => this.updateRoute(location.pathname));
        //As a prefence, we like to regularize any navigation behaviour, this will keep an eye on <a> elements href navigation.
        document.querySelectorAll('a[data-link]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const path = e.currentTarget.getAttribute('href');
                Router.navigate(path);
            });
        });
    }
    /**
     * As easy as calling the method and specify the path, it will render the required component inside the root. Works only if the Router was previosly initialized.
     */
    static navigate(path, props) {
        var _a;
        // Keeps track of navigation for backwards and fowards navigation purposes
        (_a = Router.instance) === null || _a === void 0 ? void 0 : _a.setSimulatedPath(path);
        // Prevents the user from calling this static method without initializing a Router first.
        if (!Router.instance) {
            throw new Error("Router not initialized. Call Router.init(outlet) first.");
        }
        Router.instance.updateRoute(path, props);
    }
}
Router.instance = null;
window.Router = Router;
