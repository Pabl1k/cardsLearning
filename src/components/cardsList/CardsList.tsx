import React from "react"
import {Redirect, useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import s from "./CardsList.module.scss"

type CardsListPropsType = {}

export const CardsList = React.memo((props: CardsListPropsType) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)

    /*const cardsPack_id = useParams()
    console.log(cardsPack_id)*/

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <>
            CardsList
        </>
    )
})