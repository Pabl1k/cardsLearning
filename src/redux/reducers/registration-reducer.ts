import {ThunkAction} from "redux-thunk"
import {authAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

enum REGISTRATION_ACTIONS_TYPES {
    SET_IS_SIGN_UP = "registration/SET_IS_SIGN_UP"
}

type InitialStateType = {
    isSignUp: boolean
}

const initialState: InitialStateType = {
    isSignUp: false
}

export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationReducerActionsType): InitialStateType => {
    switch (action.type) {
        case REGISTRATION_ACTIONS_TYPES.SET_IS_SIGN_UP:
            return {...state, isSignUp: action.value}
        default:
            return state
    }
}

// actions
export const setIsSignUpAC = (value: boolean) => {
    return {type: REGISTRATION_ACTIONS_TYPES.SET_IS_SIGN_UP, value} as const
}

// thunks
export const signUpTC = (email: string, password: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.signUp(email, password)
            .then(res => {
                dispatch(setAppStatusAC("succeeded"))
                dispatch(setIsSignUpAC(true))
            })
            .catch((e) => {
                console.log(e)
                dispatch(setAppStatusAC("failed"))
            })
            .finally(() => {
                // ...some code
            })
    }

// types
export type RegistrationReducerActionsType = ReturnType<typeof setIsSignUpAC>