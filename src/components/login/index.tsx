import React from 'react';
import {
  fetchToken,
  fetchUser,
  setCookie,
  deleteCookie,
} from '../../client-utils';
import goTo from '../../utils/goTo';
import '../../styles/index.scss';

function Login({
  setUser,
  user,
}: {
  setUser: React.Dispatch<React.SetStateAction<any>>;
  user: Object | null;
}) {
  async function authenticate() {
    const tokenResponse = await fetchToken({
      username: process.env.USER_NAME || '',
      password: process.env.USER_PASSWORD || '',
    });
    if (tokenResponse?.token) {
      const user = await fetchUser({ token: tokenResponse.token });
      if (user) {
        setUser({ user });
        await setCookie({ token: tokenResponse.token });
      }
    }
  }

  async function signOut() {
    const deleted = await deleteCookie();
    if (deleted) await setUser(null);
  }

  return (
    <>
      <h1>Login test page</h1>
      <button className="button-test-2" onClick={authenticate}>
        authentication!!!
      </button>
      {user && (
        <button className="button-test-2" onClick={signOut}>
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
      <button
        className="button-test"
        onClick={() => goTo({ pageName: 'articles' })}
      >
        Go to Articles!!!
      </button>
      {user && <pre>{JSON.stringify(user)}</pre>}
      {!user && <p>not logged in</p>}
    </>
  );
}

export default Login;
