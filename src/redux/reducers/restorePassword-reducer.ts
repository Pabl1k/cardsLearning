import {Dispatch} from "redux"
import { authAPI } from "../../api/api"

const TEMPLATE_ACTION = "TEMPLATE_ACTION"

const initialState = {}

type InitialStateType = typeof initialState

export const restorePasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case TEMPLATE_ACTION:
            return state
        default:
            return state
    }
}

// actions
export const templateAC = (body: any) => {
    return {type: TEMPLATE_ACTION, body: body} as const
}

// thunks
export const restorePasswordTC = (email: string) => (dispatch: Dispatch) => {
    authAPI.restorePassword(email)
        .then((res) => {
            console.log(res)
        })
        .catch(er => {
            console.log(er)
        })
        .finally(() => {
        })
}

// types
export type templateActionType = ReturnType<typeof templateAC>
type ActionsType = templateActionType