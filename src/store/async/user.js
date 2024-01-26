import { userActions } from "../actions"

function addUser(param) {
    return (dispatch, getState) => {
        // esto simula una llamada al backend
        return new Promise(res => {
            setTimeout(() => {
                res(param + 'es el mejon!!!')
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