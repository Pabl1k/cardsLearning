import React from "react";
import s from "./PageNotFound.module.scss";
import {NavLink} from "react-router-dom";
// import error from "../../assets/images/error.svg";
import search from "../../assets/images/search.png"


export const PageNotFound = React.memo(() => {
    return (
        <div className={s.pageNotFoundBlock}>
            {/*            <p>Something wrong...</p>
            <p>404: PAGE NOT FOUND!</p>*/}

            <div className={s.container}>
                <div className={s.inner}>
                    <h1 className={s.number}> 404</h1>
                    <h2 className={s.error}>Page Not Found!</h2>
                    <p className={s.text}>MOST LIKELY THE PAGE YOU ARE LOOKING FOR THERE</p>

                    <NavLink to="/" className={s.link}>Back to home</NavLink>

                    {/*<img className={s.icon} src={error} alt="icon"/>*/}
                    <div className={s.wrapIcon}>
                        <img className={s.search} src={search} alt="icon"/>
                    </div>
                </div>
            </div>


        </div>
    )
})

