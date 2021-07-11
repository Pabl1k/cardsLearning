import React from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import {Profile} from "./pages/profile/Profile"
import {Login} from "./pages/login/Login"
import {Registration} from "./pages/registration/Registration"
import {RestorePassword} from "./pages/restorePassword/RestorePassword"
import {UpdatePassword} from "./pages/updatePassword/UpdatePassword"
import {PageNotFound} from "./pages/pageNotFound/PageNotFound"
import {TestComponents} from "./testComponents/TestComponents"
import "./App.css"

function App() {

    return (
        <section>
            <Switch>
                <Route exact path={"/"} render={() => <Profile/>}/>
                <Route path={"/login"} render={() => <Login/>}/>
                <Route path={"/registration"} render={() => <Registration/>}/>
                <Route path={"/restorePassword"} render={() => <RestorePassword/>}/>
                <Route path={"/updatePassword"} render={() => <UpdatePassword/>}/>
                <Route path={"/404"} render={() => <PageNotFound/>}/>
                <Route exact path={"/test"} render={() => <TestComponents/>}/>
                <Redirect from={"*"} to={"/404"}/>
            </Switch>
        </section>
    )
}

export default App