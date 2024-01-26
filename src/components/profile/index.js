import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'

const Profile = () => {
  const userList = useSelector(state => state.user.list)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'ADD_USER', payload: 'PEPITO!!!' })
    setTimeout(() => {
      dispatch({ type: 'ADD_USER', payload: 'MANOLITO!!!' })
    }, 3000)
  }, [])

  return (
    <div>
      Soy la pagina de profile
      <ul>{userList.map(user => <li key={user}>{user}</li>)}</ul>      
    </div>
  )
}

export default Profile