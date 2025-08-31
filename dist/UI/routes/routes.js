"use strict";
const routes = [
    {
        path: '/',
        component: () => window.Home()
    },
    {
        path: '/login',
        component: () => window.LoginPage()
    },
    {
        path: '/register',
        component: () => window.RegisterPage()
    },
    {
        path: '/console',
        component: () => window.Console()
    },
    {
        path: '/cart',
        component: () => window.CartPage()
    },
    {
        path: '/inventory',
        component: (props) => InventoryPage(props)
    }
];
