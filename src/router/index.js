import React, { useState, useEffect } from 'react'
import routes from '../routes'
import goTo from '../utils/goTo.js';
import { getPageNameFromPath } from '../../tools'

function usePageMonitor({ pageName = 'home' }) {
    const [page, setPage] = useState(pageName);
    useEffect(() => {
        function changePage({ detail }) {
            setPage(detail.pageName);
        }
        if (typeof document !== 'undefined') window.addEventListener('changePage', changePage);
        return () => {
            if (typeof document !== 'undefined') window.removeEventListener('changePage', changePage);
        };
    }, []);
    return page;
}

if (typeof document !== 'undefined') {
    window.addEventListener('popstate', function (event) {
        const pageName = getPageNameFromPath({ path: window.location.pathname })
        goTo(pageName, false)
    });
}

const manager = ({ page: pageName, preloadData }) => {
    const page = routes[pageName]
    return <page.pageComponent preloadData={preloadData} />
}

function Router({ initialPageName, preloadData }) {

    const page = usePageMonitor({ pageName: initialPageName });
    return <div>{manager({ page, preloadData: preloadData[page] })}</div>
}

export default Router