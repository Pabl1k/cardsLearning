import React from "react"
import {InputTextMUI} from "../common/inputText/InputTextMUI"
import {Button} from "../common/button/Button"
import s from "./CardInfo.module.scss"

type CardInfoPropsType = {}


export const CardInfo = React.memo((props: CardInfoPropsType) => {

    return (
        <div className={s.cardInfo}>
            <h2 className={s.caption}>Card Info</h2>
            <div className={s.inputBox}>
                <div className={s.inputWrap}>
                    <InputTextMUI
                        type={"text"}
                        label={"Question"}
                        autoComplete="off"
                        value={"How \"This\" works in JavaScript?"}

                    />
                    <label className={s.label}>
                        <input className={s.file} type="file"/>
                        + Attach file
                    </label>
                </div>
                <div className={s.inputWrap}>
                    <InputTextMUI
                        type={"text"}
                        label={"Answer"}
                        autoComplete="off"
                        value={"This is how \"This\" works in JavaScript"}
                    />
                    <label className={s.label}>
                        <input className={s.file} type="file"/>
                        + Attach file
                    </label>
                </div>
            </div>
            <div className={s.btns}>
                <Button className={s.button}>
                    Cancel
                </Button>
                <Button className={s.button}>
                    Save
                </Button>
            </div>
        </div>
    )
})