import React from "react"
import {NavLink} from "react-router-dom"
import {CardPacksResponseType} from "../../../api/api"
import {ButtonSmall} from "../../common/buttonSmall/ButtonSmall"
import {RatingMUI} from "../../common/rating/Rating"
import TableRow from "@material-ui/core/TableRow"
import TableContainer from "@material-ui/core/TableContainer"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import {TableSortLabel} from "@material-ui/core"
import {StyledTableCell, StyledTableRow} from "./CardsListTableMUIStyles"
import s from "./CardsListTableMUI.module.scss"

type CardsListTableMUIPropsType = {
    tableState: Array<CardPacksResponseType>
}

export const CardsListTableMUI = React.memo((props: CardsListTableMUIPropsType) => {

    return (
        <TableContainer component={Paper}>
            <Table
                // className={classes.table}
                aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Question</StyledTableCell>
                        <StyledTableCell>Answer</StyledTableCell>
                        <StyledTableCell>Last&nbsp;updated</StyledTableCell>
                        <StyledTableCell>Grade</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableState.map((pack) => (
                        <StyledTableRow key={pack._id}>
                            <StyledTableCell>{pack.user_name}</StyledTableCell>
                            <StyledTableCell>{pack.user_name}</StyledTableCell>
                            <StyledTableCell>{pack.updated.slice(0, 10)}</StyledTableCell>
                            <StyledTableCell><RatingMUI value={3}/></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
})