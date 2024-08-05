// @ts-nocheck
import React from "react";
import goTo from "../../utils/goTo";
import '../../styles/index.scss'

const Home = () => {
  return (
    <div>
      Home Page my dear killoooo
      <button onClick={() => goTo({ pageName: "profile" })}>
        dame aqui y vamos al profile
      </button>
      <button onClick={() => goTo({ pageName: "login" })}>
        dame aqui y vamos al login
      </button>
    </div>
  );
};

export default Home;
