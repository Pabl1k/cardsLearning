import React from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import {Header} from "./components/common/header/Header"
import {Profile} from "./components/profile/Profile"
import {Login} from "./components/login/Login"
import {Registration} from "./components/registration/Registration"
import {RestorePassword} from "./components/restorePassword/RestorePassword"
import {UpdatePassword} from "./components/updatePassword/UpdatePassword"
import {PageNotFound} from "./components/pageNotFound/PageNotFound"
import {TestComponents} from "./testComponents/TestComponents"
import {CheckEmail} from "./components/checkEmail/CheckEmail"
import s from "./App.module.scss"

function App() {
    return (
        <section className={s.pagesContainer}>
            <Header/>
            <Switch>
                <Route exact path={"/profile"} render={() => <Profile/>}/>
                <Route path={"/login"} render={() => <Login/>}/>
                <Route path={"/registration"} render={() => <Registration/>}/>
                <Route path={"/restorePassword"} render={() => <RestorePassword/>}/>
                <Route path={"/updatePassword"} render={() => <UpdatePassword/>}/>
                <Route path={"/404"} render={() => <PageNotFound/>}/>
                <Route exact path={"/test"} render={() => <TestComponents/>}/>
                <Route exact path={"/checkEmail"} render={() => <CheckEmail/>}/>
                <Redirect from={"*"} to={"/404"}/>
            </Switch>
        </section>
    )
}

export default App