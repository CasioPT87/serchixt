import React, { useEffect } from "react";
import { fetchToken, fetchUser } from "../../client-utils";
import goTo from "../../utils/goTo";

function Login({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<any>>;
}) {
  async function authenticate() {
    const tokenResponse = await fetchToken({
      username: "",
      password: "",
    });
    if (tokenResponse?.token) {
      const user = await fetchUser({ token: tokenResponse.token });
      if (user) setUser({ user });
    }
  }

  return <><button onClick={authenticate}>authentication!!!</button></>;
}

export default Login;
