import { StackNavigator } from 'react-navigation'

import HomeScreen from './components/Home'
import Map from './components/Map'
import PickVehicle from './components/PickVehicle'
import DriverMatched from './components/DriverMatched'
import OnTrip from './components/OnTrip'

export default StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Map: {
    screen: Map
  },
  PickVehicle: {
    screen: PickVehicle
  },
  DriverMatched: {
    screen: DriverMatched
  },
  OnTrip: {
    screen: OnTrip
  }
}, {
  headerMode: 'none'
})
