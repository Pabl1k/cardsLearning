import React from "react"
import {NavLink} from "react-router-dom"
import search from "../../assets/images/search.jpg"
import s from "./PageNotFound.module.scss"

export const PageNotFound = React.memo(() => {
    return (
        <div className={s.pageNotFoundBlock}>
            <div className={s.container}>
                <div className={s.inner}>
                    <h1 className={s.number}> 404</h1>
                    <h2 className={s.error}>Page Not Found!</h2>
                    <p className={s.text}>MOST LIKELY THE PAGE YOU ARE LOOKING FOR THERE</p>
                    <div className={s.wrapIcon}>
                        <img className={s.search} src={search} alt="icon"/>
                    </div>
                    <NavLink to="/" className={s.link}>Back to home</NavLink>
                </div>
            </div>
        </div>
    )
})

