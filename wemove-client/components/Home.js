import React, { Component } from 'react'
import Expo from 'expo'
import { Text, View } from 'react-native'

import { mainStyle } from '../Styles/Styles'
import LogoSVG from './LogoSVG'
import CustomButton from './CustomButton'

class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      fontLoaded: false
    }
  }
  componentWillMount() {
    Expo.Font.loadAsync({
      'Bauhaus93': require('../assets/Bauhaus-93_6274.ttf')
    })
      .then(() => {
        this.setState({
          fontLoaded: true
        })
      })
      .catch(console.error)
  }
  _onButtonPress = () => {
    this.props.navigation.navigate('Map')
  }
  render() {
    return (
      <View style={mainStyle.container}>
        {
          this.state.fontLoaded ? <LogoSVG /> : null
        }
        <CustomButton
          text="GET A MOVER"
          _onButtonPress={this._onButtonPress}
        />
      </View>
    )
  }
}

export default HomeScreen
