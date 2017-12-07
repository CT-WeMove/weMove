import React, { Component } from 'react'
import Expo from 'expo'
import { Text, View, ImageBackground } from 'react-native'

import { mainStyle, logoStyle } from '../Styles/Styles'
import LogoSVG from './LogoSVG'
import Wordmark from './Wordmark'
import CustomButton from './CustomButton'

class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      assetsLoaded: false
    }
  }
  loadAssets = () => {
    this.setState({
      assetsLoaded: true
    })
  }
  _onButtonPress = () => {
    this.props.navigation.navigate('Map')
  }
  render() {
    return (
      <View style={mainStyle.container}>
        <ImageBackground
          source={require('../assets/splash.png')}
          style={mainStyle.container}
          onLoad={this.loadAssets}
        >
          {
            this.state.assetsLoaded ? (
              <View style={logoStyle.container}>
                <LogoSVG />
                <Wordmark />
                <CustomButton
                  text="GET A MOVER"
                  _onButtonPress={this._onButtonPress}
                  inverse={false}
                />
              </View>
            ) : (
              <View style={logoStyle.container}>
                <LogoSVG />
                <Text>Loading...</Text>
              </View>
              )
          }
        </ImageBackground>
      </View>
    )
  }
}

export default HomeScreen
