import routes from "../routes";
import { onlyLogged } from "../routes/routeProtection";
import { PageValue, Page, PageName, PageComponent } from "../types";

const userIsLogged = true

const getPageFromPath = ({ path }: { path: PageValue['path'] }): Page => {
  const pageTuple = Object.entries(routes).find(
    ([pageName, value]) => {
      return value.path === path
    }
  ) as [PageName, PageValue];
  const page = Object.fromEntries([pageTuple]) as Page
  return page;
};

const getPageNameFromPage = ({ page }: { page: Page }): PageName => {
  const pageNameArray = Object.keys(page) as Array<PageName>
  if (pageNameArray.length !== 1) throw new Error('Page name not calculated correctly')
  return pageNameArray[0]
}

const getAllowedPage = ({ path }: { path: PageValue['path'] }): { page: Page, isRedirection: Boolean } => {
  if (onlyLogged({ path }) && !userIsLogged) {
    return { page: getHomePage(), isRedirection: true }
  } else {
    return { page: getPageFromPath({ path }), isRedirection: false }
  }
}

const getAllRoutes = () => {
  return Object.values(routes).map(({ path }) => path);
};

const getInitialRenderData = async ({ page }: { page: Page }) => {
  const component = page.pageComponent as PageComponent
  if (component?.preloadFn) {
    return await component.preloadFn();
  }
  return null;
};

const getHomePage = (): Page => {
  const pageTuple = Object.entries(routes).find(
    ([key, value]) => {
      return value.isHome;
    }
  ) as [PageName, PageValue];
  const page = Object.fromEntries([pageTuple]) as Page
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
