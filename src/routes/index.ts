import Home from "../components/home"
import Profile from "../components/profile"
import Shipments from "../components/shipments"
import { Routes } from "../types"

const routes: Routes = {
    home: {
        path: '/home',
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
    }
}

export default routes