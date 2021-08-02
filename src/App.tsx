import React, {useEffect} from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "./redux/store"
import {initializeAppTC, RequestStatusType} from "./redux/reducers/app-reducer"
import {Login} from "./components/login/Login"
import {Registration} from "./components/registration/Registration"
import {RestorePassword} from "./components/restorePassword/RestorePassword"
import {UpdatePassword} from "./components/updatePassword/UpdatePassword"
import {PageNotFound} from "./components/pageNotFound/PageNotFound"
import {CheckEmail} from "./components/checkEmail/CheckEmail"
import Preloader from "./components/common/preloader/Preloader"
import s from "./App.module.scss"
import {HeaderMenu} from "./components/common/headerMenu/HeaderMenu";
import {PacksList} from "./components/main/packsList/PacksList";
import {Profile} from "./components/profile/Profile";

function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    return (

        <div>
            <HeaderMenu/>
            <section className={s.pagesContainer}>
                {status === "loading" && <Preloader/>}
                <Switch>
                    <Route exact path={"/"} render={() => <PacksList/>}/>
                    <Route path={"/profile"} render={() => <Profile/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                    <Route path={"/registration"} render={() => <Registration/>}/>
                    <Route path={"/restorePassword"} render={() => <RestorePassword/>}/>
                    <Route path={"/updatePassword/:token"} render={() => <UpdatePassword/>}/>
                    <Route exact path={"/checkEmail"} render={() => <CheckEmail/>}/>
                    <Route path={"/404"} render={() => <PageNotFound/>}/>
                    <Redirect from={"*"} to={"/404"}/>
                </Switch>
            </section>
        </div>

    )
}

export default App