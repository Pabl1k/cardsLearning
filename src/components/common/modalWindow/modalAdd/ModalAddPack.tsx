import React from "react"
import {ModalAdd} from "./ModalAdd"
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

type ModalAddPackPropsType = {
    addNewPack: (newValue: string) => void
    closeModal: () => void
}

export const ModalAddPack = React.memo((props: ModalAddPackPropsType) => {

    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)

    return (
        <div style={modalStyle} className={classes.paper}>
            <ModalAdd
                onAddNewPackHandler={props.addNewPack}
                onCloseModalButtonClick={props.closeModal}
            />
        </div>
    )
})