import React from "react"
import s from "./PageNotFound.module.scss"

export const PageNotFound = React.memo(() => {
    return (
        <div className={s.pageNotFoundBlock}>
            <p>Something wrong...</p>
            <p>404: PAGE NOT FOUND!</p>
        </div>
    )
})