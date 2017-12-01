import React, { Component } from 'react'
import Carousel from 'react-native-snap-carousel'
import { View, Text, TouchableOpacity } from 'react-native'

import CustomButton from './CustomButton'

import { ENTRIES } from './PickVehicleEntries' //fake data

import PickupBIG from './vehicles/PickupBIG'
import CargoBIG from './vehicles/CargoBIG'
import BoxTruckBIG from './vehicles/BoxTruckBIG'
import MovingTruckBIG from './vehicles/MovingTruckBIG'

import CarouselStyles, { sliderWidth, itemWidth } from '../Styles/CarouselStyles';

class VehicleCarousel extends Component {
  constructor() {
    super()
    this.state = {
      activeSlide: 0,
      sliderRef: null,
      entries: ENTRIES
    }
  }
  componentWillMount() {
    const mileage = Number(this.props.mileage) //to send
      , entries = Object.keys(ENTRIES).map(title => Object.assign({ title }, ENTRIES[title]))
      , newEntries = entries.map(entry => {
        switch (entry) {
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
    console.log('newEntries', newEntries)
    this.setState({
      entries: newEntries
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

        <Text style={CarouselStyles.title}>${item.total}.00</Text>
        <Text style={CarouselStyles.subtitle}>${item.base} base + ${item.per_mile} / mile</Text>

      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View>
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
        <CustomButton
          _onButtonPress={() => this.props.requestVehicle(this.state.entries[this.state.activeSlide])}
          text={`REQUEST A ${this.state.entries[this.state.activeSlide].title.toUpperCase()}`}
        />
      </View>
    );
  }
}

export default VehicleCarousel
