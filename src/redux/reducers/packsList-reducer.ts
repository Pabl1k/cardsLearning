import {Dispatch} from "redux"
import {CardPacksResponseType, packsListAPI} from "../../api/api"

enum PACKS_LIST_ACTION_TYPE {
    SET_PACKS_LIST = "SET-PACKS-LIST",
    SET_NEW_MAX_VALUE = "SET-NEW-MAX-VALUE"
}

const packsListInitialState: Array<CardPacksResponseType> = []

export const packsListReducer = (state = packsListInitialState, action: PacksListActionsType): Array<CardPacksResponseType> => {
    switch (action.type) {
        case PACKS_LIST_ACTION_TYPE.SET_PACKS_LIST:
            return action.packsList.map(packsList => ({...packsList}))
        default:
            return state
    }
}

// AC
const setPacksListAC = (packsList: Array<CardPacksResponseType>) => ({
    type: PACKS_LIST_ACTION_TYPE.SET_PACKS_LIST,
    packsList
} as const)

export const setDoubleRangeMaxValueAC = (newMaxValue: number) => ({
    type: PACKS_LIST_ACTION_TYPE.SET_NEW_MAX_VALUE,
    newMaxValue
} as const)

// TC
export const fetchCardsTC = (minNumberOfCards: number, maxNumberOfCards: number) => (dispatch: Dispatch) => {
    packsListAPI.getPacks(minNumberOfCards, maxNumberOfCards)
        .then(res => {
            debugger
            console.log(res.data)
            dispatch(setPacksListAC(res.data.cardPacks))
            dispatch(setDoubleRangeMaxValueAC(res.data.maxCardsCount))
        })
        .catch(e => {
            // alert(e.message)
        })
}

type PacksListActionsType = ReturnType<typeof setPacksListAC>
| ReturnType<typeof setDoubleRangeMaxValueAC>

