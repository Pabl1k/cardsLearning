import React from "react"
import {ModalEdit} from "./ModalEdit"
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles"

function rand() {
    return Math.round(Math.random() * 20) - 10
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
    })
)

type ModalEditPackPropsType = {
    packName: string
    editNewPack: (newValue: string) => void
    closeModal?: () => void
}

export const ModalEditPack = React.memo((props: ModalEditPackPropsType) => {

    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)

    return (
        <div className={classes.paper} style={modalStyle}>
            <ModalEdit
                packName={props.packName}
                onEditNewPackButtonClick={props.editNewPack}
                onCloseModalButtonClick={props.closeModal}
            />
        </div>
    )
})