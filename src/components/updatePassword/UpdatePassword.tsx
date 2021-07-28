import React from "react"
import {Redirect} from "react-router-dom"
import {useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import style from "./UpdatePassword.module.scss"

type UpdatePasswordPropsType = {

}

export const UpdatePassword = React.memo(function (props: UpdatePasswordPropsType) {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)

    if (isLoggedIn) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <>
            UpdatePassword page
        </>
    )
})