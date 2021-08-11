import {ThunkAction} from "redux-thunk"
import {authAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setIsLoggedInAC} from "./login-reducer"

enum APP_ACTIONS_TYPES {
    APP_SET_STATUS = "APP/SET-STATUS",
    USER_DATA_TYPE = "USER_DATA_TYPE"
}

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
        case APP_ACTIONS_TYPES.APP_SET_STATUS:
            return {...state, status: action.status}
        case APP_ACTIONS_TYPES.USER_DATA_TYPE:
            return {...state, userData: action.userData}
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => (
    {type: APP_ACTIONS_TYPES.APP_SET_STATUS, status} as const)
export const setUserDataAC = (userData: UserDataType) => (
    {type: APP_ACTIONS_TYPES.USER_DATA_TYPE, userData} as const)

// thunks
export const initializeAppTC = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const res = await authAPI.me()
            if (res.data._id) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setUserDataAC(res.data))
                dispatch(setAppStatusAC("succeeded"))
                // console.log("AuthMe success!!!")
            }
        } catch (e) {
            const error = e.response ? e.response.data.error : (`AuthMe failed: ${e.message}.`)
            console.log(error)
            dispatch(setAppStatusAC("failed"))
        } finally {
            // ...some code
        }
    }

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppReducerActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setUserDataAC>
