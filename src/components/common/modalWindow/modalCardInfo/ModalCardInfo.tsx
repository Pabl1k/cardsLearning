import React from "react"
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles"
import {CardInfo} from "./CardInfo";

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

type ModalCardInfoPropsType = {
    onAddNewHandler:(question:string,answer:string)=>void
    onCloseModalHandler:()=>void
}

function ModalCardInfo(props: ModalCardInfoPropsType) {

    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)

    return (
        <div style={modalStyle} className={classes.paper}>
            <CardInfo  onAddNewHandler={props.onAddNewHandler}  onCloseModalHandler={props.onCloseModalHandler} />
        </div>
    )
}


export default ModalCardInfo