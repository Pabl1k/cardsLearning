import React, {ChangeEvent, useState} from "react"
import {InputTextMUI} from "../../inputText/InputTextMUI"
import {Button} from "../../button/Button"
import s from "./modalAdd.module.scss"

type ModalAdd = {
    addPack: (newValue: string) => void
    onCancelHandler?: () => void
    onAddNewPackHandler: () => void
}

export const ModalAdd = React.memo((props: ModalAdd) => {
    let [title, setTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const addSaveHandler = () => {
        if (title.trim() !== "") {
            props.addPack(title)
            setTitle("")

        }
        props.onAddNewPackHandler()
    }
    return (
        <div className={s.modalAdd}>
            <div className={s.modalTop}>
                <h2 className={s.caption}>Add new pack</h2>
                <button className={s.btnCross} onClick={props.onCancelHandler}></button>
            </div>
            <div className={s.inputWrap}>
                <InputTextMUI
                    type={"text"}
                    value={title}
                    onChangeHandler={onChangeHandler}
                    autoComplete="off"
                    label={"Name Pack"}
                />
            </div>
            <div className={s.btns}>
                <Button className={s.button} onClick={props.onCancelHandler}>
                    Cancel
                </Button>
                <Button className={s.button} onClick={addSaveHandler}>
                    Save
                </Button>
            </div>
        </div>
    )
})