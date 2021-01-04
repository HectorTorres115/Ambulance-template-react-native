import PushNotification from 'react-native-push-notification'

export const NotificationPanic = (title, message) => {
    PushNotification.localNotification({
        title,
        message,
        playSound: true,
        soundName: 'ambulance.mp3'
    })
}

export const Notification = (title, message) => {
    PushNotification.localNotification({
        title,
        message,
        playSound: true,
        soundName: 'default'
    })
}