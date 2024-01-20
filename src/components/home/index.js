import React from 'react'
import goTo from '../../utils/goTo.js'


const Home = () => {
  return (<div>
    hola soy casita allalaal
    <button onClick={() => goTo('profile')}>dame aqui y vamos al profile</button>
  </div>)
}

export default Home