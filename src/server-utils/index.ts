import { Request } from 'express';

const cookieName = process.env.APP_NAME as string
const backendUrl = process.env.BACKEND_URL as string
const backendUserPath = process.env.BACKEND_AUTH_PATH as string;

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
    if (e instanceof Error) {
      console.error(e.stack)
    } else {
      console.error('unknown error')
    }
    
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
    if (e instanceof Error) {
      console.error(e.stack)
    } else {
      console.error('unknown error')
    }
    
    return null
  }
};

module.exports = {
  getUser
}
