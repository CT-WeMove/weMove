import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import StarRating from 'react-native-star-rating'

import { tripStyles } from '../Styles/Styles'

import CustomButton from './CustomButton'
import LogoSVG from './LogoSVG'

class RateDriver extends Component {
  constructor() {
    super()
    this.state = {
      driver: {},
      userRating: 5
    }
    this._submitRating = this._submitRating.bind(this)
  }
  _submitRating() {
    this.props.navigation.navigate('Home')
  }
  _changeRating(rating) {
    this.setState({
      userRating: rating
    })
  }
  componentDidMount() {
    const { state } = this.props.navigation
    this.setState({
      driver: state.params.driver,
    })
  }
  render() {
    return (
      <View style={tripStyles.container}>
        <Text style={tripStyles.sectionHeading}>RATE YOUR DRIVER</Text>

        {
          this.state.driver.name ? (
            <View style={tripStyles.centeredContainer}>
              <Text style={tripStyles.titleTop}>{this.state.driver.name}</Text>
            </View>
          ) : null
        }

        <StarRating
          disabled={false}
          maxStars={5}
          rating={this.state.userRating}
          selectedStar={(rating) => this._changeRating(rating)}
        />

        <CustomButton
          _onButtonPress={this._submitRating}
          text="SUBMIT RATING"
          inverse={false}
        />

      </View>
    )
  }
}

export default RateDriver
