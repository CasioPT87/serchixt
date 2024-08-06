import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userThunk } from '../../store/async';
import { userActions } from '../../store/actions';
import goTo from '../../utils/goTo';
import { RootState, AppDispatch } from '../../types';
import '../../styles/index.scss';

function Profile() {
  const dispatch: AppDispatch = useDispatch();
  const userStore = useSelector((state: RootState) => state.user.data);

  return (
    <div>
      <h1>Profile test page</h1>
      <button
        className="button-test"
        onClick={() => goTo({ pageName: 'home' })}
      >
        Go Home
      </button>
      <button
        className="button-test"
        onClick={() => goTo({ pageName: 'articles' })}
      >
        Go to Articles
      </button>
      <button
        className="button-test"
        onClick={() => goTo({ pageName: 'login' })}
      >
        Go to Login
      </button>
      <input
        type="text"
        onChange={(ev) => {
          const text = ev.target.value;
          dispatch(userActions.addUser(text));
        }}
      />
      {userStore && <div>Name in Store: {userStore}</div>}
      <button
        className="button-test-2"
        onClick={() => dispatch(userThunk.getUserMock(5))}
      >
        Add user with thunk! -there is some added delay-
      </button>
    </div>
  );
}

export default Profile;
