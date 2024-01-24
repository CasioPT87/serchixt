import Home from "../components/home/index.js"
import Profile from "../components/profile/index.js"
import Julio from "../components/julio/index.js"

const routes = {
    home: {
        path: '/',
        pageComponent: Home,
    },
    profile: {
        path: '/profile',
        pageComponent: Profile,
    },
    julio: {
        path: '/julio-sound',
        pageComponent: Julio
    }
}

export default routes