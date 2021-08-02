import React, {useEffect} from "react"
import {fetchCardsTC} from "../../redux/reducers/packsList-reducer"
import {useDispatch} from "react-redux"
import {fetchCardsTC} from "../../../redux/reducers/packsList-reducer"
import {useDispatch, useSelector} from "react-redux"
import {SuperDoubleRange} from "../../common/doubleRange/SuperDoubleRange";
import {AppRootStateType} from "../../../redux/store";

export const PacksList = () => {

    const name = useSelector<AppRootStateType, any>(state => state.packsList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCardsTC())
    }, [dispatch])

    return <>
        <div>
            <SuperDoubleRange/>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', fontSize: 20}}>
            <div style={{paddingRight: 15}}>Name </div>
            <div style={{paddingRight: 15}}>Cards </div>
            <div style={{paddingRight: 15}}>Last Updated </div>
            <div style={{paddingRight: 15}}>Created by </div>
            <div style={{paddingRight: 15}}>Actions</div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>{name}</div>
    </>
}