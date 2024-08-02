import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { userThunk } from '../../store/async'
import { userActions } from '../../store/actions'
import goTo from '../../utils/goTo'
import { RootState, AppDispatch } from '../../types'

function Profile() {

  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.data)

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
      {user && <div>{ user }</div>}  
    </div>
  )
}

export default Profile