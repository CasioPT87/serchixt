import routes from "../src/routes";
import { onlyLogged } from "../src/routes/routeProtection";

const userIsLogged = true

const getPageFromPath = ({ path }) => {
  const pageTuple = Object.entries(routes).find(
    ([pageName, value]) => {
      return value.path === path
    }
  );
  const page = Object.fromEntries([pageTuple])
  return page;
};

const getPageNameFromPage = ({ page }) => {
  const pageNameArray = Object.keys(page)
  if (pageNameArray.length !== 1) throw new Error('Page name not calculated correctly')
  return pageNameArray[0]
}

const getAllowedPage = ({ path }) => {
  if (onlyLogged({ path }) && !userIsLogged) {
    return { page: getHomePage(), isRedirection: true }
  } else {
    return { page: getPageFromPath({ path }), isRedirection: false }
  }
}

const getAllRoutes = () => {
  return Object.values(routes).map(({ path }) => path);
};

const getInitialRenderData = async ({ page }) => {
  if (page?.pageComponent?.preloadFn) {
    return await page.pageComponent.preloadFn();
  }
  return null;
};

const getHomePage = () => {
  const page = Object.fromEntries([Object.entries(routes).find(
    ([key, value]) => {
      return value.isHome;
    }
  )]);

  return page;
};

export {
  getPageFromPath,
  getAllRoutes,
  getInitialRenderData,
  getHomePage,
  getAllowedPage,
  getPageNameFromPage
};
