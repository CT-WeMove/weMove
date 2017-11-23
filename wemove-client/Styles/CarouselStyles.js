import { StyleSheet, Dimensions, Platform } from 'react-native'

const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#ffffff',
  background2: '#21D4FD'
};

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideHeight = viewportHeight * 0.4
  , slideWidth = wp(75)
  , itemHorizontalMargin = wp(1);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    backgroundColor: colors.background1,
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow,
    alignItems: 'center'
  },
  // imageContainer: {
  //   flex: 1,
  //   backgroundColor: 'white',
  //   borderTopLeftRadius: entryBorderRadius,
  //   borderTopRightRadius: entryBorderRadius
  // },
  // imageContainerEven: {
  //   backgroundColor: colors.black
  // },
  // image: {
  //   ...StyleSheet.absoluteFillObject,
  //   resizeMode: 'cover',
  //   borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
  //   borderTopLeftRadius: entryBorderRadius,
  //   borderTopRightRadius: entryBorderRadius
  // },
  // image's border radius is buggy on ios; let's hack it!
  // radiusMask: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   height: entryBorderRadius,
  //   backgroundColor: 'white'
  // },
  // radiusMaskEven: {
  //   backgroundColor: colors.black
  // },
  // textContainer: {
  //   justifyContent: 'center',
  //   paddingTop: 20 - entryBorderRadius,
  //   paddingBottom: 20,
  //   paddingHorizontal: 16,
  //   backgroundColor: 'white',
  //   borderBottomLeftRadius: entryBorderRadius,
  //   borderBottomRightRadius: entryBorderRadius
  // },
  // textContainerEven: {
  //   backgroundColor: colors.black
  // },
  title: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    paddingBottom: 10
  }
})
