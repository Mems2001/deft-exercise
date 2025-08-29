import { Console } from "./Console.js";
import { Home } from "./Home.js";
export class Router {
    constructor(outlet) {
        this.outlet = outlet;
        this.initRouter();
    }
    renderRoute() {
        this.outlet.innerHTML = '';
        switch (location.pathname) {
            case '/':
                Home(this).mount(this.outlet);
                break;
            case '/console':
                Console().mount(this.outlet);
                break;
        }
    }
    initRouter() {
        // Initial render
        this.renderRoute();
        // Handle back/forward buttons
        window.addEventListener('popstate', () => this.renderRoute());
    }
    navigate(path) {
        history.pushState({}, '', path);
        this.renderRoute();
    }
}
