import { userActions } from "../actions"

function addUser(param) {
    return (dispatch, getState) => {
        console.log('este es el estado', getState())
        console.log('este es el param', param)

        // esto simula una llamada al backend
        return new Promise(res => {
            setTimeout(() => {
                res('JULITO!!!!')
            }, 5000)
        }).then(data => {
            // cuando la llamada ha terminado, actualizamos la store
            return dispatch(userActions.addUser(data))
        })

    }
}

export default {
    addUser
}