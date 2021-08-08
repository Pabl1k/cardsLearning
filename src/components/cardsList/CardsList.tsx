import React, {useEffect, useState} from "react"
import {Redirect, useHistory, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {getCardsTC} from "../../redux/reducers/cardsList-reducer"
import {MainTitle} from "../common/mainTitle/MainTitle"
import {CardsListTableMUI} from "./cardsTableMUI/CardsListTableMUI"
import {PaginationTable} from "../common/paginationTable/PaginationTable"
import {ShowValueType} from "../packsList/PacksList"
import s from "./CardsList.module.scss"

type CardsListPropsType = {}

export const CardsList = React.memo((props: CardsListPropsType) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const {cardsTotalCount, cards, pageCount} = useSelector((state: AppRootStateType) => state.cardsListReducer)
    const {packId} = useParams<{ packId: string }>();
    const dispatch = useDispatch()
    const history = useHistory()
    const count = Math.ceil(cardsTotalCount / pageCount)

    console.log(pageCount)
    const [pageValue, setPageValue] = useState<number>(1)
    const [packsPerPageValue, setPacksPerPageValue] = useState<ShowValueType>(10)


    const RedirectToPacksListHandler = () => {
        history.push("/")
    }

    useEffect(() => {
        dispatch(getCardsTC(packId, pageValue, packsPerPageValue))
    }, [dispatch, packId, pageValue, packsPerPageValue])

    console.log(cards)

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.cardsList}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.topWrap}>
                        <button className={s.btn} onClick={RedirectToPacksListHandler}></button>
                        <MainTitle title={"Pack Name"} textStyle={s.tableTitle}/>
                    </div>
                    <div className={s.searchWrap}>
                        {/*<SearchInput/>*/}
                    </div>
                    {cards.length === 0
                        ? <div>Empty</div>
                        : <>
                            <CardsListTableMUI tableState={cards}/>
                            <PaginationTable item={pageValue}
                                             setItem={setPageValue}
                                             setPerPage={setPacksPerPageValue}
                                             count={count}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    )
})