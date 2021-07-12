import React from "react"
import { NavLink } from "react-router-dom"
import style from "./Header.module.scss"

type HeaderPropsType = {

}

export const Header = React.memo(function (props: HeaderPropsType) {

    return (
        <header className={style.headerBlock}>
            <div className={style.headerLink}>
                <NavLink to={"/profile"}>Profile</NavLink>
            </div>
            <div className={style.headerLink}>
                <NavLink to={"/login"}>Login</NavLink>
            </div>
            <div className={style.headerLink}>
                <NavLink to={"/registration"}>Registration</NavLink>
            </div>
            <div className={style.headerLink}>
                <NavLink to={"/restorePassword"}>RestorePassword</NavLink>
            </div>
            <div className={style.headerLink}>
                <NavLink to={"/updatePassword"}>UpdatePassword</NavLink>
            </div>
            <div className={style.headerLink}>
                <NavLink to={"/test"}>Test Page</NavLink>
            </div>
        </header>
    )
})