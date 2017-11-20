import React, { Component } from 'react'
import Expo from 'expo'
import { StackNavigator } from 'react-navigation'
import { Text, View } from 'react-native'

import { mainStyle } from './Styles'
import LogoSVG from './components/LogoSVG'
import CustomButton from './components/CustomButton'

class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      fontLoaded: false
    }
  }
  componentDidMount() {
    Expo.Font.loadAsync({
      'Bauhaus93': require('./assets/Bauhaus-93_6274.ttf')
    })
      .then(() => {
        this.setState({
          fontLoaded: true
        })
      })
      .catch(console.error)
  }
  _onButtonPress = () => {
    this.props.navigation.navigate('Home')
  }
  render() {
    return (
      <View style={mainStyle.container}>
        {
          this.state.fontLoaded ? <LogoSVG /> : null
        }
        <CustomButton
          text="Get a mover"
          _onButtonPress={this._onButtonPress}
        />
      </View>
    )
  }
}

export default StackNavigator({
  Home: {
    screen: HomeScreen
  }
})
