import {Dispatch} from "redux"
import {authAPI} from "../../api/api"
import {setAppStatusAC} from "./app-reducer";

const LOGIN_USER = "LOGIN_USER"

type InitialStateType = {
    _id: string
    email: string
    name: string
    avatar: string | undefined
    publicCardsCount: number
    isLoggedIn: boolean
}

const initialState: InitialStateType = {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardsCount: 0,
    isLoggedIn: false,
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                email: action.email,
                name: action.name,
                avatar: action.avatar,
                publicCardsCount: action.publicCardsCount,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state
    }
}

// actions
export const loginUserAC = (email: string, name: string, avatar: string | undefined,
                            publicCardsCount: number, isLoggedIn: boolean) => {
    return {type: LOGIN_USER, email, name, avatar, publicCardsCount, isLoggedIn} as const
}

// thunks
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(email, password, rememberMe)
        .then(res => {
            console.log(res)
            dispatch(setAppStatusAC("succeeded"))
            dispatch(loginUserAC(res.data.email, res.data.name, res.data.avatar, res.data.publicCardPacksCount, true))
        })
        .catch((e) => {
            console.log(e)
            const error = e.response ? e.response.data.error : (`${e.message}. More details in the console`)
            console.log(error)
            dispatch(setAppStatusAC('failed'))
        })
        .finally(() => {
            // ...some code
        })
}


export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.logout()
        .then(res => {
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((error) => {
            console.log(error)
            dispatch(setAppStatusAC('failed'))
        })
}

// types
type ActionsType =
    | ReturnType<typeof loginUserAC>
    | ReturnType<typeof setAppStatusAC>
