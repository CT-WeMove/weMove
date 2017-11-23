import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Carousel from './Carousel'

class PickVehicle extends Component {
  constructor() {
    super()
    this.state = {}
    this.requestVehicle = this.requestVehicle.bind(this)
  }
  requestVehicle(vehicle) {
    //TK: backend logic to send choice to server
    this.props.navigation.navigate('DriverMatched', { vehicle })
  }
  render() {
    const { state } = this.props.navigation
    return (
      <View>
        <Text>Your destination:</Text>
        <Text>{state.params.destination}</Text>
        <Carousel
          requestVehicle={this.requestVehicle}
        />
      </View>
    )
  }
}

export default PickVehicle
