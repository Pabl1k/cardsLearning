import {Dispatch} from "redux"
import {authAPI} from "../../api/api"

const IS_SUCCESS = "IS_SUCCESS"

type InitialStateType = {
    isSuccess: boolean
}

const initialState: InitialStateType = {
    isSuccess: false
}

export const updatePasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case IS_SUCCESS:
            return {...state, isSuccess: action.isSuccess}
        default:
            return state
    }
}

// actions
export const isSuccessAC = (isSuccess: boolean) => {
    return {type: IS_SUCCESS, isSuccess} as const
}

// thunks
export const updatePasswordTC = (newPassword: string, token: string) => (dispatch: Dispatch<ActionsType>) => {
    debugger
    authAPI.setNewPassword(newPassword, token)
        .then(res => {
            if (res.status === 200) {
                dispatch(isSuccessAC(true))
            }
        })
        .catch((e) => {
            console.log(e)
        })
        .finally(() => {
            // ...some code
        })
}

// types
type ActionsType = ReturnType<typeof isSuccessAC>
