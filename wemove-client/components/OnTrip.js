import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { mainStyle } from '../Styles/Styles'
import CarouselStyles from '../Styles/CarouselStyles'

import PickupBIG from './vehicles/PickupBIG'
import CargoBIG from './vehicles/CargoBIG'
import BoxTruckBIG from './vehicles/BoxTruckBIG'
import MovingTruckBIG from './vehicles/MovingTruckBIG'
import CustomButton from './CustomButton'
import LogoSVG from './LogoSVG'

class OnTrip extends Component {
  constructor() {
    super()
    this.state = {
      svg: null,
      driver: {},
      vehicle: {}
    }
    this._confirmDriver = this._confirmDriver.bind(this)
  }
  _confirmDriver() {
    this.props.navigation.navigate('OnTrip', {
      state: this.state
    })
  }
  componentDidMount() {
    const { state } = this.props.navigation
    this.setState(state)
  }
  render() {
    return (
      <View style={mainStyle.container}>
        <Text style={mainStyle.sectionHeading}>ON TRIP</Text>

        <LogoSVG />

        <View style={CarouselStyles.hr} />

        <View style={CarouselStyles.hr} />


        <View>
          <Text>{this.state.driverName}</Text>
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

export default OnTrip
