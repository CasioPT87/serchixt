import React from 'react'
import { usePreloadData } from '../../hooks/index.js'
import goTo from '../../utils/goTo.js'

const fakeFetch = () => {
  return new Promise(res => {
    setTimeout(() => {
      res('fake response de julio sound studio')
    }, 5000)
  })
}

const Julio = ({ preloadData: preload }) => {
  const preloadData = usePreloadData({ component: Julio, preloadDataProp: preload })
  return (
    <div>
      Soy la pagina de profile de Julio sound 
      <div>{preloadData}</div>
      <button onClick={() => goTo('home')}>al home</button>
      <button onClick={() => goTo('profile')}>al profile</button>
    </div>
  )
}

Julio.preloadFn = fakeFetch

export default Julio