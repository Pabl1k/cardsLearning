import React from "react"
import {NavLink} from "react-router-dom"
import {useSelector} from "react-redux"
import {AppRootStateType} from "../../../redux/store"
import {CardPacksResponseType} from "../../../api/api"
import {ItemsFilterSpan} from "../../common/itemsFilterSpan/ItemsFilterSpan"
import {ButtonSmall} from "../../common/buttonSmall/ButtonSmall"
import TableRow from "@material-ui/core/TableRow"
import TableContainer from "@material-ui/core/TableContainer"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import {StyledTableCell, StyledTableRow} from "./PacksListTableMUIStyles"
import s from "./PacksListTableMUI.module.scss"

type PacksListTableMUIPropsType = {
    tableState: Array<CardPacksResponseType>
}

export const PacksListTableMUI = React.memo((props: PacksListTableMUIPropsType) => {

    const user_id = useSelector<AppRootStateType, string>(state => state.loginReducer.userData._id)

    return (
        <TableContainer component={Paper}>
            <Table
                // className={classes.table}
                aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell sortDirection="desc" align="right">
                            <ItemsFilterSpan
                                title={"Cards"}
                                status={"down"}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <ItemsFilterSpan
                                title={"Last updated"}
                                status={"down"}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">Created&nbsp;by</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableState.map((pack) => (
                        <StyledTableRow key={pack._id}>
                            <StyledTableCell component="th" scope="row">
                                <NavLink to={`/cardsList/${pack._id}`}>
                                    {pack.name}
                                </NavLink>
                            </StyledTableCell>
                            <StyledTableCell align="right">{pack.cardsCount}</StyledTableCell>
                            <StyledTableCell align="right">{pack.updated.slice(0, 10)}</StyledTableCell>
                            <StyledTableCell align="right">{pack.user_name}</StyledTableCell>
                            <StyledTableCell align="right">
                                <div className={s.buttonsContainer}>
                                    {user_id === pack.user_id
                                        ? <>
                                            <ButtonSmall text={"delete"}
                                                         style={{backgroundColor: "#F1453D", color: "#ffffff"}}/>
                                            <ButtonSmall text={"edit"}
                                                         style={{backgroundColor: "#D7D8EF", color: "#21268F"}}/>
                                            <ButtonSmall text={"learn"}
                                                         style={{backgroundColor: "#D7D8EF", color: "#21268F"}}/>
                                        </>
                                        : <>
                                            <ButtonSmall text={"learn"}
                                                         style={{backgroundColor: "#D7D8EF", color: "#21268F"}}/>
                                        </>
                                    }
                                </div>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
})