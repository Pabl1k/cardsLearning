import {Dispatch} from "redux"
import {authAPI} from "../../api/api"

const LOGIN_USER = "LOGIN_USER"

type InitialStateType = {}

const initialState: InitialStateType = {}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case LOGIN_USER:
            return state
        default:
            return state
    }
}

// actions
export const loginUserAC = (payload: any) => {
    return {type: LOGIN_USER, payload: payload} as const
}

// thunks
export const templateTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login()
        .then(res => {
            // dispatch(templateAC(true, res.data.data.email))
        })
        .catch((error) => {
            // ...some code
        })
        .finally(() => {
            // ...some code
        })
}

// types
type ActionsType = ReturnType<typeof loginUserAC>
