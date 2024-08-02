import React from "react";
import { fetchToken, fetchUser, setCookie, deleteCookie } from "../../client-utils";
import goTo from '../../utils/goTo'

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
      if (user) {
        setUser({ user });
        await setCookie({ token: tokenResponse.token })
      }
    }
  }

  async function signOut() {
    const deleted = await deleteCookie()
    if (deleted) await setUser(null)
  }

  return <>
  <button onClick={authenticate}>authentication!!!</button>
  {user && <button onClick={signOut}>delete season!!!</button>}
  <button onClick={() => goTo({ pageName: 'home' })}>vamos a home!!!</button>
  <button onClick={() => goTo({ pageName: 'shipments' })}>vamos a shipments!!!</button>
  {user && <pre>{JSON.stringify(user)}</pre>}
  </>;
}

export default Login;
