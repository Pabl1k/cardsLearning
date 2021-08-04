import {ThunkAction} from "redux-thunk"
import {authAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setIsLoggedInAC} from "./login-reducer"

const APP_SET_STATUS = "APP/SET-STATUS"

type InitialStateType = {
    userData: {
        _id: string
        /*userEmail: string
        userName: string
        userAvatar: string | undefined | null
        publicCardPacksCount: number*/
    }
    status: RequestStatusType
}

const initialState = {
    userData: {
        _id: "",
        /*userEmail: "",
        userName: "",
        userAvatar: "",
        publicCardPacksCount: 0*/
    },
    status: "idle" as RequestStatusType
}


export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: APP_SET_STATUS, status} as const)

// thunks
export const initializeAppTC = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.me()
            .then(res => {
                if (res.data._id) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC("succeeded"))
                }
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
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppReducerActionsType = ReturnType<typeof setAppStatusAC>
