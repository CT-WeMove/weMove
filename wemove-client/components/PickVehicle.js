import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel'

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
      sliderRef: null
    }
  }
  requestVehicle = (vehicle) => {
    //TK: backend logic to send choice to server
    this.props.navigation.navigate('DriverMatched', { vehicle })
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
    return (
      <View>
        {
          Array.isArray(this.state.entries) ? (
            <View style={mainStyle.container}>
              { /* <Text style={mainStyle.sectionHeading}>YOUR DESTINATION</Text> */}
              <Text style={CarouselStyles.destination}>{this.state.destination} is {this.state.mileage} miles away.</Text>
              { /* <View style={CarouselStyles.hr} /> */}
              {/* <Text style={mainStyle.sectionHeading}>SELECT A VEHICLE</Text> */}
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
                  text={`REQUEST A ${this.state.entries[this.state.activeSlide].title.toUpperCase()}`}
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
