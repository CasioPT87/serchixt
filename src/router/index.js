import React, { useState, useEffect } from 'react'
import routes from '../routes/index.js'
import goTo from '../tools/goTo.js';

function usePageMonitor() {
    const [page, setPage] = useState('home');
    useEffect(() => {
        function changePage({ detail }) {
            setPage(detail.pageName);
        }
        window.addEventListener('changePage', changePage);
        return () => {
            window.removeEventListener('changePage', changePage);
        };
    }, []);
    return page;
}

window.addEventListener('popstate', function(event) {
    const [pageName] = Object.entries(routes).find(([pageName, value]) => value.path === this.window.location.pathname)
    goTo(pageName)
});

const manager = ({ page: pageName }) => {
    const page = routes[pageName]
    window.history.pushState(null, null, page.path);
    return <page.pageComponent/>
}

function Router() {
    const page = usePageMonitor();
    return <div>{manager({ page })}</div>
}

export default Router