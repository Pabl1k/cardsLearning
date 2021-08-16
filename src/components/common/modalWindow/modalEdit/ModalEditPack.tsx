import React from "react"
import {ModalAdd} from "../modalAdd/modalAdd"
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles"
import {ModalEdit} from "./modalEdit";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
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

type ModalEditPackPropsType = {
    onCancelHandler?: () => void
    onEditNewPackHandler: (newValue: string) => void
    packName:string
}

export default function ModalEditPack(props: ModalEditPackPropsType) {

    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)

    return (
        <div style={modalStyle} className={classes.paper}>
            <ModalEdit onCancelHandler={props.onCancelHandler} onEditNewPackHandler={props.onEditNewPackHandler} packName={props.packName}/>
        </div>
    )
}