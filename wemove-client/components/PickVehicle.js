import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { mainStyle } from '../Styles/Styles'
import Carousel from './Carousel'

class PickVehicle extends Component {
  constructor() {
    super()
    this.state = {
      destination: 'Destination should go here.',
      distance: '3.1'
    }
    this.requestVehicle = this.requestVehicle.bind(this)
  }
  requestVehicle(vehicle) {
    //TK: backend logic to send choice to server
    this.props.navigation.navigate('DriverMatched', { vehicle })
  }
  componentWillMount() {
    const { state } = this.props.navigation
    this.setState({
      destination: state.params.destination
    })
  }
  render() {
    return (
      <View style={mainStyle.container}>
        <Text>Your destination:</Text>
        <Text>{this.state.destination}, which is {this.state.distance} miles away.</Text>
        <Carousel
          requestVehicle={this.requestVehicle}
          mileage={this.state.distance}
        />
      </View>
    )
  }
}

export default PickVehicle
