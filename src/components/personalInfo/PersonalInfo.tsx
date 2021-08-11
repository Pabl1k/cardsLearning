import React from "react"
import {InputTextMUI} from "../common/inputText/InputTextMUI"
import {ProfileAvatarBtn} from "../common/profileAvatarBtn/ProfileAvatarBtn"
import {Button} from "../common/button/Button"
import s from "./Personal.module.scss"

type PersonalInfoPropsType = {}

export const PersonalInfo = React.memo((props: PersonalInfoPropsType) => {

    return (
        <div className={s.personalInfo}>
            <h2 className={s.caption}>Personal Information</h2>
            <ProfileAvatarBtn/>
            <div className={s.inputBox}>
                <div className={s.inputWrap}>
                    <InputTextMUI
                        type={"text"}
                        label={"Nickname"}
                        autoComplete="off"
                        value={"Ivan"}
                    />
                </div>
                <div className={s.inputWrap}>
                    <InputTextMUI
                        type={"text"}
                        label={"Email"}
                        autoComplete="off"
                        value={"j&johnson@gmail.com"}
                    />
                </div>
            </div>
            <div className={s.btns}>
                <Button
                    className={s.button}>
                    Cancel
                </Button>
                <Button
                    className={s.button}>
                    Save
                </Button>
            </div>
        </div>
    )
})