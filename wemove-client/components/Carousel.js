import React, { Component } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

import { ENTRIES } from './PickVehicleEntries'
import CarouselStyles, { sliderWidth, itemWidth } from '../Styles/CarouselStyles';

class VehicleCarousel extends Component {
  constructor() {
    super()
    this.state = {
      activeSlide: 1,
      sliderRef: null
    }
  }
  _renderItem({ item, index }) {
    return (
      <TouchableOpacity style={CarouselStyles.slideInnerContainer}>
        <Text style={CarouselStyles.title}>{item.title}</Text>
        {item.svg ? item.svg : null}
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
          onPress={() => { this._carousel.snapToItem(this._carousel.currentIndex) }}
        />
      </View>
    );
  }
}

export default VehicleCarousel
