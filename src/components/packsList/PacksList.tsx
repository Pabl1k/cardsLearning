import React, {useCallback, useEffect, useState} from "react"
import {Redirect} from "react-router-dom"
import {AppRootStateType} from "../../redux/store"
import {useDispatch, useSelector} from "react-redux"
import {fetchPacksStateAfterDoubleRangeTC, fetchPacksStateTC} from "../../redux/reducers/packsList-reducer"
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
    const userId = useSelector<AppRootStateType, string>(state => state.appReducer.userData._id)
    const {cardPacks, minCardsCount, maxCardsCount, tabsShowPacksStatus} = useSelector((state: AppRootStateType) => state.packsListReducer)
    const dispatch = useDispatch()

    const [pageValue, setPageValue] = useState<number>(1)
    const [packsPerPageValue, setPacksPerPageValue] = useState<ShowValueType>(10)

    useEffect(() => {
        dispatch(fetchPacksStateTC(pageValue, packsPerPageValue))
    }, [dispatch, pageValue, packsPerPageValue])

    const applyDoubleRangeValues = useCallback((min: number, max: number) => {
        dispatch(fetchPacksStateAfterDoubleRangeTC(min, max))
    }, [])

    const addNewPack = useCallback(() => {
        // dispatch(addNewPackTC())
    },[dispatch])

    const deletePack = useCallback(() => {
        // dispatch(addNewPackStateTC())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.packsList}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.aside}>
                        <TabsShowPacks
                            userId={userId}
                            showPacksStatus={tabsShowPacksStatus}
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
                            <SearchInput/>
                            <Button
                                onClick={addNewPack}
                                className={s.button}
                            >Add new pack</Button>
                        </div>
                        {/*<PacksListTableMUI tableState={packsListState}/>*/}
                        {/*<PaginationTable/>*/}
                        <PacksListTableMUI
                            user_id={userId}
                            tableState={cardPacks}
                        />
                        <PaginationTable
                            item={pageValue}
                            setItem={setPageValue}
                            setPerPage={setPacksPerPageValue}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})