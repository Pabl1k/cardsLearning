import {ThunkAction} from "redux-thunk"
import {authAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setIsLoggedInAC} from "./login-reducer"

const APP_SET_STATUS = "APP/SET-STATUS"
const USER_DATA_TYPE = "USER_DATA_TYPE"

export type UserDataType = {
    _id: string
    email: string
    name: string
    avatar: string | undefined | null
    publicCardPacksCount: number

    created: string
    updated: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
}

type InitialStateType = {
    userData: UserDataType
    status: RequestStatusType
}

const initialState = {
    userData: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
        publicCardPacksCount: 0,

        created: "",
        updated: "",
        isAdmin: false,
        verified: false,
        rememberMe: false,
    },
    status: "idle" as RequestStatusType
}

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, status: action.status}
        case USER_DATA_TYPE:
            return {...state, userData: action.userData}
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: APP_SET_STATUS, status} as const)
export const setUserDataAC = (userData: UserDataType) => ({type: USER_DATA_TYPE, userData} as const)

// thunks
export const initializeAppTC = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.me()
            .then(res => {
                console.log("AuthMe success!!!")
                if (res.data._id) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setUserDataAC(res.data))
                    dispatch(setAppStatusAC("succeeded"))
                }
            })
            .catch((e) => {
                console.log(`AuthMe failed: ${e}`)
                dispatch(setAppStatusAC("failed"))
            })
            .finally(() => {
                // ...some code
            })
    }

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppReducerActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setUserDataAC>
