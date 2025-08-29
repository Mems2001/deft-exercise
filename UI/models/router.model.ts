import { Component } from "./index";

export interface Route {
    path: string,
    component: Component
}

export class Router {
  private static instance: Router|null = null
  private outlet: HTMLElement
  private currentComponent: Component|null = null
  private routes: Route[]|null = null

  constructor (outlet: HTMLElement, routes: Route[]) {
    this.outlet = outlet
    this.routes = routes
    this.initRouter()
  }

  static init(outlet: HTMLElement, routes: Route[]) {
    if (!Router.instance) Router.instance =  new Router(outlet, routes)
    return Router.instance
  }

  private updateRoute(path: string) {
    if (this.currentComponent) {
      this.currentComponent.unmount()
      this.currentComponent = null
    }

    if (this.routes) {
      for (let route of this.routes) {
        if (route.path === path) {
          this.currentComponent = route.component
          break
        }
      }
    }
     
    this.currentComponent?.mount(this.outlet)
  }

  private initRouter() {
    this.updateRoute(location.pathname)

    window.addEventListener('popstate', () => this.updateRoute(location.pathname))

    document.querySelectorAll('a[data-link]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const path = (e.currentTarget as HTMLAnchorElement).getAttribute('href')!;
        Router.navigate(path);
      });
    });
  }

  static navigate(path:string) {
    console.log('router working', path)
    history.pushState({}, '', path)
    if (!Router.instance) {
      throw new Error("Router not initialized. Call Router.init(outlet) first.");
    }
    Router.instance.updateRoute(path)
  }

}