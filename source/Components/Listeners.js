import React, { Component } from 'react'
import {ActivityIndicator} from 'react-native'
import {subClient} from '../Clients/sub-client'
import {ApolloProvider, Subscription} from 'react-apollo'
import gql from 'graphql-tag'

const ALERTS_UPDATED = gql`
subscription ALERTS_UPDATED($fid: Int!){
    AlertsUpdated(fid: $fid) {
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

export class AlertListener extends Component {
    render() {
        return (
            <ApolloProvider client = {subClient}>
            <Subscription
            variables = {{fid: this.props.fid}} 
            subscription = {ALERTS_UPDATED}
            onSubscriptionData = {(data) => {
                console.log(data.subscriptionData.data.AlertsUpdated)
                const newArray = [...this.props.alerts, data.subscriptionData.data.AlertsUpdated]
                this.props.setter(newArray)
            }}>
            {({loading, error}) => {
                if(loading) return null
                if(error) {
                    console.log(error)
                    console.log(this.props.fid)
                    return <ActivityIndicator size = 'large' color = 'red'/>
                }
                return null
            }}
            </Subscription>
            </ApolloProvider>
        )
    }
}