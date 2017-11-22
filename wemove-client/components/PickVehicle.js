import React, { Component } from 'react'
import { Text, View } from 'react-native'

import PickupBIG from './vehicles/PickupBIG'

class PickVehicle extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const { state } = this.props.navigation
    return (
      <View>
        <Text>Your destination:</Text>
        <Text>{state.params.destination}</Text>
        <PickupBIG />
      </View>
    )
  }
}

export default PickVehicle
