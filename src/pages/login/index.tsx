import React from 'react';
import {
  fetchTokenBackend,
  fetchUserBackend,
  setCookieServer,
  deleteCookie,
} from '../../client-utils';
import goTo from '../../core/router/utils/goTo';
import '../../styles/index.scss';

function Login({
  setUser,
  user,
}: {
  setUser: React.Dispatch<React.SetStateAction<any>>;
  user: Object | null;
}): React.JSX.Element {
  async function authenticate() {
    const tokenResponse = await fetchTokenBackend({
      username: process.env.USER_NAME || '',
      password: process.env.USER_PASSWORD || '',
    });

    if (tokenResponse?.token) {
      const user = await fetchUserBackend({ token: tokenResponse.token });
      if (user) {
        setUser({ user });
        await setCookieServer({ token: tokenResponse.token });
      }
    }
  }

  async function signOut() {
    const { success } = await deleteCookie();
    if (success) await setUser(null);
  }

  return (
    <>
      <h1>Login test page</h1>
      <button
        id="test-login-login"
        className="button-test-2"
        onClick={authenticate}
      >
        authentication!!!
      </button>
      {user && (
        <button
          id="test-login-logout"
          className="button-test-2"
          onClick={signOut}
        >
          delete season!!!
        </button>
      )}
      <button
        className="button-test"
        onClick={() => goTo({ pageName: 'home' })}
      >
        Go Home!!!
      </button>
      <button
        id="test-login-goto-articles"
        className="button-test"
        onClick={() => goTo({ pageName: 'articles' })}
      >
        Go to Articles!!!
      </button>
      <button
        className="button-test"
        onClick={() => goTo({ pageName: 'profile' })}
      >
        Go to Profile!!!
      </button>
      {user && <pre>{JSON.stringify(user)}</pre>}
      {!user && <p>not logged in</p>}
    </>
  );
}

export default Login;
