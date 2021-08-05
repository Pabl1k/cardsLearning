import {ThunkAction} from "redux-thunk"
import {cardsAPI, CardType, GetCardsResponseType} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

const SET_CARDS = "CARD/SET-CARDS"

const initialState = {
    cards: [] as Array<CardType>,
    cardsTotalCount: 0,
    pageCount: 0,
    page: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: "",
    token: "",
    tokenDeathTime: 0,
}

type InitialStateType = typeof initialState

export const cardsListReducer = (state: InitialStateType = initialState, action: CardsListReducerActionsType): InitialStateType => {
    switch (action.type) {
        case SET_CARDS:
            return action.cardsState
        default:
            return state
    }
}

// actions
export const setCardsAC = (cardsState: GetCardsResponseType) =>
    ({type: SET_CARDS, cardsState} as const)

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