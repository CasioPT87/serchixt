import Home from "../components/home/index.jsx"
import Profile from "../components/profile"
import Shipments from "../components/shipments"

const routes = {
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
    }
}

export default routes