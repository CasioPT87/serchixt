import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Router from '../router/index.js';
import { getPageNameFromPath } from '../../tools/index.js';

const domNode = document.getElementById('app');
const { pathname: path } = window.location
const pageName = getPageNameFromPath({ path })

if (process.env.NODE_ENV === 'production') {
    hydrateRoot(domNode, <Router pageName={pageName} />);
} else {
    const root = createRoot(domNode);
    root.render(<Router pageName={pageName} />);
}
