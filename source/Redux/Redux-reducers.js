import {SET_LOCATION} from './Redux-actions'
import {SET_USER} from './Redux-actions'
import {SET_TOKEN} from './Redux-actions'

import {SET_PANICS, SET_ALERTS} from './Redux-actions'
import {SET_BACK} from './Redux-actions'
import {SET_ELEMENT} from './Redux-actions'

import {SET_CHAT} from './Redux-actions'
import {SET_EVIDENCE} from './Redux-actions'

import {SET_IMAGE} from './Redux-actions'

export const default_location_state = {
    longitude: null,
    latitude: null,
}

export const default_alerts_state = []

export const default_panics_state = {}

export const default_back_state = true

export const default_users_state = {
    name: null,
    name2: null,
    lastName: null,
    lastName2: null,
    username: null,
    password: null,
    password2: null,
    deviceToken: null
}

export const default_element_state = {}

export const default_chat_state = {}
export const default_evidence_state = {}

export const default_image_state = ''

export const location_reducer = (state = default_location_state, action) => {
    switch(action.type) {
        case SET_LOCATION: {
            // console.log(action.payload)
            state = action.payload
            return state
        }
        default: return state;
    }
}

export const alerts_reducer = (state = default_alerts_state, action) => {
    switch(action.type) {
        case SET_ALERTS: {
            console.log('State setted')
            state = action.payload
            return state
        }
        default: return state;
    }
}

export const panics_reducer = (state = default_panics_state, action) => {
    switch(action.type) {
        case SET_PANICS: {
            state = action.payload
            console.log('STATE SETTED')
            return state
        }
        default: return state;
    }
}

export const back_reducer = (state = default_back_state, action) => {
    switch(action.type) {
        case SET_BACK: {
            state = action.payload
            return state
        }
        default: return state;
    }
}

export const element_reducer = (state = default_element_state, action) => {
    switch(action.type) {
        case SET_ELEMENT: {
            state = action.payload
            return state
        }
        default: return state;
    }
}

export const users_reducer = (state = default_users_state, action) => {
    switch(action.type) {
        case SET_USER: {
            state = action.payload
            // console.log(action.payload)
            return state
        }
        case SET_TOKEN: {
            state.deviceToken = action.payload
            return state
        }
        default: return state;
    }
}

export const chat_reducer = (state = default_chat_state, action) => {
    switch(action.type) {
        case SET_CHAT: {
            state = action.payload
            return state
        }
        default: return state;
    }
}

export const evidence_reducer = (state = default_evidence_state, action) => {
    switch(action.type) {
        case SET_EVIDENCE: {
            state = action.payload
            return state
        }
        default: return state;
    }
}

export const image_reducer = (state = default_image_state, action) => {
    switch(action.type) {
        case SET_IMAGE: {
            state = action.payload
            return state
        }
        default: return state;
    }
}