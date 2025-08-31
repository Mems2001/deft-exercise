interface Window {
    App: ComponentFunction,
    Header: ComponentFunction,
    Home: ComponentFunction,
    LoginPage: ComponentFunction,
    RegisterPage: ComponentFunction,
    Console: ComponentFunction,
    CartPage: ComponentFunction,
    InventoryPage: ComponentFunction,
    
    routes: Route[],
    Router: typeof Router,

    ArticlesServices: ArticlesServices
}