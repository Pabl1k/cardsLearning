import React from "react"
import s from "./NumberCards.module.scss"
import {Slider} from "@material-ui/core";
import {useStyles} from "./NumberCardsStyles";





export const NumberCards = () => {


    const classes = useStyles();
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <div className={s.numberCards}>

            <h2 className={s.title}>Number of cards</h2>

            <div className={classes.root}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                />
            </div>


        </div>
    )
}