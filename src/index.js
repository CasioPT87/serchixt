import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
const Example = lazy(() => import('./components/example/index.js'));

const root = createRoot(document.getElementById('app'));
root.render(
    <Suspense fallback={<div>loadiiiiing...</div>}>
        <Example />
    </Suspense>
);