import React from "react"
import s from "./ModalWindow.module.scss"
import {ModalDelete} from "./modalDelete/modalDelete"
import {ModalAdd} from "./modalAdd/modalAdd"
// import {ModalDelete} from "./modalAdd/modalAdd"

type ModalWindow = {}

export const ModalWindow = React.memo((props: ModalWindow) => {

    return (
        <div className={s.modalWindow}>
            <ModalDelete/>
            {/*приходит либо ModalDelete либо ModalAdd (одну компоненту убрать!!!)*/}
            <ModalAdd/>

        </div>
    )
})