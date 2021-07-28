import React from "react"
import {useFormik} from "formik"
import {Redirect} from "react-router-dom"
import {SignUpTC} from "../../redux/reducers/registration-reducer"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import style from "./Registration.module.scss"

type LoginPropsType = {}

type FormikErrorType = {
    email?: string
    password?: string
    repeatPassword?: string
}

export const Registration = React.memo((props: LoginPropsType) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const isSignUp = useSelector<AppRootStateType, boolean>(state => state.registrationReducer.isSignUp)

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

    if (isLoggedIn) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <>
            <div>
                It-Incubator
            </div>
            <div>
                Sign Up
            </div>
            <form onSubmit={formik.handleSubmit}>
                <input
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
                />
                <button type={"submit"}>Sign Up</button>
            </form>
        </>
    )
})