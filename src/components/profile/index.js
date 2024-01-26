import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'

// const selectTodos = state => state.todos

const Profile = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'todos/todoAdded', payload: 'paso de to' })
  }, [])

  return (
    <div>
      Soy la pagina de profile
    </div>
  )
  return null
}

export default Profile