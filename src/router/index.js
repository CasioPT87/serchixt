import React, { useState, useEffect } from 'react'
import routes from '../routes'
import goTo from '../utils/goTo.js';
import { getAllowedPage, getPageNameFromPage } from '../tools'

function usePageMonitor({ pageName: _pageName = 'home' }) {
    const [pageName, setPage] = useState(_pageName);
    useEffect(() => {
        function changePage({ detail }) {
            setPage(detail.pageName);
        }
        if (typeof document !== 'undefined') window.addEventListener('changePage', changePage);
        return () => {
            if (typeof document !== 'undefined') window.removeEventListener('changePage', changePage);
        };
    }, []);
    return pageName;
}

if (typeof document !== 'undefined') {
    window.addEventListener('popstate', function (event) {
        const { page } = getAllowedPage({ path: window.location.pathname })
        const pageName = getPageNameFromPage({ page })
        goTo({ pageName, pushHistoryState: false })
    });
}

function Router({ initialPageName, preloadData }) {
    const pageName = usePageMonitor({ pageName: initialPageName });
    const page = routes[pageName]
    const { page: allowedPage, isRedirection } = getAllowedPage({ path: page.path })
    const allowedPageName = getPageNameFromPage({ page: allowedPage })
    if (isRedirection) {
        goTo({ pageName: allowedPageName, redirect: true })
        return null
    }
    const pageValue = allowedPage[allowedPageName]
    return <pageValue.pageComponent preloadData={preloadData[allowedPageName]} />
}

export default Router