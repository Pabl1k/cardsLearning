import {ThunkAction} from "redux-thunk"
import {authAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

enum RESTORE_PASSWORD_ACTIONS_TYPES {
    SET_ERROR_MESSAGE = "SET-ERROR-MESSAGE"
}

const initialState = {
    errorMessage: null
}

type InitialStateType = {
    errorMessage: string | null
}

export const restorePasswordReducer = (state: InitialStateType = initialState, action: RestorePasswordReducerActionsType): InitialStateType => {
    switch (action.type) {
        case RESTORE_PASSWORD_ACTIONS_TYPES.SET_ERROR_MESSAGE:
            return {...state, errorMessage: action.errorMessage}
        default:
            return state
    }
}

// actions
export const setErrorMessageAC = (errorMessage: string) => (
    {type: RESTORE_PASSWORD_ACTIONS_TYPES.SET_ERROR_MESSAGE, errorMessage: errorMessage})

// thunks
export const restorePasswordTC = (email: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
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
export type RestorePasswordReducerActionsType = ReturnType<typeof setErrorMessageAC>