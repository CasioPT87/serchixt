import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import Router from '../router/index.js';
import { getPageNameFromPath } from '../../tools/index.js';

const domNode = document.getElementById('app');
const { pathname: path } = window.location
const pageName = getPageNameFromPath({ path })
hydrateRoot(domNode, <Router pageName={pageName} />);