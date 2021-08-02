import {Dispatch} from "redux";
import {profileAPI} from "../../api/api";

const MAX_CARDS_COUNT = 'MAX-CARDS-COUNT'
export type CardPacksType = {
    _id: string
    user_id?: string
    user_name?: string
    private?: boolean
    name: string
    path?: string
    grade?: number
    shots?: number
    cardsCount?: number | undefined
    type: string
    rating?: number
    created?: string | undefined
    updated?: string
    more_id?: string
    __v?: number
}

const initialState = {
    cardPacks: [] as CardPacksType[],
    page: 1,
    pageCount: 4,
    cardPacksTotalCount: 2520,
    minCardsCount: 0,
    maxCardsCount: 103,
    token: '',
    tokenDeathTime: 1627834611541
}
type CardPacksInitialStateType = typeof initialState

export const cardPacksReducer = (state = initialState, action: ActionsType): CardPacksInitialStateType => {
    switch (action.type) {
        case "MAX-CARDS-COUNT":
            return {...state, maxCardsCount: action.maxCount}
        default:
            return state
    }
}

// AC
const maxCardsCountAC = (maxCount: number) => ({type: MAX_CARDS_COUNT, maxCount} as const)

// TC
export const fetchCardsTC = () => (dispatch: Dispatch) => {
    profileAPI.getCards()
        .then(res => {
            console.log(res.data)
            // dispatch(maxCardsCountAC(res.data.maxCardsCount))
        })
        .catch(er => {
            alert(er.message)
        })
}

type ActionsType = ReturnType<typeof maxCardsCountAC>