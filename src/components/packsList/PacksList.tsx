import React, {useCallback, useEffect, useState} from "react"
import {Redirect} from "react-router-dom"
import {PackResponseType} from "../../api/api"
import {AppRootStateType} from "../../redux/store"
import {useDispatch, useSelector} from "react-redux"
import {
    addNewPackTC, changeShowAllOrMyPacksAC,
    deletePackTC,
    fetchPacksTC,
    setDoubleRangesValuesAC,
    setNewCurrentPageAC,
    setNewPageCountAC, setNewSortPacksOrderAndFilterAC,
    setSearchPacksValueAC, SortPacksOrderType, updatePackTC
} from "../../redux/reducers/packsList-reducer"
import {TabsShowPacks} from "./tabsShowPacks/TabsShowPacks"
import {SearchInput} from "../common/searchInput/SearchInput"
import {Button} from "../common/button/Button"
import {DoubleRange} from "../common/doubleRange/DoubleRange"
import {PacksListTableMUI} from "./packsTableMUI/PacksListTableMUI"
import {PaginationTable} from "../common/paginationTable/PaginationTable"
import {MainTitle} from "../common/mainTitle/MainTitle"
import s from "./PacksList.module.scss"
import ModalAddPack from "../common/modals/ModalAddPack";


type PacksListPropsType = {}

export const PacksList = React.memo((props: PacksListPropsType) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const user_id = useSelector<AppRootStateType, string>(state => state.appReducer.userData._id)
    const userId = useSelector<AppRootStateType, string>(state => state.packsListReducer.user_id)
    const {
        searchPacksValue,
        minCardsCount,
        maxCardsCount,
        sortPacksOrder,
        sortPacksFilter,
        page,
        pageCount
    } = useSelector((state: AppRootStateType) => state.packsListReducer)
    const {
        isShowMyPacks,
        minCardsDoubleRangeValue,
        maxCardsDoubleRangeValue,
        cardPacksTotalCount
    } = useSelector((state: AppRootStateType) => state.packsListReducer)
    const packs = useSelector<AppRootStateType, Array<PackResponseType>>((state) => state.packsListReducer.cardPacks)
    const dispatch = useDispatch()

    const count = Math.ceil(cardPacksTotalCount / pageCount)

    useEffect(() => {
        dispatch(fetchPacksTC(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksOrder, sortPacksFilter, page, pageCount, userId))
    }, [dispatch, searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksOrder, sortPacksFilter, page, pageCount, userId])

    const changeShowAllOrMyPacks = useCallback((isShowMyPacks: boolean, userId: string) => {
        dispatch(changeShowAllOrMyPacksAC(isShowMyPacks, userId))
    }, [dispatch])

    const setDoubleRangeValues = useCallback((minCardsDoubleRangeValue: number, maxCardsDoubleRangeValue: number) => {
        dispatch(setDoubleRangesValuesAC(minCardsDoubleRangeValue, maxCardsDoubleRangeValue))
    }, [dispatch])

    const setSearchValue = useCallback((newSearchPacksValue: string) => {
        dispatch(setSearchPacksValueAC(newSearchPacksValue))
    }, [dispatch])

    const setNewSortPacksOrderAndFilter = useCallback((sortPacksOrder: SortPacksOrderType, sortPacksFilter: string) => {
        dispatch(setNewSortPacksOrderAndFilterAC(sortPacksOrder, sortPacksFilter))
    }, [dispatch])

    const setNewCurrentPage = useCallback((newCurrentPage: number) => {
        dispatch(setNewCurrentPageAC(newCurrentPage))
    }, [dispatch])

    const setNewPageCount = useCallback((newPageCount: number) => {
        dispatch(setNewPageCountAC(newPageCount))
    }, [dispatch])

    const addNewPack = useCallback((packName: string) => {
        dispatch(addNewPackTC(packName, searchPacksValue, minCardsCount, maxCardsCount, sortPacksOrder, sortPacksFilter, page, pageCount, user_id))
    }, [dispatch, searchPacksValue, minCardsCount, maxCardsCount, sortPacksOrder, sortPacksFilter, page, pageCount, user_id])

    const updatePack = useCallback((newPackName: string, packId: string) => {
        dispatch(updatePackTC(newPackName, packId, searchPacksValue, minCardsCount, maxCardsCount, sortPacksOrder, sortPacksFilter, page, pageCount, user_id))
    }, [dispatch, searchPacksValue, minCardsCount, maxCardsCount, sortPacksOrder, sortPacksFilter, page, pageCount, user_id])

    const deletePack = useCallback((packId: string) => {
        dispatch(deletePackTC(packId, searchPacksValue, minCardsCount, maxCardsCount, sortPacksOrder, sortPacksFilter, page, pageCount, user_id))
    }, [dispatch, searchPacksValue, minCardsCount, maxCardsCount, sortPacksOrder, sortPacksFilter, page, pageCount, user_id])


    const [openModal, setOpenModal] = useState(false)

    const onCancelHandler = () => {
        setOpenModal(false)
    }

    const onAddNewPackHandler = (newValue: string) => {
        addNewPack(newValue)
        setOpenModal(false)
    }

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.packsList}>
            <div className={s.container}>
                {openModal &&
                < ModalAddPack onCancelHandler={onCancelHandler} onAddNewPackHandler={onAddNewPackHandler}/>}
                <div className={s.inner}>
                    <div className={s.aside}>
                        <TabsShowPacks
                            userId={user_id}
                            showPacksStatus={isShowMyPacks}
                            changeShowMyPacks={changeShowAllOrMyPacks}
                        />
                        <div className={s.rangeWrap}>
                            <DoubleRange
                                minCardsCount={minCardsCount}
                                maxCardsCount={maxCardsCount}
                                setDoubleRangeValues={setDoubleRangeValues}
                            />
                        </div>
                    </div>

                    <div className={s.content}>
                        <MainTitle title={"Packs list"} textStyle={s.tableTitle}/>
                        <div className={s.topWrap}>
                            <SearchInput onKeyPressEnter={setSearchValue}/>
                            <Button
                                onClick={() => setOpenModal(true)}
                                className={s.button}>
                                Add new pack
                            </Button>
                        </div>

                        <PacksListTableMUI
                            user_id={user_id}
                            packs={packs}
                            updatePack={updatePack}
                            deletePack={deletePack}
                            setNewSortPacksOrderAndFilter={setNewSortPacksOrderAndFilter}
                        />
                        <PaginationTable
                            currentPage={page}
                            count={count}
                            setNewCurrentPage={setNewCurrentPage}
                            setNewPageCount={setNewPageCount}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})