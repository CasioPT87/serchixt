import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { userThunk } from '../../store/async/index.js'
import { userActions } from '../../store/actions/index.js
import goTo from '../../utils/goTo.js'

function Profile() {

  const dispatch = useDispatch()
  const userList = useSelector(state => state.user.list)

  useEffect(() => {
    dispatch(userActions.addUser('PEPITO!!!!!'))
    setTimeout(() => {
      dispatch(userThunk.addUser('MANOLITO!!!!!'))
    }, 3000)
  }, [])

  return (
    <div>
      Cada vez que se carge esta pagina se mete un usuario en la shop
      <button onClick={() => goTo('home')}>go to home</button>
      <button onClick={() => goTo('shipments')}>go to shipments</button>
      <ul>{userList.map(user => <li key={user}>{user}</li>)}</ul>      
    </div>
  )
}

export default Profile