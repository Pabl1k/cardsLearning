import {Dispatch} from "redux"
import {authAPI} from "../../api/api"

const SET_ERROR_MESSAGE = "SET-ERROR-MESSAGE"

const initialState = {
    errorMessage: null
}

type InitialStateType = {
    errorMessage: string | null
}

export const restorePasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_ERROR_MESSAGE :
            return {...state, errorMessage: action.errorMessage}
        default:
            return state
    }
}

// actions
export const setErrorMessageAC = (errorMessage: string) => ({type: SET_ERROR_MESSAGE, errorMessage: errorMessage})

// thunks
export const restorePasswordTC = (email: string) => (dispatch: Dispatch) => {
    authAPI.restorePassword(email)
        .then((res) => {

        })
        .catch(e => {
            const error = e.response.data.error
            dispatch(setErrorMessageAC(error))
        })
        .finally(() => {
        })
}

// types
type ActionsType = ReturnType<typeof setErrorMessageAC>