import React from "react"
import s from "./ItemsFilterSpan.module.scss"

type ItemsFilterSpanPropsType = {
    title: string
}

export const ItemsFilterSpan = React.memo((props: ItemsFilterSpanPropsType) => {

    return (
        <>
            <span>{props.title}</span>
        </>
    )
})