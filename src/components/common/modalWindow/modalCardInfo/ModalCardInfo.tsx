import React from "react"
import {CardInfo} from "./CardInfo"
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

type ModalCardInfoPropsType = {
    name: string
    question?: string
    answer?: string
    editCard: (question: string, answer: string) => void
    closeModal: () => void
}

export const ModalCardInfo = React.memo((props: ModalCardInfoPropsType) => {

    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)

    return (
        <div style={modalStyle} className={classes.paper}>
            <CardInfo
                name={props.name}
                answer={props.answer}
                question={props.question}
                onAddNewHandler={props.editCard}
                onCloseModalButtonClick={props.closeModal}
            />
        </div>
    )
})