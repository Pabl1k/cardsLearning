import React, {useEffect} from "react"
import {Redirect, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {getCardsTC} from "../../redux/reducers/cardsList-reducer"
import {CardType} from "../../api/api"
import {MainTitle} from "../common/mainTitle/MainTitle"
import {SearchInput} from "../common/searchInput/SearchInput"
import {CardsListTableMUI} from "./cardsTableMUI/CardsListTableMUI"
import {RatingMUI} from "../common/rating/Rating"
import {PaginationTable} from "../common/paginationTable/PaginationTable"
import s from "./CardsList.module.scss"


type CardsListPropsType = {}

export const CardsList = React.memo((props: CardsListPropsType) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const cardsState = useSelector<AppRootStateType, Array<CardType>>(state => state.cardsListReducer.cards)
    const {packId} = useParams<{ packId: string }>();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [dispatch, packId])

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
                        {/*<SearchInput/>*/}
                    </div>
                    <CardsListTableMUI tableState={cardsState}/>
                    {/*<PaginationTable />*/}
                </div>
            </div>
        </div>
    )
})