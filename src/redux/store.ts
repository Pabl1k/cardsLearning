import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from "redux-thunk"
import {appReducer} from "./reducers/app-reducer"
import {loginReducer} from "./reducers/login-reducer"
import {profileReducer} from "./reducers/profile-reducer"
import {registrationReducer} from "./reducers/registration-reducer"
import {restorePasswordReducer} from "./reducers/restorePassword-reducer"
import {updatePasswordReducer} from "./reducers/updatePassword-reducer"
import {packsListReducer} from "./reducers/packsList-reducer";

const rootReducer = combineReducers({
    appReducer: appReducer,
    loginReducer: loginReducer,
    profileReducer: profileReducer,
    registrationReducer: registrationReducer,
    restorePasswordReducer: restorePasswordReducer,
    updatePasswordReducer: updatePasswordReducer,
    packsList: packsListReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store