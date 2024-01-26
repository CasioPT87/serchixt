import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Router from '../router/index.js';
import { Provider } from 'react-redux'
import { getInitialRenderData, getPageNameFromPath } from '../../tools/index.js';
import { setUpStore } from '../store/index.js';

const domNode = document.getElementById('app');
const { pathname: path } = window.location
const pageName = getPageNameFromPath({ path })

if (process.env.NODE_ENV === 'production') {
    // Allow the passed state to be garbage-collected
    delete window.__PRELOADED_STATE__
    // Allow the passed preload data to be garbage-collected
    delete window.__PRELOADED_DATA__
    const preloadData = window.__PRELOADED_DATA__
    hydrateRoot(domNode, (
        <Provider store={store}>
            <Router pageName={pageName} preloadData={preloadData} />
        </Provider>
    ));
} else {
    const store = setUpStore()
    const preloadData = await getInitialRenderData({ pageName })
    const root = createRoot(domNode);
    root.render(
        <Provider store={store}>
            <Router pageName={pageName} preloadData={preloadData} />
        </Provider>
    );
}
