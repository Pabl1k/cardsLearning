import {Dispatch} from "redux"
import {authAPI} from "../../api/api"

const TEMPLATE_ACTION = "TEMPLATE_ACTION"

const initialState = {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
    created: "",
    updated: "",
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: "" as string | null | undefined
}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case TEMPLATE_ACTION:
            return state
        default:
            return state
    }
}

// actions
export const templateAC = (email: string, name: string, avatar: string | undefined | null,
                            publicCardsCount: number, isLoggedIn?: boolean) => {
    return {type: TEMPLATE_ACTION, email, name, avatar, publicCardsCount, isLoggedIn} as const
}

// thunks
export const templateTC = (isLoggedIn: boolean = true) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.me()
        .then(res => {
            const {email, name, avatar, publicCardPacksCount} = res.data
            dispatch(templateAC(email, name, avatar, publicCardPacksCount, isLoggedIn))
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            // ...some code
        })
}

// types
export type templateActionType = ReturnType<typeof templateAC>
type ActionsType = templateActionType
