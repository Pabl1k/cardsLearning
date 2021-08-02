import React from "react"
import {Redirect} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import defaultUserAvatar from "./../../assets/images/defaultUserAvatar.png"
import s from "./Profile.module.scss"

type ProfilePropsType = {}

export const Profile = React.memo(function (props: ProfilePropsType) {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const {userName, userAvatar} = useSelector((state: AppRootStateType) => state.loginReducer.userData)
    const dispatch = useDispatch()

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div>
            Profile page:
            {userAvatar
                ? <div>
                    <img src={userAvatar} alt={"User's avatar"} style={{width: "60px", height: "60px"}}/>
                </div>
                : <div>
                    <img src={defaultUserAvatar} alt={"User's avatar"} style={{width: "60px", height: "60px"}}/>
                </div>
            }
            <p>UserName: {userName}</p>
        </div>
    )
})