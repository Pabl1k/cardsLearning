import React from "react"
import FormControl from "@material-ui/core/FormControl";
import {createStyles, makeStyles, TextField, Theme} from "@material-ui/core";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        // '&:hover': {
        //     backgroundColor: 'transparent',
        // },
        // '& .MuiTypography-body1': {
        //     fontFamily: "SFUIDisplay, sans-serif",
        //     fontWeight: 400,
        //     fontSize: "14px",
        //     lineHeight: "1.2",
        //     color: "#2D2E46",
        // },
        '& .MuiInputBase-input': {
            fontFamily: "SFUIDisplay, sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "1.5",
            color: "#2D2E46",
        },

        '& .MuiFormLabel-root': {
            fontFamily: "SFUIDisplay, sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "1.5",
            color: "#24254A",
            opacity: ".5"
        },

        '& .MuiInput-underline:before': {
            height: "1.6px",
            color: "#24254A",
            opacity: ".2"
        },

        '& .MuiInput-underline:after': {
            color: "#21268F",
            opacity: ".2"
        },

        '& .MuiSvgIcon-root': {
            color: "#2D2E46",
        },
    }
}));
//MuiSvgIcon-root
//<style>
// .MuiInput-underline:after
// height: 1.582417607307434px;
// width: 347px;
// left: 0px;
// top: 46.41748046875px;
// border-radius: 0px; #24254A 20%



// opacity: 0.5;

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