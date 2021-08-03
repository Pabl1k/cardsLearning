enum DOUBLE_RANGE_ACTION_TYPE {
    SET_NEW_MAX_VALUE = 'SET-NEW-MAX-VALUE',
    SET_CURRENT_MAX_VALUE = 'SET-CURRENT-MAX-VALUE',
    SET_CURRENT_MIN_VALUE = 'SET-CURRENT-MIN-VALUE'
}

type DoubleRangeInitialStateType = typeof doubleRangeInitialState

const doubleRangeInitialState = {
    minValue: 1,
    maxValue: 20,
    currentMinValue: 1,
    currentMaxValue: 20,
}

export const doubleRangeReducer = (state = doubleRangeInitialState, action: DoubleRangeActionType): DoubleRangeInitialStateType => {
    switch (action.type) {
        case DOUBLE_RANGE_ACTION_TYPE.SET_NEW_MAX_VALUE:
            return {...state, maxValue: action.newMaxValue}
        case DOUBLE_RANGE_ACTION_TYPE.SET_CURRENT_MAX_VALUE:
            return {...state, currentMaxValue: action.currentMax}
        case DOUBLE_RANGE_ACTION_TYPE.SET_CURRENT_MIN_VALUE:
            return {...state, currentMinValue: action.currentMin}
        default:
            return state
    }
}

// AC
export const setDoubleRangeMaxValueAC = (newMaxValue: number) => ({
    type: DOUBLE_RANGE_ACTION_TYPE.SET_NEW_MAX_VALUE,
    newMaxValue
} as const)

export const setDoubleRangeCurrentMaxValueAC = (currentMax: number) => ({type: DOUBLE_RANGE_ACTION_TYPE.SET_CURRENT_MAX_VALUE, currentMax} as const)
export const setDoubleRangeCurrentMinValueAC = (currentMin: number) => ({type: DOUBLE_RANGE_ACTION_TYPE.SET_CURRENT_MIN_VALUE, currentMin} as const)

type DoubleRangeActionType =
    ReturnType<typeof setDoubleRangeMaxValueAC>
    | ReturnType<typeof setDoubleRangeCurrentMaxValueAC>
    | ReturnType<typeof setDoubleRangeCurrentMinValueAC>
