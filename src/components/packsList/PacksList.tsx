import React, {useCallback, useEffect} from "react"
import {Redirect} from "react-router-dom"
import {CardPacksResponseType} from "../../api/api"
import {AppRootStateType} from "../../redux/store"
import {useDispatch, useSelector} from "react-redux"
import {
    addNewPackTC, changeShowAllOrMyPacksAC,
    deletePackTC,
    fetchPacksTC,
    setNewCurrentPageAC,
    setNewPageCountAC,
    setSearchPacksValueAC
} from "../../redux/reducers/packsList-reducer"
import {TabsShowPacks} from "./tabsShowPacks/TabsShowPacks"
import {SearchInput} from "../common/searchInput/SearchInput"
import {Button} from "../common/button/Button"
import {DoubleRange} from "../common/doubleRange/DoubleRange"
import {PacksListTableMUI} from "./packsTableMUI/PacksListTableMUI"
import {PaginationTable} from "../common/paginationTable/PaginationTable"
import {MainTitle} from "../common/mainTitle/MainTitle"
import s from "./PacksList.module.scss"

type PacksListPropsType = {}

export type ShowValueType = 5 | 10 | 15

export const PacksList = React.memo((props: PacksListPropsType) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const user_id = useSelector<AppRootStateType, string>(state => state.appReducer.userData._id)
    const userId = useSelector<AppRootStateType, string>(state => state.packsListReducer.user_id)
    const {searchPacksValue, minCardsCount, maxCardsCount, sortPacksOrder, sortPacksFilter, page, pageCount} = useSelector((state: AppRootStateType) => state.packsListReducer)
    const {isShowMyPacks} = useSelector((state: AppRootStateType) => state.packsListReducer)
    const packs = useSelector<AppRootStateType, Array<CardPacksResponseType>>((state) => state.packsListReducer.cardPacks)
    const dispatch = useDispatch()

    useEffect(() => {
        // debugger
        dispatch(fetchPacksTC(searchPacksValue, minCardsCount, maxCardsCount, sortPacksOrder, sortPacksFilter, page, pageCount, userId))
    }, [dispatch, searchPacksValue, minCardsCount, maxCardsCount, sortPacksOrder, sortPacksFilter, page, pageCount, userId])

    const changeShowAllOrMyPacks = useCallback((isShowMyPacks: boolean, userId: string) => {
        dispatch(changeShowAllOrMyPacksAC(isShowMyPacks, userId))
    }, [dispatch])

    const applyDoubleRangeValues = useCallback((min: number, max: number) => {
        // dispatch()
    }, [dispatch])

    const applySearchValue = useCallback((newSearchPacksValue: string) => {
        dispatch(setSearchPacksValueAC(newSearchPacksValue))
    }, [dispatch])

    const setNewCurrentPage = useCallback((newCurrentPage: number) => {
        dispatch(setNewCurrentPageAC(newCurrentPage))
    }, [dispatch])

    const setNewPageCount = useCallback((newPageCount: number) => {
        dispatch(setNewPageCountAC(newPageCount))
    }, [dispatch])

    const addNewPack = useCallback(() => {
        dispatch(addNewPackTC(searchPacksValue, minCardsCount, maxCardsCount, sortPacksOrder, sortPacksFilter, page, pageCount, user_id))
    }, [dispatch, searchPacksValue, minCardsCount, maxCardsCount, sortPacksOrder, sortPacksFilter, page, pageCount, user_id])

    const deletePack = useCallback((packId: string) => {
        dispatch(deletePackTC(packId, searchPacksValue, minCardsCount, maxCardsCount, sortPacksOrder, sortPacksFilter, page, pageCount, user_id))
    }, [dispatch, searchPacksValue, minCardsCount, maxCardsCount, sortPacksOrder, sortPacksFilter, page, pageCount, user_id])

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.packsList}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.aside}>
                        <TabsShowPacks
                            userId={user_id}
                            showPacksStatus={isShowMyPacks}
                            changeShowMyPacks={changeShowAllOrMyPacks}
                        />
                        <div className={s.rangeWrap}>
                            <DoubleRange
                                minValue={minCardsCount}
                                maxValue={maxCardsCount}
                                onButtonClick={applyDoubleRangeValues}
                            />
                        </div>
                    </div>
                    <div className={s.content}>
                        <MainTitle title={"Packs list"} textStyle={s.tableTitle}/>
                        <div className={s.topWrap}>
                            <SearchInput onKeyPressEnter={applySearchValue}/>
                            <Button
                                onClick={addNewPack}
                                className={s.button}
                            >Add new pack</Button>
                        </div>
                        <PacksListTableMUI
                            user_id={user_id}
                            packs={packs}
                            onClickDeletePack={deletePack}
                        />
                        <PaginationTable
                            currentPage={page}
                            setNewCurrentPage={setNewCurrentPage}
                            setNewPageCount={setNewPageCount}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})