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
        <PreloadData>
          {({ user: _user, setUser }) => (
            <Router
              initialPageName={pageName}
              preloadData={{ [pageName]: preloadData }}
              user={_user}
              setUser={setUser}
            />
          )}
        </PreloadData>
      </Auth>
    </Provider>
  );
};

export { createMarkup };
