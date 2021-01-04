import React, {useEffect, useState} from 'react'
import { 
Text, 
View, 
FlatList,
StyleSheet, 
ImageBackground, 
TouchableOpacity,
} from 'react-native'
//BackHandler
import { 
backAction,
handleAndroidBackButton, 
} from '../Functions/BackHandler'
import { useUsuario } from '../Context/UserContext'
//Apollo
import gql from 'graphql-tag'
import {useQuery} from 'react-apollo'

const ADMIN_CHATS = gql`
query ADMIN_CHATS($type: String!){
    GetTypeChats(type: $type){
      id, type, client, hour
    }
  }
`

export const ChatAmbulance = ({navigation}) => {
    //State
    const {usuario, setUser} = useUsuario();
    const [chats, setChats] = useState(null);
    //Queries
    useQuery(ADMIN_CHATS, {
        fetchPolicy: "no-cache",
        variables: {type: "Ambulance", User: usuario.username},
        onCompleted: (data) => {
            setChats(data.GetTypeChats);
        },
        onError: (err) => {
            console.log(err);
        }
    })
    //LifeCylce Methods
    useEffect(() => {
        console.log('Did mount screen: ChatAmbulance');
        handleAndroidBackButton(() => navigation.navigate('Main'))
        return (() => {
        handleAndroidBackButton(() => backAction(setUser))
        })
    }, [])
    //Components
    function ListChats(){
    return(
    <FlatList
    data = {chats}
    keyExtractor = {(item) => item.id}
    renderItem = {({item}) => (
        <TouchableOpacity 
            onPress = {() => navigation.navigate('AmbulanceAdmin', {item})}
            style = {styles.chatDisplay}>
            <Text style = {styles.chatText}>Cliente: {item.client}</Text>
            <Text style = {styles.chatText}>Hora: {item.hour}</Text>
        </TouchableOpacity>
    )}
    />
    )
    }
    //Conditionals
    const chatsExists = () => {
        if(chats == null || chats.length <= 0){
            return (
            <View style = {styles.chatExists}>
            <Text style = {styles.disclaimer}>No hay chats activos.</Text>
            </View>
            )
        } else {
            console.log(chats)
            return(
                <ListChats/>
            )
        }
    }

    return(
    <ImageBackground
    blurRadius = {2}
    style = {{width: '100%', height: '100%'}}
    source = {require('../Images/background.png')}>
    <View style = {styles.main}>
        <View style = {styles.header}>
            <Text style = {styles.headerText}>Pedidos de ambulancia</Text>
        </View>
        {chatsExists()}
    </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%'
    },
    chatExists: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.5)'
    },
    disclaimer: {
        fontSize: 20,
        color: 'white'
    },
    chatDisplay: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderTopColor: 'white',
        borderWidth: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    chatText: {
        margin: 10,
        fontSize: 20, 
        color: 'black'
    },
    header: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'steelblue',
        borderBottomWidth: 2,
        borderColor: 'white'
    },
    headerText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})