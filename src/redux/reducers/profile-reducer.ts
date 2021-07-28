import {Dispatch} from "redux"
import {profileAPI} from "../../api/api"

const CHANGE_USER_NAME = "CHANGE_USER_NAME"
const CHANGE_USER_AVATAR = "CHANGE_USER_AVATAR"

type InitialStateType = {
    userData : {
        userName: string
        userAvatar: string
    }
}

const initialState: InitialStateType = {
    userData: {
        userName: "",
        userAvatar: ""
    }
}

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case CHANGE_USER_NAME:
            return {...state, userData: {...state.userData, userName: action.userName}}
        default:
            return state
    }
}

// actions
export const updateUserName = (userName: string) => {
    return {type: CHANGE_USER_NAME, userName} as const
}

export const updateUserAvatar = (userAvatar: string) => { // features update it
    return {type: CHANGE_USER_AVATAR, userAvatar} as const
}


// thunks
export const updateUserNameTC = (userName: string, avatar: string) => (dispatch: Dispatch<ActionsType>) => {
    profileAPI.updateUserData(userName, avatar)
        .then(res => {
            console.log(res.data)
            dispatch(updateUserName(res.data.name))
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            // ...some code
        })
}

// types
export type  ActionsType = ReturnType<typeof updateUserName>
| ReturnType<typeof updateUserAvatar>

