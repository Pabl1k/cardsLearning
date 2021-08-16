import React from "react"
import {Button} from "../../button/Button"
import s from "./modalDelete.module.scss"

type ModalDelete = {
    handler: any
    onCancelHandler: any
    packName: string
    name: string
}

export const ModalDelete = React.memo((props: ModalDelete) => {

    return (
        <div className={s.modalDelete}>
            <div className={s.modalTop}>
                <h2 className={s.caption}>Delete {props.name}</h2>
                <button className={s.btnCross} onClick={props.onCancelHandler}></button>
            </div>
            <div className={s.inputWrap}>
                <span className={s.text}>Do you really want to remove
                    <span className={s.accent}>{props.name} Name - {props.packName}?</span>
                    All cards will be excluded from this course.
                </span>
            </div>
            <div className={s.btns}>
                <Button
                    onClick={props.onCancelHandler}
                    className={s.button}>
                    Cancel
                </Button>
                <Button
                    onClick={props.handler}
                    className={s.button}>
                    Delete
                </Button>
            </div>
        </div>
    )
})