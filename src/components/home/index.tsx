// @ts-nocheck
import React from 'react';
import goTo from '../../core/router/utils/goTo';
import '../../styles/index.scss';
import { PlainObject } from '../../types';

const Home: React.FC<{ user: PlainObject | null }> = ({ user }) => {
  return (
    <div>
      <h1>Home Test Page</h1>
      <h2>Hola soy el dashboard del nuevo front</h2>
      <button
        className="button-test"
        onClick={() => goTo({ pageName: 'profile' })}
      >
        Go to Profile
      </button>
      <button
        className="button-test"
        onClick={() => goTo({ pageName: 'articles' })}
      >
        Go to Articles (is Private)
      </button>
      <button
        id="test-home-goto-login"
        className="button-test"
        onClick={() => goTo({ pageName: 'login', queryString: [['myKey', 'myValue']] })}
      >
        Go to Login
      </button>
      {user && <pre>{JSON.stringify(user)}</pre>}
      <p id="logged">logged: {user ? 'true' : 'false'}</p>
    </div>
  );
};

export default Home;
