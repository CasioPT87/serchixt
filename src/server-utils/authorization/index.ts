import { Request } from 'express';

const cookieName = process.env.APP_NAME as string;
const backendUrl = process.env.BACKEND_URL as string;
const backendDeleteSessionPath = process.env.BACKEND_CLOSE_AUTH_PATH;

export const getToken = ({ req }: { req: Request }) => {
  const jwtToken = req?.query?.token;
  const cookieToken = req?.cookies[cookieName];
  return jwtToken || cookieToken || false; // order matters, first we check the value of the query value, then the cookie
};

export async function deleteBackendCookie(): Promise<{ success: boolean }> {
  try {
    const response = await fetch(backendUrl + backendDeleteSessionPath, {
      method: 'GET',
    });

    return { success: !!response.ok };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.stack);
    } else {
      console.error('unknown error');
    }

    return { success: false };
  }
}
