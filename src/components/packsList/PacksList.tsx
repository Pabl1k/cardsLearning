import React, {useEffect} from "react"
import {Redirect} from "react-router-dom"
import {fetchCardsTC} from "../../redux/reducers/packsList-reducer"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {DoubleRange} from "../common/doubleRange/DoubleRange"
import s from "./PacksList.module.scss"
import {CardPacksResponseType} from "../../api/api";

type PacksListPropsType = {}

export const PacksList = React.memo((props: PacksListPropsType) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const packsListState = useSelector<AppRootStateType, Array<CardPacksResponseType>>(state => state.packsListReducer)
    const dispatch = useDispatch()

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <>
            <div>
                <DoubleRange/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', fontSize: 20}}>
                <div style={{paddingRight: 15}}>Name</div>
                <div style={{paddingRight: 15}}>Cards</div>
                <div style={{paddingRight: 15}}>Last Updated</div>
                <div style={{paddingRight: 15}}>Created by</div>
                <div style={{paddingRight: 15}}>Actions</div>
            </div>

            {packsListState.map((pack) => {
                return <div key={pack._id}
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    {pack.name}
                    <div style={{padding: '0 10px 0 10px'}}>
                        {pack.cardsCount}
                    </div>
                    {pack.updated.slice(0, 10)}
                    {pack.user_name}
                    <div>
                        <button>Delete</button>
                        <button>Edit</button>
                        <button>Learn</button>
                    </div>
                </div>
            })}
        </>
    )
})