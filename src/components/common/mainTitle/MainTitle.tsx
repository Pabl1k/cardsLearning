import React from "react"
import s from "./MainTitle.module.scss"

type MainTitlePropsType = {
    title: string
}

export const MainTitle = React.memo((props: MainTitlePropsType) => {
    return (
        <h1 className={s.mainTitle}>
            {props.title}
        </h1>
    )
})