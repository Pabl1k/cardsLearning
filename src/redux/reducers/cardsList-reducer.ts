import {Dispatch} from "redux"
import {cardsAPI, CardType, GetCardsResponseType} from "../../api/api"

const SET_CARDS = "CARD/SET-CARDS"

const cardsInitialState = {
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

type cardsInitialStateType = typeof cardsInitialState

export const cardsListReducer = (state = cardsInitialState, action: ActionsType): cardsInitialStateType => {
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
export const getCardsTC = (packId: string) => (dispatch: Dispatch<ActionsType>) => {
    cardsAPI.getCards(packId)
        .then(res => {

            console.log(res.data)
            dispatch(setCardsAC(res.data))
        })
        .catch((error) => {
            // handleServerNetworkError(error, dispatch)
            console.log(error)
        })
        .finally(() => {
        })
}

// types
type ActionsType = ReturnType<typeof setCardsAC>