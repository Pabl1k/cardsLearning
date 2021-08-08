import {ThunkAction} from "redux-thunk"
import {CardPacksResponseType, GetPacksResponseType, packsListAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

const SET_PACKS_LIST_STATE = "SET_PACKS_LIST_STATE"
const CHANGE_TABS_SHOW_PACKS_STATUS = "CHANGE_TABS_SHOW_PACKS_STATUS"
const SET_DOUBLE_RANGE_VALUES = "SET_DOUBLE_RANGE_VALUES"
const SET_NEW_SEARCH_PACKS_VALUE = "SET_NEW_SEARCH_PACKS_VALUE"
const SET_NEW_SORT_PACKS_ORDER_AND_FILTER = "SET_NEW_SORT_PACKS_ORDER_AND_FILTER"
const SET_NEW_CURRENT_PAGE = "SET_NEW_CURRENT_PAGE"
const SET_NEW_PAGE_COUNT = "SET_NEW_PAGE_COUNT"

const initialState = {
    cardPacks: [] as Array<CardPacksResponseType>,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 1,
    pageCount: 10,
    token: "",
    tokenDeathTime: 0,

    user_id: "",

    isShowMyPacks: false,
    minCardsDoubleRangeValue: 0,
    maxCardsDoubleRangeValue: 0,
    searchPacksValue: "",
    sortPacksOrder: 0 as SortPacksOrderType,
    sortPacksFilter: "",

}

type InitialStateType = typeof initialState

export const packsListReducer = (state = initialState, action: PacksListReducerActionsType): InitialStateType => {
    switch (action.type) {
        case SET_PACKS_LIST_STATE:
            return {...state, ...action.packsState}
        case CHANGE_TABS_SHOW_PACKS_STATUS:
            return {...state, isShowMyPacks: action.isShowMyPacks, user_id: action.userId}
        case SET_DOUBLE_RANGE_VALUES:
            return {...state, minCardsDoubleRangeValue: action.minCardsDoubleRangeValue, maxCardsDoubleRangeValue: action.maxCardsDoubleRangeValue}
        case SET_NEW_SEARCH_PACKS_VALUE:
            return {...state, searchPacksValue: action.searchPacksValue}
        case SET_NEW_SORT_PACKS_ORDER_AND_FILTER:
            return {...state, sortPacksOrder: action.sortPacksOrder, sortPacksFilter: action.sortPacksFilter}
        case SET_NEW_CURRENT_PAGE:
            return {...state, page: action.page}
        case SET_NEW_PAGE_COUNT:
            return {...state, pageCount: action.pageCount}
        default:
            return state
    }
}

// AC
export const setPacksListStateAC = (packsState: GetPacksResponseType) => {
    return {type: SET_PACKS_LIST_STATE, packsState} as const
}

export const changeShowAllOrMyPacksAC = (isShowMyPacks: boolean, userId: string) => (
    {type: CHANGE_TABS_SHOW_PACKS_STATUS, isShowMyPacks, userId} as const
)

export const setDoubleRangesValuesAC = (minCardsDoubleRangeValue: number, maxCardsDoubleRangeValue: number) => (
    {type: SET_DOUBLE_RANGE_VALUES, minCardsDoubleRangeValue, maxCardsDoubleRangeValue} as const
)

export const setSearchPacksValueAC = (searchPacksValue: string) => (
    {type: SET_NEW_SEARCH_PACKS_VALUE, searchPacksValue} as const
)

export const setNewSortPacksOrderAndFilterAC = (sortPacksOrder: SortPacksOrderType, sortPacksFilter: string) => (
    {type: SET_NEW_SORT_PACKS_ORDER_AND_FILTER, sortPacksOrder, sortPacksFilter} as const
)

export const setNewCurrentPageAC = (page: number) => (
    {type: SET_NEW_CURRENT_PAGE, page} as const
)

export const setNewPageCountAC = (pageCount: number) => (
    {type: SET_NEW_PAGE_COUNT, pageCount} as const
)

// TC
export const fetchPacksTC = (packName: string, min: number, max: number, sortPacksOrder: number, sortPacksFilter: string, page: number, pageCount: number, user_id: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        packsListAPI.getPacks(packName, min, max, sortPacksOrder, sortPacksFilter, page, pageCount, user_id)
            .then(res => {
                console.log(res.data)
                dispatch(setPacksListStateAC(res.data))
                // dispatch(setAppStatusAC("succeeded"))
            })
            .catch(e => {
                console.log(e.message)
                //dispatch(setAppStatusAC("failed"))
            })
    }

export const addNewPackTC = (packName: string, min: number, max: number, sortPacksOrder: number, sortPacksFilter: string, page: number, pageCount: number, user_id: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        packsListAPI.addPack()
            .then(res => {
                console.log(res.data)
                dispatch(fetchPacksTC(packName, min, max, sortPacksOrder, sortPacksFilter, page, pageCount, user_id))
                dispatch(changeShowAllOrMyPacksAC(true, user_id))
            })
            .catch(e => {
                console.log(e.message)
            })
    }

export const deletePackTC = (packId: string, packName: string, min: number, max: number, sortPacksOrder: number, sortPacksFilter: string, page: number, pageCount: number, user_id: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        packsListAPI.deletePack(packId)
            .then(res => {
                console.log(res.data)
                dispatch(fetchPacksTC(packName, min, max, sortPacksOrder, sortPacksFilter, page, pageCount, user_id))
            })
            .catch(e => {
                console.log(e.message)
            })
    }


export type SortPacksOrderType = 0 | 1
export type PacksListReducerActionsType = ReturnType<typeof setPacksListStateAC>
    | ReturnType<typeof changeShowAllOrMyPacksAC>
    | ReturnType<typeof setDoubleRangesValuesAC>
    | ReturnType<typeof setSearchPacksValueAC>
    | ReturnType<typeof setNewSortPacksOrderAndFilterAC>
    | ReturnType<typeof setNewCurrentPageAC>
    | ReturnType<typeof setNewPageCountAC>
