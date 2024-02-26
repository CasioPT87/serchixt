import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { userThunk } from '../../store/async/index.js'
import { userActions } from '../../store/actions/index.js'
import { usePreloadData } from '../../hooks/index.js'
import goTo from '../../utils/goTo.js'

const fakeFetch = () => {
  return new Promise(res => {
    setTimeout(() => {
      res('fake response de profile')
  }, 5000)
  })
}

function Profile({ preloadData: preload }) {
  const preloadData = usePreloadData({ component: Profile, preloadDataProp: preload })

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
      Soy la pagina de profile
      <div>{preloadData}</div> 
      <button onClick={() => goTo('home')}>go to home</button>
      <button onClick={() => goTo('shipments')}>go to shipments</button>
      <ul>{userList.map(user => <li key={user}>{user}</li>)}</ul>      
    </div>
  )
}

Profile.preloadFn = fakeFetch

export default Profile