import {Dispatch} from "redux"
import {CardPacksResponseType, GetPacksResponseType, packsListAPI} from "../../api/api"

enum PACKS_LIST_ACTION_TYPE {
    SET_PACKS_LIST = "SET-PACKS-LIST",
}

const packsListInitialState = {
    cardPacks: [] as Array<CardPacksResponseType>,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 0,
    pageCount: 0,
    token: "",
    tokenDeathTime: 0
}

type PackStateType = typeof packsListInitialState

export const packsListReducer = (state = packsListInitialState, action: PacksListActionsType): PackStateType => {
    switch (action.type) {
        case PACKS_LIST_ACTION_TYPE.SET_PACKS_LIST:
            return action.packsState
        default:
            return state
    }
}

// AC
const setPacksListStateAC = (packsState: GetPacksResponseType) => (
    {type: PACKS_LIST_ACTION_TYPE.SET_PACKS_LIST, packsState} as const)

// TC
export const fetchPacksStateTC = () => (dispatch: Dispatch) => {
    packsListAPI.getPacks()
        .then(res => {
            dispatch(setPacksListStateAC(res.data))
        })
        .catch(e => {
            // alert(e.message)
        })
}

type PacksListActionsType = ReturnType<typeof setPacksListStateAC>