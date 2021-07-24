import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from "redux-thunk"
import {restorePasswordReducer} from "./reducers/restorePassword-reducer"
import {updatePasswordReducer} from "./reducers/updatePassword-reducer"
import {registrationReducer} from "./reducers/registration-reducer";
import { loginReducer } from "./reducers/login-reducer";

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    registrationReducer: registrationReducer,
    restorePasswordReducer: restorePasswordReducer,
    updatePasswordReducer: updatePasswordReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store