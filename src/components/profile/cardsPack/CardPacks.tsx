import React, {useEffect} from "react";
import {fetchCardsTC} from "../../../redux/reducers/cardPacks-reducer";
import {useDispatch} from "react-redux";

export const CardPacks = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCardsTC())
    }, [])
    return <>
    </>
}