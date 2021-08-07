import React from "react"
import avatar from "../../../assets/images/avatar.png"
import s from "./ProfileAvatarBtn.module.scss"

type ProfileAvatarBtnPropsType = {}

export const ProfileAvatarBtn = React.memo((props: ProfileAvatarBtnPropsType) => {
    return (
        <div className={s.profileAvatar}>
            <div className={s.avatarWrap}>
                <img className={s.avatar} src={avatar} alt="avatar"/>
                <button className={s.photoIcon}></button>
            </div>

        </div>
    )
})