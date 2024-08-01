import { Request } from 'express';

const cookieName = 'garriga-app'


const backendUrl = process.env.BACKEND_URL || "";
const backendAuthPath = process.env.BACKEND_AUTH_PATH || "/api/v1/users/auth";
const backendUserPath = process.env.BACKEND_AUTH_PATH || "/api/v1/users";
const tokenUrlName = process.env.TOKEN_URL_NAME || null;
const tokenStorageName = process.env.TOKEN_STORAGE_NAME || "";

const userDataStorageName = "garriga-app";

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
    console.error(e.stack)
    return null;
  }
}

const getUser = async (req: Request): Promise<Object | null>=> {
  try {
    const jwtToken = req?.query?.token
    const cookieToken = req.cookies[cookieName];
    const token = jwtToken || cookieToken // order matters, first we check the value of the query value, then the cookie
    const user = await fetchUser({ token })
    if (!user) return null
    return user
  } catch (e) {
    console.error(e.stack)
    return false
  }
};

module.exports = {
  getUser
}
