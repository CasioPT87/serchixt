import { userActions } from "../actions"
import { AppDispatch, RootState, AppThunk, AppThunkDispatch } from "../../types"

function addUser(param: any): AppThunk {
    return (dispatch: AppThunkDispatch, getState: () => RootState) => {
        // esto simula una llamada al backend
        return new Promise(res => {
            setTimeout(() => {
                const response = param + 'es el mejon!!!'
                res(response)
            }, 5000)
        }).then(data => {
            // cuando la llamada ha terminado, actualizamos la store
            if (typeof data === 'string') {
                dispatch(userActions.addUser(data))
                return
            }
        })

    }
}

export default {
    addUser
}