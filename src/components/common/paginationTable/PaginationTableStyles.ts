import {createStyles, makeStyles} from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > * + *': {
                marginTop: theme.spacing(2),
            },

            '& .MuiTypography-body1': {
                display: "none",
            }
        },
    })
)
