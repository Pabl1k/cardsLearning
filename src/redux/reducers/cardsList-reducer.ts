import {ThunkAction} from "redux-thunk"
import {cardsAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

const initialState: InitialStateType = {}

type InitialStateType = {}

export const cardsListReducer = (state: InitialStateType = initialState, action: CardsListReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "CARD/SET-CARDS":
            return state
        default:
            return state
    }
}

// actions
export const setCardsAC = (packId: string) => {
    return {type: "CARD/SET-CARDS", packId} as const
}

// thunks
export const getCardsTC = (packId: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        cardsAPI.getCards(packId)
            .then(res => {
                dispatch(setCardsAC(res.data))
                // dispatch(setAppStatusAC("succeeded"))
            })
            .catch((e) => {
                console.log(e)
                // dispatch(setAppStatusAC("failed"))
            })
            .finally(() => {
                // some code...
            })
    }

// types
export type CardsListReducerActionsType = ReturnType<typeof setCardsAC>