import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {InputText} from "../inputText/InputText"
import {Button} from "../button/Button"
import style from "./AddItemForm.module.scss"

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
    addItemInputStyle?: string
    addItemButtonStyle?: string
    errorSpanStyle?: string
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError("")
        }
        if (e.key === "Enter") {
            addItemHandler()
        }
    }

    return (
        <div className={style.addItemContainer}>
            <InputText
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={error}
                disabled={props.disabled}
                className={props.addItemInputStyle}
            />
            <Button
                onClick={addItemHandler}
                error={error}
                disabled={props.disabled}
                className={props.addItemButtonStyle}>Click
            </Button>
            {error
                ? <div className={style.errorContainerStyle}>
                    <span className={props.errorSpanStyle}>{error}</span>
                </div>
                : null
            }
        </div>
    )
})
