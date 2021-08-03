import React, {useEffect, useState} from "react"
import {Slider} from "@material-ui/core"
import {useStyles} from "./DoubleRangeStyles"
import s from "./DoubleRange.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";
import {fetchCardsTC} from "../../../redux/reducers/packsList-reducer";
import {setDoubleRangeCurrentMaxValueAC} from "../../../redux/reducers/doubleRange-reducer";

type DoubleRangePropsType = {}

export const DoubleRange = React.memo((props: DoubleRangePropsType) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const minValue = useSelector<AppRootStateType, number>(state => state.doubleRange.minValue)
    const maxValue = useSelector<AppRootStateType, number>(state => state.doubleRange.maxValue)
    const [value, setValue] = useState<number[]>([minValue, maxValue])

    useEffect(() => {
        dispatch(fetchCardsTC(value[0], value[1]))
        // dispatch(setDoubleRangeCurrentMaxValueAC(value[1]))
    }, [setValue])

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
                    min={1}
                    max={maxValue}
                />
            </div>
        </div>
    )
})