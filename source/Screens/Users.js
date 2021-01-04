import React, {useState, useEffect} from 'react'
import { 
View, 
Text, 
Alert,
FlatList, 
StyleSheet,
ImageBackground, 
TouchableOpacity, 
} from 'react-native'
//Set token stuff
import gql from 'graphql-tag'
import {useMutation, useQuery} from 'react-apollo'
import {ChangeType} from '../Components/ChangeType'
//BackHandler
import { useUsuario } from '../Context/UserContext'
import { 
backAction,
handleAndroidBackButton, 
} from '../Functions/BackHandler'

const GetUsers = gql`
query{
  GetUsers{
    id, name, name2, lastName, lastName2, username, active, password, deviceToken, type
  }
}
`
const UpdateUser = gql`
mutation updateuser($id: Int!, $type: String!, $active: Boolean!){
  UpdateUser(input: {
    id: $id,
    type: $type,
    active: $active
  }) {
    id, name, name2, lastName, lastName2, username, active, password, deviceToken, type
  }
}
`

export const Users = ({navigation}) => {
    //State
    const {usuario, setUser} = useUsuario();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log('Did mount screen: USERS');
        handleAndroidBackButton(() => navigation.navigate('Main'))
        return (() => {
        handleAndroidBackButton(() => backAction(setUser))
        })
    }, [])

    //React apollo
    const {data} = useQuery(GetUsers, {
        fetchPolicy: 'no-cache',
        onCompleted: () => {
            console.log(data)
            setUsers(data.GetUsers)
            console.log('Completed')
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const [updateuser] = useMutation(UpdateUser, {
        onCompleted: (data) => {
            console.log('User Updated')
            const useru = data.UpdateUser
            const newArray = users.map((useri) => {
                if(useri.id == useru.id) {
                    useri = useru
                    console.log('Find it')
                    return useri
                } else {
                    return useri
                }
            })
            setUsers(newArray)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    function isActive(item) {
        if(item.active == true) {
            return(
            <TouchableOpacity style = {styles.buttonContainer}
            onPress = {() => {
                Alert.alert(
                    'Modificando el estado del usuario',
                    '',
                    [
                    {text: 'Cambiar a inactivo', onPress: () => {
                        updateuser({
                            variables: {
                                id: item.id,
                                type: item.type,
                                active: false
                            }
                        })
                    }},
                    {text: 'Cancelar', onPress: () => console.log('DO NOTHING')}
                    ]
                )
            }}>
                <Text style={styles.field}>Status:</Text>
                <Text style={styles.activeText}>Activo</Text>
            </TouchableOpacity>
            )
        } else if (item.active == false) {
            return(
            <TouchableOpacity style = {styles.buttonContainer} onPress = {() => {
                Alert.alert(
                    'Modificando el estado del usuario',
                    '',
                    [
                    {text: 'Cambiar a activo', onPress: () => {
                        updateuser({
                            variables: {
                                id: item.id,
                                type: item.type,
                                active: true
                            }
                        })
                    }},
                    {text: 'Cancelar', onPress: () => console.log('DO NOTHING')}
                    ]
                )
            }}>
                <Text style={styles.field}>Status:</Text>
                <Text style={styles.inactiveText}>Inactivo</Text>
            </TouchableOpacity>
            )
        } else {
            return null
        }
    }

    return(
        <>
        <ImageBackground
        style = {{width: '100%', height: '100%'}}
        source = {require('../Images/background.png')}>
        <View style = {styles.main}>
        <FlatList
        data = {users}
        keyExtractor = {(item) => item.id}
        renderItem = {({item}) => (
            <View style = {styles.card}>
                <View style = {styles.buttonContainer}>
                    <Text style={styles.field}>Nombre:</Text>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <Text style={styles.field}>Apellido:</Text>
                    <Text style={styles.text}>{item.lastName}</Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <Text style={styles.field}>Usuario:</Text>
                    <Text style={styles.text}>{item.username}</Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <Text style={styles.field}>Tipo de cuenta:</Text>
                    <ChangeType item = {item}/>
                </View>
                {isActive(item)}
            </View>
        )}/>
        </View>
        </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.4)'
    },
    field: {
        fontSize: 20,
        margin: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 20,
        margin: 10,
        color: 'black',
        // fontWeight: 'bold'
    },
    textBtn: {
        fontSize: 20,
        color: 'white',
        margin: 20
        // fontWeight: 'bold'
    },
    listContainer: {
        flex: 1,
        height: '100%',
        borderWidth: 2,
        borderColor: 'green',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    card: {
        flex: 1,
        height: 300,
        backgroundColor: '#ebeef2',
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        // marginBottom: 0,
        borderRadius: 10
    },
    buttonContainer: {
        flex: 1, 
        // borderColor: 'green', 
        // borderWidth: 2, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%'
    },
    activeText: {
        fontSize: 20,
        margin: 10,
        color: 'green',
        // fontWeight: 'bold'
    },
    inactiveText: {
        fontSize: 20,
        margin: 10,
        color: 'red',
        // fontWeight: 'bold'
    },
})