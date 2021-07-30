import {Dispatch} from "redux"
import {profileAPI} from "../../api/api"

const CHANGE_USER_DATA = "CHANGE_USER_DATA"

type InitialStateType = {
    userData: {
        _id: string
        userName: string
        userEmail: string
        userAvatar: string | undefined | null
    }
}

const initialState: InitialStateType = {
    userData: {
        _id: "",
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
export const updateUserData = (_id: string, userName: string, userEmail: string, userAvatar: string | undefined | null) => {
    return {type: CHANGE_USER_DATA, payload: {_id, userName, userEmail, userAvatar}} as const
}

// thunks
export const updateUserNameTC = (_id: string, userName: string, userEmail: string, userAvatar: string | undefined | null) => (dispatch: Dispatch<ActionsType>) => {
    profileAPI.updateUserData(userName, userAvatar)
        .then(res => {
            let {_id, name, email, avatar} = res.data.updatedUser
            dispatch(updateUserData(_id, name, email, avatar))
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
