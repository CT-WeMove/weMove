import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const mainStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: viewportHeight * 0.92, //REMEMBER TO FIX IF TESTING NOT ON EXPO
  },
  backgroundImageContainer: {
    opacity: 0.7,
  },
  accentButtonView: {
    position: 'relative',
    backgroundColor: '#50A7A0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: viewportWidth * 0.75,
    borderRadius: 10,
  },
  accentButtonText: {
    color: '#ffffff',
    padding: 10,
    fontSize: 18
  },
  sectionHeading: {
    color: 'darkslategray',
    padding: 18
  }
})

export const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  destination: {
    borderColor: 'darkslategray',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    width: '70%',
    position: 'absolute',
    top: '30%'
  }
})

export const logoStyle = StyleSheet.create({
  container: {
    height: viewportHeight * 0.3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50
  },
  wordmark: {
    color: 'white',
    fontFamily: 'Bauhaus93',
    fontSize: Number(30),
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255, 0)'
  },
})
