import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from "react"
import style from "./InputText.module.css"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

export const InputText: React.FC<SuperInputTextPropsType> = ({
    type,
    onChange, onChangeText,
    onKeyPress, onEnter,
    error,
    className, spanClassName,
    ...restProps
}) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e)
        e.key === "Enter"
        && onEnter
        && onEnter()
    }

    const finalSpanClassName = `${style.error} ${spanClassName ? spanClassName : ""}`
    const finalInputClassName = `${error ? style.errorInput : style.superInput}`

    return (
        <>
            <input
                type={"text"}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={`${finalInputClassName} ${className}`}
                {...restProps}
            />
            {error ? <span className={finalSpanClassName}>{error}</span> : null}
        </>
    )
}