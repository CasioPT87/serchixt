import { manageError } from "../tools";

// @ts-ignore: Unreachable code error
const backendUrl = typeof document !== "undefined" ? window.FRONT_CONST.backendUrl : '';
// @ts-ignore: Unreachable code error
const backendAuthPath = typeof document !== "undefined" ? window.FRONT_CONST.backendAuthPath : '';
// @ts-ignore: Unreachable code error
const backendUserPath = typeof document !== "undefined" ? window.FRONT_CONST.backendUserPath : '';
// @ts-ignore: Unreachable code error
const frontendUrl = typeof document !== "undefined" ? window.FRONT_CONST.frontendUrl : '';
// @ts-ignore: Unreachable code error
const cookiesPath = typeof document !== "undefined" ? window.FRONT_CONST.cookiesPath : '';

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
      headers: {
        "Content-Type": "application/json",
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
      console.log(response)
      const { data: user } = await response.json();
      return user;
    }
    return null;
  } catch (e) {
    manageError({ error: e });
    return null;
  }
}

export async function setCookie({
  token,
}: {
  token: string;
}): Promise<Object | boolean> {
  try {
    const response = await fetch(cookiesPath, {
      method: "POST",
      body: JSON.stringify({
        token
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) return true
    return false
    
  } catch (e) {
    manageError({ error: e });
    return false;
  }
}

export async function deleteCookie(): Promise<boolean> {
  try {
    const response = await fetch(cookiesPath, {
      method: "DELETE",
    })
    if (response.ok) return true
    return false
    
  } catch (e) {
    manageError({ error: e });
    return false;
  }
}
