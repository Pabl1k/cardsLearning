import React from "react"
import {RadioMUI} from "./RadioMUI"
import {Button} from "../../common/button/Button"
import FormControl from "@material-ui/core/FormControl"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import s from "./LearnAnswer.module.scss"
import {CardType} from "../../../api/api";
import {useHistory} from "react-router-dom";

type LearnAnswerPropsType = {
    card: CardType
    setShowAnswer: (value: boolean) => void
    onNextCard: (value: number) => void
    grades: string[]
}

export const LearnAnswer = React.memo((props: LearnAnswerPropsType) => {

    const [value, setValue] = React.useState('answer5')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value)
    }

    return (
        <div className={s.learnAnswer}>
            <h2 className={s.caption}>Learn “Pack Name”</h2>
            <div className={s.block}>
                <span className={s.action}>Question:</span>
                <span className={s.text}>{props.card.question}</span>
            </div>
            <div className={s.block}>
                <span className={s.action}>Answer:</span>
                <span className={s.text}>{props.card.answer}</span>
            </div>
            <div className={s.radioWrap}>
                <span className={s.action}>Rate yourself:</span>
                <FormControl component="fieldset" className={s.radio}>
                    <RadioGroup aria-label="answer" name="answer" value={value} onChange={handleChange}>
                        <FormControlLabel className={s.radioItem} value={1} control={<RadioMUI/>}
                                          label="Did not know"/>
                        <FormControlLabel value={2} control={<RadioMUI/>} label="Forgot"/>
                        <FormControlLabel value={3} control={<RadioMUI/>} label="A lot of thought"/>
                        <FormControlLabel value={4} control={<RadioMUI/>} label="Confused"/>
                        <FormControlLabel value={5} control={<RadioMUI/>} label="Knew the answer"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <div className={s.btns}>
                <Button
                    className={s.button}
                    onClick={() => props.setShowAnswer(false)}
                >
                    Cancel
                </Button>
                <Button
                    className={s.button}
                >
                    Next
                </Button>
            </div>
        </div>
    )
})