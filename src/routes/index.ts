import Home from "../components/home"
import Profile from "../components/profile"
import Shipments from "../components/shipments"
import Login from "../components/login"
import { Routes } from "../types"

const routes: Routes = {
    home: {
        path: '/',
        pageComponent: Home,
        isHome: true,
    },
    profile: {
        path: '/profile',
        pageComponent: Profile,
    },
    shipments: {
        path: '/shipments',
        pageComponent: Shipments
    },
    login: {
        path: '/login',
        pageComponent: Login
    }
}

export default routes