import messaging from '@react-native-firebase/messaging'

export const GetDeviceToken = async() => {
    try {
        const token = await messaging().getToken();
        return token
    } catch (error) {   
        console.log('ERROR: ' + error)
        return 'Not token from emulator'
    }
}