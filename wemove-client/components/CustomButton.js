import React from 'react'

import { TouchableOpacity, View, Text } from 'react-native'

import { mainStyle } from '../Styles/Styles'

export default (props) => {
  return (
    <TouchableOpacity
      onPress={props._onButtonPress}
    >
      <View style={mainStyle.accentButtonView}>
        <Text
          style={mainStyle.accentButtonText}>{props.text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
