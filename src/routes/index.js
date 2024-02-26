import Home from "../components/home/index.js"
import Profile from "../components/profile/index.js"
import Shipments from "../components/shipments/index.js"

const routes = {
    home: {
        path: '/',
        pageComponent: Home,
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