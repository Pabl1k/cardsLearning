import React, {useState} from "react"
import {Slider} from "@material-ui/core"
import {useStyles} from "./DoubleRangeStyles"
import s from "./DoubleRange.module.scss"

type DoubleRangePropsType = {
    minValue: number
    maxValue: number
    onButtonClick: () => void
}

export const DoubleRange = React.memo((props: DoubleRangePropsType) => {

    const classes = useStyles()

    const [value, setValue] = useState<number[]>([props.minValue, props.maxValue])

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    return (
        <div className={s.numberCards}>
            <h2 className={s.title}>Number of cards</h2>
            <div className={classes.root}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                    min={props.minValue}
                    max={props.maxValue}
                />
            </div>
            <br/>
            <button
                onClick={props.onButtonClick}
                className={s.none}
            >Apply range values</button>
        </div>
    )
})