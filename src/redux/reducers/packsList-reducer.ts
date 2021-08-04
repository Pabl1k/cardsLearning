import {Dispatch} from "redux"
import {CardPacksResponseType, GetPacksResponseType, packsListAPI} from "../../api/api"

enum PACKS_LIST_ACTION_TYPE {
    SET_PACKS_LIST = "SET-PACKS-LIST",
}

const packsListInitialState = {
    cardPacks: [] as Array<CardPacksResponseType>,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
    token: '',
    tokenDeathTime: 0
}
type PackStateType = typeof packsListInitialState

export const packsListReducer = (state = packsListInitialState, action: PacksListActionsType): PackStateType => {
    switch (action.type) {
        case PACKS_LIST_ACTION_TYPE.SET_PACKS_LIST:
            debugger
            return action.packsState
        default:
            debugger
            return state
    }
}

// AC
const setPacksStateAC = (packsState: GetPacksResponseType) => ({
    type: PACKS_LIST_ACTION_TYPE.SET_PACKS_LIST,
    packsState
} as const)

// TC
export const fetchCardsStateTC = () => (dispatch: Dispatch) => {
    packsListAPI.getPacks()
        .then(res => {
            debugger
            dispatch(setPacksStateAC(res.data))
        })
        .catch(e => {
            // alert(e.message)
        })
}

type PacksListActionsType = ReturnType<typeof setPacksStateAC>