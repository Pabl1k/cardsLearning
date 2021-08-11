import React from "react"
import {InputTextMUI} from "../../inputText/InputTextMUI"
import {Button} from "../../button/Button"
import s from "./modalAdd.module.scss"

type ModalAdd = {}

export const ModalAdd = React.memo((props: ModalAdd) => {

    return (
        <div className={s.modalAdd}>
            <div className={s.modalTop}>
                <h2 className={s.caption}>Add new pack</h2>
                <button className={s.btnCross}></button>
            </div>
            <div className={s.inputWrap}>
                <InputTextMUI
                    type={"text"}
                    label={"Name Pack"}
                    autoComplete="off"
                    value={"Name Pack"}
                />
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