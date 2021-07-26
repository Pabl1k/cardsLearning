import {Dispatch} from "redux"
import {authAPI} from "../../api/api"

const LOGIN_USER = "LOGIN_USER"

type InitialStateType = {
    _id: string | null
    email: string | null
    name: string | null
    avatar: string | undefined
    publicCardsCount: number
    isLoggedIn: boolean
}

const initialState: InitialStateType = {
    _id: null,
    email: null,
    name: null,
    avatar: "",
    publicCardsCount: 0,
    isLoggedIn: false,
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                email: action.email,
                name: action.name,
                avatar: action.avatar,
                publicCardsCount: action.publicCardsCount,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state
    }
}

// actions
export const loginUserAC = (email: string | null, name: string | null, avatar: string | undefined,
                            publicCardsCount: number, isLoggedIn: boolean) => {
    return {type: LOGIN_USER, email, name, avatar, publicCardsCount, isLoggedIn} as const
}

// thunks
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(email, password, rememberMe)
        .then(res => {
            console.log(res)
            dispatch(loginUserAC(res.data.email, res.data.name, res.data.avatar, res.data.publicCardPacksCount, true))
        })
        .catch((e) => {
            console.log(e)
            const error = e.response ? e.response.data.error : (`${e.message} more details in the console`)
            console.log(error)
        })
        .finally(() => {
            // ...some code
        })
}

// types
type ActionsType = ReturnType<typeof loginUserAC>
