import React from 'react'
import { usePreloadData } from '../../hooks'
import goTo from '../../utils/goTo.js'

const fakeShipmentsFetch = () => {
  const shipments = [
    { id: 1, origin: 'Madrid', recipient: 'Barcelona' },
    { id: 2, origin: 'Lugo', recipient: 'Sevilla' },
    { id: 3, origin: 'Londres', recipient: 'Tumbuctu' }
  ]
  return new Promise(res => {
    setTimeout(() => {
      res(shipments)
    }, 5000)
  })
}

const Shipments = ({ preloadData: preload }) => {
  const shipments = usePreloadData({ component: Shipments, preloadDataProp: preload })
  console.log(shipments)
  return (
    <div>
      Shipments page
      {!shipments && <li>spinner</li>}
      {shipments && (
        <ul>
          {shipments && shipments.map(shipment => {
            return (
              <li key={shipment.id}>{`shipment desde ${shipment.origin} a ${shipment.recipient}`}</li>
            )
          })}
        </ul>
      )}

      <button onClick={() => goTo('home')}>al home</button>
      <button onClick={() => goTo('profile')}>al profile</button>
    </div>
  )
}

Shipments.preloadFn = fakeShipmentsFetch

export default Shipments