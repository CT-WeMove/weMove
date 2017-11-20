import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'

import HomeScreen from './components/Home'
import Destination from './components/Destination'

export default StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Destination: {
    screen: Destination
  }
})
