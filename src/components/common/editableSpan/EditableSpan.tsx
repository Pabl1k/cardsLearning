import React, {ChangeEvent, useState} from "react"
import {InputText} from "../inputText/InputText"
import s from "./EditableSpan.module.scss"

type EditableSpanPropsType = {
    value: string
    onChangeValue: (newValue: string) => void
    editableSpanInputStyle?: string
    editableSpanTextStyle?: string
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }

    const activateViewMode = () => {
        if (title !== "") {
            setEditMode(false)
            props.onChangeValue(title)
        } else {
            setEditMode(false)
            props.onChangeValue(props.value)
        }
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <InputText
            value={title}
            onChange={changeTitle}
            onBlur={activateViewMode}
            autoFocus
            className={props.editableSpanInputStyle}
        />
        : <span onDoubleClick={activateEditMode} className={props.editableSpanTextStyle}>{props.value}</span>
})