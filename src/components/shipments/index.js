import React from 'react'
import { usePreloadData } from '../../hooks'
import goTo from '../../utils/goTo.js'

const fakeShipmentsFetch = async () => {
  const data = await fetch('https://catfact.ninja/breeds')
  const body = await data.json()
  return body.data
  
}

const Shipments = ({ preloadData: preload }) => {
  const breeds = usePreloadData({ component: Shipments, preloadDataProp: preload })
  return (
    <div>
      Shipments page
      {!breeds && <li>spinner</li>}
      {breeds && (
        <ul>
          {breeds.map(breed => {
            return (
              <li key={breed.breed}>{`shipment desde ${breed.country} a ${breed.origin}`}</li>
            )
          })}
        </ul>
      )}

      <button onClick={() => goTo({ pageName: 'home' })}>al home</button>
      <button onClick={() => goTo({ pageName: 'profile' })}>al profile</button>
    </div>
  )
}

Shipments.preloadFn = fakeShipmentsFetch

export default Shipments