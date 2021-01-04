export const SET_LOCATION = 'SET_LOCATION'
export const SET_USER = 'SET_USER'
export const SET_TOKEN = 'SET_TOKEN'

export const SET_ALERTS = 'SET_ALERTS'
export const SET_PANICS = 'SET_PANICS'
export const SET_BACK = 'SET_BACK'
export const SET_ELEMENT = 'SET_ELEMENT'

export const SET_CHAT = 'SET_CHAT'
export const SET_EVIDENCE = 'SET_EVIDENCE'

export const SET_IMAGE = 'SET_IMAGE'

export const set_location = (data) => {
    return {
        type: SET_LOCATION,
        payload: data
    }
}

export const set_user = (data) => {
    return {
        type: SET_USER,
        payload: data
    }
}

export const set_token = (data) => {
    return {
        type: SET_TOKEN,
        payload: data
    }
}

export const set_alerts = (data) => {
    return {
        type: SET_ALERTS,
        payload: data
    }
}

export const set_panics = (data) => {
    return {
        type: SET_PANICS,
        payload: data
    }
}

export const set_back = (data) => {
    return {
        type: SET_BACK,
        payload: data
    }
}

export const set_element = (data) => {
    return {
        type: SET_ELEMENT,
        payload: data
    }
}

export const set_chat = (data) => {
    return {
        type: SET_CHAT,
        payload: data
    }
}

export const set_evidence = (data) => {
    return {
        type: SET_EVIDENCE,
        payload: data
    }
}

export const set_image = (data) => {
    return {
        type: SET_IMAGE,
        payload: data
    }
}