import {ThunkAction} from "redux-thunk"
import {cardsAPI, CardType, GetCardsResponseType} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"

const SET_CARDS = "CARD/SET-CARDS"
const SET_CARD_TOTAL_COUNT = "CARD/SET_CARD_TOTAL_COUNT"
const initialState = {
    cards: [] as Array<CardType>,
    cardsTotalCount: 0,
    pageCount: 6,
    page: 1,
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
        case SET_CARD_TOTAL_COUNT:
            return {...state, cardsTotalCount: action.cardsTotalCount}
        default:
            return state
    }
}

// actions
export const setCardsAC = (cardsState: GetCardsResponseType) =>
    ({type: SET_CARDS, cardsState} as const)

export const setCardTotalCountAC = (cardsTotalCount: number) => ({
    type: SET_CARD_TOTAL_COUNT, cardsTotalCount
} as const)
// thunks
export const getCardsTC = (packId: string, page?: number): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        // dispatch(setCurrenPageAC(page))
        cardsAPI.getCards(packId, page)
            .then(res => {
                debugger
                dispatch(setCardsAC(res.data))
                 dispatch(setCardTotalCountAC(res.data.cardsTotalCount))
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
    | ReturnType<typeof setCardTotalCountAC>