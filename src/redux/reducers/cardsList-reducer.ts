import {ThunkAction} from "redux-thunk"
import {cardsAPI, CardType, GetCardsResponseType} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {SortPacksOrderType} from "./packsList-reducer"

enum CARDS_LIST_ACTIONS_TYPES {
    SET_CARDS = "SET-CARDS",
    SET_CARD_TOTAL_COUNT = "SET_CARD_TOTAL_COUNT",
    SET_CARDS_NEW_CURRENT_PAGE = "SET_CARDS_NEW_CURRENT_PAGE",
    SET_CARDS_NEW_PAGE_COUNT = "SET_CARDS_NEW_PAGE_COUNT",
    SET_SEARCH_CARDS_VALUE = "SET_SEARCH_CARDS_VALUE",
    SET_SORT_CARDS = "SET_SORT_CARDS",
    SET_SORT_ANSWER_CARDS = "SET_SORT_ANSWER_CARDS",
    SET_SORT_GRADE_CARDS = "SET_SORT_GRADE_CARDS"
}

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
        case CARDS_LIST_ACTIONS_TYPES.SET_CARDS:
            return {...state, ...action.cardsState}
        case CARDS_LIST_ACTIONS_TYPES.SET_CARD_TOTAL_COUNT:
            return {...state, cardsTotalCount: action.cardsTotalCount}
        case CARDS_LIST_ACTIONS_TYPES.SET_CARDS_NEW_CURRENT_PAGE:
            return {...state, page: action.newCurrentPage}
        case CARDS_LIST_ACTIONS_TYPES.SET_CARDS_NEW_PAGE_COUNT:
            return {...state, pageCount: action.newPageCount}
        case CARDS_LIST_ACTIONS_TYPES.SET_SEARCH_CARDS_VALUE:
            return {...state, searchCardsValue: action.searchCardsValue}
        case CARDS_LIST_ACTIONS_TYPES.SET_SORT_CARDS:
            return {...state, sortCardsOrder: action.sortCardsOrder, sortCardsFilter: action.sortCardsFilter}
        case CARDS_LIST_ACTIONS_TYPES.SET_SORT_ANSWER_CARDS:
            return {
                ...state,
                sortCardsAnswerOrder: action.sortCardsAnswerOrder,
                sortCardsFilter: action.sortCardsFilter
            }
        case CARDS_LIST_ACTIONS_TYPES.SET_SORT_GRADE_CARDS:
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
export const setCardsAC = (cardsState: GetCardsResponseType) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_CARDS, cardsState} as const)

export const setCardTotalCountAC = (cardsTotalCount: number) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_CARD_TOTAL_COUNT, cardsTotalCount} as const)

export const setCardsNewCurrentPageAC = (newCurrentPage: number) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_CARDS_NEW_CURRENT_PAGE, newCurrentPage} as const)

export const setCardsNewCardsPageCountAC = (newPageCount: number) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_CARDS_NEW_PAGE_COUNT, newPageCount} as const)

export const setSearchCardsValueAC = (searchCardsValue: string) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_SEARCH_CARDS_VALUE, searchCardsValue} as const)

export const setSortCardAC = (sortCardsOrder: SortPacksOrderType, sortCardsFilter: string) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_SORT_CARDS, sortCardsOrder, sortCardsFilter} as const)

export const setSortAnswerCardAC = (sortCardsAnswerOrder: SortPacksOrderType, sortCardsFilter: string) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_SORT_ANSWER_CARDS, sortCardsAnswerOrder, sortCardsFilter} as const)

export const setSortGradeCardAC = (sortCardsGradeOrder: SortPacksOrderType, sortCardsFilter: string) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_SORT_GRADE_CARDS, sortCardsGradeOrder, sortCardsFilter} as const)

// thunks
export const getCardsTC = (packId: string, page: number, pageCount: number, searchCardsValue: string, sortCardsOrder: SortCardsOrderType, sortCardsFilter: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
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

export const addCardTC = (packId: string, question?: string, answer?: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch, getState) => {
        const {page, pageCount, searchCardsValue, sortCardsOrder, sortCardsFilter} = getState().cardsListReducer
        cardsAPI.addCard(packId, question, answer)
            .then(res => {
                dispatch(getCardsTC(packId, page, pageCount, searchCardsValue, sortCardsOrder, sortCardsFilter))
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                // some code...
            })
    }

export const updateCardTC = (packId: string, cardId: string, newCardQuestion: string, newCardAnswer: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch, getState) => {
        const {page, pageCount, searchCardsValue, sortCardsOrder, sortCardsFilter} = getState().cardsListReducer
        cardsAPI.updateCard(cardId, newCardQuestion, newCardAnswer)
            .then(res => {
                console.log(res.data)
                dispatch(getCardsTC(packId, page, pageCount, searchCardsValue, sortCardsOrder, sortCardsFilter))
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                // some code...
            })
    }

export const deleteCardTC = (packId: string, cardId: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch, getState) => {
        const {page, pageCount, searchCardsValue, sortCardsOrder, sortCardsFilter} = getState().cardsListReducer
        cardsAPI.deleteCard(cardId)
            .then(res => {
                dispatch(getCardsTC(packId, page, pageCount, searchCardsValue, sortCardsOrder, sortCardsFilter))
            })
            .catch((e) => {
                console.log(e)
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