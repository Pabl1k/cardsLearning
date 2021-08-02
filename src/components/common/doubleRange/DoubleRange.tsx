import React from "react"
import {Slider} from "@material-ui/core"
import {useStyles} from "./DoubleRangeStyles"
import s from "./DoubleRange.module.scss"

export const DoubleRange = () => {

    const classes = useStyles()
    const [value, setValue] = React.useState<number[]>([20, 37])

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
                    min={0}
                    max={100}
                />
            </div>
        </div>
    )
}