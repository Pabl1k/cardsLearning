import React from "react"
import s from "./ButtonSmall.module.scss"

type ButtonSmall = {
    text: string
    style: any
}

export const ButtonSmall = React.memo((props: ButtonSmall) => {
    return (
        <button className={s.buttonSmall} style={props.style}>
            {props.text}
        </button>
    )
})