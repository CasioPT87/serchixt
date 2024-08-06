// @ts-nocheck
import React from 'react';
import goTo from '../../utils/goTo';
import '../../styles/index.scss';

const Home = ({ user }) => {
  return (
    <div>
      <h1>Home Test Page</h1>
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
        className="button-test"
        onClick={() => goTo({ pageName: 'login' })}
      >
        Go to Login
      </button>
      {user && <pre>{user}</pre>}
      <p id="logged">logged: {user ? 'true' : 'false'}</p>
    </div>
  );
};

export default Home;
