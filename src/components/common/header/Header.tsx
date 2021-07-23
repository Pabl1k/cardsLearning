import React from "react"
import {NavLink} from "react-router-dom"
import style from "./Header.module.scss"

type HeaderPropsType = {}

export const Header = React.memo(function (props: HeaderPropsType) {

    return (
        <header className={style.headerBlock}>
            <div>
                <NavLink to={"/profile"}
                         className={style.headerLink}>
                    Profile
                </NavLink>
            </div>
            <div>
                <NavLink to={"/login"}
                         className={style.headerLink}>
                    Login
                </NavLink>
            </div>
            <div>
                <NavLink to={"/registration"}
                         className={style.headerLink}>
                    Registration
                </NavLink>
            </div>
            <div>
                <NavLink to={"/restorePassword"}
                         className={style.headerLink}>
                    RestorePassword
                </NavLink>
            </div>
            <div>
                <NavLink
                    to={"/updatePassword"}
                    className={style.headerLink}>
                    UpdatePassword
                </NavLink>
            </div>
            <div>
                <NavLink to={"/test"}
                         className={style.headerLink}>
                    Test Page
                </NavLink>
            </div>
        </header>
    )
})