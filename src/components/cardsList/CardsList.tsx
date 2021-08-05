import React from "react"
import {Redirect} from "react-router-dom"
import {useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {CardPacksResponseType} from "../../api/api"
import {MainTitle} from "../common/mainTitle/MainTitle"
import {SearchInput} from "../common/searchInput/SearchInput"
import {CardsListTableMUI} from "./cardsTableMUI/CardsListTableMUI"
import {RatingMUI} from "../common/rating/Rating"
import {PaginationTable} from "../common/paginationTable/PaginationTable"
import s from "./CardsList.module.scss"

type CardsListPropsType = {}

export const CardsList = React.memo((props: CardsListPropsType) => {

    const cardsListState = useSelector<AppRootStateType, Array<CardPacksResponseType>>(state => state.packsListReducer.cardPacks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.cardsList}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.topWrap}>
                        <button className={s.btn}></button>
                        <MainTitle title={"Pack Name"} textStyle={s.tableTitle}/>
                    </div>
                    <div className={s.searchWrap}>
                        <SearchInput/>
                    </div>
                    <CardsListTableMUI tableState={cardsListState}/>
                    <PaginationTable/>
                </div>
            </div>
        </div>
    )
})