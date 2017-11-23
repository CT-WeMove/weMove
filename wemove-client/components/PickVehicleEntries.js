import React from 'react'

import PickupBIG from './vehicles/PickupBIG'
import CargoBIG from './vehicles/CargoBIG'
import BoxTruckBIG from './vehicles/BoxTruckBIG'
import MovingTruckBIG from './vehicles/MovingTruckBIG'

export const ENTRIES = [
  {
    title: 'Pickup Truck',
    svg: (<PickupBIG />),
    price: '$24.00',
    rate: '$10 base + $2 / mile'
  },
  {
    title: 'Cargo Van',
    svg: (<CargoBIG />),
    price: '$26.00',
    rate: '$12 base + $2 / mile'
  },
  {
    title: 'Box Truck',
    svg: (<BoxTruckBIG />),
    price: '$44.00',
    rate: '$20 base + $2 / mile'
  },
  {
    title: 'Moving Truck',
    svg: (<MovingTruckBIG />),
    price: '$64.00',
    rate: '$40 base + $2 / mile'
  }
]
