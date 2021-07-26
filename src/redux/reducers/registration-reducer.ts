import {Dispatch} from "redux"
import {authAPI} from "../../api/api";

const SET_IS_SIGN_UP = "registration/SET_IS_SIGN_UP"

type InitialStateType = {
    isSignUp: boolean
}

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
    authAPI.signUp(email, password)
        .then(res => {
            dispatch(setIsSignUpAC(true))
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            // ...some code
        })
}

// types
export type  ActionsType = ReturnType<typeof setIsSignUpAC>

