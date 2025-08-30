const routes:Route[] = [
    {
        path: '/',
        component: () => Home()
    },
    {
        path: '/login',
        component: () => LoginPage()
    },
    {
        path: '/register',
        component: () => RegisterPage()
    },
    {
        path: '/console',
        component: () => Console()
    }
]

window.routes = routes