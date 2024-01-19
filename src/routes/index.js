import Home from "../components/home/index.js"
import Profile from "../components/profile/index.js"

const routes = {
    home: {
        path: '/',
        pageComponent: Home,
    },
    profile: {
        path: '/profile',
        pageComponent: Profile,
    }
}

export default routes