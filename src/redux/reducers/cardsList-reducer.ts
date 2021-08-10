import {ThunkAction} from "redux-thunk"
import {cardsAPI, CardType, GetCardsResponseType} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {SortPacksOrderType} from "./packsList-reducer";

const SET_CARDS = "CARD/SET-CARDS"
const SET_CARD_TOTAL_COUNT = "CARD/SET_CARD_TOTAL_COUNT"
const SET_CARDS_NEW_CURRENT_PAGE = "CARD/SET_CARDS_NEW_CURRENT_PAGE"
const SET_CARDS_NEW_PAGE_COUNT = "CARD/SET_CARDS_NEW_PAGE_COUNT"
const SET_SEARCH_CARDS_VALUE = "CARD/SET_SEARCH_CARDS_VALUE"
const SET_SORT_CARDS = "CARD/SET_SORT_CARDS"
const SET_SORT_ANSWER_CARDS = "CARD/SET_SORT_ANSWER_CARDS"
const SET_SORT_GRADE_CARDS = "CARD/SET_SORT_GRADE_CARDS"

const initialState = {
    cards: [] as Array<CardType>,
    cardsTotalCount: 0,
    pageCount: 10,
    page: 1,
    maxGrade: 0,
    minGrade: 0,
    packUserId: "",
    token: "",
    tokenDeathTime: 0,
    searchCardsValue: "",

    sortCardsFilter: "",
    sortCardsAnswerOrder: 0 as SortCardsOrderType,
    sortCardsGradeOrder: 0 as SortCardsOrderType,
    sortCardsOrder: 0 as SortCardsOrderType,
}

type InitialStateType = typeof initialState

export const cardsListReducer = (state: InitialStateType = initialState, action: CardsListReducerActionsType): InitialStateType => {
    switch (action.type) {
        case SET_CARDS:
            return {...state, ...action.cardsState}
        case SET_CARD_TOTAL_COUNT:
            return {...state, cardsTotalCount: action.cardsTotalCount}
        case "CARD/SET_CARDS_NEW_CURRENT_PAGE":
            return {...state, page: action.newCurrentPage}
        case "CARD/SET_CARDS_NEW_PAGE_COUNT":
            return {...state, pageCount: action.newPageCount}
        case SET_SEARCH_CARDS_VALUE:
            return {...state, searchCardsValue: action.searchCardsValue}
        case SET_SORT_CARDS:
            return {...state, sortCardsOrder: action.sortCardsOrder, sortCardsFilter: action.sortCardsFilter}
        case SET_SORT_ANSWER_CARDS:
            return {
                ...state,
                sortCardsAnswerOrder: action.sortCardsAnswerOrder,
                sortCardsFilter: action.sortCardsFilter
            }
        case SET_SORT_GRADE_CARDS:
            return {
                ...state,
                sortCardsGradeOrder: action.sortCardsGradeOrder,
                sortCardsFilter: action.sortCardsFilter
            }


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

export const setCardsNewCurrentPageAC = (newCurrentPage: number) => ({
    type: SET_CARDS_NEW_CURRENT_PAGE, newCurrentPage
} as const)

export const setCardsNewCardsPageCountAC = (newPageCount: number) => ({
    type: SET_CARDS_NEW_PAGE_COUNT, newPageCount
} as const)

export const setSearchCardsValueAC = (searchCardsValue: string) => ({
    type: SET_SEARCH_CARDS_VALUE, searchCardsValue
} as const)

export const setSortCardAC = (sortCardsOrder: SortPacksOrderType, sortCardsFilter: string) => ({
    type: SET_SORT_CARDS, sortCardsOrder, sortCardsFilter
} as const)
export const setSortAnswerCardAC = (sortCardsAnswerOrder: SortPacksOrderType, sortCardsFilter: string) => ({
    type: SET_SORT_ANSWER_CARDS, sortCardsAnswerOrder, sortCardsFilter
} as const)
export const setSortGradeCardAC = (sortCardsGradeOrder: SortPacksOrderType, sortCardsFilter: string) => ({
    type: SET_SORT_GRADE_CARDS, sortCardsGradeOrder, sortCardsFilter
} as const)

// thunks
export const getCardsTC = (packId: string, page: number, pageCount: number, searchCardsValue: string, sortCardsOrder: SortCardsOrderType, sortCardsFilter: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        // dispatch(setCurrenPageAC(page))

        cardsAPI.getCards(packId, page, pageCount, searchCardsValue, sortCardsOrder, sortCardsFilter)
            .then(res => {

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


export const addCardsTC = (packId: string, question?: string, answer?: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch, getState) => {
        // dispatch(setAppStatusAC("loading"))
        const {page, pageCount, searchCardsValue, sortCardsOrder, sortCardsFilter} = getState().cardsListReducer
        cardsAPI.addCard(packId, question, answer)
            .then(res => {
                dispatch(getCardsTC(packId, page, pageCount, searchCardsValue, sortCardsOrder, sortCardsFilter))
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
export type SortCardsOrderType = 0 | 1
export type CardsListReducerActionsType = ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCardTotalCountAC>
    | ReturnType<typeof setCardsNewCardsPageCountAC>
    | ReturnType<typeof setCardsNewCurrentPageAC>
    | ReturnType<typeof setSearchCardsValueAC>
    | ReturnType<typeof setSortCardAC>
    | ReturnType<typeof setSortAnswerCardAC>
    | ReturnType<typeof setSortGradeCardAC>