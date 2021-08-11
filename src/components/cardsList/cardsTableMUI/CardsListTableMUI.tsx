import React from "react"
import {useSelector} from "react-redux"
import {CardType} from "../../../api/api"
import {AppRootStateType} from "../../../redux/store"
import {SortPacksAndCardsOrderType} from "../../../redux/reducers/packsList-reducer"
import {RatingMUI} from "../../common/rating/Rating"
import {ItemsFilterSpan} from "../../common/itemsFilterSpan/ItemsFilterSpan"
import {ButtonSmall} from "../../common/buttonSmall/ButtonSmall"
import TableRow from "@material-ui/core/TableRow"
import TableContainer from "@material-ui/core/TableContainer"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import {StyledTableCell, StyledTableRow} from "./CardsListTableMUIStyles"
import s from "./CardsListTableMUI.module.scss"

type CardsListTableMUIPropsType = {
    user_id: string
    tableState: Array<CardType>
    setNewSortQuestionOrder: (sortCardsQuestionOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => void
    setNewSortAnswerOrder: (sortCardsAnswerOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => void
    setNewSortUpdateOrder: (sortCardsUpdateOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => void
    setNewSortGradeOrder: (sortCardsGradeOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => void
    updateCard: (cardId: string, newCardQuestion: string, newCardAnswer: string) => void
    deleteCard: (cardId: string) => void
}

export const CardsListTableMUI = React.memo((props: CardsListTableMUIPropsType) => {

    const {sortCardsQuestionOrder, sortCardsUpdateOrder, sortCardsAnswerOrder, sortCardsGradeOrder} = useSelector((state: AppRootStateType) => state.cardsListReducer)

    return (
        <TableContainer component={Paper}>
            <Table
                // className={classes.table}
                aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <ItemsFilterSpan
                                title={"Question"}
                                status={sortCardsQuestionOrder}
                                setSetStatusValue={props.setNewSortQuestionOrder}
                            />
                        </StyledTableCell>
                        <StyledTableCell>
                            <ItemsFilterSpan
                                title={"Answer"}
                                status={sortCardsAnswerOrder}
                                setSetStatusValue={props.setNewSortAnswerOrder}
                            />
                        </StyledTableCell>
                        <StyledTableCell>
                            <ItemsFilterSpan
                                title={"Last Updated"}
                                status={sortCardsUpdateOrder}
                                setSetStatusValue={props.setNewSortUpdateOrder}
                            />
                        </StyledTableCell>
                        <StyledTableCell>
                            <ItemsFilterSpan
                                title={"Grade"}
                                status={sortCardsGradeOrder}
                                setSetStatusValue={props.setNewSortGradeOrder}
                            />
                        </StyledTableCell>
                        {props.user_id === props.tableState[0].user_id
                        && <StyledTableCell>Actions</StyledTableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableState.map((card) => (
                        <StyledTableRow key={card._id}>
                            <StyledTableCell>{card.question}</StyledTableCell>
                            <StyledTableCell>{card.answer}</StyledTableCell>
                            <StyledTableCell>{card.updated.slice(0, 10)}</StyledTableCell>
                            <StyledTableCell><RatingMUI value={card.grade}/></StyledTableCell>
                            {props.user_id === card.user_id
                            && <StyledTableCell>
                                <div className={s.buttonsContainer}>
                                    <ButtonSmall
                                        text={"delete"}
                                        onClick={() => props.deleteCard(card._id)}
                                        style={{backgroundColor: "#F1453D", color: "#ffffff"}}
                                    />
                                    <ButtonSmall
                                        text={"edit"}
                                        onClick={() => props.updateCard(card._id, "UpdatedQuestion", "UpdatedAnswer")}
                                        style={{backgroundColor: "#D7D8EF", color: "#21268F"}}
                                    />
                                </div>
                            </StyledTableCell>}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
})