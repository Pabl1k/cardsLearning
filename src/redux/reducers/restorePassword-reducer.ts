import {Dispatch} from "redux"
import {authAPI} from "../../api/api"
import {setAppStatusAC} from "./app-reducer"

const SET_ERROR_MESSAGE = "SET-ERROR-MESSAGE"

const initialState = {
    errorMessage: null
}

type InitialStateType = {
    errorMessage: string | null
}

export const restorePasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_ERROR_MESSAGE:
            return {...state, errorMessage: action.errorMessage}
        default:
            return state
    }
}

// actions
export const setErrorMessageAC = (errorMessage: string) => ({type: SET_ERROR_MESSAGE, errorMessage: errorMessage})

// thunks
export const restorePasswordTC = (email: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.restorePassword(email)
        .then((res) => {
            console.log(res)
            dispatch(setErrorMessageAC(`Recovery instructions was sent to email: ${email}`))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(e => {
            console.log(e)
            dispatch(setErrorMessageAC(`Account with email: ${email}, does not exist`))
            dispatch(setAppStatusAC("failed"))
        })
        .finally(() => {
            // ...some code
        })
}

// types
type ActionsType = ReturnType<typeof setErrorMessageAC>
    | ReturnType<typeof setAppStatusAC>