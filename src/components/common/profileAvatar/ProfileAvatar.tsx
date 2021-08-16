import React from "react"
import avatar from "../../../assets/images/avatar.png"
import {Button} from "../button/Button"
import s from "./ProfileAvatar.module.scss"

type ProfileAvatarPropsType = {}

export const ProfileAvatar = React.memo((props: ProfileAvatarPropsType) => {
    return (
        <div className={s.profileAvatar}>
            <div className={s.avatarWrap}>
                <img className={s.avatar} src={avatar} alt="avatar"/>
            </div>
            <h2 className={s.name}>Ivan Ivanov</h2>
            <span className={s.career}>Front-end developer</span>
            <div className={s.profileAvatarButtonContainer}>
            <Button
                onClick={() => {}}
                className={s.profileAvatarButton}>
                Edit profile
            </Button>
            </div>
        </div>
    )
})