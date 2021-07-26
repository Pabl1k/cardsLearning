import {Dispatch} from "redux"
import {authAPI} from "../../api/api"

const SET_ERROR_MESSAGE = "SET-ERROR-MESSAGE"

const initialState = {
    errorMessage: null
}

type InitialStateType = {
    errorMessage: string | null
}

export const restorePasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_ERROR_MESSAGE :
            return {...state, errorMessage: action.errorMessage}
        default:
            return state
    }
}

// actions
export const setErrorMessageAC = (errorMessage: string) => ({type: SET_ERROR_MESSAGE, errorMessage: errorMessage})

// thunks
export const restorePasswordTC = (email: string) => (dispatch: Dispatch) => {
    authAPI.restorePassword(email)
        .then((res) => {
            if (res.status === 200) {
                console.log(res)
                dispatch(setErrorMessageAC(`Recovery instructions was sent to email: ${email}`))
            }
        })
        .catch(er => {
            console.log(er)
            dispatch(setErrorMessageAC(`Account with email: ${email}, does not exist`))
        })
        .finally(() => {
        })
}

// types
type SetErrorMessageActionType = ReturnType<typeof setErrorMessageAC>
type ActionsType = SetErrorMessageActionType