import {Dispatch} from "redux"
import {paksListAPI} from "../../api/api"

const MAX_CARDS_COUNT = "MAX-CARDS-COUNT"
const SET_NAME = "SET-NAME"

const initialState: Array<any> = []

export const packsListReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "MAX-CARDS-COUNT":
            return {...state, maxCardsCount: action.maxCount}
        case SET_NAME:
            return action.name.map((name: { name: any }) => name.name)
        default:
            return state
    }
}

// AC
const maxCardsCountAC = (maxCount: number) => ({type: MAX_CARDS_COUNT, maxCount} as const)

const setNameAC = (name: any) => ({type: SET_NAME, name} as const)

// TC
export const fetchCardsTC = () => (dispatch: Dispatch) => {
    paksListAPI.getPacks()
        .then(res => {
            debugger
            console.log(res.data)
            dispatch(setNameAC(res.data.cardPacks))
        })
        .catch(e => {
            // alert(e.message)
        })
}

type ActionsType = ReturnType<typeof maxCardsCountAC>
    | ReturnType<typeof setNameAC>