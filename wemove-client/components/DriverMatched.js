import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { mainStyle } from '../Styles/Styles'
import CarouselStyles from '../Styles/CarouselStyles'

import PickupBIG from './vehicles/PickupBIG'
import CargoBIG from './vehicles/CargoBIG'
import BoxTruckBIG from './vehicles/BoxTruckBIG'
import MovingTruckBIG from './vehicles/MovingTruckBIG'
import CustomButton from './CustomButton'

class DriverMatched extends Component {
  constructor() {
    super()
    this.state = {
      svg: null,
      driver: {},
      vehicle: {}
    }
    this._getSVG = this._getSVG.bind(this)
    this._confirmDriver = this._confirmDriver.bind(this)
  }
  _confirmDriver() {
    this.props.navigation.navigate('OnTrip', {
      state: this.state
    })
  }
  _getSVG(vehicleName) {
    switch (vehicleName) {
      case 'Pickup Truck':
        return (<PickupBIG />)
      case 'Cargo Van':
        return (<CargoBIG />)
      case 'Box Truck':
        return (<BoxTruckBIG />)
      case 'Moving Truck':
        return (<MovingTruckBIG />)
      default:
        return null
    }
  }
  componentDidMount() {
    const { state } = this.props.navigation
      , vehicle = state.params.vehicle
      , svg = this._getSVG(vehicle.title);
    this.setState({
      vehicle,
      svg,
      driver: {
        name: state.params.driver.name[0].toUpperCase() + state.params.driver.name.slice(1),
        rating: state.params.driver.rating
      }
    })
  }
  render() {
    return (
      <View style={mainStyle.container}>
        <Text style={mainStyle.sectionHeading}>DRIVER MATCHED</Text>

        <View>
          <Text>{this.state.driver.name}</Text>
          <Text>{this.state.driver.rating} out of 5 stars</Text>
        </View>
        <View>
          {this.state.svg}
          <Text>{this.state.vehicle.title}</Text>
        </View>
        <View>
          <Text style={CarouselStyles.title}>${this.state.vehicle.total}</Text>
          <Text style={CarouselStyles.subtitle}>${this.state.vehicle.base} base + ${this.state.vehicle.per_mile} / mile</Text>
        </View>

        <CustomButton
          _onButtonPress={this._confirmDriver}
          text='CONFIRM YOUR TRIP'
        />

      </View>
    )
  }
}

export default DriverMatched
