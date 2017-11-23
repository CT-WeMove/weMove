import React, { Component } from 'react'
import Carousel from 'react-native-snap-carousel'
import { View, Text } from 'react-native'

export class VehicleCarousel extends Component {
  constructor() {
    super()
    this.state = {
      entries: [
        {
          title: 'Carousel 1'
        }
      ]
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
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={this.state.entries}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    );
  }
}
