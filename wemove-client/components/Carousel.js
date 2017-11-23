import React, { Component } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { View, Text, ScrollView } from 'react-native'

import { ENTRIES } from './PickVehicleEntries'

class VehicleCarousel extends Component {
  constructor() {
    super()
    this.state = {
      entries: ENTRIES,
      activeSlide: 1,
      slider1Ref: null
    }
  }
  _renderItem({ item, index }) {
    return (
      <View>
        <Text>{item.title}</Text>
      </View>
    );
  }
  render() {
    return (
      <ScrollView>
        <Carousel
          ref={(c) => { if (!this.state.slider1Ref) { this.setState({ slider1Ref: c }) } }}
          data={this.state.entries}
          renderItem={this._renderItem}
          sliderWidth={90}
          itemWidth={80}
        />
        <Pagination
          dotsLength={this.state.entries.length}
          activeDotIndex={this.state.activeSlide}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          inactiveDotColor="#000000"
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this.state.slider1Ref}
          tappableDots={!!this.state.slider1Ref}
        />
      </ScrollView>
    );
  }
}

export default VehicleCarousel
