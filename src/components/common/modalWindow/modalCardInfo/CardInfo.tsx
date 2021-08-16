import React, {ChangeEvent, useState} from "react"
import {InputTextMUI} from "../../inputText/InputTextMUI"
import {Button} from "../../button/Button"
import s from "./CardInfo.module.scss"

type CardInfoPropsType = {
    onAddNewHandler: (question: string, answer: string) => void
    onCloseModalHandler: () => void
    answer?: string
    question?: string
    name:string
}


export const CardInfo = React.memo((props: CardInfoPropsType) => {

    let [question, setQuestion] = useState(props.question ? props.question : "")
    let [answer, setAnswer] = useState(props.answer ? props.answer : "")

    const onChangeHandlerQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)

    }
    const onChangeHandlerAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)

    }
    const addSaveHandler = () => {
        if (question.trim() !== "") {
            props.onAddNewHandler(question, answer)
            setQuestion("")
            setAnswer("")
        }
    }

    return (
        <div className={s.cardInfo}>
            <h2 className={s.caption}>{props.name}</h2>
            <div className={s.inputBox}>
                <div className={s.inputWrap}>
                    <InputTextMUI
                        onChangeHandler={onChangeHandlerQuestion}
                        type={"text"}
                        label={"Question"}
                        autoComplete="off"
                        value={question}
                    />
                    <label className={s.label}>
                        <input className={s.file} type="file"/>
                        + Attach file
                    </label>
                </div>
                <div className={s.inputWrap}>
                    <InputTextMUI
                        onChangeHandler={onChangeHandlerAnswer}
                        type={"text"}
                        label={"Answer"}
                        autoComplete="off"
                        value={answer}
                    />
                    <label className={s.label}>
                        <input className={s.file} type="file"/>
                        + Attach file
                    </label>
                </div>
            </div>
            <div className={s.btns}>
                <Button className={s.button} onClick={props.onCloseModalHandler}>
                    Cancel
                </Button>
                <Button className={s.button} onClick={addSaveHandler}>
                    Save
                </Button>
            </div>
        </div>
    )
})