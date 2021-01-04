import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//Notifications
import {Notification, NotificationPanic} from './source/Functions/ShowNotification';
import messaging from '@react-native-firebase/messaging';
//SendLocation
import {SendLocation} from './source/Functions/SendLocation';
import Geolocation from '@react-native-community/geolocation';
import LocationStore from './source/Redux/Redux-location-store';
import {set_location} from './source/Redux/Redux-actions';

messaging().setBackgroundMessageHandler(async payload => {
    if(payload.data.order) {
        // console.log('Order received')
        const res = await SendLocation();
        console.log(res)
    }
    if(payload.data.title == 'Pedido de ambulancia'){
        NotificationPanic(payload.data.title, payload.data.message)
    } else if (payload.data.title == 'Alerta de incendio'){
        Notification(payload.data.title, payload.data.message)
    }
})

messaging().onMessage(async payload => {
    if(payload.data.order) {
        // console.log('Order received')
        const res = await SendLocation();
        console.log(res)
    }
    if(payload.data.title == 'Pedido de ambulancia'){
        NotificationPanic(payload.data.title, payload.data.message)
    } else if (payload.data.title == 'Alerta de incendio'){
        Notification(payload.data.title, payload.data.message)
    }
})

const MyHeadlessTask = async () => {
    Geolocation.watchPosition((info) => {
        LocationStore.dispatch(set_location({
        longitude: info.coords.longitude,
        latitude: info.coords.latitude
    }))
    }, (error) => console.log(error),
    {enableHighAccuracy: true, distanceFilter: 0, useSignificantChanges: false, maximumAge: 0})
};

AppRegistry.registerHeadlessTask('Location', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App);