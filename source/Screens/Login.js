import React, {useState, useEffect} from 'react'
import {
Text,
View,
Alert,
Image,
TextInput,
StyleSheet,
ImageBackground,
TouchableOpacity,
} from 'react-native'
import {Button as ButtonPaper} from 'react-native-paper'
//Apollo
import gql from 'graphql-tag'
import {useMutation} from 'react-apollo'
import {GetDeviceToken} from '../Functions/GetDeviceToken'
//Authentication
import { SetUser as SetStorageUser } from '../Functions/UserStorage'
//Context
import { useUsuario } from '../Context/UserContext'
//BackHandler
import { handleAndroidBackButton } from '../Functions/BackHandler'
//Permissions
import {requestPermission} from '../Functions/MapsPermission'

const LOGIN = gql`
mutation login($username: String!, $password: String!, $deviceToken: String){
  Login(input: {
    username: $username,
    password: $password,
    deviceToken: $deviceToken
  }) {
    id, name, name2, lastName, lastName2, username, active, password, deviceToken, type
  }
}
`

export const Login = ({navigation}) => {
    //Back handler
    useEffect(() => {
        handleAndroidBackButton(() => console.log('Do nothing'))
        requestPermission()
        .then(() => console.log('Permisos aceptados'))
        .catch(() => console.log('Permisos denegados'))
    },[])
    //Context methods
    const {setUser} = useUsuario();
    //State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //Login mutation
    const [login] = useMutation(LOGIN, {
        onCompleted: async(data) => {
            console.log(data)
            if(data){
                await SetStorageUser(data.Login)
                setUser(data.Login)
            }
        },
        onError: (err) => {
            console.log(err);
            Alert.alert('Error en usuario/contraseña')
        }
    })
    return (
        <ImageBackground
        blurRadius = {2}
        style = {{width: '100%', height: '100%'}}
        source = {require('../Images/background.png')}>
        <View style = {styles.main}>

            <View style = {{
                flex: 1/3,
                width: '95%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image style = {{height: '95%', width: '95%'}} source = {require('../Images/logo.png')}/>
            </View>


            <TextInput
            style = {styles.input}
            placeholder = 'Usuario'
            onChangeText = {(username) => setUsername(username)}/>

            <TextInput
            style = {styles.input}
            secureTextEntry = {true}
            placeholder = 'Password'
            onChangeText = {(password) => setPassword(password)}/>

            <ButtonPaper
            style = {{width: '90%', backgroundColor: 'steelblue'}}
            mode="contained"
            onPress={async() => {
                await login({
                    variables: {
                        username, password, deviceToken: await GetDeviceToken()
                    }
                })
            }}>
            Login
            </ButtonPaper>
        </View>

        <TouchableOpacity
        style = {{
        backgroundColor: 'rgba(0,0,0, 0.3)'
        }}
        onPress = {() => navigation.navigate('Register')}>
            <Text style = {styles.text}>¿Aún no te has registrado?</Text>
        </TouchableOpacity>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.3)'
    },
    text: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        margin: 20,
        textDecorationLine: "underline"
    },
    register: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        margin: 20,
        textDecorationLine: "underline",
    },
    input: {
        width: '90%',
        margin: 10,
        fontSize: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 2
    }
})