import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import Router from '../router/index.js';

const domNode = document.getElementById('app');
hydrateRoot(domNode, <Router />);