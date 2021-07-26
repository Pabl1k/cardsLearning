import React, {useState} from "react"
import {AddItemForm} from "../components/common/addItemForm/AddItemForm"
import {Checkbox} from "../components/common/checkbox/Checkbox"
import {Button} from "../components/common/button/Button"
import {InputText} from "../components/common/inputText/InputText"
import style from "./TestComponents.module.scss"

type TestComponentsPropsType = {}

export const TestComponents = React.memo(function (props: TestComponentsPropsType) {

    const [checked, setChecked] = useState<boolean>(false)

    const showAlertAddedItem = (text: string) => {
        alert(text)
    }

    return (
        <>
            <AddItemForm
                addItem={showAlertAddedItem}
                addItemInputStyle={style.inputStyle}
                addItemButtonStyle={style.buttonStyle}
            />
            <Checkbox
                checked={checked}
                onChangeChecked={setChecked}
                className={style.checkboxStyle}
            >
                Checkbox text
            </Checkbox>
            <InputText className={style.inputStyle} placeholder={"input"}/>
            <Button className={style.buttonStyle}>Button</Button>
        </>
    )
})