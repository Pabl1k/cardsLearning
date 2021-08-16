import React from "react"
import {ModalDelete} from "./modalDelete/ModalDelete"
import s from "./ModalWindow.module.scss"

type ModalWindow = {
    name: string
    packName: string
    onDeleteButtonClick: any
    onCloseModalButtonClick: any
}

export const ModalWindow = React.memo((props: ModalWindow) => {
    return (
        <div className={s.modalWindow}>
            <ModalDelete
                name={props.name}
                packName={props.packName}
                onDeleteButtonClick={props.onDeleteButtonClick}
                onCloseModalButtonClick={props.onCloseModalButtonClick}
            />
        </div>
    )
})