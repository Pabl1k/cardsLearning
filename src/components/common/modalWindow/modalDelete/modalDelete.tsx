import React from "react"
import {Button} from "../../button/Button"
import s from "./modalDelete.module.scss"

type ModalDelete = {}

export const ModalDelete = React.memo((props: ModalDelete) => {
    return (
        <div className={s.modalDelete}>
            <div className={s.modalTop}>
                <h2 className={s.caption}>Delete Pack</h2>
                <button className={s.btnCross}></button>
            </div>
            <div className={s.inputWrap}>
                <span className={s.text}>Do you really want to remove
                    <span className={s.accent}>Pack Name - Name Pack?</span>
                    All cards will be excluded from this course.
                </span>
            </div>
            <div className={s.btns}>
                <Button className={s.button}>
                    Cancel
                </Button>
                <Button className={s.button}>
                    Delete
                </Button>
            </div>
        </div>
    )
})