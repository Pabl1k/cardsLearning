import React from "react"
import {useFormik} from "formik"
import style from "./Registration.module.scss"
import {SignUpTC} from "../../redux/reducers/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {Redirect} from "react-router-dom";
import {InputText} from "../common/inputText/InputText";
import {Button} from "../common/button/Button";
import {RequestStatusType} from "../../redux/reducers/app-reducer";


type LoginPropsType = {}

type FormikErrorType = {
    email?: string
    password?: string
    repeatPassword?: string
}

export const Registration = React.memo((props: LoginPropsType) => {
    const dispatch = useDispatch()
    const isSignUp = useSelector<AppRootStateType, boolean>(state => state.registrationReducer.isSignUp)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)

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
        <div className={style.signUp} style={{margin: 100}}>

            <form onSubmit={formik.handleSubmit}>
                <p>
                    It-Incubator</p>
                <br/>
                <p>
                    Sign Up
                </p>
                <br/>
                <div>
                    <InputText
                        type="text"
                        placeholder="Email"
                        {...formik.getFieldProps("email")}
                        style={{width: 250, height: 50}}
                    />
                </div>
                {
                    formik.touched.email && formik.errors.email
                        ? <div>{formik.errors.email}</div>
                        : null
                }
                <div>
                    <InputText
                        type="password"
                        placeholder="Password"
                        {...formik.getFieldProps("password")}
                        style={{width: 250, height: 50}}
                    />
                </div>
                {
                    formik.touched.password && formik.errors.password
                        ? <div>{formik.errors.password}</div>
                        : null
                }
                <div>
                    <InputText
                        type="password"
                        placeholder="Repeat Password"
                        {...formik.getFieldProps("repeatPassword")}
                        style={{width: 250, height: 50}}
                    />
                </div>
                <div>
                    <Button disabled={status === "loading"} type={"submit"}
                            style={{width: 150, height: 50}}
                    >Sign Up</Button>
                </div>
            </form>
        </div>

    )
})