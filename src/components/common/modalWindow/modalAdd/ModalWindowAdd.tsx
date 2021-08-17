import React from "react"

import s from "../ModalWindow.module.scss"
import {ModalAdd} from "./ModalAdd";



type ModalWindowAddPropsType = {
    addNewPack: (newValue: string) => void
    closeModal: () => void
}

export const ModalWindowAdd = React.memo((props: ModalWindowAddPropsType) => {
    return (
        <div className={s.modalWindow}>
            <ModalAdd
                onAddNewPackHandler={props.addNewPack}
                onCloseModalButtonClick={props.closeModal}
            />
        </div>
    )
})