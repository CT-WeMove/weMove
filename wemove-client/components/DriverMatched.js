import React, { Component } from 'react'
import { View, Text } from 'react-native'

class DriverMatched extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const { state } = this.props.navigation
    return (
      <View>
        <Text>{state.params.vehicle.title}</Text>
      </View>
    )
  }
}

export default DriverMatched
