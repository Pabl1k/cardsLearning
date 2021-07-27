import React, {useState} from "react"
import s from "./UpdatePassword.module.scss"
import {InputTextMUI} from "../common/inputText/InputTextMUI";
import InputAdornment from "@material-ui/core/InputAdornment";
import {IconButton} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Button} from "../common/button/Button";

type UpdatePasswordPropsType = {}

export const UpdatePassword = React.memo(function (props: UpdatePasswordPropsType) {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    // временные стэйты для values инпутов нужно будет заменить на правильные из редакса
    const [password, setPassword] = useState<string>("");

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (
        <div className={s.create}>
            <form>
                <h1 className={s.title}>It-incubator</h1>

                <h2 className={s.caption}>Create new password</h2>

                <div className={s.inputWrap}>

                    <InputTextMUI
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        label={"Password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>)
                        }}
                    />
                </div>
                <p className={s.text}>
                    Create new password and we will send you further instructions to email
                </p>

                <Button className={s.button}>Create new password</Button>

            </form>
        </div>
    )
})