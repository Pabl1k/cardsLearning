import React from "react"
import {NavLink} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../../redux/store"
import {logoutTC} from "../../../redux/reducers/login-reducer"
import {RequestStatusType} from "../../../redux/reducers/app-reducer"
import {Button} from "../button/Button"
import s from "./Header.module.scss"

type HeaderPropsType = {}

export const Header = React.memo(function (props: HeaderPropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)
    const dispatch = useDispatch()

    const onLogoutClickHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <header className={s.headerBlock}>
            <div>
                <NavLink to={"/"} className={s.headerLink}>PacksList</NavLink>
            </div>
            <div>
                <NavLink to={"/cardslist"} className={s.headerLink}>CardsList</NavLink>
            </div>
            <div>
                <NavLink to={"/profile"} className={s.headerLink}>Profile</NavLink>
            </div>
            <div>
                <NavLink to={"/login"} className={s.headerLink}>Login</NavLink>
            </div>
            <div>
                <NavLink to={"/registration"} className={s.headerLink}>Registration</NavLink>
            </div>
            <div>
                <NavLink to={"/restorePassword"} className={s.headerLink}>RestorePassword</NavLink>
            </div>
            <div>
                <NavLink to={"/checkEmail"} className={s.headerLink}>Check email</NavLink>
            </div>
            <div>
                <NavLink to={"/404"} className={s.headerLink}>404</NavLink>
            </div>
            <div>
                <Button style={{width: 150, height: 50, color: "white"}}
                        onClick={onLogoutClickHandler}
                        disabled={status === "loading"}
                        className={s.headerLink}>Log out
                </Button>
            </div>
        </header>
    )
})