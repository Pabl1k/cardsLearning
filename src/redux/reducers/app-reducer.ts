import {Dispatch} from "redux"
import {authAPI} from "../../api/api"
import {setIsLoggedInAC} from "./login-reducer"

const TEMPLATE_ACTION = "TEMPLATE_ACTION"

type InitialStateType = {
    userData: {
        _id: string
        /*userEmail: string
        userName: string
        userAvatar: string | undefined | null
        publicCardPacksCount: number*/
    }
}

const initialState = {
    userData: {
        _id: "",
        /*userEmail: "",
        userName: "",
        userAvatar: "",
        publicCardPacksCount: 0*/
    }
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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
export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.me()
        .then(res => {
            if (res.data._id) {
                dispatch(setIsLoggedInAC(true))
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            // ...some code
        })
}

// types
type ActionsType = ReturnType<typeof templateAC>
    | ReturnType<typeof setIsLoggedInAC>
