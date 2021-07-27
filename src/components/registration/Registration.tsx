import React, {useState} from "react"
import {useFormik} from "formik"
import s from "./Registration.module.scss"
import {SignUpTC} from "../../redux/reducers/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {Redirect} from "react-router-dom";
import {InputTextMUI} from "../common/inputText/InputTextMUI";
import InputAdornment from "@material-ui/core/InputAdornment";
import {IconButton} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Button} from "../common/button/Button";

type LoginPropsType = {}

type FormikErrorType = {
    email?: string
    password?: string
    repeatPassword?: string
}

export const Registration = React.memo((props: LoginPropsType) => {
    const dispatch = useDispatch()
    const isSignUp = useSelector<AppRootStateType, boolean>(state => state.registrationReducer.isSignUp)

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    // временные стэйты для values инпутов нужно будет заменить на правильные из редакса
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            repeatPassword: ""
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
                errors.password = `Password must be more than six characters.`
            }
            if (!values.repeatPassword) {
                errors.repeatPassword = 'Required';
            } else if (values.password !== values.repeatPassword) {
                errors.repeatPassword = 'Passwords are not equal';
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(SignUpTC(values.email, values.password))
            formik.resetForm()
        }
    })

    if (isSignUp) {
        return <Redirect to={'/login'}/>
    }

    return (

        <div className={s.registration}>
            <h1 className={s.title}>
                It-Incubator
            </h1>
            <h2 className={s.caption}>
                Sign Up
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

                    <div className={s.inputWrap}>
                        <InputTextMUI
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                            label={"Confirm password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>)
                            }}
                        />
                    </div>

                </div>

                <div className={s.btns}>
                    <Button className={s.button}>
                        Cancel
                    </Button>

                    <Button className={s.button}>
                        Register
                    </Button>
                </div>

                {/*<input
                        type="text"
                        placeholder="Email"
                        {...formik.getFieldProps("email")}
                    />
                    {
                        formik.touched.email && formik.errors.email
                            ? <div>{formik.errors.email}</div>
                            : null
                    }
                    <input
                        type="password"
                        placeholder="Password"
                        {...formik.getFieldProps("password")}
                    />
                    {
                        formik.touched.password && formik.errors.password
                            ? <div>{formik.errors.password}</div>
                            : null
                    }
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        {...formik.getFieldProps("repeatPassword")}
                    />*/}
                {/*<button type={"submit"}>Sign Up</button>*/}
            </form>
        </div>


    )
})