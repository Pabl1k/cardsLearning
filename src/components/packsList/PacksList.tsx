import React, {useEffect} from "react"
import {Redirect} from "react-router-dom"
import {AppRootStateType} from "../../redux/store"
import {useDispatch, useSelector} from "react-redux"
import {TabsShowPacks} from "./tabsShowPacks/TabsShowPacks"
import {SearchInput} from "../common/searchInput/SearchInput"
import {Button} from "../common/button/Button"
import {DoubleRange} from "../common/doubleRange/DoubleRange"
import {PacksListTableMUI} from "./packsTableMUI/PacksListTableMUI"
import {PaginationTable} from "../common/paginationTable/PaginationTable"
import {MainTitle} from "../common/mainTitle/MainTitle"
import s from "./PacksList.module.scss"
import {fetchCardsStateTC} from "../../redux/reducers/packsList-reducer";
import {CardPacksResponseType, GetPacksResponseType} from "../../api/api";

type PacksListPropsType = {}

export const PacksList = React.memo((props: PacksListPropsType) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)

    const cardsListState = useSelector<AppRootStateType, Array<CardPacksResponseType>>(state => state.packsListReducer.cardPacks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCardsStateTC())
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.packsList}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.aside}>
                        <TabsShowPacks/>
                        <DoubleRange
                            minValue={0} // Сюда закинуть значения из стейта
                            maxValue={100} // Сюда закинуть значения из стейта
                        />
                    </div>
                    <div className={s.content}>
                        <MainTitle title={"Packs list"} textStyle={s.tableTitle}/>
                        <div className={s.topWrap}>
                            <SearchInput/>
                            <Button className={s.button}>Add new pack</Button>
                        </div>
                        <PacksListTableMUI tableState={cardsListState}/>
                        <PaginationTable/>
                    </div>
                </div>
            </div>
        </div>
    )
})