import React, { useEffect } from 'react'
import { 
View, 
Alert,
Image,
Linking,
StyleSheet, 
ImageBackground, 
TouchableOpacity 
} from 'react-native'
//BackHandler
import { 
backAction,
handleAndroidBackButton, 
} from '../Functions/BackHandler'
import { useUsuario } from '../Context/UserContext'
//Location service
import Location from '../Functions/LocationService'

export const Main = ({navigation}) => {
  const {usuario, setUser} = useUsuario();
  useEffect(() => {
      //Init location service
      console.log('Did mount screen: Main');
      Location.startService();
      //Handle back action
      handleAndroidBackButton(() => backAction(setUser))
  }, [])

  const isAdminImg = () => {
    if(usuario.type == 'admin'){
      return(
        <TouchableOpacity 
        onPress = {() => {
          Alert.alert('', '', [
            {text: "Cancelar"},
            {text: 'Mapa', onPress: () => navigation.navigate('Coordinacion')},
            {text: "Usuarios", onPress: () => navigation.navigate('Users')},
          ])
        }}
        style = {styles.logoContainer}>
        <Image style = {{height: '95%', width: '95%'}} source = {require('../Images/logo.png')}/>
        </TouchableOpacity>
      )
    } else {
      return(
      <View 
        style = {styles.logoContainer}>
        <Image style = {{height: '95%', width: '95%'}} source = {require('../Images/logo.png')}/>
      </View>
      )
    }
  } 

  const isAdminBtn = () => {
    if(usuario.type !== 'admin'){
      return(
        <View style = {styles.buttonsContainer}>
        <TouchableOpacity style = {styles.fire}
          onPress = {() => navigation.navigate('Fire')}>
        <Image style = {{height: 200, width: 200}} source = {require('../Images/fire.png')}/>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.ambulance}
        onPress = {() => navigation.navigate('Ambulance')}>
        <Image style = {{height: 200, width: 200}} source = {require('../Images/ambulance.png')}/>
        </TouchableOpacity>
        </View>
      )
    } else {
      return(
        <View style = {styles.buttonsContainer}>
        <TouchableOpacity style = {styles.fire}
          onPress = {() => navigation.navigate('ChatFire')}>
        <Image style = {{height: 200, width: 200}} source = {require('../Images/fire.png')}/>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.ambulance}
        onPress = {() => navigation.navigate('ChatAmbulance')}>
        <Image style = {{height: 200, width: 200}} source = {require('../Images/ambulance.png')}/>
        </TouchableOpacity>
        </View>
      )
    }
  }

  return (
    <ImageBackground
        blurRadius = {2}
        style = {{width: '100%', height: '100%'}}
        source = {require('../Images/background.png')}>
        <View style = {styles.main}>
          
            {isAdminImg()}

            {isAdminBtn()}

            <View style = {styles.emergencyContainer}>
                <TouchableOpacity style = {styles.emergency}
                onPress = {() => Linking.openURL(`tel:911`)}>
                <Image style = {{height: 100, width: 150}} source = {require('../Images/911.jpg')}/>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  main: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
  },
  text: {
      fontSize: 20,
      color: 'white'
  },
  logoContainer: {
    flex: 1/3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'red',
    margin: 10
  },
  buttonsContainer: {
    flex: 1/3,
    flexDirection: 'row',
    width: '100%',
    // borderWidth: 2,
    // borderColor: 'red',
    margin: 10
  },
  emergencyContainer: {
    flex: 1/6,
    width: '95%',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 10,
    margin: 10
  },
  fire: {
    flex: 1/2,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'orange',
  },
  emergency: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(191, 15, 53, 1)',
    // borderRadius: 10,
  },
  ambulance: {
    flex: 1/2,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'steelblue',
  }
})