import React from "react"
import s from "./TableTitle.module.scss"

type TableTitlePropsType = {
    title: string
}

export const TableTitle = React.memo((props: TableTitlePropsType) => {
    return (
        <h2 className={s.mainTitle}>
            {props.title}
        </h2>
    )
})