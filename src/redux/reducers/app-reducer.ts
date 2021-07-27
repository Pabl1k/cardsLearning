const APP_SET_STATUS = 'APP/SET-STATUS'

const initialState = {
    status: 'idle' as RequestStatusType
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}


// actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: APP_SET_STATUS, status} as const)
// types
type InitialStateType = typeof initialState
export type ActionsType = ReturnType<typeof setAppStatusAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
// thunks
/*export const templateTC = () => (dispatch: Dispatch<ActionsType>) => {
    someAPI.someMethod()
        .then(res => {
            // dispatch(templateAC(true, res.data.data.email))
        })
        .catch((error) => {
            // ...some code
        })
        .finally(() => {
            // ...some code
        })
}*/