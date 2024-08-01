import { Request } from 'express';
const cookieName = 'garriga-app'
const backendUrl = process.env.BACKEND_URL || ''
const backendAuthPath = process.env.BACKEND_AUTH_PATH || ''

const authenticate = async (req: Request) => {
  try {
    const cookieToken = req.cookies[cookieName];
    const jwtToken = req?.query?.token
    const token = jwtToken || cookieToken // order matters, first we check the value of the query value, then the cookie
    const authUrl = backendUrl + backendAuthPath
    const response = await fetch(authUrl)
    if (!response.ok) throw new Error('Authentication failed')
    // this is just an example
    const data = await response.json()
    if (data.authenticated) return true
    return false
  } catch (e) {
    console.error(e.message)
    return false
  }
};

module.exports = {
  authenticate
}
