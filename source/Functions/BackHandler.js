import {BackHandler, Alert} from 'react-native'
import Location from '../Functions/LocationService'
import {DeleteUser} from '../Functions/UserStorage'

export const handleAndroidBackButton = (callback) => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      callback();
      return true;
    });
};

export const backAction = (set_user) => {
  Alert.alert('¿Desea cerrar sesión?', '', [
    {text: 'Aceptar', onPress: async() => {
        set_user(null)
        await DeleteUser()
        Location.stopService()
    }},
    {text: 'Cancelar'}
  ])  
}

export const removeAndroidBackButtonHandler = () => {
    BackHandler.removeEventListener('hardwareBackPress', () => {});
}