import React from "react"
import FormControl from "@material-ui/core/FormControl";
import {createStyles, makeStyles, TextField, Theme} from "@material-ui/core";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {}
}));

interface IProps {
    label: string
}

export const InputTextMUI = (props: TextFieldProps) => {
    const classes = useStyles()
    const {...restProps} = props


    return (
        <FormControl fullWidth className={classes.root}>
            <TextField
                {...restProps}
            />
        </FormControl>
    )
}