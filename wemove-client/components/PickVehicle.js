import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Carousel from './Carousel'

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
        <Carousel />
      </View>
    )
  }
}

export default PickVehicle
