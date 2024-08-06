import routes from '../routes';
import { PageName as PageNameType } from '../types';

const goTo = ({
  pageName,
  pushHistoryState = true,
  redirect = false,
}: {
  pageName: PageNameType;
  pushHistoryState?: boolean;
  redirect?: boolean;
}) => {
  const changePageEvent = new CustomEvent('changePage', {
    detail: { pageName },
  });
  if (typeof document !== 'undefined') {
    if (pushHistoryState)
      // @ts-ignore: Unreachable code error
      window.history.pushState(null, null, routes[pageName].path);
    else if (redirect) window.location.replace(routes[pageName].path);
    window.dispatchEvent(changePageEvent);
  }
};

export default goTo;
