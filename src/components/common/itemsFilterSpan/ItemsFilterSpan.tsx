import React from "react"
import {SortPacksOrderType} from "../../../redux/reducers/packsList-reducer"
import s from "./ItemsFilterSpan.module.scss"

type ItemsFilterSpanPropsType = {
    title: string
    status?: SortPacksOrderType
    setSetStatusValue: (sortPacksOrder: SortPacksOrderType, sortPacksFilter: string) => void
}

export const ItemsFilterSpan = React.memo((props: ItemsFilterSpanPropsType) => {

    const onStatusClickHandler = () => {
        if (props.status === 1) {
            props.setSetStatusValue(0, props.title.toLowerCase().replace(/\s/g, ""))
        } else {
            props.setSetStatusValue(1, props.title.toLowerCase().replace(/\s/g, ""))
        }
    }

    return (
        <span onClick={onStatusClickHandler} className={s.spanTitle}>
            {props.title}
            {props.status === 0 ? "▼" : "▲"}
        </span>
    )
})