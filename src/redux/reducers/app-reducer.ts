import {Dispatch} from "redux"
import {authAPI} from "../../api/api"
import {setIsLoggedInAC} from "./login-reducer"

const APP_SET_STATUS = 'APP/SET-STATUS'

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
    status: 'idle' as RequestStatusType
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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
export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.me()
        .then(res => {
            if (res.data._id) {
                dispatch(setIsLoggedInAC(true))
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            // ...some code
        })
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setIsLoggedInAC>
