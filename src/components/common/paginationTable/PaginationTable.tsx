import React, {ChangeEvent} from "react"
import {Pagination} from "@material-ui/lab"
import {Typography} from "@material-ui/core"
import s from "./PaginationTable.module.scss"
import {useStyles} from "./PaginationTableStyles"
import {ShowValueType} from "../../packsList/PacksList"

type PaginationTablePropsType = {
    currentPage: number
    setNewCurrentPage: (value: number) => void
    setNewPageCount: (value: ShowValueType) => void
}

export const PaginationTable = React.memo((props: PaginationTablePropsType) => {

    const classes = useStyles()
    /*const theme = useTheme()
    const isPhoneSize = useMediaQuery(theme.breakpoints.down("xs"))*/

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
                    <Pagination size={"small"} count={5} page={props.currentPage} onChange={onCurrentPageChangeHandler}/>
                    {/*{isPhoneSize
                        ? <Pagination size={"small"} count={5} page={props.currentPage} onChange={onPageChangeHandler}/>
                        : <Pagination size={"small"} count={props.count ? props.count : 10} page={props.item} onChange={onPageChangeHandler}/>
                    }*/}
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
