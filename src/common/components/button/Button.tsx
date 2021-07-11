import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react"
import style from "./Button.module.css"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

export const Button: React.FC<ButtonPropsType> = React.memo(({
    red, className,
    ...restProps
}) => {

    const finalClassName = `${red ? style.red : style.default} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
})