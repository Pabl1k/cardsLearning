import React, {useCallback, useEffect} from "react"
import {Redirect, useHistory, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {
    getCardsTC,
    setCardsNewCardsPageCountAC,
    setCardsNewCurrentPageAC,
    setSearchCardsValueAC
} from "../../redux/reducers/cardsList-reducer"
import {MainTitle} from "../common/mainTitle/MainTitle"
import {SearchInput} from "../common/searchInput/SearchInput"
import {CardsListTableMUI} from "./cardsTableMUI/CardsListTableMUI"
import {PaginationTable} from "../common/paginationTable/PaginationTable"
import s from "./CardsList.module.scss"

type CardsListPropsType = {}

export const CardsList = React.memo((props: CardsListPropsType) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const {cardsTotalCount, cards, pageCount, page, searchCardsValue} = useSelector((state: AppRootStateType) => state.cardsListReducer)
    const count = Math.ceil(cardsTotalCount / pageCount)
    const {packId} = useParams<{ packId: string }>()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getCardsTC(packId, page, pageCount, searchCardsValue))
    }, [dispatch, packId, page, pageCount, searchCardsValue])

    const RedirectToPacksListHandler = () => {
        history.push("/")
    }

    const setCardsNewCurrentPage = useCallback((newCurrentPage: number) => {
        dispatch(setCardsNewCurrentPageAC(newCurrentPage))
    }, [dispatch])

    const setCardsNewPageCount = useCallback((newPageCount: number) => {
        dispatch(setCardsNewCardsPageCountAC(newPageCount))
    }, [dispatch])

    const setCardsSearchValue = useCallback((newSearchCardsValue: string) => {
        dispatch(setSearchCardsValueAC(newSearchCardsValue))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.cardsList}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.topWrap}>
                        <button className={s.btn} onClick={RedirectToPacksListHandler}/>
                        <MainTitle title={"Pack Name"} textStyle={s.tableTitle}/>
                    </div>
                    <div className={s.searchWrap}>
                        <SearchInput onKeyPressEnter={setCardsSearchValue}/>
                    </div>
                    {cards.length === 0
                        ? <div>Empty</div>
                        : <>
                            <CardsListTableMUI tableState={cards}/>
                            <PaginationTable
                                currentPage={page}
                                count={count}
                                setNewCurrentPage={setCardsNewCurrentPage}
                                setNewPageCount={setCardsNewPageCount}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    )
})