import React, {useEffect} from "react"
import {fetchCardsTC} from "../../redux/reducers/packsList-reducer"
import {useDispatch} from "react-redux"

export const PacksList = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCardsTC())
    }, [dispatch])

    return (
        <>

        </>
    )
}