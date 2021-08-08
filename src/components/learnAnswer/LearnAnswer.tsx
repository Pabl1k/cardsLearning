import React from "react"
import {RadioMUI} from "./RadioMUI"
import {Button} from "../common/button/Button"
import FormControl from "@material-ui/core/FormControl"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import s from "./LearnAnswer.module.scss"

type LearnAnswerPropsType = {}

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
                <span className={s.text}> “How "This" works in JavaScript?”</span>
            </div>
            <div className={s.block}>
                <span className={s.action}>Answer:</span>
                <span className={s.text}> “This is how "This" works in JavaScript”</span>
            </div>
            <div className={s.radioWrap}>
                <span className={s.action}>Rate yourself:</span>
                <FormControl component="fieldset" className={s.radio}>
                    <RadioGroup aria-label="answer" name="answer" value={value} onChange={handleChange}>
                        <FormControlLabel className={s.radioItem} value="answer1" control={<RadioMUI/>}
                                          label="Did not know"/>
                        <FormControlLabel value="answer2" control={<RadioMUI/>} label="Forgot"/>
                        <FormControlLabel value="answer3" control={<RadioMUI/>} label="A lot of thought"/>
                        <FormControlLabel value="answer4" control={<RadioMUI/>} label="Сonfused"/>
                        <FormControlLabel value="answer5" control={<RadioMUI/>} label="Knew the answer"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <div className={s.btns}>
                <Button className={s.button}>
                    Cancel
                </Button>
                <Button className={s.button}>
                    Next
                </Button>
            </div>
        </div>
    )
})