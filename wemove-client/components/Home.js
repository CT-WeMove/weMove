import React, { Component } from 'react'
import Expo from 'expo'
import { Text, View, ImageBackground } from 'react-native'

import { mainStyle } from '../Styles/Styles'
import LogoSVG from './LogoSVG'
import CustomButton from './CustomButton'

class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      assetsLoaded: false
    }
  }
  loadAssets = () => {
    Expo.Font.loadAsync({
      'Bauhaus93': require('../assets/Bauhaus-93_6274.ttf')
    })
      .then(() => {
        this.setState({
          assetsLoaded: true
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
        <ImageBackground
          source={require('../assets/background.jpg')}
          style={mainStyle.container}
          onLoad={this.loadAssets}
        >
          {
            this.state.assetsLoaded ? (
              <View>
                <LogoSVG />
                <CustomButton
                  text="GET A MOVER"
                  _onButtonPress={this._onButtonPress}
                />
              </View>
            ) : (
                <Text>Loading...</Text>
              )
          }
        </ImageBackground>
      </View>
    )
  }
}

export default HomeScreen
