import { Request } from 'express';

const cookieName = process.env.APP_NAME as string;

export const getToken = ({ req }: { req: Request }) => {
  const jwtToken = req?.query?.token;
  const cookieToken = req?.cookies[cookieName];
  return jwtToken || cookieToken || false; // order matters, first we check the value of the query value, then the cookie
};
