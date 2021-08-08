import React from "react"
import s from "./ButtonSmall.module.scss"

type ButtonSmallPropsType = {
    text: string
    style: any
    onClick?: any
}

export const ButtonSmall = React.memo((props: ButtonSmallPropsType) => {
    return (
        <button onClick={props.onClick} className={s.buttonSmall} style={props.style}>
            {props.text}
        </button>
    )
})
