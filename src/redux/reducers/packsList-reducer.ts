import {ThunkAction} from "redux-thunk"
import {PackResponseType, GetPacksResponseType, packsListAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

enum PACKS_LIST_ACTIONS_TYPES {
    SET_PACKS_LIST_STATE = "SET_PACKS_LIST_STATE",
    CHANGE_TABS_SHOW_PACKS_STATUS = "CHANGE_TABS_SHOW_PACKS_STATUS",
    SET_DOUBLE_RANGE_VALUES = "SET_DOUBLE_RANGE_VALUES",
    SET_NEW_SEARCH_PACKS_VALUE = "SET_NEW_SEARCH_PACKS_VALUE",
    SET_NEW_SORT_PACKS_ORDER_AND_FILTER = "SET_NEW_SORT_PACKS_ORDER_AND_FILTER",
    SET_NEW_CURRENT_PAGE = "SET_NEW_CURRENT_PAGE",
    SET_NEW_PAGE_COUNT = "SET_NEW_PAGE_COUNT"
}

const initialState = {
    cardPacks: [] as Array<PackResponseType>,
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
        case PACKS_LIST_ACTIONS_TYPES.SET_PACKS_LIST_STATE:
            return {...state, ...action.packsState}
        case PACKS_LIST_ACTIONS_TYPES.CHANGE_TABS_SHOW_PACKS_STATUS:
            return {...state, isShowMyPacks: action.isShowMyPacks, user_id: action.userId}
        case PACKS_LIST_ACTIONS_TYPES.SET_DOUBLE_RANGE_VALUES:
            return {
                ...state,
                minCardsDoubleRangeValue: action.minCardsDoubleRangeValue,
                maxCardsDoubleRangeValue: action.maxCardsDoubleRangeValue
            }
        case PACKS_LIST_ACTIONS_TYPES.SET_NEW_SEARCH_PACKS_VALUE:
            return {...state, searchPacksValue: action.searchPacksValue}
        case PACKS_LIST_ACTIONS_TYPES.SET_NEW_SORT_PACKS_ORDER_AND_FILTER:
            return {...state, sortPacksOrder: action.sortPacksOrder, sortPacksFilter: action.sortPacksFilter}
        case PACKS_LIST_ACTIONS_TYPES.SET_NEW_CURRENT_PAGE:
            return {...state, page: action.page}
        case PACKS_LIST_ACTIONS_TYPES.SET_NEW_PAGE_COUNT:
            return {...state, pageCount: action.pageCount}
        default:
            return state
    }
}

// AC
export const setPacksListStateAC = (packsState: GetPacksResponseType) => (
    {type: PACKS_LIST_ACTIONS_TYPES.SET_PACKS_LIST_STATE, packsState} as const)

export const changeShowAllOrMyPacksAC = (isShowMyPacks: boolean, userId: string) => (
    {type: PACKS_LIST_ACTIONS_TYPES.CHANGE_TABS_SHOW_PACKS_STATUS, isShowMyPacks, userId} as const)

export const setDoubleRangesValuesAC = (minCardsDoubleRangeValue: number, maxCardsDoubleRangeValue: number) => (
    {
        type: PACKS_LIST_ACTIONS_TYPES.SET_DOUBLE_RANGE_VALUES,
        minCardsDoubleRangeValue,
        maxCardsDoubleRangeValue
    } as const)

export const setSearchPacksValueAC = (searchPacksValue: string) => (
    {type: PACKS_LIST_ACTIONS_TYPES.SET_NEW_SEARCH_PACKS_VALUE, searchPacksValue} as const)

export const setNewSortPacksOrderAndFilterAC = (sortPacksOrder: SortPacksOrderType, sortPacksFilter: string) => (
    {type: PACKS_LIST_ACTIONS_TYPES.SET_NEW_SORT_PACKS_ORDER_AND_FILTER, sortPacksOrder, sortPacksFilter} as const)

export const setNewCurrentPageAC = (page: number) => (
    {type: PACKS_LIST_ACTIONS_TYPES.SET_NEW_CURRENT_PAGE, page} as const)

export const setNewPageCountAC = (pageCount: number) => (
    {type: PACKS_LIST_ACTIONS_TYPES.SET_NEW_PAGE_COUNT, pageCount} as const)

// TC
export const fetchPacksTC = (searchPacksValue: string, min: number, max: number, sortPacksOrder: number, sortPacksFilter: string, page: number, pageCount: number, user_id: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            // dispatch(setAppStatusAC("loading"))
            const res = await packsListAPI.getPacks(searchPacksValue, min, max, sortPacksOrder, sortPacksFilter, page, pageCount, user_id)
            dispatch(setPacksListStateAC(res.data))
            // dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Get packs failed: ${e.message}.`)
            console.log(error)
        } finally {
            // some code...
        }
    }

export const addNewPackTC = (packName: string, searchPacksValue: string, min: number, max: number, sortPacksOrder: number, sortPacksFilter: string, page: number, pageCount: number, user_id: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            const res = await packsListAPI.addPack(packName)
            dispatch(fetchPacksTC(searchPacksValue, min, max, sortPacksOrder, sortPacksFilter, page, pageCount, user_id))
            dispatch(changeShowAllOrMyPacksAC(true, user_id))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Add pack failed: ${e.message}.`)
            console.log(error)
        } finally {
            // some code...
        }
    }

export const updatePackTC = (newPackName: string, packId: string, searchPacksValue: string, min: number, max: number, sortPacksOrder: number, sortPacksFilter: string, page: number, pageCount: number, user_id: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            const res = await packsListAPI.updatePack(newPackName, packId)
            dispatch(fetchPacksTC(searchPacksValue, min, max, sortPacksOrder, sortPacksFilter, page, pageCount, user_id))
            dispatch(changeShowAllOrMyPacksAC(true, user_id))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Update pack failed: ${e.message}.`)
            console.log(error)
        } finally {
            // some code...
        }
    }

export const deletePackTC = (packId: string, packName: string, min: number, max: number, sortPacksOrder: number, sortPacksFilter: string, page: number, pageCount: number, user_id: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            const res = await packsListAPI.deletePack(packId)
            dispatch(fetchPacksTC(packName, min, max, sortPacksOrder, sortPacksFilter, page, pageCount, user_id))
            dispatch(changeShowAllOrMyPacksAC(true, user_id))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Delete pack failed: ${e.message}.`)
            console.log(error)
        } finally {
            // some code...
        }
    }

export type SortPacksOrderType = 0 | 1
export type PacksListReducerActionsType = ReturnType<typeof setPacksListStateAC>
    | ReturnType<typeof changeShowAllOrMyPacksAC>
    | ReturnType<typeof setDoubleRangesValuesAC>
    | ReturnType<typeof setSearchPacksValueAC>
    | ReturnType<typeof setNewSortPacksOrderAndFilterAC>
    | ReturnType<typeof setNewCurrentPageAC>
    | ReturnType<typeof setNewPageCountAC>
