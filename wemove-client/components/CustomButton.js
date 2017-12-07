import React from 'react'

import { TouchableOpacity, View, Text } from 'react-native'

import { mainStyle } from '../Styles/Styles'

export default (props) => {
  return (
    <TouchableOpacity
      onPress={props._onButtonPress}
    >
      {
        props.inverse ? (
          <View style={mainStyle.inverseButtonView}>
            <Text
              style={mainStyle.inverseButtonText}>{props.text}
            </Text>
          </View>
        ) : (
            <View style={mainStyle.accentButtonView}>
              <Text
                style={mainStyle.accentButtonText}>{props.text}
              </Text>
            </View>
          )
      }
    </TouchableOpacity>
  )
}
