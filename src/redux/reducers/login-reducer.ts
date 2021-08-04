import {ThunkAction} from "redux-thunk"
import {authAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

const LOGIN_USER = "LOGIN_USER"
const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN"

type InitialStateType = {
    userData: {
        userEmail: string
        userName: string
        userAvatar: string | undefined | null
        publicCardsCount: number
    }
    isLoggedIn: boolean
}

const initialState: InitialStateType = {
    userData: {
        userEmail: "",
        userName: "",
        userAvatar: "",
        publicCardsCount: 0,
    },
    isLoggedIn: false
}

export const loginReducer = (state: InitialStateType = initialState, action: LoginReducerActionsType): InitialStateType => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                userData: {...action.payload},
                isLoggedIn: action.payload.isLoggedIn
            }
        case SET_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state
    }
}

// actions
export const loginUserAC = (userEmail: string, userName: string, userAvatar: string | undefined | null,
                            publicCardsCount: number, isLoggedIn: boolean) => {
    return {type: LOGIN_USER, payload: {userEmail, userName, userAvatar, publicCardsCount, isLoggedIn}} as const
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: SET_IS_LOGGED_IN, isLoggedIn} as const
}

// thunks
export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.login(email, password, rememberMe)
            .then(res => {
                dispatch(loginUserAC(res.data.email, res.data.name, res.data.avatar, res.data.publicCardPacksCount, true))
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
export type LoginReducerActionsType = ReturnType<typeof loginUserAC>
    | ReturnType<typeof setIsLoggedInAC>
