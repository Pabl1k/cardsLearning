import React, {useEffect} from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {initializeAppTC, RequestStatusType} from "./redux/reducers/app-reducer"
import {Header} from "./components/common/header/Header"
import {Profile} from "./components/profile/Profile"
import {Login} from "./components/login/Login"
import {Registration} from "./components/registration/Registration"
import {RestorePassword} from "./components/restorePassword/RestorePassword"
import {UpdatePassword} from "./components/updatePassword/UpdatePassword"
import {PageNotFound} from "./components/pageNotFound/PageNotFound"
import {CheckEmail} from "./components/checkEmail/CheckEmail"
import s from "./App.module.scss"
import {AppRootStateType} from "./redux/store";
import {CircularProgress} from "@material-ui/core";

function App() {

    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (status === "loading") {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <section className={s.pagesContainer}>
            <Header/>
            {/*{status === "loading" && <LinearProgress color="secondary"/>}*/}
            <Switch>
                <Route exact path={"/profile"} render={() => <Profile/>}/>
                <Route path={"/login"} render={() => <Login/>}/>
                <Route path={"/registration"} render={() => <Registration/>}/>
                <Route path={"/restorePassword"} render={() => <RestorePassword/>}/>
                <Route path={"/updatePassword"} render={() => <UpdatePassword/>}/>
                <Route path={"/404"} render={() => <PageNotFound/>}/>
                <Route exact path={"/checkEmail"} render={() => <CheckEmail/>}/>
                <Redirect from={"*"} to={"/404"}/>
            </Switch>
        </section>
    )
}

export default App