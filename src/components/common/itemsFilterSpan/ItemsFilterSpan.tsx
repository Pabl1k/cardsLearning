import React from "react"
import s from "./ItemsFilterSpan.module.scss"

type ItemsFilterSpanPropsType = {
    title: string
    status: "default" | "down" | "up"
    changeStatusValue?: () => void
}

export const ItemsFilterSpan = React.memo((props: ItemsFilterSpanPropsType) => {

    const onStatusChangeHandler = () => {
        // props.changeStatusValue()
    }

    return (
        <span onClick={onStatusChangeHandler} className={s.spanTitle}>
            {props.title}
            {props.status === "down"
                ? "▼"
                : props.status === "up"
                    ? "▲"
                    : null
            }
        </span>
    )
})