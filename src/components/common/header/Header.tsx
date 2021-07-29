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

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <header className={s.headerBlock}>
            {isLoggedIn
                ? <div>
                    <Button style={{width: 150, height: 50, color: "white"}}
                            onClick={logoutHandler}
                            disabled={status === "loading"}
                            className={s.headerLink}>
                        Log out
                    </Button>
                </div>
                : <>
                    <div>
                        <NavLink to={"/login"}
                                 className={s.headerLink}>
                            Login
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={"/registration"}
                                 className={s.headerLink}>
                            Registration
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={"/restorePassword"}
                                 className={s.headerLink}>
                            RestorePassword
                        </NavLink>
                    </div>
                    {<div>
                        <NavLink to={"/checkEmail"}
                                 className={s.headerLink}>
                            Check email
                        </NavLink>
                    </div>}
                </>
            }
        </header>
    )
})