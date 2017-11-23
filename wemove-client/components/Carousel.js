import React, { Component } from 'react'
import Carousel from 'react-native-snap-carousel'
import { View, Text, TouchableOpacity } from 'react-native'

import CustomButton from './CustomButton'

import { ENTRIES } from './PickVehicleEntries'
import CarouselStyles, { sliderWidth, itemWidth } from '../Styles/CarouselStyles';

class VehicleCarousel extends Component {
  constructor() {
    super()
    this.state = {
      activeSlide: 0,
      sliderRef: null,
      selectedVehicle: 'None yet!'
    }
  }
  _renderItem({ item, index }) {
    return (
      <TouchableOpacity style={CarouselStyles.slideInnerContainer}>

        <Text style={CarouselStyles.title}>{item.title}</Text>
        <View style={CarouselStyles.svgContainer}>
          {item.svg ? item.svg : null}
        </View>

        <View style={CarouselStyles.hr} />

        <Text style={CarouselStyles.title}>{item.price}</Text>
        <Text style={CarouselStyles.subtitle}>{item.rate}</Text>

      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View>
        <Carousel
          ref={c => { this._carousel = c }}
          data={ENTRIES}
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
          _onButtonPress={() => this.props.requestVehicle(ENTRIES[this.state.activeSlide])}
          text={`REQUEST A ${ENTRIES[this.state.activeSlide].title.toUpperCase()}`}
        />
        <Text>
          {this.state.selectedVehicle}
        </Text>
      </View>
    );
  }
}

export default VehicleCarousel
