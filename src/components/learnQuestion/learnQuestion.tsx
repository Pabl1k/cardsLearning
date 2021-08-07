import React, {useState} from "react"
import {Button} from "../common/button/Button"
import s from "./learnQuestion.module.scss"

type learnQuestionPropsType = {}


export const LearnQuestion = React.memo((props: learnQuestionPropsType) => {


    return (
        <div className={s.learnQuestion}>
            <h2 className={s.caption}>Learn “Pack Name”</h2>

            <div className={s.block}>
                <span className={s.action}>Question:</span>
                <span className={s.text}> “How "This" works in JavaScript?”</span>
            </div>

            <div className={s.btns}>
                <Button className={s.button}>
                    Cancel
                </Button>
                <Button className={s.button}>
                    Show answer
                </Button>
            </div>
        </div>
    )
})