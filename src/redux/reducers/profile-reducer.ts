import {Dispatch} from "redux"
import {profileAPI} from "../../api/api"

const CHANGE_USER_DATA = "CHANGE_USER_DATA"

type InitialStateType = {
    userData: {
        userName: string
        userEmail: string
        userAvatar: string | undefined | null
    }
}

const initialState: InitialStateType = {
    userData: {
        userName: "",
        userEmail: "",
        userAvatar: ""
    }
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case CHANGE_USER_DATA:
            return {...state, userData: {...action.payload}}
        default:
            return state
    }
}

// actions
export const updateUserData = (userName: string, userEmail: string, userAvatar: string | undefined | null) => {
    return {type: CHANGE_USER_DATA, payload: {userName, userEmail, userAvatar}} as const
}

// thunks
// export const updateUserNameTC = (userName: string, userEmail: string, userAvatar: string | undefined | null) => (dispatch: Dispatch<ActionsType>) => {
export const updateUserNameTC = (userName: string, userAvatar: string | undefined | null) => (dispatch: Dispatch<ActionsType>) => {
    profileAPI.updateUserData(userName, userAvatar)
        .then(res => {
            let {name, email, avatar} = res.data.updatedUser
            dispatch(updateUserData(name, email, avatar))
        })
        .catch((e) => {
            console.log(e)
        })
        .finally(() => {
            // ...some code
        })
}

// types
export type ActionsType = ReturnType<typeof updateUserData>
