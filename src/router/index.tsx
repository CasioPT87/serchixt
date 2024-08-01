import React, { useState, useEffect } from 'react'
import routes from '../routes'
import goTo from '../utils/goTo';
import { getAllowedPage, getPageNameFromPage } from '../tools'
import { PageName } from '../types';

function usePageMonitor({ pageName: _pageName = 'home' }: { pageName: PageName }): PageName {
    const [pageName, setPage] = useState<PageName>(_pageName);
    useEffect(() => {
        function changePage({ detail }: { detail: { pageName: PageName }}) {
            setPage(detail.pageName);
        }
            // @ts-ignore: Unreachable code error
        if (typeof document !== 'undefined') window.addEventListener('changePage', changePage);
        return () => {
                // @ts-ignore: Unreachable code error
            if (typeof document !== 'undefined') window.removeEventListener('changePage', changePage);
        };
    }, []);
    return pageName;
}

if (typeof document !== 'undefined') {
    window.addEventListener('popstate', function (event) {
        const { page } = getAllowedPage({ path: window.location.pathname, userIsLogged: !!window.user })
        const pageName = getPageNameFromPage({ page })
        goTo({ pageName, pushHistoryState: false })
    });
}

function Router({ initialPageName, preloadData, user }: { initialPageName: PageName, preloadData: any, user: Object | null }) {
    const pageName = usePageMonitor({ pageName: initialPageName });
    const page = routes[pageName]
    const { page: allowedPage, needsRedirection } = getAllowedPage({ path: page.path, userIsLogged: !!user })
    const allowedPageName = getPageNameFromPage({ page: allowedPage })
    if (needsRedirection) {
        goTo({ pageName: allowedPageName, redirect: true })
        return null
    }
    const pageValue = allowedPage[allowedPageName]
    return <pageValue.pageComponent preloadData={preloadData[allowedPageName]} user={user} />
}

export default Router