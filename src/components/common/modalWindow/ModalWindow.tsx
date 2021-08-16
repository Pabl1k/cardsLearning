import React from "react"
import {ModalDelete} from "./modalDelete/ModalDelete"
import s from "./ModalWindow.module.scss"

function rand() {
    return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
    // const top = 50 + rand()
    // const left = 50 + rand()
    const top = 0
    const left = 0
    const bottom = 0
    const right = 0

    return {
        top: `${top}%`,
        left: `${left}%`,
        right: `${right}%`,
        bottom: `${bottom}%`,
        // transform: `translate(-${top}%, -${left}%)`,
    }
}

/*const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: "absolute",
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
)*/

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