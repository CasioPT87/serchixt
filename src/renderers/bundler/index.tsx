import { createRoot, hydrateRoot } from 'react-dom/client';
import {
  getAllowedPage,
  getInitialRenderData,
  getPageNameFromPage,
  getPageValueFromPage,
} from '../../tools';
import { fetchUserBackend } from '../../client-utils';
import { setUpStore } from '../../store';
import { createMarkup } from '../utils';

const domNode = document.getElementById('app') as HTMLElement;
const { pathname: path } = window.location;

if (process.env.NODE_ENV === 'production') {
  const store = setUpStore(window.__PRELOADED_STATE__);
  const preloadData = window.__PRELOADED_DATA__;
  const user = window.__PRELOADED_USER__;

  // Allow all this data to be garbage collected
  delete window.__PRELOADED_STATE__;
  delete window.__PRELOADED_DATA__;
  delete window.__PRELOADED_USER__;

  const { page } = getAllowedPage({ path, userIsLogged: !!user });

  hydrateRoot(
    domNode,
    createMarkup({
      page,
      store,
      user,
      preloadData,
    })
  );
} else {
  (async function createFrontComponentsDev() {
    const store = setUpStore();
    const user = await fetchUserBackend({ token: null });
    const { page } = getAllowedPage({ path, userIsLogged: !!user });
    const { path: newPath } = getPageValueFromPage({ page });

    if (newPath !== path) window.location.href = newPath;

    getInitialRenderData({ page, token: null }).then((preloadData) => {
      const root = createRoot(domNode);

      root.render(
        createMarkup({
          page,
          store,
          user,
          preloadData,
        })
      );
    });
  })();
}
