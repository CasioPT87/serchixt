import { createRoot, hydrateRoot } from 'react-dom/client';
import { getAllowedPage, getInitialRenderData, getPageNameFromPage } from '../../tools';
import { setUpStore } from '../../store';
import { createMarkup } from '../utils';

const domNode = document.getElementById('app');
const { pathname: path } = window.location
const { page } = getAllowedPage({ path })

if (process.env.NODE_ENV === 'production') {
    const store = setUpStore(window.__PRELOADED_STATE__)
    const preloadData = window.__PRELOADED_DATA__
    
    // Allow the passed state to be garbage-collected
    delete window.__PRELOADED_STATE__
    // Allow the passed preload data to be garbage-collected
    delete window.__PRELOADED_DATA__

    hydrateRoot(domNode, createMarkup({ pageName: getPageNameFromPage({ page }), store, preloadData }));
} else {
    const store = setUpStore()
    const preloadData = await getInitialRenderData({ page })
    const root = createRoot(domNode);

    root.render(createMarkup({ pageName: getPageNameFromPage({ page }), store, preloadData }));
}
