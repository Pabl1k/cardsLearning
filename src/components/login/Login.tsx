import React, {useState} from "react"
import {NavLink, Redirect} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {loginTC} from "../../redux/reducers/login-reducer"
import {useFormik} from "formik"
import s from "./Login.module.scss"
import {Checkbox, FormControlLabel, IconButton, makeStyles} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {InputTextMUI} from "../common/inputText/InputTextMUI";
import {Button} from "../common/button/Button";


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
        }
    }
})

export const Login = React.memo(function (props: LoginPropsType) {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const dispatch = useDispatch()

    const classes = useStyles();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    // временные стэйты для values инпутов нужно будет заменить на правильные из редакса
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


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
        return <Redirect to={"/profile"}/>
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
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            label={"Email"}
                            helperText={formik.errors.password}
                        />
                    </div>

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
                        label="Remember Me"/>

                    <NavLink to={"/"}
                             className={s.forgotLink}>
                        Forgot Password
                    </NavLink>
                </div>

                <Button className={s.button}>
                    Login
                </Button>

                <span className={s.account}>Don’t have an account?</span>


                <NavLink to={"/"}
                         className={s.singUp}>
                    Sign Up
                </NavLink>

                {/* <InputText
                    type="text"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}

                />
                {
                    formik.touched.email && formik.errors.email
                        ? <div>{formik.errors.email}</div>
                        : null
                }
                <InputText
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}

                />
                {
                    formik.touched.password && formik.errors.password
                        ? <div>{formik.errors.password}</div>
                        : null
                }
                <Checkbox
                    {...formik.getFieldProps("rememberMe")}
                >
                    Remember me
                </Checkbox>
                <Button
                    type={"submit"}
                    style={{width: 150, height: 50}}
                >Login
                </Button>*/}
            </form>
        </div>
    )
})