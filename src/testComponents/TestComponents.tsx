import React, {useState} from "react"
import {AddItemForm} from "../components/common/addItemForm/AddItemForm"
import {Checkbox} from "../components/common/checkbox/Checkbox"
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
        </>
    )
})