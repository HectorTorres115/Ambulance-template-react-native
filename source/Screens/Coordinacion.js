import React, {Component} from 'react'
import {Button, ActivityIndicator, View, Text} from 'react-native'
//Maps
import MapView, { Marker } from 'react-native-maps'
import darkStyle from '../Styles/mapstyle'
//GQL
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
//Back handler
import {backAction, handleAndroidBackButton} from '../Functions/BackHandler'
//Firebase messaging
import messaging from '@react-native-firebase/messaging'
//User context
import {UsuarioContext} from '../Context/UserContext'

const AskLocactions = gql`
mutation{
  AskLocation
}
`

export class Coordinacion extends Component {
    static contextType = UsuarioContext
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        }
        messaging().onMessage(async payload => {
            if(payload.data.longitude){
                console.log('Payload coordinacion: ' + JSON.stringify(payload.data))
                const newLocation = {
                    user: payload.data.user,
                    longitude: parseFloat(payload.data.longitude),
                    latitude: parseFloat(payload.data.latitude),
                }
                this.setState({locations: [...this.state.locations, newLocation]})
            } else {
                console.log(payload.data)
                console.log('Complete ignore')
            }
        })
    } 

    componentDidMount(){
        handleAndroidBackButton(() => this.props.navigation.navigate('Main'))
    }

    componentWillUnmount(){
        handleAndroidBackButton(() => backAction(this.context.setUser))
    }

    reduxHasCords(){
        if(LocationStore.getState().longitude == null){
        return (
            <>
            <MapView
            customMapStyle={darkStyle}
            style={{ flex: 1, width: '100%', height: '100%', zIndex: -1 }}
            initialRegion={{
                latitude: 18.735693,
                longitude: -70.162651,
                latitudeDelta: 0.9,
                longitudeDelta: 0.9
            }}>
            {this.state.locations.map(marker => (
                <Marker
                title={marker.user} pinColor={'#00ff00'}
                coordinate={{
                    "longitude": marker.longitude,
                    "latitude": marker.latitude
                }}/>
            ))}
            </MapView>
    
            <Mutation mutation = {AskLocactions}>
            {(asklocations, {loading, error}) => {
                if(loading) return <ActivityIndicator size = {'large'} color = 'blue'/>
                if(error) return <ActivityIndicator size = {'large'} color = 'red'/>
                return (
                <Button title = 'Ver otros usuarios' onPress = {async() => {
                    await asklocations()
                }}/>
                )   
            }}
            </Mutation>
            </>        
        )
        } else {
        return (
        <>
        <MapView
        customMapStyle={darkStyle}
        style={{ flex: 1, width: '100%', height: '100%', zIndex: -1 }}
        initialRegion={{
            latitude: LocationStore.getState().latitude,
            longitude: LocationStore.getState().longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        }}>
        {this.state.locations.map(marker => (
            <Marker
            title={marker.user} pinColor={'#00ff00'}
            coordinate={{
                "longitude": marker.longitude,
                "latitude": marker.latitude
            }}/>
        ))}
        </MapView>

        <Mutation mutation = {AskLocactions}>
        {(asklocations, {loading, error}) => {
            if(loading) return <ActivityIndicator size = {'large'} color = 'blue'/>
            if(error) return <ActivityIndicator size = {'large'} color = 'red'/>
            return (
            <Button title = 'Ver otros usuarios' onPress = {async() => {
                await asklocations()
            }}/>
            )   
        }}
        </Mutation>
        </>
        )
        }
    }

    render() {
        return(
            this.reduxHasCords()
        )
    }
}