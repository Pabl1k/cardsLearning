import React from "react"
import {createStyles, makeStyles} from '@material-ui/core/styles';
import s from "./PaginationTable.module.scss"



// import {useStyles} from "./PaginationTable";
import {Pagination} from "@material-ui/lab";
import {Typography} from "@material-ui/core";
// import { useStyles } from "./PaginationTable";


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > * + *': {
                marginTop: theme.spacing(2),
            },

            '& .MuiTypography-body1': {
                display: "none",
            }
        },
    }),
);

export const PaginationTable = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className={classes.root}>
            <div className={s.p}>

            <Typography>Page: {page}</Typography>
            <Pagination count={10} page={page} onChange={handleChange}/>


                <span>Show</span>
                <select>
                    <option value="10">10</option>
                </select>
                <span>Cards per Page</span>

            </div>

        </div>
    );
}


