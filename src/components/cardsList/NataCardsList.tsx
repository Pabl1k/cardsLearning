import React from "react"
import {Redirect, useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import s from "./CardsList.module.scss"
import {MainTitle} from "../common/mainTitle/MainTitle";
import {SearchInput} from "../common/searchInput/SearchInput";
import {PaginationTable} from "../common/paginationTable/PaginationTable";
import {CardsListTableMUI} from "./cardsTableMUI/CardsListTableMUI";
import {RatingMUI} from "../common/rating/Rating";
import {CardPacksResponseType} from "../../api/api";


type CardsListPropsType = {}

export const NataCardsList = React.memo((props: CardsListPropsType) => {
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

                    {/*закинуть в таблицу*/}
                    <RatingMUI value={3}/>

                </div>
            </div>
        </div>
    )
})