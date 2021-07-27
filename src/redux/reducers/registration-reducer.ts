import {Dispatch} from "redux"
import {authAPI} from "../../api/api";
import {setAppStatusAC} from "./app-reducer";

const SET_IS_SIGN_UP = "registration/SET_IS_SIGN_UP"

const initialState: InitialStateType = {
    isSignUp: false
}

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_IS_SIGN_UP:
            return {...state, isSignUp: action.value}
        default:
            return state
    }
}

// actions
export const setIsSignUpAC = (value: boolean) => {
    return {type: SET_IS_SIGN_UP, value} as const
}


// thunks
export const SignUpTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.signUp(email, password)
        .then(res => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setIsSignUpAC(true))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setAppStatusAC('failed'))
        })
        .finally(() => {
            // ...some code
        })
}

// types
export type  ActionsType =
    | ReturnType<typeof setIsSignUpAC>
    | ReturnType<typeof setAppStatusAC>

type InitialStateType = {
    isSignUp: boolean
}