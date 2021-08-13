import React from "react"
import {Button} from "../../common/button/Button"
import s from "./LearnQuestion.module.scss"
import {CardType} from "../../../api/api";
import {useHistory} from "react-router-dom";

type learnQuestionPropsType = {
    card: CardType
    setShowAnswer: (value: boolean) => void
    onNextCard: (value: number) => void
}

export const LearnQuestion = React.memo((props: learnQuestionPropsType) => {

    const history = useHistory();

    console.log('LearnQuestion component: ' + props.card)

    return (
        <div className={s.learnQuestion}>
            <h2 className={s.caption}>Learn card: </h2>
            <div className={s.block}>
                <span className={s.action}>Question:</span>
                <span className={s.text}>{props.card.question}</span>
            </div>
            <div className={s.btns}>
                <Button
                    className={s.button}
                    onClick={() => history.push("/")}
                >
                    Cancel
                </Button>
                <Button
                    className={s.button}
                    onClick={() => props.setShowAnswer(true)}
                >
                    Show answer

                </Button>
            </div>
        </div>
    )
})