import React, { Component } from 'react'

import MapView, { Marker } from 'react-native-maps'
import LocationStore from '../Redux/Redux-location-store'
import darkStyle from '../Styles/mapstyle'

export class ShowLocation extends Component {
    constructor(props){
        super(props);
        this.state = {markers: []}
    }

    componentDidMount(){
        console.log(LocationStore.getState())
    }

    render() {
        return (
            <MapView
            customMapStyle={darkStyle}
            style={{ flex: 1, width: '100%', height: '100%', zIndex: -1 }}
            initialRegion={{
                latitude: LocationStore.getState().latitude,
                longitude: LocationStore.getState().longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008
            }}>
            <Marker 
            title = 'Envio realizado desde aqui'
            coordinate = {LocationStore.getState()}/>
            </MapView>
        )
    }
}