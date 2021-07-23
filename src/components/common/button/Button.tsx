import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react"
import style from "./Button.module.scss"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    error?: string | null
}

export const Button: React.FC<ButtonPropsType> = React.memo(({
     error, className,
     ...restProps
}) => {

    const finalClassName = `${error ? style.error : style.default} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
})