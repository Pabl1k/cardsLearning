import React, {useState} from "react"
import {NavLink, Redirect} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {loginTC} from "../../redux/reducers/login-reducer"
import {useFormik} from "formik"
import {Checkbox, FormControlLabel, IconButton, makeStyles} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {InputTextMUI} from "../common/inputText/InputTextMUI";
import {Button} from "../common/button/Button"
import s from "./Login.module.scss"
import {RequestStatusType} from "../../redux/reducers/app-reducer";

type LoginPropsType = {}

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '& .MuiTypography-body1': {
            fontFamily: "SFUIDisplay, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "1.2",
            color: "#2D2E46",
        },
        '& .MuiIconButton-label': {
            color: "#2D2E46",
        },
    }
});

export const Login = React.memo(function (props: LoginPropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const dispatch = useDispatch()

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = "Required."
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address."
            }
            if (!values.password) {
                errors.password = "Required."
            } else if (values.password.length < 6) {
                errors.password = "Password must be more than six characters."
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(loginTC(values.email, values.password, values.rememberMe))
            formik.resetForm()
        }
    })

    if (isLoggedIn) {
        return <Redirect to={"/"}/>
    }

    return (

        <div className={s.login}>
            <h1 className={s.title}>
                It-Incubator
            </h1>
            <h2 className={s.caption}>
                Sign In
            </h2>
            <form onSubmit={formik.handleSubmit}>

                <div className={s.inputBox}>

                    <div className={s.inputWrap}>
                        <InputTextMUI
                            type={"email"}
                            autoComplete='off'
                            {...formik.getFieldProps("email")}
                            label={"Email"}
                            helperText={formik.errors.email}
                        />
                    </div>
                    <div className={s.inputWrap}>
                        <InputTextMUI
                            type={showPassword ? 'text' : 'password'}
                            {...formik.getFieldProps("password")}
                            label={"Password"}
                            helperText={formik.errors.password}
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
                </div>
                <div className={s.infoWrap}>
                    <FormControlLabel
                        className={classes.root}
                        control={
                            <Checkbox
                                name="checkedB"
                                color="default"
                                size={"small"}
                            />
                        }
                        {...formik.getFieldProps("rememberMe")}
                        label="Remember Me"/>
                    <NavLink to={"/restorePassword"}
                             className={s.forgotLink}>
                        Forgot Password
                    </NavLink>
                </div>
                <Button type={"submit"}
                        disabled={status === "loading"}
                        className={s.button}>Login
                </Button>
                <span className={s.account}>Don’t have an account?</span>
                <NavLink to={"/registration"}
                         className={s.singUp}>
                    Sign Up
                </NavLink>
            </form>
        </div>
    )
})