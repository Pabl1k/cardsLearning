import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react"
import style from "./Checkbox.module.scss"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

export const Checkbox: React.FC<SuperCheckboxPropsType> = React.memo(({
        type,
        onChange, onChangeChecked,
        className, spanClassName,
        children,
        ...restProps
}) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    const finalInputClassName = `${style.checkbox} ${className ? className : ""}`

    return (
        <label className={style.labelStyle}>
            <input
                type={"checkbox"}
                onChange={onChangeCallback}
                className={finalInputClassName}
                {...restProps}
            />
            {children && <span className={style.spanClassName}>{children}</span>}
        </label>
    )
})