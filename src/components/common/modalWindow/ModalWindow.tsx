import React from "react"
import s from "./ModalWindow.module.scss"


type ModalWindow = {

}

export const ModalWindow = React.memo((props: ModalWindow) => {
    return (
        <div className={s.modalWindow}>

        </div>
    )
})