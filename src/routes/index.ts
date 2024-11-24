import Home from "../pages/home";
import Profile from "../pages/profile";
import Login from "../pages/login";
import { Routes } from "../types";
import Articles from "../pages/articles";

const routes: Routes = {
  home: {
    path: "/",
    pageComponent: Home,
    isHome: true,
  },
  profile: {
    path: "/profile",
    pageComponent: Profile,
  },
  articles: {
    path: "/articles",
    pageComponent: Articles,
  },
  login: {
    path: "/login",
    pageComponent: Login,
  },
};

export default routes;
