import React from "react"
import s from "./CheckEmail.module.scss"
import icon from "../../assets/images/email.svg"

export const CheckEmail = () => {

    return (
        <div className={s.checkEmail}>
            <h1 className={s.title}>It-incubator</h1>
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