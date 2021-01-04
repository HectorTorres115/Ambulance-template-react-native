import React, { Component } from 'react'
import { 
Alert,
Picker, 
StyleSheet,
ActivityIndicator, 
} from 'react-native'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'

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

export class ChangeType extends Component {
    constructor(props){
        super(props)
        this.state = {
            type: ''
        }
    }

    componentDidMount() {
        this.setState({type: this.props.item.type})
    }

    render() {
        return (
            <Mutation mutation = {UpdateUser}>
            {(updateuser, {loading, error}) => {
                if(loading) return <ActivityIndicator size = 'large' color = 'blue'/>
                if(error) return <ActivityIndicator size = 'large' color = 'red'/>
                return(
                    <Picker
                    style = {styles.picker} 
                    mode = 'dropdown'
                    selectedValue = {this.state.type}
                    onValueChange = {async(value) => {
                        if(value == 'director') {
                            Alert.alert('No se permite esta operación')
                        } else {
                            Alert.alert('¿Cambiar el tipo de usuario?', '', [
                                {text: 'Aceptar', onPress: async() => {
                                    this.setState({type: value})
                                    const res = await updateuser({
                                        variables: {
                                            id: this.props.item.id,
                                            type: this.state.type,
                                            active: true
                                        }
                                    })
                                    console.log(res);
                                }},
                                {text: 'Cancelar', onPress: () => console.log('DO NOTHING')},
                            ])
                        }
                    }}
                    >
                    <Picker.Item label= 'Cliente' value= 'user' key={1}/>
                    {/* <Picker.Item label= 'Guardia' value= 'user' key={2}/> */}
                    <Picker.Item label= 'Admin' value= 'admin' key={3}/>
                    {/* <Picker.Item label= 'Director' value= 'director' key={4}/> */}
                    {/* <Picker.Item label= 'Volver director' value= 'admin' key={4}/> */}
                    </Picker>
                )
            }}
            </Mutation>
        )
    }
}

const styles = StyleSheet.create({
    picker: {
        width: '50%', 
        height: 30, 
        backgroundColor: '#ebeef2', 
        margin: 10, 
        textAlign: 'right',
        borderColor: 'black',
        borderWidth: 2
    }
})