import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { userThunk } from '../../store/async/index.js'
import { userActions } from '../../store/actions/index.js'
import goTo from '../../utils/goTo.js'
import { RootState, AppDispatch } from '../../types/index.js'

function Profile() {

  const dispatch: AppDispatch = useDispatch()
  const userList = useSelector((state: RootState) => state.user.list)

  useEffect(() => {
    dispatch(userActions.addUser('PEPITO!!!!!'))
    setTimeout(() => {
      dispatch(userThunk.addUser('MANOLITO!!!!!'))
    }, 3000)
  }, [])

  return (
    <div>
      Cada vez que se carge esta pagina se mete un usuario en la shop
      <button onClick={() => goTo({ pageName: 'home' })}>go to home</button>
      <button onClick={() => goTo({ pageName: 'shipments' })}>go to shipments</button>
      <ul>{userList.map(user => <li key={user}>{user}</li>)}</ul>      
    </div>
  )
}

export default Profile