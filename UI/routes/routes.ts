import { Route } from "../models/router.model";
import { Console } from "./Console";
import { Home } from "./Home";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

export const routes:Route[] = [
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