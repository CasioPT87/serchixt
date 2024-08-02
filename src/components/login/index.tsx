import React, { useEffect } from 'react'
import { fetchToken, fetchUser } from '../../client-utils'
import goTo from '../../utils/goTo'

function Login({ setUser }: {
  setUser: React.Dispatch<React.SetStateAction<any>>
}) {
  useEffect(() => {
    async function authenticate() {
      const tokenResponse = await fetchToken({ username: 'pepito', password: 'luisito'})
      if (tokenResponse?.token) {
        const user = await fetchUser({ token: tokenResponse.token })
        if (user) setUser({ user })
      }
    }
    authenticate()
  }, [])

  return (
    <div>
     Esto es el login
    </div>
  )
}

export default Login