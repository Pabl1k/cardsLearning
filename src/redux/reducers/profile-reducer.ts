import {ThunkAction} from "redux-thunk"
import {profileAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

enum PROFILE_ACTIONS_TYPES {
    CHANGE_USER_DATA = "CHANGE_USER_DATA"
}

type InitialStateType = {}

const initialState: InitialStateType = {}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileReducerActionsType): InitialStateType => {
    switch (action.type) {
        case PROFILE_ACTIONS_TYPES.CHANGE_USER_DATA:
            return {...state, userData: {...action.payload}}
        default:
            return state
    }
}

// actions
export const updateUserDataAC = (_id: string, userName: string, userEmail: string, userAvatar: string | undefined | null) => (
    {type: PROFILE_ACTIONS_TYPES.CHANGE_USER_DATA, payload: {_id, userName, userEmail, userAvatar}} as const)

// thunks
export const updateUserNameTC = (_id: string, userName: string, userEmail: string, userAvatar: string | undefined | null): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const res = await profileAPI.updateUserData(userName, userAvatar)
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
export type ProfileReducerActionsType = ReturnType<typeof updateUserDataAC>
