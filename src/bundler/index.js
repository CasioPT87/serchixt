import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Router from '../router/index.js';
import { Provider } from 'react-redux'
import { getPageNameFromPath } from '../../tools/index.js';
import { setUpStore } from '../store/index.js';

const domNode = document.getElementById('app');
const { pathname: path } = window.location
const pageName = getPageNameFromPath({ path })

const store = setUpStore(window.__PRELOADED_STATE__)

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

if (process.env.NODE_ENV === 'production') {
    hydrateRoot(domNode,(
    <Provider store={store}>
        <Router pageName={pageName} />
    </Provider>
    ));
} else {
    const root = createRoot(domNode);
    root.render(<Router pageName={pageName} />);
}
