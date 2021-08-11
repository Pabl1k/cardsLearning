import React from "react"
import {NavLink} from "react-router-dom"
import {useSelector} from "react-redux"
import {PackResponseType} from "../../../api/api"
import {AppRootStateType} from "../../../redux/store"
import {SortPacksAndCardsOrderType} from "../../../redux/reducers/packsList-reducer"
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
    user_id: string
    packs: Array<PackResponseType>
    setNewSortPacksNameOrder: (sortPacksNameOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => void
    setNewSortPacksCardsCountOrder: (sortPacksCardsCountOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => void
    setNewSortPacksUpdateOrder: (sortPacksUpdateOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => void
    updatePack: (newPackName: string, packId: string) => void
    deletePack: (packId: string) => void
}

export const PacksListTableMUI = React.memo((props: PacksListTableMUIPropsType) => {

    const {sortPacksNameOrder, sortPacksCardsCountOrder, sortPacksUpdateOrder} = useSelector((state: AppRootStateType) => state.packsListReducer)

    return (
        <TableContainer component={Paper}>
            <Table
                // className={classes.table}
                aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <ItemsFilterSpan
                                title={"Name"}
                                status={sortPacksNameOrder}
                                setSetStatusValue={props.setNewSortPacksNameOrder}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <ItemsFilterSpan
                                title={"Cards"}
                                status={sortPacksCardsCountOrder}
                                setSetStatusValue={props.setNewSortPacksCardsCountOrder}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <ItemsFilterSpan
                                title={"Last Updated"}
                                status={sortPacksUpdateOrder}
                                setSetStatusValue={props.setNewSortPacksUpdateOrder}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">Created&nbsp;by</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.packs.map((pack) => (
                        <StyledTableRow key={pack._id}>
                            <StyledTableCell component="th" scope="row">
                                <NavLink to={`/cardsList/${pack._id}`}>
                                    {pack.name}
                                </NavLink>
                            </StyledTableCell>
                            <StyledTableCell>{pack.cardsCount}</StyledTableCell>
                            <StyledTableCell>{pack.updated.slice(0, 10)}</StyledTableCell>
                            <StyledTableCell>{pack.user_name}</StyledTableCell>
                            <StyledTableCell>
                                <div className={s.buttonsContainer}>
                                    {props.user_id === pack.user_id
                                        ? <>
                                            <ButtonSmall
                                                text={"delete"}
                                                onClick={() => props.deletePack(pack._id)}
                                                style={{backgroundColor: "#F1453D", color: "#ffffff"}}
                                            />
                                            <ButtonSmall
                                                text={"edit"}
                                                onClick={() => props.updatePack("UpdatedPackName", pack._id)}
                                                style={{backgroundColor: "#D7D8EF", color: "#21268F"}}
                                            />
                                            <ButtonSmall
                                                text={"learn"}
                                                style={{backgroundColor: "#D7D8EF", color: "#21268F"}}
                                            />
                                        </>
                                        : <>
                                            <ButtonSmall
                                                text={"learn"}
                                                style={{backgroundColor: "#D7D8EF", color: "#21268F"}}
                                            />
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