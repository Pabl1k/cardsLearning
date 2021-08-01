import React from "react"
import {Redirect} from "react-router-dom"
import {useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {MainTitle} from "../common/mainTitle/MainTitle"
import icon from "../../assets/images/email.svg"
import s from "./CheckEmail.module.scss"
import {ProfileAvatar} from "../common/profileAvatar/ProfileAvatar";

export const CheckEmail = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)

    if (isLoggedIn) {
        return <Redirect to={"/"}/>
    }

    return (
        <div className={s.checkEmail}>
         <MainTitle/>
            <div className={s.iconBg}>
                <img src={icon} alt="icon" className={s.icon}/>
            </div>
            <h2 className={s.caption}>Check Email</h2>
            <p className={s.text}>
                We’ve sent an Email with instructions to example@mail.com
            </p>
            <ProfileAvatar/>
        </div>
    )
}