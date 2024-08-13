import routes from '../routes';
import { isPrivateRoute } from '../routes/routeProtection';
import { PageValue, Page, PageName, PageComponent } from '../types';

const getPageFromPath = ({ path }: { path: PageValue['path'] }): Page => {
  const pageTuple = Object.entries(routes).find(([pageName, value]) => {
    return value.path === path;
  }) as [PageName, PageValue];
  const page = Object.fromEntries([pageTuple]) as Page;
  return page;
};

const getPageNameFromPage = ({ page }: { page: Page }): PageName => {
  const pageNameArray = Object.keys(page) as Array<PageName>;
  if (pageNameArray.length !== 1)
    throw new Error('Page name not calculated correctly');
  return pageNameArray[0];
};

const getAllowedPage = ({
  path,
  userIsLogged,
}: {
  path: PageValue['path'];
  userIsLogged: boolean;
}): { page: Page; needsRedirection: boolean } => {
  if (isPrivateRoute({ path }) && !userIsLogged) {
    return { page: getHomePage(), needsRedirection: true };
  } else {
    return { page: getPageFromPath({ path }), needsRedirection: false };
  }
};

const getAllRoutes = () => {
  return Object.values(routes).map(({ path }) => path);
};

const getInitialRenderData = async ({
  page,
  token = null,
}: {
  page: Page;
  token: string | null;
}) => {
  const pageValue = getPageValueFromPage({ page });
  const component = pageValue.pageComponent;
  if (component?.preloadFn) {
    return await component.preloadFn(token)();
  }
  return null;
};

const getHomePage = (): Page => {
  const pageTuple = Object.entries(routes).find(([key, value]) => {
    return value.isHome;
  }) as [PageName, PageValue];
  const page = Object.fromEntries([pageTuple]) as Page;
  return page;
};

const getPageValueFromPage = ({ page }: { page: Page }): PageValue => {
  return Object.values(page)[0];
};

export {
  getPageFromPath,
  getAllRoutes,
  getInitialRenderData,
  getHomePage,
  getAllowedPage,
  getPageNameFromPage,
  getPageValueFromPage,
};
