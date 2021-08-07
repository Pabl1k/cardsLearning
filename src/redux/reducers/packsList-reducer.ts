import {ThunkAction} from "redux-thunk"
import {CardPacksResponseType, GetPacksResponseType, packsListAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

const SET_PACKS_LIST_STATE = "SET_PACKS_LIST_STATE"
const CHANGE_TABS_SHOW_PACKS_STATUS = "CHANGE_TABS_SHOW_PACKS_STATUS"
const SET_DOUBLE_RANGE_VALUES = "SET_DOUBLE_RANGE_VALUES"
const SET_NEW_SEARCH_PACKS_VALUE = "SET_NEW_SEARCH_PACKS_VALUE"
const SET_NEW_CURRENT_PAGE = "SET_NEW_CURRENT_PAGE"
const SET_NEW_PAGE_COUNT = "SET_NEW_PAGE_COUNT"

const initialState = {
    cardPacks: [] as Array<CardPacksResponseType>,
    cardPacksTotalCount: 0, // общее кол-во карт
    minCardsCount: 0, // значение минимального кол-ва карт для двойного ползунка (по умолчанию)
    maxCardsCount: 0, // значение максимального кол-ва карт для двойного ползунка (по умолчанию)
    page: 1, // номер текущей страницы
    pageCount: 10, // кол-во страниц, которое будет отображаться в таблице
    token: "",
    tokenDeathTime: 0,

    user_id: "", // id авторизированного пользователя

    isShowMyPacks: false, // статус для переключения My и All (по умолчанию All)
    minCardsDoubleRangeValue: 0,
    maxCardsDoubleRangeValue: 0,
    sortPacksOrder: 0, // значение для сортировки по какому-либо пункту.
    sortPacksFilter: "" as SortPacksFilter, // значение для выбора колонки для фильтра
    searchPacksValue: "", // значение для поиска паков
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
            })
            .catch(e => {
                console.log(e.message)
            })
    }

export const deletePackTC = (packId: string, packName: string, min: number, max: number, sortPacksOrder: number, sortPacksFilter: string, page: number, pageCount: number, user_id: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        packsListAPI.deletePack(packId)
            .then(res => {
                console.log("ПАК УДАЛЁН")
                console.log(res.data)
                dispatch(fetchPacksTC(packName, min, max, sortPacksOrder, sortPacksFilter, page, pageCount, user_id))
            })
            .catch(e => {
                console.log("ОШИБКА УДАЛЕНИЯ ПАКА")
                console.log(e.message)
            })
    }


export type SortPacksFilter = "" | "cards" | "lastUpdated"

export type PacksListReducerActionsType = ReturnType<typeof setPacksListStateAC>
    | ReturnType<typeof changeShowAllOrMyPacksAC>
    | ReturnType<typeof setDoubleRangesValuesAC>
    | ReturnType<typeof setSearchPacksValueAC>
    | ReturnType<typeof setNewCurrentPageAC>
    | ReturnType<typeof setNewPageCountAC>
