import React, {useEffect} from "react"
import {Redirect, Route, Switch, useLocation} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "./redux/store"
import {initializeAppTC, RequestStatusType} from "./redux/reducers/app-reducer"
import {HeaderMenu} from "./components/common/headerMenu/HeaderMenu"
import {PacksList} from "./components/packsList/PacksList"
import {CardsList} from "./components/cardsList/CardsList"
import {Profile} from "./components/profile/Profile"
import {Login} from "./components/login/Login"
import {Registration} from "./components/registration/Registration"
import {RestorePassword} from "./components/restorePassword/RestorePassword"
import {UpdatePassword} from "./components/updatePassword/UpdatePassword"
import {PageNotFound} from "./components/pageNotFound/PageNotFound"
import {CheckEmail} from "./components/checkEmail/CheckEmail"
import {Preloader} from "./components/common/preloader/Preloader"
import s from "./App.module.scss"
import {TableMe} from "./components/common/tableMe/TableStyles";
/*import {Header} from "./components/common/header/Header"*/

function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)
    const dispatch = useDispatch()

    const {pathname} = useLocation()

    const showHeaderMenu = () => {
        const IS_LOGIN_PATH = pathname === "/login"
        const IS_REGISTRATION_PATH = pathname === "/registration"
        const IS_RESTORE_PASSWORD_PATH = pathname === "/restorePassword"
        const IS_UPDATE_PASSWORD_PATH = pathname === "/updatePassword" // !!! fix with token !!!
        const IS_CHECK_EMAIL_PATH = pathname === "/checkEmail"
        const IS_404_PATH = pathname === "/404"

        if (IS_LOGIN_PATH || IS_REGISTRATION_PATH || IS_RESTORE_PASSWORD_PATH ||
            IS_UPDATE_PASSWORD_PATH || IS_CHECK_EMAIL_PATH || IS_404_PATH) {
            return null
        } else {
            return <HeaderMenu/>
        }
    }

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    return (

        // <div>
        //     <HeaderMenu/>
        //     <TableMe/>
        <>
            {/*<Header/>*/}
            {showHeaderMenu()}
            <section className={s.pagesContainer}>
                {status === "loading" && <Preloader/>}
                <Switch>
                    <Route exact path={"/"} render={() => <PacksList/>}/>
                    <Route exact path={"/cardslist"} render={() => <CardsList/>}/>
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
        </>
    )
}

export default App