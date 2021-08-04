import {Dispatch} from "redux"
import {cardsAPI} from "../../api/api";

const initialState: InitialStateType = {

}

type InitialStateType = {

}

export const cardsListReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "CARD/SET-CARDS":
            return state
        default:
            return state
    }
}

// actions
export const setCardsAC = (packId:string) => {
    return {type: "CARD/SET-CARDS", packId} as const
}

// thunks
export const getCardsTC = (packId:string) => (dispatch: Dispatch<ActionsType>) => {
    cardsAPI. getCards(packId)
        .then(res => {
             dispatch(setCardsAC( res.data))
        })
        .catch((error) => {
            // handleServerNetworkError(error, dispatch)
            console.log(error)
        })
        .finally(() => {
        })
}

// types
type ActionsType = ReturnType<typeof setCardsAC>