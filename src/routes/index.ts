import Home from "../components/home"
import Profile from "../components/profile"
import Login from "../components/login"
import { Routes } from "../types"
import Articles from "../components/articles"

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
    articles: {
        path: '/articles',
        pageComponent: Articles
    },
    login: {
        path: '/login',
        pageComponent: Login
    }
}

export default routes