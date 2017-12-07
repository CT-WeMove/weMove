import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { tripStyles } from '../Styles/Styles'
import CustomButton from './CustomButton'
import LogoSVG from './LogoSVG'

class OnTrip extends Component {
  constructor() {
    super()
    this.state = {
      svg: '',
      driver: {},
      vehicle: {}
    }
    this._cancelTrip = this._cancelTrip.bind(this)
    this._skip = this._skip.bind(this)
  }
  _cancelTrip() {
    this.props.navigation.navigate('Map')
  }
  _skip() {
    this.props.navigation.navigate('RateDriver', {
      driver: this.state.driver
    })
  }
  componentDidMount() {
    const { state } = this.props.navigation
    this.setState({
      svg: state.params.svg,
      driver: state.params.driver,
      vehicle: state.params.vehicle
    })
  }
  render() {
    return (
      <View style={tripStyles.container}>
        <Text style={tripStyles.sectionHeading}>ON TRIP</Text>

        <TouchableOpacity
          onPress={this._skip}
        >
          <LogoSVG />
        </TouchableOpacity>

        <CustomButton
          _onButtonPress={this._cancelTrip}
          text="CANCEL"
          inverse={true}
        />

      </View>
    )
  }
}

export default OnTrip
