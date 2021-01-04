import React, {useEffect, useState} from 'react'
import { 
Text, 
View, 
Image,
FlatList,
TextInput,
StyleSheet, 
ImageBackground, 
TouchableOpacity,
ActivityIndicator
} from 'react-native'
//BackHandler
import { 
backAction,
handleAndroidBackButton, 
} from '../Functions/BackHandler'
import { useUsuario } from '../Context/UserContext'
//Location store
import LocationStore from '../Redux/Redux-location-store';
import {set_location} from '../Redux/Redux-actions'
//Apollo
import gql from 'graphql-tag'
import {useLazyQuery, useMutation} from 'react-apollo'
import {AlertListener} from '../Components/Listeners'

const CLIENT_CHATS = gql`
query CLIENT_CHATS($client: String! $type: String!){
    GetClientChat(input: {
      client: $client,
      type: $type
    }) {
      id, type, client, hour
    }
  }
`

const CREATE_CHAT = gql`
mutation CREATE_CHAT($client: String!, $type: String!) {
    CreateChat(input: { client: $client, type: $type }) {
      id
      type
      client
      hour
    }
  }
`

const GET_CHAT_MESSAGES = gql`
query GET_CHAT_MESSAGES($fid: Int!) {
    GetChatAlerts(fid: $fid) {
      id
      fid
      sender
      client
      message
      longitude
      latitude
      date
      hour
    }
  }
  
`

const CREATE_ALERT = gql`
mutation CREATE_ALERT(
    $fid: Int!
    $sender: String!
    $client: String!
    $message: String!
    $longitude: Float!
    $latitude: Float
  ) {
    CreateAlert(
      input: {
        fid: $fid
        sender: $sender
        client: $client
        message: $message
        longitude: $longitude
        latitude: $latitude
      }
    ) {
      id
      fid
      sender
      client
      message
      longitude
      latitude
      date
      hour
    }
  }
`

export const Fire = ({navigation}) => {
    //State
    const {usuario, setUser} = useUsuario();
    const [chat, setChat] = useState(null);
    const [list, setList] = useState([]);
    const [message, setMessage] = useState('');
    //Queries
    const [CreateChat] = useMutation(CREATE_CHAT, {
        onCompleted: (data) => {
            console.log(data)
            setChat(data.CreateChat);
            GetChatMessages({variables: {fid: data.CreateChat.id}})
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [CreateAlert] = useMutation(CREATE_ALERT, {
        onCompleted: (data) => {
            setMessage('')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [GetChatMessages] = useLazyQuery(GET_CHAT_MESSAGES, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            console.log(data)
            setList(data.GetChatAlerts)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [ClientChats] = useLazyQuery(CLIENT_CHATS, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            console.log(data);
            if(data.GetClientChat !== null){
                setChat(data.GetClientChat);
                GetChatMessages({variables: {fid: data.GetClientChat.id}})
            }
            if(data.GetClientChat == null){
                CreateChat({variables: {client: usuario.username, type: "Fire"}})
            }
        },
        onError: (error) => {
            console.log(error);
        }
    })

    useEffect(() => {
        console.log('Did mount screen: Fire');
        ClientChats({variables: {type: "Fire", client: usuario.username}})
        handleAndroidBackButton(() => navigation.navigate('Main'))
        return (() => {
        handleAndroidBackButton(() => backAction(setUser))
        })
    }, [])

    const IsSubscriptionActive = () => {
        if(chat !== null){
            return(
            <AlertListener
            fid = {chat.id}
            alerts = {list} 
            setter = {setList}/>
            )
        } else {
            return <ActivityIndicator size = 'large' color = 'blue'/>
        }
    }

    const DisplayMessages = () => {
        return(
        <View style = {styles.main}>

        {IsSubscriptionActive()}

        <FlatList
        data = {list}
        keyExtractor = {(item) => item.hour}
        renderItem = {({item}) => (
            <View style = {{
                flex: 1,
                height: 120,
                margin: 10,
                borderRadius: 10,
                backgroundColor: 'rgba(246, 36, 57, 1)'
            }}>
                <View style = {{
                    // flex: 1,
                    margin: 5,
                    marginBottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style = {styles.text}>Usuario: {item.sender}</Text>
                    <Text style = {styles.text}>Hora: {item.hour}</Text>
                </View>

                <View style = {{
                    flex: 1,
                    width:'95%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    aligItems: 'center',
                    marginTop: 0,
                    margin: 5,
                }}>
                <TextInput multiline = {true} value = {item.message} style = {{
                    flex: 1,
                    // height: '100%',
                    margin: 5,
                    color: 'black',
                    fontSize: 20,
                    borderRadius: 10,
                    backgroundColor: 'white',
                }}/>

                <TouchableOpacity 
                onPress = {() => {
                    LocationStore.dispatch(set_location({
                        longitude: item.longitude,
                        latitude: item.latitude
                    }))
                    navigation.navigate('ShowLocation');
                }}

                style = {{
                    flex: 1/4,
                    alignItems:'center',
                    justifyContent: 'center',
                    backgroundColor: 'darkblue',
                    margin: 5,
                    borderRadius: 10
                }}>
                    <Image style = {{height:50, width: 50}} source = {require('../Images/maps.png')}/>
                </TouchableOpacity>
                </View>

            </View>
        )}
        />
        </View>
        )
    }

    return (
        <ImageBackground
        blurRadius = {2}
        style = {{width: '100%', height: '100%'}}
        source = {require('../Images/background.png')}>
        <View style = {styles.main}>
            {DisplayMessages()} 
            <View style = {styles.inputContainer}>
                <TextInput
                value = {message}
                onChangeText = {(message) => setMessage(message)}
                style = {styles.inputStyle}
                placeholder = 'Mensaje'
                maxLength = {500}
                multiline = {true}
                />
                <TouchableOpacity style = {styles.sendBtn} 
                onPress = {async() => {
                    if(message == ''){
                        await CreateAlert({variables: {
                            fid: chat.id,
                            sender: usuario.username,
                            client: usuario.username,
                            message: "Fire",
                            latitude: LocationStore.getState().latitude,
                            longitude: LocationStore.getState().longitude
                        }})
                    }
                    if(message !== ''){
                        await CreateAlert({variables: {
                            fid: chat.id,
                            sender: usuario.username,
                            client: usuario.username,
                            message,
                            latitude: LocationStore.getState().latitude,
                            longitude: LocationStore.getState().longitude
                        }})
                    }
                }}>
                    <Image style = {{height: 50, width: 50}} source = {require('../Images/send.png')}/>
                </TouchableOpacity>
            </View> 
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%'
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    inputContainer: {
        // flex: 1/5,
        height: 80,
        width: '100%',
        borderWidth: 2,
        // borderColor: 'green',
        flexDirection: 'row'
    },
    inputStyle: {
        flex: 3/4,
        height: '100%',
        backgroundColor: 'white',
        fontSize: 20,
        color: 'black',
    },
    sendBtn: {
        flex: 1/4,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'darkblue'
    }
})