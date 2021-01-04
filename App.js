import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Context
import { UsuarioProvider, useUsuario } from './source/Context/UserContext'
//Apollo provider
import { ApolloProvider } from 'react-apollo';
import { client } from './source/Clients/client';
//Screens
import { Login } from './source/Screens/Login';
import { Register } from './source/Screens/Register';
import { Main } from './source/Screens/Main';
import { Fire } from './source/Screens/Fire';
import { Ambulance } from './source/Screens/Ambulance';
import { Coordinacion } from './source/Screens/Coordinacion';
import { Users } from './source/Screens/Users';
import { ChatFire } from './source/Screens/ChatFire';
import { FireAdmin } from './source/Screens/FireAdmin';
import { ChatAmbulance } from './source/Screens/ChatAmbulance';
import { AmbulanceAdmin } from './source/Screens/AmbulanceAdmin';
import { ShowLocation } from './source/Screens/ShowLocation';

const AuthStack = createStackNavigator();
const AdminStack = createStackNavigator();
const UserStack = createStackNavigator();

const screenOptions = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: "#000000"
  }
}

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName = {'Login'}>
    <AuthStack.Screen
      options = {screenOptions}
      name = 'Login'
      component = {Login}
    />
    <AuthStack.Screen
      options = {screenOptions}
      name = 'Register'
      component = {Register}
    />
  </AuthStack.Navigator>
)

const AdminStackScreen = () => (
  <AdminStack.Navigator headerMode = {'none'}>
    <AdminStack.Screen
      options = {screenOptions}
      name = 'Main'
      component = {Main}
    />
    <AdminStack.Screen
      options = {screenOptions}
      name = 'FireAdmin'
      component = {FireAdmin}
    />
    <AdminStack.Screen
      options = {screenOptions}
      name = 'AmbulanceAdmin'
      component = {AmbulanceAdmin}
    />
    <AdminStack.Screen
      options = {screenOptions}
      name = 'Coordinacion'
      component = {Coordinacion}
    />
    <AdminStack.Screen
      options = {screenOptions}
      name = 'Users'
      component = {Users}
    />
    <AdminStack.Screen
      options = {screenOptions}
      name = 'ChatFire'
      component = {ChatFire}
    />
    <AdminStack.Screen
      options = {screenOptions}
      name = 'ChatAmbulance'
      component = {ChatAmbulance}
    />
    <AdminStack.Screen
      options = {screenOptions}
      name = 'ShowLocation'
      component = {ShowLocation}
    />
  </AdminStack.Navigator>
)

const UserStackScreen = () => (
  <UserStack.Navigator headerMode = {'none'}>
    <UserStack.Screen
      options = {screenOptions}
      name = 'Main'
      component = {Main}
    />
    <UserStack.Screen
      options = {screenOptions}
      name = 'Fire'
      component = {Fire}
    />
    <UserStack.Screen
      options = {screenOptions}
      name = 'Ambulance'
      component = {Ambulance}
    />
    <UserStack.Screen
      options = {screenOptions}
      name = 'Coordinacion'
      component = {Coordinacion}
    />
    <UserStack.Screen
      options = {screenOptions}
      name = 'ShowLocation'
      component = {ShowLocation}
    />
  </UserStack.Navigator>
)

export default () => (
  <UsuarioProvider>
    <App></App>
  </UsuarioProvider>
)

function App(){
  const {usuario} = useUsuario();
  if(usuario !== null) {
    if(usuario.type == 'admin' || usuario.type == 'director'){
      console.log('Main stack: ADMIN');
      return(
      <ApolloProvider client = {client}>
        <NavigationContainer>
          <AdminStackScreen/>
        </NavigationContainer>
      </ApolloProvider>
      )
    } else if (usuario.type == 'client'){
      console.log('Main stack: CLIENT');
      return(
      <ApolloProvider client = {client}>
        <NavigationContainer>
          <UserStackScreen/>
        </NavigationContainer>
      </ApolloProvider>
      )
    } else {
      return(
      <ApolloProvider client = {client}>
        <NavigationContainer>
          <UserStackScreen/>
        </NavigationContainer>
      </ApolloProvider>
      )
    }
  } else {
    console.log('Main stack: AUTH');
    console.log('NO HAY USUARIO REGISTRADO');
    return(
    <ApolloProvider client = {client}>
      <NavigationContainer>
        <AuthStackScreen/>
      </NavigationContainer>
    </ApolloProvider>
    )
  }
}