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
const slideHeight = viewportHeight * 0.5
  , slideWidth = wp(75)
  , itemHorizontalMargin = wp(1);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8
  , slidePadding = 15
  , viewPadding = viewportHeight * 0.2;

export default StyleSheet.create({
  slideInnerContainer: {
    backgroundColor: colors.background1,
    width: itemWidth,
    height: '100%',
    paddingHorizontal: itemHorizontalMargin,
    paddingTop: slidePadding,
    paddingBottom: slidePadding, // needed for shadow,
    justifyContent: 'space-around',
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
  svgContainer: {
    paddingTop: slidePadding,
    paddingBottom: slidePadding
  },
  title: {
    color: colors.black,
    fontSize: 20,
    letterSpacing: 0.5,
  },
  destination: {
    color: colors.black,
    fontSize: 20,
    letterSpacing: 0.5,
    // paddingTop: viewPadding,
    // paddingBottom: 10
  },
  subtitle: {
    color: colors.gray,
    fontSize: 10,
    letterSpacing: 0.5,
    // paddingBottom: slidePadding
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    width: itemWidth * 0.75,
    // marginTop: slidePadding,
    // marginBottom: slidePadding
  },
  buttonContainer: {
    paddingTop: 50,
    paddingBottom: viewPadding
  }
})
