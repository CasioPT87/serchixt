import React, { useState, useEffect } from "react";
import routes from "../routes";
import goTo from "../utils/goTo";
import { getAllowedPage, getPageNameFromPage } from "../tools";
import { PageName } from "../types";

function usePageMonitor({
  pageName: _pageName = "home",
}: {
  pageName: PageName;
}): PageName {
  const [pageName, setPage] = useState<PageName>(_pageName);
  useEffect(() => {
    function changePage({ detail }: { detail: { pageName: PageName } }) {
      setPage(detail.pageName);
    }
    if (typeof document !== "undefined")
      // @ts-ignore: Unreachable code error
      window.addEventListener("changePage", changePage);
    return () => {
      if (typeof document !== "undefined")
        // @ts-ignore: Unreachable code error
        window.removeEventListener("changePage", changePage);
    };
  }, []);
  return pageName;
}

if (typeof document !== "undefined") {
  window.addEventListener("popstate", function (event) {
    // FIX THIS!!
    const user = null;
    const { page } = getAllowedPage({
      path: window.location.pathname,
      userIsLogged: !!user,
    });
    const pageName = getPageNameFromPage({ page });
    goTo({ pageName, pushHistoryState: false });
  });
}

interface AuthProps {
    initialUser: Object | null;
    children: (props: { user: any; setUser: React.Dispatch<React.SetStateAction<any>> }) => React.ReactNode;
}

function Auth({
  initialUser,
  children,
}: AuthProps) {
  const [user, setUser] = useState(initialUser);
  return <>{children({ user, setUser })}</>;
}

function Router({
  initialPageName,
  preloadData,
  user,
  setUser
}: {
  initialPageName: PageName;
  preloadData: any;
  user: Object | null;
  setUser: React.Dispatch<React.SetStateAction<any>>
}) {
  const pageName = usePageMonitor({ pageName: initialPageName });
  const page = routes[pageName];
  const { page: allowedPage, needsRedirection } = getAllowedPage({
    path: page.path,
    userIsLogged: !!user,
  });
  const allowedPageName: PageName = getPageNameFromPage({ page: allowedPage });
  if (needsRedirection) {
    goTo({ pageName: allowedPageName, redirect: true });
    return null;
  }
  const pageValue = allowedPage[allowedPageName];
  return (
    <pageValue.pageComponent
      preloadData={preloadData[allowedPageName]}
      user={user}
      setUser={setUser}
    />
  );
}

export { Router, Auth };
