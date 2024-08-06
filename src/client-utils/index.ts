import { manageError } from '../tools';

const backendUrl = process.env.BACKEND_URL;
const backendAuthPath = process.env.BACKEND_AUTH_PATH;
const backendUserPath = process.env.BACKEND_USER_PATH;
const cookiesPath = process.env.COOKIES_PATH;

export async function fetchToken({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<{ token: string } | null> {
  try {
    if (!backendUrl || !backendAuthPath)
      throw new Error('Problem finding global url');
    const response = await fetch(backendUrl + backendAuthPath, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
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
    if (!backendUrl || !backendAuthPath)
      throw new Error('Problem finding global url');
    const response = await fetch(backendUrl + backendUserPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
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
    if (!cookiesPath) throw new Error('Problem finding global url');
    const response = await fetch(cookiesPath, {
      method: 'POST',
      body: JSON.stringify({
        token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) return true;
    return false;
  } catch (e) {
    manageError({ error: e });
    return false;
  }
}

export async function deleteCookie(): Promise<boolean> {
  try {
    if (!cookiesPath) throw new Error('Problem finding global url');
    const response = await fetch(cookiesPath, {
      method: 'DELETE',
    });
    if (response.ok) return true;
    return false;
  } catch (e) {
    manageError({ error: e });
    return false;
  }
}
