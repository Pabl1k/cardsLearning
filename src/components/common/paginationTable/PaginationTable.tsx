import React, {ChangeEvent} from "react"
import {Pagination} from "@material-ui/lab"
import {Typography} from "@material-ui/core"
import {useStyles} from "./PaginationTableStyles"
import s from "./PaginationTable.module.scss"

export type ShowValueType = 5 | 10 | 15

type PaginationTablePropsType = {
    currentPage: number
    pagesCount: number
    setNewCurrentPage: (value: number) => void
    setNewPageCount: (value: ShowValueType) => void
}

export const PaginationTable = React.memo((props: PaginationTablePropsType) => {

    const classes = useStyles()

    const onCurrentPageChangeHandler = (event: ChangeEvent<unknown>, value: number) => {
        props.setNewCurrentPage(value)
    }

    const onPageCountChangeHandler = (e: ChangeEvent<any>) => {
        props.setNewPageCount(e.currentTarget.value)
    }

    return (
        <div className={classes.root}>
            <div className={s.pagination}>
                <div className={s.paginationMUI}>
                    <Typography>Page: {props.currentPage}</Typography>
                    <Pagination
                        count={props.pagesCount ? props.pagesCount : 10}
                        page={props.currentPage}
                        onChange={onCurrentPageChangeHandler} size={"small"}
                        siblingCount={1}
                        hidePrevButton
                        hideNextButton
                    />
                </div>
                <div className={s.show}>
                    <span>Show</span>
                    <select onChange={onPageCountChangeHandler}>
                        <option value={5}>5</option>
                        <option value={10} selected>10</option>
                        <option value={15}>15</option>
                    </select>
                    <span>Cards per Page</span>
                </div>
            </div>
        </div>
    )
})