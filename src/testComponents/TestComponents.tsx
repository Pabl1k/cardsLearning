import React, {useState} from "react"
import {AddItemForm} from "../common/components/addItemForm/AddItemForm"
import {InputText} from "../common/components/inputText/InputText"
import {Button} from "../common/components/button/Button"
import {Checkbox} from "../common/components/checkbox/Checkbox"
import style from "./TestComponents.module.scss"

type TestComponentsPropsType = {}

export const TestComponents = React.memo(function (props: TestComponentsPropsType) {

    const [text, setText] = useState<string>("")
    const [checked, setChecked] = useState<boolean>(false)

    const showAlertAddedItem = (text: string) => {
        alert(text)
    }

    const showAlert = () => {
        alert(text)
    }

    return (
        <>
            <AddItemForm
                addItem={showAlertAddedItem}
                addItemInputStyle={style.inputStyle}
                addItemButtonStyle={style.buttonStyle}
            />
            <InputText
                value={text}
                onChangeText={setText}
                onEnter={showAlert}
                className={style.inputStyle}
            />
            <Button
                onClick={showAlert}
                className={style.buttonStyle}>Click
            </Button>
            <Checkbox
                checked={checked}
                onChangeChecked={setChecked}
                className={style.checkboxStyle}
            />
        </>
    )
})