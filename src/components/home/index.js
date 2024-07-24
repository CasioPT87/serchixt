import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import goTo from '../../utils/goTo.js'


const Home = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  
  return (<div>
    Home Page
    <button onClick={() => goTo({ pathName: 'profile' })}>dame aqui y vamos al profile</button>
  </div>)
}

export default Home