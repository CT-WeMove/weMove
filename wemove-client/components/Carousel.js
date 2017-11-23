import React, { Component } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { View, Text, ScrollView } from 'react-native'

import { ENTRIES } from './PickVehicleEntries'
import { sliderWidth, itemWidth } from '../Styles/CarouselStyles';

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
      <View>
        <Text>{item.title}</Text>
        {item.svg ? item.svg : null}
      </View>
    );
  }
  render() {
    return (
      <ScrollView>
        <Carousel
          ref={(c) => { if (!this.state.sliderRef) { this.setState({ sliderRef: c }) } }}
          data={ENTRIES}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES.length}
          activeDotIndex={this.state.activeSlide}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          inactiveDotColor="#000000"
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this.state.sliderRef}
          tappableDots={!!this.state.sliderRef}
        />
      </ScrollView>
    );
  }
}

export default VehicleCarousel
