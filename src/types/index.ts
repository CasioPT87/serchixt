import React from 'react';
import {
  RootState,
  Action,
  Reducer,
  AppDispatch,
  Store,
  AppThunk,
  AppThunkDispatch,
} from './store';

type PageName = 'home' | 'profile' | 'articles' | 'login';

type PageComponent = React.FC<any> & {
  preloadFn?: (token: string | null) => () => any
};

interface PageValue {
  path: string;
  pageComponent: PageComponent;
  isHome?: boolean;
}

type Page = {
  [key in PageName]: PageValue;
} & {
  [key: string]: never; // Ensure no extra properties are allowed
};

type Routes = {
  [key in PageName]: PageValue;
};

export {
  PageName,
  PageValue,
  Page,
  Routes,
  RootState,
  AppDispatch,
  AppThunk,
  AppThunkDispatch,
  Action,
  Reducer,
  Store,
  PageComponent,
};
