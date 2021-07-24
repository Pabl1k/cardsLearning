import {Dispatch} from "redux"

const TEMPLATE_ACTION = "TEMPLATE_ACTION"

type InitialStateType = {}

const initialState: InitialStateType = {}

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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
/*export const templateTC = () => (dispatch: Dispatch<ActionsType>) => {
    someAPI.someMethod()
        .then(res => {
            // dispatch(templateAC(true, res.data.data.email))
        })
        .catch((error) => {
            // ...some code
        })
        .finally(() => {
            // ...some code
        })
}*/

// types
export type templateActionType = ReturnType<typeof templateAC>
type ActionsType = templateActionType
