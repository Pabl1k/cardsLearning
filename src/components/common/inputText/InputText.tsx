import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from "react"
import s from "./InputText.module.scss"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string | null
    spanClassName?: string
}

export const InputText: React.FC<SuperInputTextPropsType> = React.memo(({
    type,
    onChange, onChangeText,
    onKeyPress, onEnter,
    error,
    className, spanClassName,
    ...restProps
}) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e)
        e.key === "Enter"
        && onEnter
        && onEnter()
    }

    const finalInputClassName = `${error ? s.errorInput : s.inputText}`

    return (
        <>
            <input
                type={type}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={`${finalInputClassName} ${className}`}
                {...restProps}
            />
        </>
    )
})