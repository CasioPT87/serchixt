import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from './router/index.js';

const root = createRoot(document.getElementById('app'));
root.render(
    <Router />
);