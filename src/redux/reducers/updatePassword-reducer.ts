import {ThunkAction} from "redux-thunk"
import {authAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

enum UPDATE_PASSWORD_ACTIONS_TYPES {
    IS_SUCCESS = "IS_SUCCESS"
}

type InitialStateType = {
    isSuccess: boolean
}

const initialState: InitialStateType = {
    isSuccess: false
}

export const updatePasswordReducer = (state: InitialStateType = initialState, action: UpdatePasswordReducerActionsType): InitialStateType => {
    switch (action.type) {
        case UPDATE_PASSWORD_ACTIONS_TYPES.IS_SUCCESS:
            return {...state, isSuccess: action.isSuccess}
        default:
            return state
    }
}

// actions
export const isSuccessAC = (isSuccess: boolean) => (
    {type: UPDATE_PASSWORD_ACTIONS_TYPES.IS_SUCCESS, isSuccess} as const )

// thunks
export const updatePasswordTC = (newPassword: string, token: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.setNewPassword(newPassword, token)
            .then(res => {
                dispatch(isSuccessAC(true))
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
export type UpdatePasswordReducerActionsType = ReturnType<typeof isSuccessAC>
