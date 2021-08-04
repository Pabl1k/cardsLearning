import React, {useEffect} from "react"
import {Redirect, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import s from "./CardsList.module.scss"
import {getCardsTC} from "../../redux/reducers/cardsList-reducer";
import {CardType} from "../../api/api";

type CardsListPropsType = {}

export const CardsList = React.memo((props: CardsListPropsType) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const cardsState = useSelector<AppRootStateType, Array<CardType>>(state => state.cardsListReducer.cards)
    const {packId} = useParams<{ packId: string }>();

    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [dispatch, packId])

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <>
            <table>
                <tr>
                    <th>question</th>
                    <th>answer</th>
                    <th>Last updated</th>
                    <th>grade</th>
                </tr>

                {cardsState.map((card) => (
                    <tr key={card._id}>
                        <td>{card.question}</td>
                        <td>{card.answer}</td>
                        <td>{card.updated}</td>
                        <td>{card.grade}</td>
                    </tr>))
                }

            </table>
        </>
    )
})