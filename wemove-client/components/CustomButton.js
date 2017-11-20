import React, { Component } from 'react'

import { TouchableOpacity, View, Text } from 'react-native'

import { mainStyle } from '../Styles'

class CustomButton extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.props._onButtonPress}
      >
        <View style={mainStyle.accentButtonView}>
          <Text
            style={mainStyle.accentButtonText}>{this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default CustomButton
