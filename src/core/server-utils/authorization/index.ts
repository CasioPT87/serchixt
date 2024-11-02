import { Request } from "express";

const cookieName = process.env.APP_NAME as string;

export const getToken = ({ req }: { req: Request }) => {
  const jwtToken = req?.query?.token; // coge el token de la url (?token=xxxxx)
  const cookieToken = req?.cookies[cookieName]; // coge el token de la cookie
  return jwtToken || cookieToken || false;
};