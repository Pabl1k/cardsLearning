import React from "react"
import {useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {Redirect} from "react-router-dom"
import s from "./CheckEmail.module.scss"
import icon from "../../assets/images/email.svg"
import {MainTitle} from "../common/mainTitle/MainTitle";

export const CheckEmail = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)

    if (isLoggedIn) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div className={s.checkEmail}>

         <MainTitle/>

            <div className={s.iconBg}>
                <img className={s.icon} src={icon} alt="icon"/>
            </div>

            <h2 className={s.caption}>Check Email</h2>
            <p className={s.text}>
                We’ve sent an Email with instructions to example@mail.com
            </p>

        </div>

    )
}