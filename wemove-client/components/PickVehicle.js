import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import axios from 'axios'

import { mainStyle } from '../Styles/Styles'
import CarouselStyles, { sliderWidth, itemWidth } from '../Styles/CarouselStyles';

import PickupBIG from './vehicles/PickupBIG'
import CargoBIG from './vehicles/CargoBIG'
import BoxTruckBIG from './vehicles/BoxTruckBIG'
import MovingTruckBIG from './vehicles/MovingTruckBIG'
import CustomButton from './CustomButton'

class PickVehicle extends Component {
  constructor() {
    super()
    this.state = {
      destination: 'Destination should go here.',
      entries: {},
      mileage: 0,
      activeSlide: 0,
      sliderRef: null,
      buttonText: 'REQUEST'
    }
  }
  requestVehicle = (vehicle) => {
    this.setState({
      buttonText: 'REQUESTING...'
    })
    axios.get(`https://wemove-184522.appspot.com/api/drivers/${vehicle.id}`, {})
      .then(res => {
        this.props.navigation.navigate('DriverMatched', {
          time: res.data.time,
          driver: res.data.driver,
          vehicle
        })
      })
  }
  _renderItem({ item, index }) {
    return (
      <TouchableOpacity style={CarouselStyles.slideInnerContainer}>

        <Text style={CarouselStyles.title}>{item.title}</Text>
        <View style={CarouselStyles.svgContainer}>
          {item.svg ? item.svg : null}
        </View>

        <View style={CarouselStyles.hr} />

        <Text style={CarouselStyles.title}>${item.total}</Text>
        <Text style={CarouselStyles.subtitle}>${item.base} base + ${item.per_mile} / mile</Text>

      </TouchableOpacity>
    );
  }
  componentDidMount() {
    const { state } = this.props.navigation;
    const entries = Object.keys(state.params.entries).map(title => Object.assign({ title }, state.params.entries[title]))
      , newEntries = entries.map(entry => {
        switch (entry.title) {
          case 'Pickup Truck':
            entry.svg = (<PickupBIG />)
            break
          case 'Cargo Van':
            entry.svg = (<CargoBIG />)
            break
          case 'Box Truck':
            entry.svg = (<BoxTruckBIG />)
            break
          case 'Moving Truck':
            entry.svg = (<MovingTruckBIG />)
            break
          default:
            return entry
        }
        return entry
      })
    this.setState({
      destination: state.params.destination,
      entries: newEntries,
      mileage: state.params.mileage
    })
  }
  render() {
    const buttonText = this.state.buttonText === 'REQUESTING...' ? this.state.buttonText : this.state.entries.length ? `REQUEST A ${this.state.entries[this.state.activeSlide].title.toUpperCase()}` : ''
    return (
      <View>
        {
          Array.isArray(this.state.entries) ? (
            <View style={mainStyle.container}>

              <Text style={mainStyle.sectionHeading}>{this.state.destination} is {this.state.mileage} miles away.</Text>

              <Carousel
                ref={c => { this._carousel = c }}
                data={this.state.entries}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                inactiveSlideScale={0.8}
                inactiveSlideOpacity={0.7}
                onPress={() => {
                  this._carousel.snapToItem(this._carousel.currentIndex)
                }}
                onSnapToItem={() => {
                  this.setState({
                    activeSlide: this._carousel.currentIndex
                  })
                }}
              />
              <View style={CarouselStyles.buttonContainer}>
                <CustomButton
                  _onButtonPress={() => this.requestVehicle(this.state.entries[this.state.activeSlide])}
                  text={buttonText}
                  inverse={false}
                />
              </View>
            </View>
          ) : null
        }
      </View>
    )
  }
}

export default PickVehicle
