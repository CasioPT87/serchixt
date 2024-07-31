// @ts-ignore: Unreachable code error
import { createRoot, hydrateRoot } from 'react-dom/client'
import { getAllowedPage, getInitialRenderData, getPageNameFromPage } from '../../tools';
import { setUpStore } from '../../store';
import { createMarkup } from '../utils';

const domNode = document.getElementById('app') as HTMLElement;
const { pathname: path } = window.location
const { page } = getAllowedPage({ path })

if (process.env.NODE_ENV === 'production') {
    // @ts-ignore: Unreachable code error
    const store = setUpStore(window.__PRELOADED_STATE__)
    // @ts-ignore: Unreachable code error
    const preloadData = window.__PRELOADED_DATA__
    
    // Allow the passed state to be garbage-collected
    // @ts-ignore: Unreachable code error
    delete window.__PRELOADED_STATE__
    // Allow the passed preload data to be garbage-collected
    // @ts-ignore: Unreachable code error
    delete window.__PRELOADED_DATA__

    hydrateRoot(domNode, createMarkup({ pageName: getPageNameFromPage({ page }), store, preloadData }));
} else {
    const store = setUpStore()
    getInitialRenderData({ page }).then(preloadData => {
        const root = createRoot(domNode);

        root.render(createMarkup({ pageName: getPageNameFromPage({ page }), store, preloadData }));
    }) 
}
