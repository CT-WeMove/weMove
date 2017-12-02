import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { mainStyle } from '../Styles/Styles'

class DriverMatched extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const { state } = this.props.navigation
    return (
      <View style={mainStyle.container}>
        <Text>{state.params.vehicle.title} Requested! More TK</Text>
      </View>
    )
  }
}

export default DriverMatched
