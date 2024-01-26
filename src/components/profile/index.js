import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { userThunk } from '../../store/async/index.js'
import { userActions } from '../../store/actions/index.js'

console.log(userThunk.fetchTodos)

const Profile = () => {
  const userList = useSelector(state => state.user.list)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.addUser('PEPITO!!!!!'))
    setTimeout(() => {
      dispatch(userThunk.addUser('MANOLITO!!!!!'))
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