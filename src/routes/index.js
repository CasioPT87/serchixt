import Home from "../components/home/index.js"
import Profile from "../components/profile/index.js"

const routes = {
    home: {
        path: '/',
        pageComponent: Home,
        isSSR: true
    },
    profile: {
        path: '/profile',
        pageComponent: Profile,
        isSSR: false
    }
}

export default routes