import React from "react"
import {Pagination} from "@material-ui/lab"
import {Typography} from "@material-ui/core"
import {useStyles} from "./PaginationTableStyles"
import s from "./PaginationTable.module.scss"

type PaginationTablePropsType = {}

export const PaginationTable = React.memo((props: PaginationTablePropsType) => {

    const classes = useStyles()

    const [page, setPage] = React.useState(1)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    return (
        <div className={classes.root}>
            <div className={s.pagination}>
                <Typography>Page: {page}</Typography>
                <Pagination size={"small"} count={10} page={page} onChange={handleChange}/>
                <span>Show</span>
                <select>
                    <option value="10">10</option>
                </select>
                <span>Cards per Page</span>
            </div>
        </div>
    )
})