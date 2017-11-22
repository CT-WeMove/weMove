import { StackNavigator } from 'react-navigation'

import HomeScreen from './components/Home'
import Map from './components/Map'
import PickVehicle from './components/PickVehicle'

export default StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Map: {
    screen: Map
  },
  PickVehicle: {
    screen: PickVehicle
  }
})
