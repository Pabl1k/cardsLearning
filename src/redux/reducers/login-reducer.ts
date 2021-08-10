import {ThunkAction} from "redux-thunk"
import {authAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

enum LOGIN_ACTIONS_TYPES {
    SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN"
}

type InitialStateType = {
    isLoggedIn: boolean
}

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const loginReducer = (state: InitialStateType = initialState, action: LoginReducerActionsType): InitialStateType => {
    switch (action.type) {
        case LOGIN_ACTIONS_TYPES.SET_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: LOGIN_ACTIONS_TYPES.SET_IS_LOGGED_IN, isLoggedIn} as const
}

// thunks
export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.login(email, password, rememberMe)
            .then(res => {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch((e) => {
                const error = e.response ? e.response.data.error : (`${e.message}. More details in the console`)
                console.log(error)
                dispatch(setAppStatusAC("failed"))
            })
            .finally(() => {
                // ...some code
            })
    }

export const logoutTC = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.logout()
            .then(res => {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch((e) => {
                console.log(e)
                dispatch(setAppStatusAC("failed"))
            })
    }

// types
export type LoginReducerActionsType = ReturnType<typeof setIsLoggedInAC>
