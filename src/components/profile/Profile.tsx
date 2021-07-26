import React from "react"
import {Redirect} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import defaultUserAvatar from "./../../assets/images/defaultUserAvatar.png"
import style from "./Profile.module.scss"

type ProfilePropsType = {}

export const Profile = React.memo(function (props: ProfilePropsType) {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const userName = useSelector<AppRootStateType, string | null>(state => state.loginReducer.name)
    const userAvatar = useSelector<AppRootStateType, string | undefined>(state => state.loginReducer.avatar)
    const dispatch = useDispatch()

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <>
            Profile page:
            {userAvatar
                ? <div>
                    <img src={userAvatar} alt={"User's avatar"} style={{width: "60px", height: "60px"}}/>
                </div>
                : <div>
                    <img src={defaultUserAvatar} alt={"User's avatar"} style={{width: "60px", height: "60px"}}/>
                </div>
            }
            <p>{userName}</p>
        </>
    )
})