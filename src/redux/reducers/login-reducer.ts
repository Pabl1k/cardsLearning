import {Dispatch} from "redux"
import {authAPI} from "../../api/api"

const LOGIN_USER = "LOGIN_USER"

type InitialStateType = {
    userData: {
        email: string
        name: string
        avatar: string | undefined | null
        publicCardsCount: number
        isLoggedIn: boolean
    }
}

const initialState: InitialStateType = {
    userData: {
        email: "",
        name: "",
        avatar: "",
        publicCardsCount: 0,
        isLoggedIn: false,
    }
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                userData: {...action.payload}
            }
        default:
            return state
    }
}

// actions
export const loginUserAC = (email: string, name: string, avatar: string | undefined | null,
                            publicCardsCount: number, isLoggedIn: boolean) => {
    return {type: LOGIN_USER, payload: {email, name, avatar, publicCardsCount, isLoggedIn}} as const
}

// thunks
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(email, password, rememberMe)
        .then(res => {
            console.log(res)
            dispatch(loginUserAC(res.data.email, res.data.name, res.data.avatar, res.data.publicCardPacksCount, true))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (`${e.message}. More details in the console`)
            console.log(error)
        })
        .finally(() => {
            // ...some code
        })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.logout()
        .then(res => {
            //dispatch()
        })
        .catch((error) => {
            console.log(error)
        })
}

// types
type ActionsType = ReturnType<typeof loginUserAC>
