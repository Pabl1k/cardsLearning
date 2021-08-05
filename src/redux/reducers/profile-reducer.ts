import {ThunkAction} from "redux-thunk"
import {profileAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

const CHANGE_USER_DATA = "CHANGE_USER_DATA"

type InitialStateType = {
    /*userData: {
        _id: string
        userName: string
        userEmail: string
        userAvatar: string | undefined | null
    }*/
}

const initialState: InitialStateType = {
    /*userData: {
        _id: "",
        userName: "",
        userEmail: "",
        userAvatar: ""
    }*/
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileReducerActionsType): InitialStateType => {
    switch (action.type) {
        case CHANGE_USER_DATA:
            return {...state, userData: {...action.payload}}
        default:
            return state
    }
}

// actions
export const updateUserDataAC = (_id: string, userName: string, userEmail: string, userAvatar: string | undefined | null) => {
    return {type: CHANGE_USER_DATA, payload: {_id, userName, userEmail, userAvatar}} as const
}

// thunks
export const updateUserNameTC = (_id: string, userName: string, userEmail: string, userAvatar: string | undefined | null): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        profileAPI.updateUserData(userName, userAvatar)
            .then(res => {
                const {_id, name, email, avatar} = res.data.updatedUser
                dispatch(updateUserDataAC(_id, name, email, avatar))
                dispatch(setAppStatusAC("succeeded"))
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
export type ProfileReducerActionsType = ReturnType<typeof updateUserDataAC>
