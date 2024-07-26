// @ts-nocheck
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import goTo from "../../utils/goTo.js";

const Home = () => {
  return (
    <div>
      Home Page my dear killoooo
      <button onClick={() => goTo({ pageName: "profile" })}>
        dame aqui y vamos al profile
      </button>
    </div>
  );
};

export default Home;
