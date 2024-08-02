import { manageError } from "../tools";

// @ts-ignore: Unreachable code error
const backendUrl = typeof document !== "undefined" ? window.FRONT_CONST.backendUrl : '';
// @ts-ignore: Unreachable code error
const backendAuthPath = typeof document !== "undefined" ? window.FRONT_CONST.backendAuthPath : '';
// @ts-ignore: Unreachable code error
const backendUserPath = typeof document !== "undefined" ? window.FRONT_CONST.backendUserPath : '';

console.log({ backendUserPath })

export async function fetchToken({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<{ token: string } | null> {
  try {
    const response = await fetch(backendUrl + backendAuthPath, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (e) {
    manageError({ error: e });
    return null;
  }
}

export async function fetchUser({
  token,
}: {
  token: string;
}): Promise<Object | null> {
  try {
    const response = await fetch(backendUrl + backendUserPath, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (e) {
    manageError({ error: e });
    return null;
  }
}
