import React from "react"
import {NavLink} from "react-router-dom"
import style from "./Header.module.scss"
import {Button} from "../button/Button";
import {useDispatch, useSelector} from "react-redux";
import {logoutTC} from "../../../redux/reducers/login-reducer";
import {AppRootStateType} from "../../../redux/store";
import {RequestStatusType} from "../../../redux/reducers/app-reducer";

type HeaderPropsType = {}

export const Header = React.memo(function (props: HeaderPropsType) {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const dispatch = useDispatch()

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <header className={style.headerBlock}>
            {isLoggedIn
                ? <div>
                    <Button style={{width: 150, height: 50, color: "white"}}
                            onClick={logoutHandler}
                            disabled={status === "loading"}
                            className={style.headerLink}>
                        Log out
                    </Button>
                </div>
                : <>
                    {/*<div>
                        <NavLink to={"/profile"}
                                 className={style.headerLink}>
                            Profile
                        </NavLink>
                    </div>*/}
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
                    {<div>
                        <NavLink to={"/checkEmail"}
                                 className={style.headerLink}>
                            Check email
                        </NavLink>
                    </div>}
                    {/*<div>
                        <NavLink
                            to={"/updatePassword"}
                            className={style.headerLink}>
                            UpdatePassword
                        </NavLink>
                    </div>*/}
                </>
            }
        </header>
    )
})