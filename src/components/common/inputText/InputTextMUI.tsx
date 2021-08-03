import React from "react"
import FormControl from "@material-ui/core/FormControl"
import {TextField} from "@material-ui/core"
import {TextFieldProps} from "@material-ui/core/TextField/TextField"
import {useStyles} from "./InputTextMUIStyles"
import s from "./InputTextMUI.module.scss"

type InputTextMUIPropsType = {} & TextFieldProps

export const InputTextMUI = React.memo((props: InputTextMUIPropsType) => {

    const classes = useStyles()

    const {...restProps} = props

    return (
        <FormControl fullWidth className={classes.root}>
            <TextField
                {...restProps}
            />
        </FormControl>
    )
})