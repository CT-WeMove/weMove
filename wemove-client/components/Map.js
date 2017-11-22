import React, { Component } from 'react'
import { TextInput, Text } from 'react-native'
import { MapView, Constants, Location, Permissions } from 'expo';
import Geocoder from 'react-native-geocoding'

import { Geocoding_API_Key } from '../secrets'
import { mapStyles } from '../Styles'

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

Geocoder.setApiKey(Geocoding_API_Key)

export default class Map extends Component {
  constructor() {
    super()
    this.state = {
      location: {
        coords: {
          latitude: 0,
          longitude: 0
        }
      },
      destination: 'Where to?'
    }
  }
  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this._locationChanged)
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  _locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    },
      this.setState({ location, region })
  }
  _submitDestination = () => {
    //TK: method to submit destination to backend
    this.props.navigation.navigate('PickVehicle', { destination: this.state.destination })
    /*
    Geocoder.getFromLocation(destination)
      .then(json => {
        var returnedLocation = json.results[0].geometry.location;
        this.setState({
          location: {
            coords: {
              latitude: returnedLocation.lat,
              longitude: returnedLocation.lng
            }
          }
        })
      })
      .catch(console.error)
      */
  }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        region={this.state.region}
      >
        <TextInput
          style={mapStyles.destination}
          value={this.state.destination}
          onChangeText={(destination) => this.setState({ destination })}
          onSubmitEditing={this._submitDestination}
        />
      </MapView>
    )
  }
}
