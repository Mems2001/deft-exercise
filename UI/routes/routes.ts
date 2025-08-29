import { Route } from "../models/router.model";
import { Console } from "./Console";
import { Home } from "./Home";
import { LoginPage } from "./LoginPage";

export const routes:Route[] = [
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
]