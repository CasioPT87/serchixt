import React, { useEffect } from "react";
import { fetchToken, fetchUser } from "../../client-utils";

function Login({
  setUser,
  user
}: {
  setUser: React.Dispatch<React.SetStateAction<any>>,
  user: Object | null
}) {
  async function authenticate() {
    const tokenResponse = await fetchToken({
      // @ts-ignore: Unreachable code error
      username: window.FRONT_CONST.userName,
      // @ts-ignore: Unreachable code error
      password: window.FRONT_CONST.userPassword,
    });
    if (tokenResponse?.token) {
      const user = await fetchUser({ token: tokenResponse.token });
      if (user) setUser({ user });
    }
  }

  return <>
  <button onClick={authenticate}>authentication!!!</button>
  {user && <pre>{JSON.stringify(user)}</pre>}
  </>;
}

export default Login;
