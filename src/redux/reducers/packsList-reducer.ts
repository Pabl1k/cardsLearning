import {ThunkAction} from "redux-thunk"
import {CardPacksResponseType, GetPacksResponseType, packsListAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

const SET_PACKS_LIST = "SET-PACKS-LIST"
const CHANGE_TABS_SHOW_PACKS_STATUS = "CHANGE_TABS_SHOW_PACKS_STATUS"

type InitialStateType = {
    cardPacks: Array<CardPacksResponseType>
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    page: number
    pageCount: number
    token: string,
    tokenDeathTime: number,

    user_id: string

    tabsShowPacksStatus: TabsShowPacksStatusType
}

const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 1,
    pageCount: 0,
    token: "",
    tokenDeathTime: 0,

    user_id: "",

    tabsShowPacksStatus: 1
}

export const packsListReducer = (state = initialState, action: PacksListReducerActionsType): InitialStateType => {
    switch (action.type) {
        case SET_PACKS_LIST:
            return {
                ...state,
                ...action.packsState
            }
        case CHANGE_TABS_SHOW_PACKS_STATUS:
            return {...state, tabsShowPacksStatus: action.tabsShowPacksStatus}
        default:
            return state
    }
}

// AC
const setPacksListStateAC = (packsState: GetPacksResponseType) => (
    {type: SET_PACKS_LIST, packsState} as const)

const changesTabsShowPacksStatusAC = (tabsShowPacksStatus: TabsShowPacksStatusType) => (
    {type: CHANGE_TABS_SHOW_PACKS_STATUS, tabsShowPacksStatus} as const)

// TC
export const fetchPacksStateTC = (page: number): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        packsListAPI.getPacks(page)
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

export const fetchPacksStateAfterTabsShowTC = (tabsShowPacksStatus: TabsShowPacksStatusType, user_id?: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        packsListAPI.getPacksAfterTabsShow(user_id)
            .then(res => {
                console.log(res.data)
                dispatch(setPacksListStateAC(res.data))
                changesTabsShowPacksStatusAC(tabsShowPacksStatus)
                // dispatch(setAppStatusAC("succeeded"))
            })
            .catch(e => {
                console.log(e.message)
                //dispatch(setAppStatusAC("failed"))
            })
    }

export const addNewPackTC = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        /* packsListAPI.addPack()
             .then(res => {
                 dispatch(fetchPacksStateTC())
                 // dispatch(setAppStatusAC("succeeded"))
             })
             .catch(e => {
                 console.log(e.message)
                 // dispatch(setAppStatusAC("failed"))
             })*/
    }

/*export const deletePackTC = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        packsListAPI.deletePack()
            .then(res => {
                dispatch(fetchPacksStateTC())
                // dispatch(setAppStatusAC("succeeded"))
            })
            .catch(e => {
                console.log(e.message)
                // dispatch(setAppStatusAC("failed"))
            })
    }*/

export type TabsShowPacksStatusType = 0 | 1
export type PacksListReducerActionsType = ReturnType<typeof setPacksListStateAC>
    | ReturnType<typeof changesTabsShowPacksStatusAC>