import React from "react"
import {ModalDelete} from "./modalDelete/modalDelete"
import s from "./ModalWindow.module.scss"


type ModalWindow = {
    onDeleteHandler: any
    onCancelHandler: any
    packName: string
    name:string
}

export const ModalWindow = React.memo((props: ModalWindow) => {



    return (
        <div  className={s.modalWindow}>
            <ModalDelete
                handler={props.onDeleteHandler}
                onCancelHandler={props.onCancelHandler}
                packName={props.packName}
                name={props.name}
            />
        </div>
    )
})