import React from "react"
import {useHistory} from "react-router-dom"
import {CardType} from "../../../api/api"
import {Button} from "../../common/button/Button"
import s from "./LearnQuestion.module.scss"

type learnQuestionPropsType = {
    card: CardType
    setShowAnswer: (value: boolean) => void
}

export const LearnQuestion = React.memo((props: learnQuestionPropsType) => {

    const history = useHistory()

    return (
        <div className={s.learnQuestion}>
            <h2 className={s.caption}>Learn card: </h2>
            <div className={s.block}>
                <span className={s.action}>Question:</span>
                <span className={s.text}>{props.card.question}</span>
            </div>
            <div className={s.btns}>
                <Button
                    onClick={() => history.push("/")}
                    className={s.button}>
                    Cancel
                </Button>
                <Button
                    onClick={() => props.setShowAnswer(true)}
                    className={s.button}>
                    Show answer
                </Button>
            </div>
        </div>
    )
})