import {Dispatch} from "redux"
import {authAPI, LoginResponseType} from "../../api/api"

const LOGIN_USER = "LOGIN_USER"

type InitialStateType = {}

const initialState: InitialStateType = {}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case LOGIN_USER:
            return state
        default:
            return state
    }
}

// actions
export const loginUserAC = (payload: LoginResponseType) => {
    return {type: LOGIN_USER, payload} as const
}

// thunks
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(email, password, rememberMe)
        .then(res => {
            console.log(res)
            dispatch(loginUserAC(res.data))
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            // ...some code
        })
}

// types
type ActionsType = ReturnType<typeof loginUserAC>
