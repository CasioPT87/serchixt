import React from 'react';
import { Provider } from 'react-redux';
import { Router, Auth } from '../../router';
import { PageName as PageNameType, Store } from '../../types';

const createMarkup = ({
  pageName,
  store,
  user,
  preloadData,
}: {
  pageName: PageNameType;
  store: Store;
  user: Object | null;
  preloadData: any;
}) => {
  return (
    <Provider store={store}>
      <Auth initialUser={user}>
        {({ user: _user, setUser }) => (
          <Router
            initialPageName={pageName}
            preloadData={{ [pageName]: preloadData }}
            user={_user}
            setUser={setUser}
          />
        )}
      </Auth>
    </Provider>
  );
};

export { createMarkup };
