import React from "react"
import {ModalDelete} from "./modalDelete/modalDelete"
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles"
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

const useStyles = makeStyles((theme: Theme) =>
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
)

type ModalWindow = {
    onDeleteHandler: any
    onCancelHandler: any
    packName: string
}

export const ModalWindow = React.memo((props: ModalWindow) => {
    // const classes = useStyles()
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle)

    return (
        <div style={modalStyle} className={s.modalWindow}>
            <ModalDelete
                handler={props.onDeleteHandler}
                onCancelHandler={props.onCancelHandler}
                packName={props.packName}
            />
        </div>
    )
})