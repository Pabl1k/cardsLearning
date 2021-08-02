import React, {useEffect} from "react"
import {fetchCardsTC} from "../../../redux/reducers/packsList-reducer"
import {useDispatch} from "react-redux"
import {Header} from "../../common/header/Header"

export const PacksList = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCardsTC())
    }, [])

    return <>
        <Header/>
    </>
}