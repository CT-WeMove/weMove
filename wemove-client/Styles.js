import { StyleSheet } from 'react-native';

export const mainStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  accentButtonView: {
    backgroundColor: '#50A7A0',
    display: 'flex',
    flexDirection: 'column',
    'alignItems': 'center',
    justifyContent: 'center',
    width: 200,
    borderRadius: 10,
    marginTop: 100
  },
  accentButtonText: {
    color: '#ffffff',
    padding: 10
  }
})

export const mapStyles = StyleSheet.create({
  destination: {
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: '#ffffff',
    padding: 5,
    width: '60%'
  }
})

export const logoStyle = StyleSheet.create({
  container: {
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wordmark: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontFamily: 'Bauhaus93',
    fontSize: Number(30)
  },
})