import { Console } from "./Console.js";
import { Home } from "./Home.js";
import { LoginPage } from "./LoginPage.js";
import { RegisterPage } from "./RegisterPage.js";
export const routes = [
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
];
