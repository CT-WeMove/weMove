import React from 'react'
import PickupBIG from './vehicles/PickupBIG'
import CargoBIG from './vehicles/CargoBIG'
import BoxTruckBIG from './vehicles/BoxTruckBIG'
import MovingTruckBIG from './vehicles/MovingTruckBIG'

export const ENTRIES = [
  {
    title: 'Pickup Truck',
    svg: (<PickupBIG />)
  },
  {
    title: 'Cargo Van',
    svg: (<CargoBIG />)
  },
  {
    title: 'Box Truck',
    svg: (<BoxTruckBIG />)
  },
  {
    title: 'Moving Truck',
    svg: (<MovingTruckBIG />)
  }
]
