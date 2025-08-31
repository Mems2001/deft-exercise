interface Window {
    App: ComponentFunction,
    Header: ComponentFunction,
    ArticleComponent: ComponentFunction,
    TotalsComponent: ComponentFunction,
    Home: ComponentFunction,
    LoginPage: ComponentFunction,
    RegisterPage: ComponentFunction,
    Console: ComponentFunction,
    CartPage: ComponentFunction,
    InventoryPage: ComponentFunction,
    CheckoutPage: ComponentFunction,
    
    routes: Route[],
    Router: typeof Router,

    ArticlesServices: ArticlesServices
}