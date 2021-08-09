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
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";
import {SortCardsOrderType} from "../../../redux/reducers/cardsList-reducer";
import {SortPacksOrderType} from "../../../redux/reducers/packsList-reducer";


type CardsListTableMUIPropsType = {
    tableState: Array<CardType>
    setNewSortCardsOrderAndFilter:(sortCardsOrder: SortCardsOrderType, sortCardsFilter: string)=>void
    setNewSortGradeOrder:(sortCardsGradeOrder: SortPacksOrderType, sortCardsFilter: string)=>void
    setNewSortAnswerOrder:(sortCardsAnswerOrder: SortPacksOrderType, sortCardsFilter: string)=>void
}

export const CardsListTableMUI = React.memo((props: CardsListTableMUIPropsType) => {
    const {sortCardsOrder,sortCardsAnswerOrder,sortCardsGradeOrder} = useSelector((state: AppRootStateType) => state.cardsListReducer)


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
                                status={sortCardsAnswerOrder}
                                setSetStatusValue={props.setNewSortAnswerOrder}
                            />
                        </StyledTableCell>
                        <StyledTableCell>
                            <ItemsFilterSpan
                                title={"Updated"}
                                status={sortCardsOrder}
                                setSetStatusValue={props.setNewSortCardsOrderAndFilter}
                            />
                        </StyledTableCell>
                        <StyledTableCell>
                            <ItemsFilterSpan
                                title={"Grade"}
                                status={sortCardsGradeOrder}
                                setSetStatusValue={props.setNewSortGradeOrder}
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