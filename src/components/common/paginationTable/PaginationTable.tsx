import React from "react"
import React, {ChangeEvent, MouseEventHandler, useState} from "react"
import {ButtonSmall} from "../buttonSmall/ButtonSmall"
import {Pagination} from "@material-ui/lab"
import {Typography, useMediaQuery, useTheme} from "@material-ui/core"
import s from "./PaginationTable.module.scss"
import {useDispatch} from "react-redux";
import {useStyles} from "./PaginationTableStyles"
import {ShowValueType} from "../../packsList/PacksList";

type PaginationTablePropsType = {
    count: number
    page: number
    getNExtCardPortion: (pageNumber: number) => void
    item: number
    setItem: (value: number) => void
    setPerPage: (value: ShowValueType) => void
}

export const PaginationTable = React.memo((props: PaginationTablePropsType) => {

    const classes = useStyles()
    const theme = useTheme()
    const isPhoneSize = useMediaQuery(theme.breakpoints.down("xs"))

    const [page, setPage] = React.useState(props.page)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
        props.getNExtCardPortion(value)
    const onPageChangeHandler = (event: ChangeEvent<unknown>, value: number) => {
        props.setItem(value)
    }
    const onCardsPerPageChangeHandler = (e: ChangeEvent<any>) => {
        props.setPerPage(e.currentTarget.value)
    }

    return (
        <div className={classes.root}>
            <div className={s.pagination}>
                <div className={s.paginationMUI}>
                    <Typography>Page: {page}</Typography>
                    <Pagination size={"small"} count={props.count} page={page} onChange={handleChange}/>
                    <Typography>Page: {props.item}</Typography>
                    {isPhoneSize
                        ? <Pagination size={"small"} count={5} page={props.item} onChange={onPageChangeHandler}/>
                        : <Pagination size={"small"} count={10} page={props.item} onChange={onPageChangeHandler}/>
                    }
                </div>
                <div className={s.show}>
                    <span>Show</span>
                    <select onChange={onCardsPerPageChangeHandler}>
                        <option value={5}>5</option>
                        <option value={10} selected>
                            10
                        </option>
                        <option value={15}>15</option>
                    </select>
                    <span>Cards per Page</span>
                </div>
            </div>
        </div>
    )
})