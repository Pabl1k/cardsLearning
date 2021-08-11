import React, {useState} from "react"
import s from "./ModalWindow.module.scss"
import {ModalDelete} from "./modalDelete/modalDelete"
import {ModalAdd} from "./modalAdd/modalAdd"
// import {ModalDelete} from "./modalAdd/modalAdd"

type ModalWindow = {
    type:"delete"
    handler:any
    setOpen?:any
}

export const ModalWindow = React.memo((props: ModalWindow) => {

    return (


        <div className={s.modalWindow}>
             {props.type === 'delete' && <ModalDelete  handler={props.handler} setOpen={props.setOpen}/>}
            {/*приходит либо ModalDelete либо ModalAdd (одну компоненту убрать!!!)*/}
            {/*<ModalAdd/>*/}

        </div>

    )
})