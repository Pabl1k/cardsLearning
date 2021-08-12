import {ThunkAction} from "redux-thunk"
import {authAPI, UserDataType} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setIsLoggedInAC} from "./login-reducer"

enum APP_ACTIONS_TYPES {
    SET_APP_STATUS = "SET_APP_STATUS",
    SET_USER_DATA_TYPE = "USER_DATA_TYPE",
    CHANGE_USER_DATA = "CHANGE_USER_DATA"
}

const initialState = {
    userData: {
        _id: "",
        email: "",
        name: "",
        avatar: "" as string | undefined,
        publicCardPacksCount: 0,

        created: "",
        updated: "",
        isAdmin: false,
        verified: false,
        rememberMe: false,
    } as UserDataType,
    status: "idle" as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case APP_ACTIONS_TYPES.SET_APP_STATUS:
            return {...state, status: action.status}
        case APP_ACTIONS_TYPES.SET_USER_DATA_TYPE:
            return {...state, userData: action.userData}
        case APP_ACTIONS_TYPES.CHANGE_USER_DATA:
            return {...state, ...action.userData}
            // return {...state, userData: {...action.userData}}
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => (
    {type: APP_ACTIONS_TYPES.SET_APP_STATUS, status} as const)

export const setUserDataAC = (userData: UserDataType) => (
    {type: APP_ACTIONS_TYPES.SET_USER_DATA_TYPE, userData} as const)

export const updateUserDataAC = (_id: string, email: string, name: string, avatar: string | undefined) => (
    {type: APP_ACTIONS_TYPES.CHANGE_USER_DATA, userData: {_id, email, name, avatar}} as const)

// thunks
export const initializeAppTC = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const res = await authAPI.me()
            if (res.data._id) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setUserDataAC(res.data))
                console.log("AuthMe success!!!")
                dispatch(setAppStatusAC("succeeded"))
            }
        } catch (e) {
            const error = e.response ? e.response.data.error : (`AuthMe failed: ${e.message}.`)
            console.log(error)
            dispatch(setAppStatusAC("failed"))
        } finally {
            // ...some code
        }
    }

export const updateUserDataTC = (_id: string, userName: string, userEmail: string, userAvatar: string | undefined): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const res = await authAPI.updateUserData(userName, userAvatar)
            const {_id, name, email, avatar} = res.data.updatedUser
            dispatch(updateUserDataAC(_id, name, email, avatar))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Update userData failed: ${e.message}.`)
            console.log(error)
            dispatch(setAppStatusAC("failed"))
        } finally {
            // some code...
        }
    }

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppReducerActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setUserDataAC>
    | ReturnType<typeof updateUserDataAC>