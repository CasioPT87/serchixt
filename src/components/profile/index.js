import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { userThunk } from '../../store/async/index.js'
import { userActions } from '../../store/actions/index.js'

const fakeFetch = () => {
  return new Promise(res => {
    setTimeout(() => {
      res('fake response')
  }, 10000)
  })
}

function Profile({ preloadData }) {
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
      Soy la pagina de profile {preloadData}
      <ul>{userList.map(user => <li key={user}>{user}</li>)}</ul>      
    </div>
  )
}

Profile.preloadFn = fakeFetch

export default Profile