// @ts-ignore: Unreachable code error
import { createRoot, hydrateRoot } from 'react-dom/client'
import { getAllowedPage, getInitialRenderData, getPageNameFromPage } from '../../tools';
import { setUpStore } from '../../store';
import { createMarkup } from '../utils';

const domNode = document.getElementById('app') as HTMLElement;
const { pathname: path } = window.location

if (process.env.NODE_ENV === 'production') {
    // @ts-ignore: Unreachable code error
    const store = setUpStore(window.__PRELOADED_STATE__)
    // @ts-ignore: Unreachable code error
    const preloadData = window.__PRELOADED_DATA__
     // @ts-ignore: Unreachable code error
    const user = window.__PRELOADED_USER__

    window.global = {
        ...window.global,
         // @ts-ignore: Unreachable code error
        ...window.__GLOBAL_DATA__
    }
    
    // Allow all this data to be garbage collected
    // @ts-ignore: Unreachable code error
    delete window.__PRELOADED_STATE__
    // @ts-ignore: Unreachable code error
    delete window.__PRELOADED_DATA__
     // @ts-ignore: Unreachable code error
    delete window.__PRELOADED_USER__
     // @ts-ignore: Unreachable code error
     delete window.__GLOBAL_DATA__

    const { page } = getAllowedPage({ path, userIsLogged: !!user })

    hydrateRoot(domNode, createMarkup({ pageName: getPageNameFromPage({ page }), store, user, preloadData }));
} else {
    const store = setUpStore()
    const { page } = getAllowedPage({ path, userIsLogged: false })

    getInitialRenderData({ page }).then(preloadData => {
        const root = createRoot(domNode);

        root.render(createMarkup({ pageName: getPageNameFromPage({ page }), store, user: null, preloadData }));
    }) 
}
