import { Console } from "./Console.js";
import { Home } from "./Home.js";
import { LoginPage } from "./LoginPage.js";
export const routes = [
    {
        path: '/',
        component: Home()
    },
    {
        path: '/login',
        component: LoginPage()
    },
    {
        path: '/console',
        component: Console()
    }
];
