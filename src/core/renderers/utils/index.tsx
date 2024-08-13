import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Router, Auth } from '../../router';
import { Page, Store } from '../../../types';
import { getPageNameFromPage } from '../../../tools';

const createMarkup = ({
  page,
  store,
  user,
  preloadData,
}: {
  page: Page;
  store: Store;
  user: Object | null;
  preloadData: any;
}) => {
  return (
    <Provider store={store}>
      <Auth initialUser={user}>
        {({ user: _user, setUser }) => (
          <Router
            initialPageName={getPageNameFromPage({ page })}
            user={_user}
            preloadData={preloadData}
            setUser={setUser}
          />
        )}
      </Auth>
    </Provider>
  );
};

export { createMarkup };
