import React, { useState } from 'react'
import { 
StyleSheet, 
View, 
ImageBackground, 
ScrollView, 
TextInput, 
Alert 
} from 'react-native'
import { Button as ButtonPaper } from 'react-native-paper'
//Apollo
import { useMutation } from 'react-apollo'
import { GetDeviceToken } from '../Functions/GetDeviceToken'
import gql from 'graphql-tag'

const REGISTER = gql`
mutation register(
  $name: String!
  $name2: String!
  $lastName: String!
  $lastName2: String!
  $username: String!
  $password: String!
  $deviceToken: String!
) {
  CreateUser(
    input: {
      name: $name
      name2: $name2
      lastName: $lastName
      lastName2: $lastName2
      username: $username
      password: $password
      deviceToken: $deviceToken
    }
  ) {
    id
    name
    name2
    lastName
    lastName2
    username
    active
    password
    deviceToken
    type
  }
}
`

export const Register = () => {
    //State
    const [name, setName] = useState(null);
    const [name2, setName2] = useState('n/a');
    const [lastName, setLastName] = useState(null);
    const [lastName2, setLastName2] = useState('n/a');
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordCon, setPasswordCon] = useState(null);
    //Register mutation
    const [register] = useMutation(REGISTER, {
        onCompleted: (data) => {
            Alert.alert('Usuario registrado')
            console.log(data);
        },
        onError: (err) => {
            Alert.alert('Error en el registro')
            console.log(err);
        }
    })
    //Functions
    const evaluate_form = () => {
      if(name == null || lastName == null || username == null){
        Alert.alert('Error con los datos del formulario')
        return false
      } else {
        return true
      }
    }
    const register_action = async () => {
      if(evaluate_form()){
        if(password == passwordCon){
          await register({
            variables: {
              name, 
              name2, 
              lastName, 
              lastName2, 
              username, 
              password, 
              deviceToken: await GetDeviceToken()
            }
          })
        } else {
          Alert.alert('Las contraseñas no coinciden')
        }
      }
    }

    return (
        <ImageBackground 
        blurRadius = {1}
        style = {{width: '100%', height: '100%'}}
        source = {require('../Images/background.png')}>
        <ScrollView>

        <View style = {styles.main}>
            <TextInput
            maxLength = {50} 
            style = {styles.input} 
            placeholder = 'Nombre'
            onChangeText = {(name) => setName(name)}/>

            <TextInput
            maxLength = {50} 
            style = {styles.input} 
            placeholder = '2do Nombre (opcional)'
            onChangeText = {(name2) => setName2(name2)}/>

            <TextInput
            maxLength = {50} 
            style = {styles.input} 
            placeholder = 'Apellido'
            onChangeText = {(lastName) => setLastName(lastName)}/>

            <TextInput
            maxLength = {50} 
            style = {styles.input} 
            placeholder = '2do Apellido (opcional)'
            onChangeText = {(lastName2) => setLastName2(lastName2)}/>

            <TextInput
            maxLength = {50} 
            style = {styles.input} 
            placeholder = 'Usuario'
            onChangeText = {(username) => setUsername(username)}/>

            <TextInput
            secureTextEntry = {true}
            maxLength = {50} 
            style = {styles.input} 
            placeholder = 'Password'
            onChangeText = {(password) => setPassword(password)}/>

            <TextInput
            secureTextEntry = {true}
            maxLength = {50} 
            style = {styles.input} 
            placeholder = 'Password confirm'
            onChangeText = {(passwordCon) => setPasswordCon(passwordCon)}/>

            <ButtonPaper 
            onPress = {() => register_action()}
            style = {{width: '90%', backgroundColor: 'steelblue'}}
            mode="contained">
            Register
            </ButtonPaper>

        </View>

        </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: 600,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    input: {
        width: '90%',
        margin: 10,
        fontSize: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 2
    },
})