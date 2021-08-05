import React, {useCallback, useEffect} from "react"
import {Redirect} from "react-router-dom"
import {AppRootStateType} from "../../redux/store"
import {useDispatch, useSelector} from "react-redux"
import {addNewPackTC, fetchPacksStateTC} from "../../redux/reducers/packsList-reducer"
import {CardPacksResponseType} from "../../api/api"
import {TabsShowPacks} from "./tabsShowPacks/TabsShowPacks"
import {SearchInput} from "../common/searchInput/SearchInput"
import {Button} from "../common/button/Button"
import {DoubleRange} from "../common/doubleRange/DoubleRange"
import {PacksListTableMUI} from "./packsTableMUI/PacksListTableMUI"
import {PaginationTable} from "../common/paginationTable/PaginationTable"
import {MainTitle} from "../common/mainTitle/MainTitle"
import s from "./PacksList.module.scss"

type PacksListPropsType = {}

export const PacksList = React.memo((props: PacksListPropsType) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const {minCardsCount, maxCardsCount} = useSelector((state: AppRootStateType) => state.packsListReducer)
    const packsListState = useSelector<AppRootStateType, Array<CardPacksResponseType>>(state => state.packsListReducer.cardPacks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPacksStateTC())
    }, [])

    const applyDoubleRangeValues = useCallback(() => {

    },[])

    const addNewPack = useCallback(() => {
        dispatch(addNewPackTC())
    },[dispatch])

    const deletePack = useCallback(() => {
        // dispatch(addNewPackStateTC())
    },[dispatch])

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.packsList}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.aside}>
                        <TabsShowPacks/>
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
                        <PacksListTableMUI tableState={packsListState}/>
                        <PaginationTable/>
                    </div>
                </div>
            </div>
        </div>
    )
})