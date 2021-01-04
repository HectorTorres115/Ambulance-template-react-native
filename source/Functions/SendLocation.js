import LocationStore from '../Redux/Redux-location-store'
import {GetUser} from '../Functions/UserStorage'
import {url, port} from '../Clients/client-config'

export const SendLocation = async() => {
    const user = await GetUser()
    const query = JSON.stringify({
        query: `
        mutation{
            SendLocation(input: {
              user: "${user.username}",
              longitude: ${LocationStore.getState().longitude},
              latitude: ${LocationStore.getState().latitude},
            }) {
              user, longitude, latitude
            }
          }
        `
    })
    const response = await fetch(`http://${url}:${port}/graphql`, {
        headers: {'content-type': 'application/json'},
        method: 'POST',
        body: query,
    });
    const responseJson = await response.json();
    console.log('Respuesta' + responseJson)
    return responseJson
}