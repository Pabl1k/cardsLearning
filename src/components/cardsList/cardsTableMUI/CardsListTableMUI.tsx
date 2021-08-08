import React from "react"
import {CardType} from "../../../api/api"
import {RatingMUI} from "../../common/rating/Rating"
import {ItemsFilterSpan} from "../../common/itemsFilterSpan/ItemsFilterSpan"
import TableRow from "@material-ui/core/TableRow"
import TableContainer from "@material-ui/core/TableContainer"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import {StyledTableCell, StyledTableRow} from "./CardsListTableMUIStyles"

type CardsListTableMUIPropsType = {
    tableState: Array<CardType>
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
                        <StyledTableCell>
                            <ItemsFilterSpan
                                title={"Answer"}
                                status={0}
                            />
                        </StyledTableCell>
                        <StyledTableCell>
                            <ItemsFilterSpan
                                title={"Updated"}
                                status={0}
                            />
                        </StyledTableCell>
                        <StyledTableCell>
                            <ItemsFilterSpan
                                title={"Grade"}
                                status={0}
                            />
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableState.map((card) => (
                        <StyledTableRow key={card._id}>
                            <StyledTableCell>{card.question}</StyledTableCell>
                            <StyledTableCell>{card.answer}</StyledTableCell>
                            <StyledTableCell>{card.updated.slice(0, 10)}</StyledTableCell>
                            <StyledTableCell><RatingMUI value={card.grade}/></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
})