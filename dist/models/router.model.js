export class Router {
    constructor(outlet, routes) {
        this.currentComponent = null;
        this.routes = null;
        this.outlet = outlet;
        this.routes = routes;
        this.initRouter();
    }
    static init(outlet, routes) {
        if (!Router.instance)
            Router.instance = new Router(outlet, routes);
        return Router.instance;
    }
    updateRoute(path) {
        var _a;
        if (this.currentComponent) {
            this.currentComponent.unmount();
            this.currentComponent = null;
        }
        if (this.routes) {
            for (let route of this.routes) {
                if (route.path === path) {
                    this.currentComponent = route.component;
                    break;
                }
            }
        }
        (_a = this.currentComponent) === null || _a === void 0 ? void 0 : _a.mount(this.outlet);
    }
    initRouter() {
        this.updateRoute(location.pathname);
        window.addEventListener('popstate', () => this.updateRoute(location.pathname));
        document.querySelectorAll('a[data-link]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const path = e.currentTarget.getAttribute('href');
                Router.navigate(path);
            });
        });
    }
    static navigate(path) {
        console.log('router working', path);
        history.pushState({}, '', path);
        if (!Router.instance) {
            throw new Error("Router not initialized. Call Router.init(outlet) first.");
        }
        Router.instance.updateRoute(path);
    }
}
Router.instance = null;
