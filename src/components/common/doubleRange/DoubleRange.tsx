import React, {useState} from "react"
import {Slider} from "@material-ui/core"
import {useStyles} from "./DoubleRangeStyles"
import s from "./DoubleRange.module.scss"

type DoubleRangePropsType = {
    minValue: number
    maxValue: number
    onButtonClick: (minValue: number, maxValue: number) => void
}

export const DoubleRange = React.memo((props: DoubleRangePropsType) => {

    const classes = useStyles()

    const [value, setValue] = useState<number[]>([props.minValue, props.maxValue])

    const onDoubleRangeHandleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    const onButtonClickHandler = () => {
        props.onButtonClick(value[0], value[1])
    }

    return (
        <div className={s.numberCards}>
            <h2 className={s.title}>Number of cards</h2>
            <div className={classes.root}>
                <Slider
                    value={value}
                    onChange={onDoubleRangeHandleChange}
                    valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                    min={props.minValue}
                    max={props.maxValue}
                />
            </div>
            <br/>
            <button
                onClick={onButtonClickHandler}
            >Apply range values</button>
        </div>
    )
})