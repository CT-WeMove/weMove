import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { mainStyle, tripStyles } from '../Styles/Styles'
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
    this._cancel = this._cancel.bind(this)
  }
  _confirmDriver() {
    this.props.navigation.navigate('OnTrip', {
      svg: this.state.svg,
      driver: this.state.driver,
      vehicle: this.state.vehicle
    })
  }
  _cancel() {
    this.props.navigation.navigate('Map')
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
      },
      time: state.params.time
    })
  }
  render() {
    return (
      <View style={tripStyles.container}>
        <Text style={tripStyles.sectionHeading}>DRIVER MATCHED!</Text>

        <View style={tripStyles.centeredContainer}>
          <Text style={tripStyles.titleTop}>{this.state.driver.name}</Text>
          <Text>{this.state.driver.rating} out of 5 stars</Text>
          <Text>{this.state.time} away</Text>
        </View>

        <View style={tripStyles.hr} />

        <View style={tripStyles.centeredContainer}>
          {this.state.svg}
          <Text style={tripStyles.titleBottom}>{this.state.vehicle.title}</Text>
        </View>

        <View style={tripStyles.hr} />

        <View style={tripStyles.centeredContainer}>
          <Text style={tripStyles.titleTop}>${this.state.vehicle.total}</Text>
          <Text style={CarouselStyles.subtitle}>${this.state.vehicle.base} base + ${this.state.vehicle.per_mile} / mile</Text>
        </View>

        <View style={tripStyles.centeredContainer}>
          <CustomButton
            _onButtonPress={this._confirmDriver}
            text="CONFIRM & START TRIP"
            inverse={false}
          />
          <CustomButton
            _onButtonPress={this._cancel}
            text="CANCEL"
            inverse={true}
          />
        </View>


      </View>
    )
  }
}

export default DriverMatched
