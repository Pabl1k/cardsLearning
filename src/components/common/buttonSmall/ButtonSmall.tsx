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

//     Для быстрого использования copy/paste:

// <ButtonSmall text={"delete"} style={{backgroundColor: "#F1453D", color: "#ffffff"}} />
//
// <ButtonSmall text={"edit"} style={{backgroundColor: "#D7D8EF", color: "#21268F"}} />
//
// <ButtonSmall text={"learn"} style={{backgroundColor: "#D7D8EF", color: "#21268F"}}/>
