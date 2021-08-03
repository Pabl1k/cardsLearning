import React, {useEffect} from "react"
import {Redirect} from "react-router-dom"
import {fetchCardsTC} from "../../redux/reducers/packsList-reducer"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {DoubleRange} from "../common/doubleRange/DoubleRange"
import s from "./PacksList.module.scss"
import {ItemsFilterSpan} from "../common/itemsFilterSpan/ItemsFilterSpan"

type PacksListPropsType = {}

export const PacksList = React.memo((props: PacksListPropsType) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const name = useSelector<AppRootStateType, any>(state => state.packsListReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCardsTC())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <>
            <ItemsFilterSpan
                title={"test"}
                status={"down"}
            />
            <div>
                <DoubleRange
                    minValue={0}
                    maxValue={100}
                />
            </div>
            <div style={{display: 'flex', flexDirection: 'row', fontSize: 20}}>
                <div style={{paddingRight: 15}}>Name</div>
                <div style={{paddingRight: 15}}>Cards</div>
                <div style={{paddingRight: 15}}>Last Updated</div>
                <div style={{paddingRight: 15}}>Created by</div>
                <div style={{paddingRight: 15}}>Actions</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>{name}</div>
        </>
    )
})