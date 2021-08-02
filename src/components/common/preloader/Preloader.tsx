import React from "react"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import {useStyles} from "./PreloaderStyles"

export const Preloader = React.memo(() => {

    const classes = useStyles()

    return (
        <div>
            <Backdrop open={true} className={classes.backdrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    )
})